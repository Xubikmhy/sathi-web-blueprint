
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { Eye, Mail, Phone, CheckCircle } from 'lucide-react';

interface ContactInquiry {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  subject: string | null;
  message: string;
  status: string;
  created_at: string;
  responded_at: string | null;
}

const ContactInquiriesTab = () => {
  const [inquiries, setInquiries] = useState<ContactInquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedInquiry, setSelectedInquiry] = useState<ContactInquiry | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  useEffect(() => {
    fetchInquiries();
  }, []);

  const fetchInquiries = async () => {
    const { data, error } = await supabase
      .from('contact_inquiries')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      toast.error('Error fetching contact inquiries');
      console.error('Error:', error);
    } else {
      setInquiries(data || []);
    }
    setLoading(false);
  };

  const markAsResponded = async (id: string) => {
    const { error } = await supabase
      .from('contact_inquiries')
      .update({ 
        status: 'responded',
        responded_at: new Date().toISOString()
      })
      .eq('id', id);

    if (error) {
      toast.error('Error updating inquiry status');
    } else {
      toast.success('Inquiry marked as responded');
      fetchInquiries();
    }
  };

  const openInquiryDialog = (inquiry: ContactInquiry) => {
    setSelectedInquiry(inquiry);
    setDialogOpen(true);
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'new': return 'bg-blue-100 text-blue-800';
      case 'responded': return 'bg-green-100 text-green-800';
      case 'in_progress': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return {
      date: date.toLocaleDateString(),
      time: date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
  };

  if (loading) {
    return <div className="text-center py-8">Loading contact inquiries...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Contact Inquiries</h2>
          <p className="text-gray-600">Manage inquiries from your website contact form</p>
        </div>
        <div className="text-sm text-gray-600">
          Total: {inquiries.length} inquiries
        </div>
      </div>

      {inquiries.length === 0 ? (
        <Card>
          <CardContent className="text-center py-8">
            <p className="text-gray-500">No contact inquiries yet. They will appear here when someone submits the contact form on your website.</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4">
          {inquiries.map((inquiry) => {
            const dateTime = formatDate(inquiry.created_at);
            return (
              <Card key={inquiry.id} className="hover:shadow-md transition-shadows">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="font-medium text-gray-900">{inquiry.name}</h3>
                        <Badge className={getStatusColor(inquiry.status)}>
                          {inquiry.status}
                        </Badge>
                      </div>
                      
                      <div className="flex items-center space-x-6 text-sm text-gray-600 mb-3">
                        <div className="flex items-center space-x-1">
                          <Mail size={14} />
                          <span>{inquiry.email}</span>
                        </div>
                        {inquiry.phone && (
                          <div className="flex items-center space-x-1">
                            <Phone size={14} />
                            <span>{inquiry.phone}</span>
                          </div>
                        )}
                        <div>
                          {dateTime.date} at {dateTime.time}
                        </div>
                      </div>

                      {inquiry.subject && (
                        <div className="mb-2">
                          <span className="font-medium text-sm">Subject:</span>
                          <span className="text-sm text-gray-700 ml-2">{inquiry.subject}</span>
                        </div>
                      )}

                      <div className="text-sm text-gray-700">
                        <span className="font-medium">Message:</span>
                        <p className="mt-1 text-gray-600 line-clamp-2">{inquiry.message}</p>
                      </div>

                      {inquiry.responded_at && (
                        <div className="mt-3 text-xs text-green-600">
                          Responded on {formatDate(inquiry.responded_at).date}
                        </div>
                      )}
                    </div>

                    <div className="flex space-x-2 ml-4">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => openInquiryDialog(inquiry)}
                      >
                        <Eye size={16} />
                      </Button>
                      {inquiry.status !== 'responded' && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => markAsResponded(inquiry.id)}
                          className="text-green-600 hover:text-green-700"
                        >
                          <CheckCircle size={16} />
                        </Button>
                      )}
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => window.open(`mailto:${inquiry.email}?subject=Re: ${inquiry.subject || 'Your inquiry'}`)}
                      >
                        <Mail size={16} />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Contact Inquiry Details</DialogTitle>
            <DialogDescription>
              Full details of the contact inquiry
            </DialogDescription>
          </DialogHeader>
          {selectedInquiry && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="font-medium">Name</Label>
                  <p className="text-gray-700">{selectedInquiry.name}</p>
                </div>
                <div>
                  <Label className="font-medium">Status</Label>
                  <div className="mt-1">
                    <Badge className={getStatusColor(selectedInquiry.status)}>
                      {selectedInquiry.status}
                    </Badge>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="font-medium">Email</Label>
                  <p className="text-gray-700">{selectedInquiry.email}</p>
                </div>
                {selectedInquiry.phone && (
                  <div>
                    <Label className="font-medium">Phone</Label>
                    <p className="text-gray-700">{selectedInquiry.phone}</p>
                  </div>
                )}
              </div>

              {selectedInquiry.subject && (
                <div>
                  <Label className="font-medium">Subject</Label>
                  <p className="text-gray-700">{selectedInquiry.subject}</p>
                </div>
              )}

              <div>
                <Label className="font-medium">Message</Label>
                <div className="mt-2 p-3 bg-gray-50 rounded-md">
                  <p className="text-gray-700 whitespace-pre-wrap">{selectedInquiry.message}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="font-medium">Received</Label>
                  <p className="text-gray-700">
                    {formatDate(selectedInquiry.created_at).date} at {formatDate(selectedInquiry.created_at).time}
                  </p>
                </div>
                {selectedInquiry.responded_at && (
                  <div>
                    <Label className="font-medium">Responded</Label>
                    <p className="text-gray-700">
                      {formatDate(selectedInquiry.responded_at).date} at {formatDate(selectedInquiry.responded_at).time}
                    </p>
                  </div>
                )}
              </div>

              <div className="flex justify-end space-x-2 pt-4">
                <Button
                  variant="outline"
                  onClick={() => window.open(`mailto:${selectedInquiry.email}?subject=Re: ${selectedInquiry.subject || 'Your inquiry'}`)}
                >
                  <Mail size={16} className="mr-2" />
                  Reply via Email
                </Button>
                {selectedInquiry.status !== 'responded' && (
                  <Button
                    onClick={() => {
                      markAsResponded(selectedInquiry.id);
                      setDialogOpen(false);
                    }}
                    className="bg-brand-green hover:bg-brand-green/90"
                  >
                    <CheckCircle size={16} className="mr-2" />
                    Mark as Responded
                  </Button>
                )}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

const Label = ({ className, children, ...props }: React.LabelHTMLAttributes<HTMLLabelElement>) => (
  <label className={`text-sm font-medium text-gray-700 ${className}`} {...props}>
    {children}
  </label>
);

export default ContactInquiriesTab;


import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { Plus, Download, Trash2, FileText } from 'lucide-react';

interface Document {
  id: string;
  name: string;
  file_path: string;
  file_size: number | null;
  mime_type: string | null;
  document_type: 'tax_return' | 'financial_statement' | 'receipt' | 'contract' | 'other';
  client_id: string | null;
  service_id: string | null;
  uploaded_at: string;
  clients?: {
    name: string;
  } | null;
  services?: {
    service_name: string;
  } | null;
}

interface Client {
  id: string;
  name: string;
}

interface Service {
  id: string;
  service_name: string;
}

const DocumentsTab = () => {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [clients, setClients] = useState<Client[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    fetchDocuments();
    fetchClients();
    fetchServices();
  }, []);

  const fetchDocuments = async () => {
    const { data, error } = await supabase
      .from('documents')
      .select(`
        *,
        clients (
          name
        ),
        services (
          service_name
        )
      `)
      .order('uploaded_at', { ascending: false });

    if (error) {
      toast.error('Error fetching documents');
      console.error('Error:', error);
    } else {
      setDocuments(data || []);
    }
    setLoading(false);
  };

  const fetchClients = async () => {
    const { data, error } = await supabase
      .from('clients')
      .select('id, name')
      .order('name');

    if (error) {
      console.error('Error fetching clients:', error);
    } else {
      setClients(data || []);
    }
  };

  const fetchServices = async () => {
    const { data, error } = await supabase
      .from('services')
      .select('id, service_name')
      .order('service_name');

    if (error) {
      console.error('Error fetching services:', error);
    } else {
      setServices(data || []);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setUploading(true);

    const formData = new FormData(e.currentTarget);
    const file = formData.get('file') as File;
    
    if (!file) {
      toast.error('Please select a file');
      setUploading(false);
      return;
    }

    try {
      // Get current user
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        toast.error('User not authenticated');
        setUploading(false);
        return;
      }

      // Upload file to storage
      const fileExt = file.name.split('.').pop();
      const fileName = `${user.id}/${Date.now()}.${fileExt}`;
      
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('documents')
        .upload(fileName, file);

      if (uploadError) {
        throw uploadError;
      }

      // Save document metadata to database
      const documentData = {
        name: formData.get('name') as string || file.name,
        file_path: uploadData.path,
        file_size: file.size,
        mime_type: file.type,
        document_type: formData.get('document_type') as 'tax_return' | 'financial_statement' | 'receipt' | 'contract' | 'other',
        client_id: formData.get('client_id') as string || null,
        service_id: formData.get('service_id') as string || null,
      };

      const { error: dbError } = await supabase
        .from('documents')
        .insert([documentData]);

      if (dbError) {
        throw dbError;
      }

      toast.success('Document uploaded successfully');
      setDialogOpen(false);
      fetchDocuments();
      
    } catch (error) {
      console.error('Error uploading document:', error);
      toast.error('Error uploading document');
    }

    setUploading(false);
  };

  const handleDownload = async (document: Document) => {
    try {
      const { data, error } = await supabase.storage
        .from('documents')
        .download(document.file_path);

      if (error) {
        throw error;
      }

      // Create download link
      const url = URL.createObjectURL(data);
      const a = document.createElement('a');
      a.href = url;
      a.download = document.name;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      
    } catch (error) {
      console.error('Error downloading document:', error);
      toast.error('Error downloading document');
    }
  };

  const handleDelete = async (document: Document) => {
    if (confirm('Are you sure you want to delete this document?')) {
      try {
        // Delete from storage
        const { error: storageError } = await supabase.storage
          .from('documents')
          .remove([document.file_path]);

        if (storageError) {
          throw storageError;
        }

        // Delete from database
        const { error: dbError } = await supabase
          .from('documents')
          .delete()
          .eq('id', document.id);

        if (dbError) {
          throw dbError;
        }

        toast.success('Document deleted successfully');
        fetchDocuments();
        
      } catch (error) {
        console.error('Error deleting document:', error);
        toast.error('Error deleting document');
      }
    }
  };

  const formatFileSize = (bytes: number | null) => {
    if (!bytes) return 'Unknown size';
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getDocumentTypeColor = (type: string) => {
    switch (type) {
      case 'tax_return': return 'bg-blue-100 text-blue-800';
      case 'financial_statement': return 'bg-green-100 text-green-800';
      case 'receipt': return 'bg-yellow-100 text-yellow-800';
      case 'contract': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return <div className="text-center py-8">Loading documents...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Documents</h2>
          <p className="text-gray-600">Manage client documents and files</p>
        </div>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-brand-green hover:bg-brand-green/90">
              <Plus size={16} className="mr-2" />
              Upload Document
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Upload New Document</DialogTitle>
              <DialogDescription>
                Upload a document and associate it with a client or service
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="file">File *</Label>
                <Input
                  id="file"
                  name="file"
                  type="file"
                  required
                  accept=".pdf,.doc,.docx,.xls,.xlsx,.jpg,.jpeg,.png"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="name">Document Name</Label>
                <Input
                  id="name"
                  name="name"
                  placeholder="Enter document name (optional - will use filename if empty)"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="document_type">Document Type</Label>
                <Select name="document_type" defaultValue="other">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="tax_return">Tax Return</SelectItem>
                    <SelectItem value="financial_statement">Financial Statement</SelectItem>
                    <SelectItem value="receipt">Receipt</SelectItem>
                    <SelectItem value="contract">Contract</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="client_id">Client (Optional)</Label>
                  <Select name="client_id">
                    <SelectTrigger>
                      <SelectValue placeholder="Select a client" />
                    </SelectTrigger>
                    <SelectContent>
                      {clients.map((client) => (
                        <SelectItem key={client.id} value={client.id}>
                          {client.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="service_id">Service (Optional)</Label>
                  <Select name="service_id">
                    <SelectTrigger>
                      <SelectValue placeholder="Select a service" />
                    </SelectTrigger>
                    <SelectContent>
                      {services.map((service) => (
                        <SelectItem key={service.id} value={service.id}>
                          {service.service_name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="flex justify-end space-x-2">
                <Button type="button" variant="outline" onClick={() => setDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit" className="bg-brand-green hover:bg-brand-green/90" disabled={uploading}>
                  {uploading ? 'Uploading...' : 'Upload Document'}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {documents.length === 0 ? (
        <Card>
          <CardContent className="text-center py-8">
            <p className="text-gray-500">No documents yet. Upload your first document to get started.</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4">
          {documents.map((document) => (
            <Card key={document.id}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="p-2 bg-gray-100 rounded">
                      <FileText size={24} className="text-gray-600" />
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900">{document.name}</h3>
                      <div className="flex items-center space-x-4 text-sm text-gray-500 mt-1">
                        <span>{formatFileSize(document.file_size)}</span>
                        <span>•</span>
                        <span>{new Date(document.uploaded_at).toLocaleDateString()}</span>
                        {document.clients && (
                          <>
                            <span>•</span>
                            <span>Client: {document.clients.name}</span>
                          </>
                        )}
                        {document.services && (
                          <>
                            <span>•</span>
                            <span>Service: {document.services.service_name}</span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge className={getDocumentTypeColor(document.document_type)}>
                      {document.document_type.replace('_', ' ')}
                    </Badge>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDownload(document)}
                    >
                      <Download size={16} />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDelete(document)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 size={16} />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default DocumentsTab;

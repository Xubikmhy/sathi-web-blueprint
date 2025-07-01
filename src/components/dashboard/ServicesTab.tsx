
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { Plus, Edit, Trash2 } from 'lucide-react';

interface Service {
  id: string;
  service_name: string;
  description: string | null;
  status: 'pending' | 'in_progress' | 'completed' | 'on_hold';
  start_date: string | null;
  due_date: string | null;
  completion_date: string | null;
  amount: number | null;
  notes: string | null;
  client_id: string;
  clients: {
    name: string;
  };
  created_at: string;
}

interface Client {
  id: string;
  name: string;
}

const ServicesTab = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingService, setEditingService] = useState<Service | null>(null);

  useEffect(() => {
    fetchServices();
    fetchClients();
  }, []);

  const fetchServices = async () => {
    const { data, error } = await supabase
      .from('services')
      .select(`
        *,
        clients (
          name
        )
      `)
      .order('created_at', { ascending: false });

    if (error) {
      toast.error('Error fetching services');
      console.error('Error:', error);
    } else {
      setServices(data || []);
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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    const serviceData = {
      service_name: formData.get('service_name') as string,
      description: formData.get('description') as string || null,
      status: formData.get('status') as 'pending' | 'in_progress' | 'completed' | 'on_hold',
      client_id: formData.get('client_id') as string,
      start_date: formData.get('start_date') as string || null,
      due_date: formData.get('due_date') as string || null,
      completion_date: formData.get('completion_date') as string || null,
      amount: formData.get('amount') ? parseFloat(formData.get('amount') as string) : null,
      notes: formData.get('notes') as string || null,
    };

    if (editingService) {
      const { error } = await supabase
        .from('services')
        .update(serviceData)
        .eq('id', editingService.id);

      if (error) {
        toast.error('Error updating service');
      } else {
        toast.success('Service updated successfully');
        setDialogOpen(false);
        setEditingService(null);
        fetchServices();
      }
    } else {
      const { error } = await supabase
        .from('services')
        .insert([serviceData]);

      if (error) {
        toast.error('Error creating service');
      } else {
        toast.success('Service created successfully');
        setDialogOpen(false);
        fetchServices();
      }
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this service?')) {
      const { error } = await supabase
        .from('services')
        .delete()
        .eq('id', id);

      if (error) {
        toast.error('Error deleting service');
      } else {
        toast.success('Service deleted successfully');
        fetchServices();
      }
    }
  };

  const openEditDialog = (service: Service) => {
    setEditingService(service);
    setDialogOpen(true);
  };

  const openCreateDialog = () => {
    setEditingService(null);
    setDialogOpen(true);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'in_progress': return 'bg-blue-100 text-blue-800';
      case 'completed': return 'bg-green-100 text-green-800';
      case 'on_hold': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return <div className="text-center py-8">Loading services...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Services</h2>
          <p className="text-gray-600">Track and manage client services</p>
        </div>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={openCreateDialog} className="bg-brand-green hover:bg-brand-green/90">
              <Plus size={16} className="mr-2" />
              Add Service
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editingService ? 'Edit Service' : 'Add New Service'}</DialogTitle>
              <DialogDescription>
                {editingService ? 'Update service information' : 'Add a new service to track'}
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="service_name">Service Name *</Label>
                  <Input
                    id="service_name"
                    name="service_name"
                    defaultValue={editingService?.service_name || ''}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="client_id">Client *</Label>
                  <Select name="client_id" defaultValue={editingService?.client_id || ''} required>
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
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  name="description"
                  defaultValue={editingService?.description || ''}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="status">Status</Label>
                  <Select name="status" defaultValue={editingService?.status || 'pending'}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="in_progress">In Progress</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                      <SelectItem value="on_hold">On Hold</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="amount">Amount (NPR)</Label>
                  <Input
                    id="amount"
                    name="amount"
                    type="number"
                    step="0.01"
                    min="0"
                    defaultValue={editingService?.amount || ''}
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="start_date">Start Date</Label>
                  <Input
                    id="start_date"
                    name="start_date"
                    type="date"
                    defaultValue={editingService?.start_date || ''}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="due_date">Due Date</Label>
                  <Input
                    id="due_date"
                    name="due_date"
                    type="date"
                    defaultValue={editingService?.due_date || ''}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="completion_date">Completion Date</Label>
                  <Input
                    id="completion_date"
                    name="completion_date"
                    type="date"
                    defaultValue={editingService?.completion_date || ''}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="notes">Notes</Label>
                <Textarea
                  id="notes"
                  name="notes"
                  defaultValue={editingService?.notes || ''}
                />
              </div>

              <div className="flex justify-end space-x-2">
                <Button type="button" variant="outline" onClick={() => setDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit" className="bg-brand-green hover:bg-brand-green/90">
                  {editingService ? 'Update' : 'Create'} Service
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {services.length === 0 ? (
        <Card>
          <CardContent className="text-center py-8">
            <p className="text-gray-500">No services yet. Add your first service to get started.</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-6">
          {services.map((service) => (
            <Card key={service.id}>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-xl">{service.service_name}</CardTitle>
                    <CardDescription>
                      Client: {service.clients.name}
                    </CardDescription>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge className={getStatusColor(service.status)}>
                      {service.status.replace('_', ' ')}
                    </Badge>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => openEditDialog(service)}
                    >
                      <Edit size={16} />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDelete(service.id)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 size={16} />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {service.description && (
                  <p className="text-gray-600 mb-4">{service.description}</p>
                )}
                
                <div className="grid grid-cols-2 gap-4 text-sm">
                  {service.amount && (
                    <div>
                      <span className="font-medium">Amount:</span> NPR {service.amount.toLocaleString()}
                    </div>
                  )}
                  {service.start_date && (
                    <div>
                      <span className="font-medium">Start Date:</span> {new Date(service.start_date).toLocaleDateString()}
                    </div>
                  )}
                  {service.due_date && (
                    <div>
                      <span className="font-medium">Due Date:</span> {new Date(service.due_date).toLocaleDateString()}
                    </div>
                  )}
                  {service.completion_date && (
                    <div>
                      <span className="font-medium">Completed:</span> {new Date(service.completion_date).toLocaleDateString()}
                    </div>
                  )}
                </div>
                
                {service.notes && (
                  <div className="mt-4 pt-4 border-t">
                    <span className="font-medium">Notes:</span>
                    <p className="text-sm text-gray-600 mt-1">{service.notes}</p>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default ServicesTab;

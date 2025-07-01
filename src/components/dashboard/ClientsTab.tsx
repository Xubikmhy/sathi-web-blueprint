
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { Plus, Edit, Trash2 } from 'lucide-react';

interface Client {
  id: string;
  name: string;
  email: string | null;
  phone: string | null;
  address: string | null;
  city: string | null;
  client_type: 'individual' | 'business' | 'organization';
  pan_number: string | null;
  registration_number: string | null;
  notes: string | null;
  created_at: string;
}

const ClientsTab = () => {
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingClient, setEditingClient] = useState<Client | null>(null);

  useEffect(() => {
    fetchClients();
  }, []);

  const fetchClients = async () => {
    const { data, error } = await supabase
      .from('clients')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      toast.error('Error fetching clients');
      console.error('Error:', error);
    } else {
      setClients(data || []);
    }
    setLoading(false);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    const clientData = {
      name: formData.get('name') as string,
      email: formData.get('email') as string || null,
      phone: formData.get('phone') as string || null,
      address: formData.get('address') as string || null,
      city: formData.get('city') as string || null,
      client_type: formData.get('client_type') as 'individual' | 'business' | 'organization',
      pan_number: formData.get('pan_number') as string || null,
      registration_number: formData.get('registration_number') as string || null,
      notes: formData.get('notes') as string || null,
    };

    if (editingClient) {
      const { error } = await supabase
        .from('clients')
        .update(clientData)
        .eq('id', editingClient.id);

      if (error) {
        toast.error('Error updating client');
      } else {
        toast.success('Client updated successfully');
        setDialogOpen(false);
        setEditingClient(null);
        fetchClients();
      }
    } else {
      const { error } = await supabase
        .from('clients')
        .insert([clientData]);

      if (error) {
        toast.error('Error creating client');
      } else {
        toast.success('Client created successfully');
        setDialogOpen(false);
        fetchClients();
      }
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this client?')) {
      const { error } = await supabase
        .from('clients')
        .delete()
        .eq('id', id);

      if (error) {
        toast.error('Error deleting client');
      } else {
        toast.success('Client deleted successfully');
        fetchClients();
      }
    }
  };

  const openEditDialog = (client: Client) => {
    setEditingClient(client);
    setDialogOpen(true);
  };

  const openCreateDialog = () => {
    setEditingClient(null);
    setDialogOpen(true);
  };

  if (loading) {
    return <div className="text-center py-8">Loading clients...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Clients</h2>
          <p className="text-gray-600">Manage your client information</p>
        </div>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={openCreateDialog} className="bg-brand-green hover:bg-brand-green/90">
              <Plus size={16} className="mr-2" />
              Add Client
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editingClient ? 'Edit Client' : 'Add New Client'}</DialogTitle>
              <DialogDescription>
                {editingClient ? 'Update client information' : 'Add a new client to your database'}
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Name *</Label>
                  <Input
                    id="name"
                    name="name"
                    defaultValue={editingClient?.name || ''}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="client_type">Client Type</Label>
                  <Select name="client_type" defaultValue={editingClient?.client_type || 'individual'}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="individual">Individual</SelectItem>
                      <SelectItem value="business">Business</SelectItem>
                      <SelectItem value="organization">Organization</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    defaultValue={editingClient?.email || ''}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    id="phone"
                    name="phone"
                    defaultValue={editingClient?.phone || ''}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="address">Address</Label>
                  <Input
                    id="address"
                    name="address"
                    defaultValue={editingClient?.address || ''}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="city">City</Label>
                  <Input
                    id="city"
                    name="city"
                    defaultValue={editingClient?.city || ''}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="pan_number">PAN Number</Label>
                  <Input
                    id="pan_number"
                    name="pan_number"
                    defaultValue={editingClient?.pan_number || ''}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="registration_number">Registration Number</Label>
                  <Input
                    id="registration_number"
                    name="registration_number"
                    defaultValue={editingClient?.registration_number || ''}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="notes">Notes</Label>
                <Textarea
                  id="notes"
                  name="notes"
                  defaultValue={editingClient?.notes || ''}
                />
              </div>

              <div className="flex justify-end space-x-2">
                <Button type="button" variant="outline" onClick={() => setDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit" className="bg-brand-green hover:bg-brand-green/90">
                  {editingClient ? 'Update' : 'Create'} Client
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {clients.length === 0 ? (
        <Card>
          <CardContent className="text-center py-8">
            <p className="text-gray-500">No clients yet. Add your first client to get started.</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-6">
          {clients.map((client) => (
            <Card key={client.id}>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-xl">{client.name}</CardTitle>
                    <CardDescription className="capitalize">
                      {client.client_type.replace('_', ' ')}
                    </CardDescription>
                  </div>
                  <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => openEditDialog(client)}
                    >
                      <Edit size={16} />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDelete(client.id)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 size={16} />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  {client.email && (
                    <div>
                      <span className="font-medium">Email:</span> {client.email}
                    </div>
                  )}
                  {client.phone && (
                    <div>
                      <span className="font-medium">Phone:</span> {client.phone}
                    </div>
                  )}
                  {client.address && (
                    <div>
                      <span className="font-medium">Address:</span> {client.address}
                    </div>
                  )}
                  {client.city && (
                    <div>
                      <span className="font-medium">City:</span> {client.city}
                    </div>
                  )}
                  {client.pan_number && (
                    <div>
                      <span className="font-medium">PAN:</span> {client.pan_number}
                    </div>
                  )}
                  {client.registration_number && (
                    <div>
                      <span className="font-medium">Registration:</span> {client.registration_number}
                    </div>
                  )}
                </div>
                {client.notes && (
                  <div className="mt-4 pt-4 border-t">
                    <span className="font-medium">Notes:</span>
                    <p className="text-sm text-gray-600 mt-1">{client.notes}</p>
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

export default ClientsTab;

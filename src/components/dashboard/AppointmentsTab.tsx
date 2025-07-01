
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
import { Plus, Edit, Trash2, Calendar, Clock } from 'lucide-react';

interface Appointment {
  id: string;
  title: string;
  description: string | null;
  appointment_date: string;
  duration_minutes: number;
  location: string | null;
  status: string;
  client_id: string | null;
  clients?: {
    name: string;
  } | null;
  created_at: string;
}

interface Client {
  id: string;
  name: string;
}

const AppointmentsTab = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingAppointment, setEditingAppointment] = useState<Appointment | null>(null);

  useEffect(() => {
    fetchAppointments();
    fetchClients();
  }, []);

  const fetchAppointments = async () => {
    const { data, error } = await supabase
      .from('appointments')
      .select(`
        *,
        clients (
          name
        )
      `)
      .order('appointment_date', { ascending: true });

    if (error) {
      toast.error('Error fetching appointments');
      console.error('Error:', error);
    } else {
      setAppointments(data || []);
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
    
    const appointmentData = {
      title: formData.get('title') as string,
      description: formData.get('description') as string || null,
      appointment_date: new Date(formData.get('appointment_date') as string).toISOString(),
      duration_minutes: parseInt(formData.get('duration_minutes') as string) || 60,
      location: formData.get('location') as string || null,
      status: formData.get('status') as string,
      client_id: formData.get('client_id') as string || null,
    };

    if (editingAppointment) {
      const { error } = await supabase
        .from('appointments')
        .update(appointmentData)
        .eq('id', editingAppointment.id);

      if (error) {
        toast.error('Error updating appointment');
      } else {
        toast.success('Appointment updated successfully');
        setDialogOpen(false);
        setEditingAppointment(null);
        fetchAppointments();
      }
    } else {
      const { error } = await supabase
        .from('appointments')
        .insert([appointmentData]);

      if (error) {
        toast.error('Error creating appointment');
      } else {
        toast.success('Appointment created successfully');
        setDialogOpen(false);
        fetchAppointments();
      }
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this appointment?')) {
      const { error } = await supabase
        .from('appointments')
        .delete()
        .eq('id', id);

      if (error) {
        toast.error('Error deleting appointment');
      } else {
        toast.success('Appointment deleted successfully');
        fetchAppointments();
      }
    }
  };

  const openEditDialog = (appointment: Appointment) => {
    setEditingAppointment(appointment);
    setDialogOpen(true);
  };

  const openCreateDialog = () => {
    setEditingAppointment(null);
    setDialogOpen(true);
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'scheduled': return 'bg-blue-100 text-blue-800';
      case 'completed': return 'bg-green-100 text-green-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      case 'rescheduled': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDateTime = (dateString: string) => {
    const date = new Date(dateString);
    return {
      date: date.toLocaleDateString(),
      time: date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
  };

  if (loading) {
    return <div className="text-center py-8">Loading appointments...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Appointments</h2>
          <p className="text-gray-600">Schedule and manage client meetings</p>
        </div>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={openCreateDialog} className="bg-brand-green hover:bg-brand-green/90">
              <Plus size={16} className="mr-2" />
              Schedule Appointment
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>{editingAppointment ? 'Edit Appointment' : 'Schedule New Appointment'}</DialogTitle>
              <DialogDescription>
                {editingAppointment ? 'Update appointment details' : 'Create a new appointment with a client'}
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Title *</Label>
                <Input
                  id="title"
                  name="title"
                  defaultValue={editingAppointment?.title || ''}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="client_id">Client</Label>
                <Select name="client_id" defaultValue={editingAppointment?.client_id || ''}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a client (optional)" />
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

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="appointment_date">Date & Time *</Label>
                  <Input
                    id="appointment_date"
                    name="appointment_date"
                    type="datetime-local"
                    defaultValue={editingAppointment?.appointment_date ? 
                      new Date(editingAppointment.appointment_date).toISOString().slice(0, 16) : ''
                    }
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="duration_minutes">Duration (minutes)</Label>
                  <Input
                    id="duration_minutes"
                    name="duration_minutes"
                    type="number"
                    min="15"
                    step="15"
                    defaultValue={editingAppointment?.duration_minutes || 60}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    name="location"
                    defaultValue={editingAppointment?.location || ''}
                    placeholder="Office, Online, Client's place, etc."
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="status">Status</Label>
                  <Select name="status" defaultValue={editingAppointment?.status || 'scheduled'}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="scheduled">Scheduled</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                      <SelectItem value="cancelled">Cancelled</SelectItem>
                      <SelectItem value="rescheduled">Rescheduled</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  name="description"
                  defaultValue={editingAppointment?.description || ''}
                  placeholder="Meeting agenda, notes, etc."
                />
              </div>

              <div className="flex justify-end space-x-2">
                <Button type="button" variant="outline" onClick={() => setDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit" className="bg-brand-green hover:bg-brand-green/90">
                  {editingAppointment ? 'Update' : 'Schedule'} Appointment
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {appointments.length === 0 ? (
        <Card>
          <CardContent className="text-center py-8">
            <p className="text-gray-500">No appointments scheduled. Create your first appointment to get started.</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-6">
          {appointments.map((appointment) => {
            const dateTime = formatDateTime(appointment.appointment_date);
            return (
              <Card key={appointment.id}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-xl">{appointment.title}</CardTitle>
                      <CardDescription>
                        {appointment.clients ? `with ${appointment.clients.name}` : 'General appointment'}
                      </CardDescription>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge className={getStatusColor(appointment.status)}>
                        {appointment.status}
                      </Badge>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => openEditDialog(appointment)}
                      >
                        <Edit size={16} />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDelete(appointment.id)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 size={16} />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center space-x-6 mb-4">
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <Calendar size={16} />
                      <span>{dateTime.date}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <Clock size={16} />
                      <span>{dateTime.time} ({appointment.duration_minutes} min)</span>
                    </div>
                    {appointment.location && (
                      <div className="text-sm text-gray-600">
                        <span className="font-medium">Location:</span> {appointment.location}
                      </div>
                    )}
                  </div>
                  
                  {appointment.description && (
                    <div className="mt-4 pt-4 border-t">
                      <span className="font-medium">Description:</span>
                      <p className="text-sm text-gray-600 mt-1">{appointment.description}</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default AppointmentsTab;


import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { User, Session } from '@supabase/supabase-js';
import { LogOut, Users, FileText, Calendar, MessageSquare, Briefcase } from 'lucide-react';
import ClientsTab from '@/components/dashboard/ClientsTab';
import ServicesTab from '@/components/dashboard/ServicesTab';
import DocumentsTab from '@/components/dashboard/DocumentsTab';
import AppointmentsTab from '@/components/dashboard/AppointmentsTab';
import ContactInquiriesTab from '@/components/dashboard/ContactInquiriesTab';

const Dashboard = () => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<any>(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        
        if (!session?.user) {
          navigate('/auth');
        } else {
          // Fetch user profile
          setTimeout(() => {
            fetchProfile(session.user.id);
          }, 0);
        }
      }
    );

    // Check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      
      if (!session?.user) {
        navigate('/auth');
      } else {
        fetchProfile(session.user.id);
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const fetchProfile = async (userId: string) => {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();

    if (error) {
      console.error('Error fetching profile:', error);
    } else {
      setProfile(data);
    }
  };

  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      toast.error('Error signing out');
    } else {
      toast.success('Successfully signed out');
      navigate('/');
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-brand-blue flex items-center justify-center">
        <div className="text-white text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-green mx-auto mb-4"></div>
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-brand-blue shadow-lg">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <img 
                src="/lovable-uploads/1aa18539-7d9c-43cb-9616-ae539bc0c586.png" 
                alt="Tax Sathi Logo" 
                className="h-10 w-auto"
              />
              <div>
                <h1 className="text-2xl font-bold text-white">Dashboard</h1>
                <p className="text-white/80">Welcome back, {profile?.full_name || user.email}</p>
              </div>
            </div>
            <Button
              onClick={handleSignOut}
              variant="outline"
              className="text-white border-white hover:bg-white hover:text-brand-blue"
            >
              <LogOut size={16} className="mr-2" />
              Sign Out
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <Tabs defaultValue="clients" className="w-full">
          <TabsList className="grid w-full grid-cols-5 mb-8">
            <TabsTrigger value="clients" className="flex items-center space-x-2">
              <Users size={16} />
              <span>Clients</span>
            </TabsTrigger>
            <TabsTrigger value="services" className="flex items-center space-x-2">
              <Briefcase size={16} />
              <span>Services</span>
            </TabsTrigger>
            <TabsTrigger value="documents" className="flex items-center space-x-2">
              <FileText size={16} />
              <span>Documents</span>
            </TabsTrigger>
            <TabsTrigger value="appointments" className="flex items-center space-x-2">
              <Calendar size={16} />
              <span>Appointments</span>
            </TabsTrigger>
            <TabsTrigger value="inquiries" className="flex items-center space-x-2">
              <MessageSquare size={16} />
              <span>Inquiries</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="clients">
            <ClientsTab />
          </TabsContent>

          <TabsContent value="services">
            <ServicesTab />
          </TabsContent>

          <TabsContent value="documents">
            <DocumentsTab />
          </TabsContent>

          <TabsContent value="appointments">
            <AppointmentsTab />
          </TabsContent>

          <TabsContent value="inquiries">
            <ContactInquiriesTab />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Dashboard;

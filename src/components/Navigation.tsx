
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';
import { User as SupabaseUser, Session } from '@supabase/supabase-js';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [user, setUser] = useState<SupabaseUser | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
      }
    );

    // Check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Services', path: '/services' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled ? 'bg-brand-blue/95 backdrop-blur-sm shadow-lg' : 'bg-transparent'
    }`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
            <img 
              src="/lovable-uploads/1aa18539-7d9c-43cb-9616-ae539bc0c586.png" 
              alt="Tax Sathi Pvt. Ltd. Logo" 
              className="h-12 w-auto drop-shadow-lg"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`text-white hover:text-brand-green transition-colors duration-300 font-medium ${
                  location.pathname === item.path ? 'text-brand-green' : ''
                }`}
              >
                {item.name}
              </Link>
            ))}
            {user ? (
              <Button 
                asChild
                className="bg-brand-green text-black hover:bg-brand-green/90 font-semibold px-6 py-2 hover-scale shadow-lg"
              >
                <Link to="/dashboard">
                  <User size={16} className="mr-2" />
                  Dashboard
                </Link>
              </Button>
            ) : (
              <Button 
                asChild
                className="bg-brand-green text-black hover:bg-brand-green/90 font-semibold px-6 py-2 hover-scale shadow-lg"
              >
                <Link to="/auth">Login</Link>
              </Button>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(!isOpen)}
              className="text-white hover:text-brand-green"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden bg-brand-blue/95 backdrop-blur-sm rounded-lg mt-2 p-4 space-y-4 shadow-lg">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`block text-white hover:text-brand-green transition-colors duration-300 font-medium py-2 ${
                  location.pathname === item.path ? 'text-brand-green' : ''
                }`}
                onClick={() => setIsOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            {user ? (
              <Button 
                asChild
                className="bg-brand-green text-black hover:bg-brand-green/90 font-semibold w-full hover-scale shadow-lg"
              >
                <Link to="/dashboard" onClick={() => setIsOpen(false)}>
                  <User size={16} className="mr-2" />
                  Dashboard
                </Link>
              </Button>
            ) : (
              <Button 
                asChild
                className="bg-brand-green text-black hover:bg-brand-green/90 font-semibold w-full hover-scale shadow-lg"
              >
                <Link to="/auth" onClick={() => setIsOpen(false)}>Login</Link>
              </Button>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;


import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
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
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-brand-green rounded-full flex items-center justify-center">
              <span className="text-black font-bold text-xl">✓</span>
            </div>
            <span className="text-white text-xl font-bold">Tax Sathi</span>
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
            <Button 
              asChild
              className="bg-brand-green text-black hover:bg-brand-green/90 font-medium px-6"
            >
              <Link to="/contact">Get Started</Link>
            </Button>
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
          <div className="md:hidden bg-brand-blue/95 backdrop-blur-sm rounded-lg mt-2 p-4 space-y-4">
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
            <Button 
              asChild
              className="bg-brand-green text-black hover:bg-brand-green/90 font-medium w-full"
            >
              <Link to="/contact" onClick={() => setIsOpen(false)}>Get Started</Link>
            </Button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;

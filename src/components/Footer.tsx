
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-brand-blue border-t border-white/10 py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-brand-green rounded-full flex items-center justify-center">
                <span className="text-black font-bold text-xl">✓</span>
              </div>
              <span className="text-white text-xl font-bold">Tax Sathi</span>
            </div>
            <p className="text-white/80 text-sm">
              Where Accuracy Meets Trust. Professional tax advisory and accounting services in Kathmandu.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-white/80 hover:text-brand-green transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-white/80 hover:text-brand-green transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-white/80 hover:text-brand-green transition-colors">
                  Services
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-white/80 hover:text-brand-green transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-white font-semibold mb-4">Services</h3>
            <ul className="space-y-2 text-sm">
              <li className="text-white/80">Tax Advisory</li>
              <li className="text-white/80">Bookkeeping</li>
              <li className="text-white/80">Financial Planning</li>
              <li className="text-white/80">Payroll Processing</li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-white font-semibold mb-4">Contact Info</h3>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Phone size={16} className="text-brand-green" />
                <span className="text-white/80 text-sm">+977 9846750524</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail size={16} className="text-brand-green" />
                <span className="text-white/80 text-sm">ca.sushilkafle@gmail.com</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin size={16} className="text-brand-green" />
                <span className="text-white/80 text-sm">Baneshwor, Kathmandu</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 mt-8 pt-8 text-center">
          <p className="text-white/60 text-sm">
            © 2025 Tax Sathi Pvt. Ltd. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

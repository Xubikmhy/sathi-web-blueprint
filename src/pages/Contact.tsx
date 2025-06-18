
import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Clock,
  MessageSquare,
  Send
} from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1000));

    toast({
      title: "Message Sent!",
      description: "Thank you for contacting us. We'll get back to you within 24 hours.",
    });

    setFormData({ name: '', email: '', phone: '', message: '' });
    setIsSubmitting(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen pt-16">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-brand-blue to-blue-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 animate-fade-in">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
              Contact Us
            </h1>
            <p className="text-xl text-white/80 max-w-3xl mx-auto">
              Get in touch with our team of experts. We're here to help with all your tax and accounting needs.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Form and Info */}
      <section className="py-20 bg-brand-blue">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <Card className="bg-white/10 backdrop-blur-sm border-white/20">
              <CardContent className="p-8">
                <div className="flex items-center space-x-3 mb-6">
                  <MessageSquare className="w-6 h-6 text-brand-green" />
                  <h2 className="text-2xl font-bold text-white">Send us a Message</h2>
                </div>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <Label htmlFor="name" className="text-white mb-2 block">
                      Full Name *
                    </Label>
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="bg-white/10 border-white/30 text-white placeholder:text-white/60 focus:border-brand-green"
                      placeholder="Enter your full name"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="email" className="text-white mb-2 block">
                      Email Address *
                    </Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="bg-white/10 border-white/30 text-white placeholder:text-white/60 focus:border-brand-green"
                      placeholder="Enter your email address"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="phone" className="text-white mb-2 block">
                      Phone Number
                    </Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleChange}
                      className="bg-white/10 border-white/30 text-white placeholder:text-white/60 focus:border-brand-green"
                      placeholder="Enter your phone number"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="message" className="text-white mb-2 block">
                      Message *
                    </Label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={5}
                      className="bg-white/10 border-white/30 text-white placeholder:text-white/60 focus:border-brand-green resize-none"
                      placeholder="Tell us about your requirements..."
                    />
                  </div>
                  
                  <Button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="bg-brand-green text-black hover:bg-brand-green/90 font-semibold w-full py-6 text-lg"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center space-x-2">
                        <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
                        <span>Sending...</span>
                      </span>
                    ) : (
                      <span className="flex items-center justify-center space-x-2">
                        <Send className="w-5 h-5" />
                        <span>Send Message</span>
                      </span>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Contact Information */}
            <div className="space-y-6">
              <Card className="bg-white/10 backdrop-blur-sm border-white/20">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-brand-green rounded-full flex items-center justify-center flex-shrink-0">
                      <Phone className="w-6 h-6 text-black" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-2">Phone</h3>
                      <p className="text-white/80">+977 9846750524</p>
                      <p className="text-white/60 text-sm mt-1">Available Mon-Fri, 9 AM - 6 PM</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white/10 backdrop-blur-sm border-white/20">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-brand-green rounded-full flex items-center justify-center flex-shrink-0">
                      <Mail className="w-6 h-6 text-black" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-2">Email</h3>
                      <p className="text-white/80">ca.sushilkafle@gmail.com</p>
                      <p className="text-white/60 text-sm mt-1">We'll respond within 24 hours</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white/10 backdrop-blur-sm border-white/20">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-brand-green rounded-full flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-6 h-6 text-black" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-2">Office Location</h3>
                      <p className="text-white/80">Baneshwor, Kathmandu</p>
                      <p className="text-white/60 text-sm mt-1">Nepal</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white/10 backdrop-blur-sm border-white/20">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-brand-green rounded-full flex items-center justify-center flex-shrink-0">
                      <Clock className="w-6 h-6 text-black" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-2">Business Hours</h3>
                      <div className="text-white/80 space-y-1">
                        <p>Monday - Friday: 9:00 AM - 6:00 PM</p>
                        <p>Saturday: 10:00 AM - 4:00 PM</p>
                        <p>Sunday: Closed</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-20 bg-gradient-to-r from-brand-blue to-blue-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">
              Find Us Here
            </h2>
            <p className="text-xl text-white/80">
              Visit our office in Baneshwor, Kathmandu
            </p>
          </div>

          <Card className="bg-white/10 backdrop-blur-sm border-white/20 overflow-hidden">
            <CardContent className="p-0">
              <div className="w-full h-96 bg-gradient-to-br from-brand-green/20 to-blue-600/20 flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="w-16 h-16 text-brand-green mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-white mb-2">
                    Baneshwor, Kathmandu
                  </h3>
                  <p className="text-white/80 mb-4">
                    Our office is conveniently located in the heart of Kathmandu
                  </p>
                  <Button 
                    asChild
                    className="bg-brand-green text-black hover:bg-brand-green/90"
                  >
                    <a 
                      href="https://maps.google.com/?q=Baneshwor,Kathmandu" 
                      target="_blank" 
                      rel="noopener noreferrer"
                    >
                      View on Google Maps
                    </a>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* WhatsApp CTA */}
      <section className="py-12 bg-brand-blue">
        <div className="container mx-auto px-4 text-center">
          <Card className="bg-white/10 backdrop-blur-sm border-white/20 inline-block">
            <CardContent className="p-6">
              <h3 className="text-xl font-bold text-white mb-2">
                Need Immediate Assistance?
              </h3>
              <p className="text-white/80 mb-4">
                Contact us directly on WhatsApp for quick responses
              </p>
              <Button 
                asChild
                className="bg-green-500 hover:bg-green-600 text-white font-semibold"
              >
                <a 
                  href="https://wa.me/9779846750524" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2"
                >
                  <MessageSquare className="w-5 h-5" />
                  <span>WhatsApp Us</span>
                </a>
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default Contact;

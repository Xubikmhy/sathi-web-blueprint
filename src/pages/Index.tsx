
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import { 
  Calculator, 
  FileText, 
  Users, 
  TrendingUp, 
  DollarSign, 
  PieChart,
  Shield,
  Award,
  Star
} from 'lucide-react';

const Index = () => {
  const services = [
    {
      icon: Calculator,
      title: "Bookkeeping",
      description: "Accurate record keeping and financial tracking for your business operations."
    },
    {
      icon: FileText,
      title: "Financial Statement Preparation",
      description: "Professional preparation of comprehensive financial statements and reports."
    },
    {
      icon: Users,
      title: "Payroll Processing",
      description: "Efficient payroll management ensuring compliance and timely payments."
    },
    {
      icon: TrendingUp,
      title: "Budgeting and Forecasting",
      description: "Strategic financial planning to help your business grow and succeed."
    },
    {
      icon: DollarSign,
      title: "Accounts Payable/Receivable",
      description: "Streamlined management of your business cash flow and collections."
    },
    {
      icon: PieChart,
      title: "Bank Reconciliation",
      description: "Accurate matching of bank records with your financial statements."
    },
    {
      icon: Shield,
      title: "Tax Advisory",
      description: "Expert guidance on tax compliance and optimization strategies."
    },
    {
      icon: Award,
      title: "Tax Planning",
      description: "Proactive tax planning to minimize liabilities and maximize savings."
    }
  ];

  const testimonials = [
    {
      name: "Rajan Kuwar",
      position: "Director",
      company: "Multimate Pvt. Ltd.",
      text: "Tax Sathi has been instrumental in streamlining our financial processes. Their expertise and attention to detail are unmatched.",
      rating: 5
    },
    {
      name: "Bijay Limbu",
      position: "Chairman",
      company: "Info Tech Store",
      text: "Professional, reliable, and always available when we need them. Highly recommended for any business.",
      rating: 5
    },
    {
      name: "Surya Kharel",
      position: "Director",
      company: "Hotel Suramma",
      text: "Their tax planning advice saved us significant money. Truly where accuracy meets trust!",
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-brand-blue via-brand-blue to-blue-900">
        <div className="absolute inset-0 bg-black/20"></div>
        <div 
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        ></div>
        
        <div className="relative z-10 text-center max-w-4xl mx-auto px-4 animate-fade-in">
          {/* Logo */}
          <div className="flex justify-center mb-8">
            <img 
              src="/lovable-uploads/1aa18539-7d9c-43cb-9616-ae539bc0c586.png" 
              alt="Tax Sathi Pvt. Ltd. Logo" 
              className="h-32 w-auto drop-shadow-2xl opacity-90"
            />
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
            Tax Sathi
          </h1>
          
          <p className="text-xl md:text-2xl text-white/90 mb-8 font-light">
            Where Accuracy Meets Trust
          </p>
          
          <p className="text-lg text-white/80 mb-12 max-w-2xl mx-auto leading-relaxed">
            Professional tax advisory and accounting services in Kathmandu. 
            Expert financial solutions for individuals and businesses.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Button 
              asChild
              size="lg"
              className="bg-brand-green text-black hover:bg-brand-green/90 font-semibold px-8 py-6 text-lg hover-scale shadow-lg"
            >
              <Link to="/contact">Get Started Today</Link>
            </Button>
            <Button 
              asChild
              size="lg"
              className="bg-brand-green text-black hover:bg-brand-green/90 font-semibold px-8 py-6 text-lg hover-scale shadow-lg"
            >
              <Link to="/about">Learn More</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Services Snapshot */}
      <section className="py-24 bg-brand-blue">
        <div className="container mx-auto px-4">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Our Services
            </h2>
            <p className="text-xl text-white/80 max-w-3xl mx-auto leading-relaxed">
              Comprehensive financial and tax services designed to help your business thrive
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <Card 
                key={index} 
                className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/20 transition-all duration-300 hover-scale group cursor-pointer shadow-lg"
              >
                <Link to="/services">
                  <CardContent className="p-8 text-center">
                    <div className="w-16 h-16 bg-brand-green rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                      <service.icon className="w-8 h-8 text-black" />
                    </div>
                    <h3 className="text-lg font-semibold text-white mb-4">
                      {service.title}
                    </h3>
                    <p className="text-white/80 text-sm leading-relaxed">
                      {service.description}
                    </p>
                  </CardContent>
                </Link>
              </Card>
            ))}
          </div>

          <div className="text-center mt-16">
            <Button 
              asChild
              size="lg"
              className="bg-brand-green text-black hover:bg-brand-green/90 font-semibold px-8 py-4 shadow-lg hover-scale"
            >
              <Link to="/services">View All Services</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Trust Signals */}
      <section className="py-24 bg-gradient-to-r from-brand-blue to-blue-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Trusted by Businesses
            </h2>
            <p className="text-xl text-white/80">
              See what our clients say about our services
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/20 transition-all duration-300 hover-scale shadow-lg">
                <CardContent className="p-8">
                  <div className="flex items-center mb-6">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-brand-green fill-current" />
                    ))}
                  </div>
                  <p className="text-white/90 mb-6 italic leading-relaxed">
                    "{testimonial.text}"
                  </p>
                   <div className="text-sm">
                     <p className="text-white font-semibold">{testimonial.name}</p>
                     <p className="text-brand-green font-medium">{testimonial.position}</p>
                     <p className="text-white/70">{testimonial.company}</p>
                   </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* CA Certification */}
          <div className="text-center">
            <Card className="bg-white/10 backdrop-blur-sm border-white/20 inline-block hover:bg-white/20 transition-all duration-300 hover-scale shadow-lg">
              <CardContent className="p-10">
                <div className="w-20 h-20 bg-brand-green rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                  <Award className="w-10 h-10 text-black" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">
                  CA Certified
                </h3>
                <p className="text-white/80 mb-6 leading-relaxed">
                  Licensed Chartered Accountant with years of expertise
                </p>
                <Button
                  asChild
                  className="bg-brand-green text-black hover:bg-brand-green/90 font-semibold hover-scale"
                >
                  <Link to="/about">Learn More About Our Expertise</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-brand-blue">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-8">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-white/80 mb-12 max-w-2xl mx-auto leading-relaxed">
            Let us handle your tax and accounting needs so you can focus on growing your business.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Button 
              asChild
              size="lg"
              className="bg-brand-green text-black hover:bg-brand-green/90 font-semibold px-8 py-6 text-lg hover-scale shadow-lg"
            >
              <Link to="/contact">Contact Us Today</Link>
            </Button>
            <Button 
              asChild
              size="lg"
              className="bg-brand-green text-black hover:bg-brand-green/90 font-semibold px-8 py-6 text-lg hover-scale shadow-lg"
            >
              <Link to="/about">Learn More About Us</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;

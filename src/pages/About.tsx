
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Link } from 'react-router-dom';
import { 
  Award, 
  Users, 
  Target, 
  Heart,
  Mail,
  Phone,
  MapPin,
  CheckCircle,
  Building
} from 'lucide-react';

const About = () => {
  const values = [
    {
      icon: Target,
      title: "Accuracy",
      description: "We ensure precision in every calculation and report, maintaining the highest standards of accuracy."
    },
    {
      icon: Heart,
      title: "Trust",
      description: "Building lasting relationships through transparency, integrity, and reliable service delivery."
    },
    {
      icon: Users,
      title: "Client Focus",
      description: "Your success is our priority. We tailor our services to meet your unique business needs."
    },
    {
      icon: Award,
      title: "Excellence",
      description: "Committed to delivering exceptional quality in all our professional services and consultations."
    }
  ];

  const teamMembers = [
    {
      name: "CA Sushil Kafle",
      position: "Chairman",
      initials: "SK",
      phone: "+977 9846750524",
      email: "ca.sushilkafle@gmail.com",
      description: "Sushil Kafle brings over 5 years of experience in tax advisory and accounting services to Tax Sathi. As a licensed Chartered Accountant, he specializes in tax compliance and strategic financial planning, guiding businesses across Nepal's industries with innovative and compliant solutions.",
      image: "/lovable-uploads/0e8059b3-cc37-4e5c-b76b-2f1606ec29f5.png",
      achievements: [
        "5+ Years of Professional Experience",
        "100+ Satisfied Clients",
        "Licensed Chartered Accountant",
        "FDI & Foreign Direct Investment Expert",
        "Tax Compliance Specialist",
        "Strategic Financial Planner"
      ]
    },
    {
      name: "Khagendra Chand",
      position: "Director",
      initials: "KC",
      description: "Khagendra Chand offers over 5 years of expertise in financial management and business consulting at Tax Sathi. He excels in corporate financial strategy and client relations, delivering tailored solutions for Nepal's diverse sectors, ensuring operational excellence and client satisfaction.",
      image: "/lovable-uploads/cb335f14-2346-4558-8ec4-a4697af349e8.png",
      achievements: [
        "5+ Years of Professional Experience",
        "100+ Satisfied Clients",
        "Financial Management Expert",
        "Risk Management Specialist",
        "International Investment Expert",
        "Client Relations Specialist",
        "Corporate Strategy Advisor"
      ]
    },
    {
      name: "Sulab Dhunju",
      position: "Executive Director", 
      initials: "SD",
      description: "Sulab Dhunju contributes over 5 years of expertise in strategic oversight and business development to Tax Sathi. He specializes in operational leadership and client engagement, driving innovative financial solutions for Nepal's businesses with vision and precision.",
      image: "/lovable-uploads/93e6419a-89d3-42bf-b5f9-4311c8c3ce1c.png",
      achievements: [
        "5+ Years of Professional Experience",
        "100+ Satisfied Clients",
        "Due Diligence Specialist",
        "Operational Leadership Expert",
        "Business Development Specialist",
        "Client Engagement Expert"
      ]
    }
  ];

  const offices = [
    {
      type: "Head Office",
      location: "Anamanagar, opposite of east gate of Singhadarbar",
      city: "Kathmandu",
      contact: "Anamanagar, opposite of east Singhadarbar gate"
    },
    {
      type: "Branch Office",
      location: "Opposite of tax office",
      city: "Butwal"
    },
    {
      type: "Branch Office", 
      location: "Rambazar, 15",
      city: "Pokhara"
    }
  ];

  return (
    <div className="min-h-screen pt-16">
      {/* Hero Section */}
      <section className="py-24 bg-gradient-to-br from-brand-blue to-blue-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 animate-fade-in">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-8">
              About Tax Sathi
            </h1>
            <p className="text-xl text-white/80 max-w-3xl mx-auto leading-relaxed">
              Your trusted partner for comprehensive tax advisory and accounting services in Nepal
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-24 bg-brand-blue">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-bold text-white mb-8">
                Our Mission
              </h2>
              <p className="text-lg text-white/90 mb-8 leading-relaxed">
                At Tax Sathi Pvt. Ltd., we are dedicated to delivering accurate financial solutions 
                that empower businesses and individuals to achieve their financial goals. Our mission 
                is to provide reliable, professional, and comprehensive tax advisory and accounting 
                services that build lasting relationships with our clients.
              </p>
              <p className="text-lg text-white/90 mb-10 leading-relaxed">
                We believe that where accuracy meets trust, success follows. Our team combines 
                technical expertise with personalized service to ensure your financial needs 
                are met with the highest standards of professionalism.
              </p>
              <Button 
                asChild
                size="lg"
                className="bg-brand-green text-black hover:bg-brand-green/90 font-semibold px-8 py-4 hover-scale shadow-lg"
              >
                <Link to="/services">Explore Our Services</Link>
              </Button>
            </div>
            
            <div className="grid grid-cols-2 gap-8">
              {values.map((value, index) => (
                <Card key={index} className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/20 transition-all duration-300 hover-scale shadow-lg">
                  <CardContent className="p-8 text-center">
                    <div className="w-12 h-12 bg-brand-green rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                      <value.icon className="w-6 h-6 text-black" />
                    </div>
                    <h3 className="text-lg font-semibold text-white mb-4">
                      {value.title}
                    </h3>
                    <p className="text-white/80 text-sm leading-relaxed">
                      {value.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-24 bg-gradient-to-r from-brand-blue to-blue-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-8">
              Meet Our Team
            </h2>
            <p className="text-xl text-white/80">
              Experienced professionals committed to your financial success
            </p>
          </div>

          <div className="max-w-6xl mx-auto space-y-8">
            {teamMembers.map((member, index) => (
              <Card key={index} className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/20 transition-all duration-300 hover-scale shadow-lg">
                <CardContent className="p-10">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                    <div className="text-center md:text-left">
                      <Avatar className="w-32 h-32 mx-auto md:mx-0 mb-8 shadow-lg">
                        <AvatarImage 
                          src={member.image} 
                          alt={member.name}
                          className="object-cover"
                        />
                        <AvatarFallback className="bg-gradient-to-br from-brand-green to-green-400 text-4xl font-bold text-black">
                          {member.initials}
                        </AvatarFallback>
                      </Avatar>
                      <h3 className="text-2xl font-bold text-white mb-3">
                        {member.name}
                      </h3>
                      <p className="text-brand-green font-semibold mb-6">
                        {member.position}
                      </p>
                      
                      {member.phone && member.email && (
                        <div className="space-y-3 mb-8">
                          <div className="flex items-center space-x-3">
                            <Phone className="w-5 h-5 text-brand-green" />
                            <span className="text-white/90">{member.phone}</span>
                          </div>
                          <div className="flex items-center space-x-3">
                            <Mail className="w-5 h-5 text-brand-green" />
                            <span className="text-white/90">{member.email}</span>
                          </div>
                        </div>
                      )}
                    </div>
                    
                    <div>
                      <p className="text-white/90 mb-8 leading-relaxed">
                        {member.description}
                      </p>
                      
                      <div className="space-y-4">
                        {member.achievements.map((achievement, idx) => (
                          <div key={idx} className="flex items-center space-x-3">
                            <CheckCircle className="w-5 h-5 text-brand-green" />
                            <span className="text-white/90">{achievement}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Office Locations */}
      <section className="py-24 bg-brand-blue">
        <div className="container mx-auto px-4">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-8">
              Our Locations
            </h2>
            <p className="text-xl text-white/80">
              Serving clients across Nepal with multiple office locations
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {offices.map((office, index) => (
              <Card key={index} className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/20 transition-all duration-300 hover-scale shadow-lg">
                <CardContent className="p-10 text-center">
                  <div className="w-16 h-16 bg-brand-green rounded-full flex items-center justify-center mx-auto mb-8 shadow-lg">
                    <Building className="w-8 h-8 text-black" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">
                    {office.type}
                  </h3>
                  <h4 className="text-lg font-semibold text-brand-green mb-4">
                    {office.city}
                  </h4>
                  <div className="flex items-center justify-center space-x-3">
                    <MapPin className="w-5 h-5 text-brand-green" />
                    <span className="text-white/90 text-sm">{office.location}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-24 bg-gradient-to-r from-brand-blue to-blue-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-8">
              Why Choose Tax Sathi?
            </h2>
            <p className="text-xl text-white/80 max-w-3xl mx-auto leading-relaxed">
              We combine expertise, technology, and personalized service to deliver exceptional results
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <Card className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/20 transition-all duration-300 hover-scale shadow-lg">
              <CardContent className="p-10 text-center">
                <div className="w-16 h-16 bg-brand-green rounded-full flex items-center justify-center mx-auto mb-8 shadow-lg">
                  <Award className="w-8 h-8 text-black" />
                </div>
                <h3 className="text-xl font-bold text-white mb-6">
                  Professional Excellence
                </h3>
                <p className="text-white/80 leading-relaxed">
                  Licensed professionals with proven expertise in tax and accounting services.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/20 transition-all duration-300 hover-scale shadow-lg">
              <CardContent className="p-10 text-center">
                <div className="w-16 h-16 bg-brand-green rounded-full flex items-center justify-center mx-auto mb-8 shadow-lg">
                  <Users className="w-8 h-8 text-black" />
                </div>
                <h3 className="text-xl font-bold text-white mb-6">
                  Personalized Service
                </h3>
                <p className="text-white/80 leading-relaxed">
                  Tailored solutions that meet your specific business needs and goals.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/20 transition-all duration-300 hover-scale shadow-lg">
              <CardContent className="p-10 text-center">
                <div className="w-16 h-16 bg-brand-green rounded-full flex items-center justify-center mx-auto mb-8 shadow-lg">
                  <Target className="w-8 h-8 text-black" />
                </div>
                <h3 className="text-xl font-bold text-white mb-6">
                  Results Driven
                </h3>
                <p className="text-white/80 leading-relaxed">
                  Focused on delivering measurable results that contribute to your success.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-brand-blue">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-8">
            Let's Work Together
          </h2>
          <p className="text-xl text-white/80 mb-12 max-w-2xl mx-auto leading-relaxed">
            Ready to experience the difference professional tax and accounting services can make?
          </p>
          <Button 
            asChild
            size="lg"
            className="bg-brand-green text-black hover:bg-brand-green/90 font-semibold px-8 py-6 text-lg hover-scale shadow-lg"
          >
            <Link to="/contact">Get in Touch Today</Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default About;

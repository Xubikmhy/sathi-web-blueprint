
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
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
  ArrowRight,
  CheckCircle
} from 'lucide-react';

const Services = () => {
  const services = [
    {
      icon: Calculator,
      title: "Bookkeeping",
      description: "Comprehensive bookkeeping services to maintain accurate financial records for your business. We handle daily transactions, categorize expenses, and ensure your books are always up-to-date and compliant with accounting standards.",
      features: ["Daily transaction recording", "Expense categorization", "Account reconciliation", "Monthly financial summaries"],
      benefits: "Save time and ensure accuracy with professional bookkeeping that provides clear insights into your business performance."
    },
    {
      icon: FileText,
      title: "Financial Statement Preparation",
      description: "Professional preparation of comprehensive financial statements including balance sheets, income statements, and cash flow statements. Our detailed reports provide valuable insights for decision-making and compliance requirements.",
      features: ["Balance sheet preparation", "Income statement analysis", "Cash flow statements", "Notes to financial statements"],
      benefits: "Get professionally prepared financial statements that meet regulatory requirements and support business decisions."
    },
    {
      icon: Users,
      title: "Payroll Processing",
      description: "Efficient and accurate payroll processing services ensuring timely salary payments, tax compliance, and proper documentation. We handle all aspects of payroll management from calculation to distribution.",
      features: ["Salary calculations", "Tax deductions", "EPF/CIT compliance", "Payroll reports"],
      benefits: "Ensure accurate and timely payroll processing while maintaining full compliance with labor laws and tax regulations."
    },
    {
      icon: TrendingUp,
      title: "Budgeting and Forecasting",
      description: "Strategic financial planning services including budget preparation, variance analysis, and financial forecasting. We help you plan for growth and make informed financial decisions for your business future.",
      features: ["Annual budget preparation", "Monthly variance analysis", "Cash flow forecasting", "Financial planning"],
      benefits: "Make informed business decisions with comprehensive budgeting and forecasting that drives growth and profitability."
    },
    {
      icon: DollarSign,
      title: "Accounts Payable/Receivable Management",
      description: "Streamlined management of your business cash flow through efficient accounts payable and receivable processes. We optimize your working capital and improve cash flow management.",
      features: ["Invoice management", "Payment processing", "Credit control", "Aging reports"],
      benefits: "Improve cash flow and reduce bad debts with professional accounts management that optimizes your working capital."
    },
    {
      icon: PieChart,
      title: "Bank Reconciliation",
      description: "Accurate matching of your bank records with financial statements to ensure data integrity and identify discrepancies. Regular reconciliation helps maintain accurate financial records.",
      features: ["Monthly bank reconciliation", "Discrepancy identification", "Error correction", "Financial accuracy assurance"],
      benefits: "Maintain accurate financial records and catch errors early with regular professional bank reconciliation services."
    },
    {
      icon: Shield,
      title: "Tax Advisory",
      description: "Expert guidance on tax compliance, planning, and optimization strategies. We help you navigate complex tax regulations while minimizing liabilities and ensuring full compliance with tax laws.",
      features: ["Tax compliance review", "Tax optimization strategies", "Regulatory updates", "Tax risk assessment"],
      benefits: "Stay compliant and minimize tax liabilities with expert advisory services that keep you informed of regulatory changes."
    },
    {
      icon: Award,
      title: "Tax Planning",
      description: "Proactive tax planning services to minimize tax liabilities and maximize savings through strategic planning and timing of financial decisions. We develop customized tax strategies for your specific situation.",
      features: ["Strategic tax planning", "Investment advice", "Deduction optimization", "Tax-efficient structuring"],
      benefits: "Maximize tax savings and optimize your financial position with strategic tax planning tailored to your specific needs."
    }
  ];

  return (
    <div className="min-h-screen pt-16">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-brand-blue to-blue-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 animate-fade-in">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
              Our Services
            </h1>
            <p className="text-xl text-white/80 max-w-3xl mx-auto">
              Comprehensive tax and accounting solutions designed to support your business growth and financial success
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 bg-brand-blue">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <Card 
                key={index} 
                className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/20 transition-all duration-300 hover-scale group"
              >
                <CardContent className="p-8">
                  <div className="flex items-start space-x-4">
                    <div className="w-16 h-16 bg-brand-green rounded-full flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                      <service.icon className="w-8 h-8 text-black" />
                    </div>
                    
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-white mb-3">
                        {service.title}
                      </h3>
                      <p className="text-white/90 mb-4 leading-relaxed">
                        {service.description}
                      </p>
                      
                      <div className="mb-4">
                        <h4 className="text-brand-green font-semibold mb-2">Key Features:</h4>
                        <ul className="space-y-1">
                          {service.features.map((feature, featureIndex) => (
                            <li key={featureIndex} className="flex items-center space-x-2 text-white/80 text-sm">
                              <CheckCircle className="w-4 h-4 text-brand-green flex-shrink-0" />
                              <span>{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <div className="bg-white/5 rounded-lg p-4 mb-4">
                        <p className="text-white/90 text-sm italic">
                          <strong className="text-brand-green">Benefit:</strong> {service.benefits}
                        </p>
                      </div>
                      
                      <Button 
                        asChild
                        className="bg-brand-green text-black hover:bg-brand-green/90 font-medium group"
                      >
                        <Link to="/contact" className="flex items-center space-x-2">
                          <span>Learn More</span>
                          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </Link>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-gradient-to-r from-brand-blue to-blue-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Our Process
            </h2>
            <p className="text-xl text-white/80 max-w-3xl mx-auto">
              A structured approach to delivering exceptional results
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              {
                step: "01",
                title: "Consultation",
                description: "We start with understanding your specific needs and business requirements."
              },
              {
                step: "02",
                title: "Planning",
                description: "Develop a customized strategy tailored to your financial goals and objectives."
              },
              {
                step: "03",
                title: "Implementation",
                description: "Execute the plan with precision, maintaining regular communication throughout."
              },
              {
                step: "04",
                title: "Monitoring",
                description: "Continuous monitoring and optimization to ensure sustained success and compliance."
              }
            ].map((process, index) => (
              <Card key={index} className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/20 transition-all duration-300">
                <CardContent className="p-6 text-center">
                  <div className="text-4xl font-bold text-brand-green mb-4">
                    {process.step}
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-3">
                    {process.title}
                  </h3>
                  <p className="text-white/80 text-sm">
                    {process.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-brand-blue">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
            Let us help you streamline your financial processes and achieve your business goals with our professional services.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              asChild
              size="lg"
              className="bg-brand-green text-black hover:bg-brand-green/90 font-semibold px-8 py-6 text-lg hover-scale"
            >
              <Link to="/contact">Contact Us Today</Link>
            </Button>
            <Button 
              asChild
              variant="outline"
              size="lg"
              className="border-white text-white hover:bg-white hover:text-brand-blue px-8 py-6 text-lg"
            >
              <Link to="/about">Learn About Our Team</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;

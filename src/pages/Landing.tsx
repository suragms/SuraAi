import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Sparkles, Zap, Brain, MessageCircle, Shield, Users, Star } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import suraLogo from '@/assets/sura-ai-logo.png';

const Landing = () => {
  const navigate = useNavigate();
  const [isLogoVisible, setIsLogoVisible] = useState(false);
  const [isContentVisible, setIsContentVisible] = useState(false);

  useEffect(() => {
    // Animate logo entrance
    const timer1 = setTimeout(() => setIsLogoVisible(true), 100);
    const timer2 = setTimeout(() => setIsContentVisible(true), 800);
    
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  const features = [
    {
      icon: <Brain className="h-6 w-6" />,
      title: "Advanced AI",
      description: "Powered by cutting-edge language models for intelligent conversations"
    },
    {
      icon: <MessageCircle className="h-6 w-6" />,
      title: "Smart Chat",
      description: "Context-aware conversations that remember your preferences"
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: "Secure & Private",
      description: "Your conversations are protected with enterprise-grade security"
    },
    {
      icon: <Users className="h-6 w-6" />,
      title: "Multi-User",
      description: "Support for multiple chat sessions and user management"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-secondary/10 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Header */}
        <header className="flex items-center justify-between mb-16">
          <div className="flex items-center gap-3">
            <img 
              src={suraLogo} 
              alt="Sura AI" 
              className="w-10 h-10 rounded-lg shadow-lg" 
            />
            <span className="text-xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              Sura AI
            </span>
          </div>
          
          <div className="flex items-center gap-4">
            <Badge variant="secondary" className="hidden sm:flex items-center gap-2">
              <Sparkles className="h-3 w-3" />
              AI Powered
            </Badge>
          </div>
        </header>

        {/* Hero Section */}
        <main className="text-center mb-20">
          {/* Animated Logo */}
          <div className="flex justify-center mb-8">
            <div 
              className={`relative transition-all duration-1000 ease-out ${
                isLogoVisible ? 'scale-100 opacity-100' : 'scale-75 opacity-0'
              }`}
            >
              <div className="relative">
                <img 
                  src={suraLogo} 
                  alt="Sura AI Logo" 
                  className="w-32 h-32 rounded-2xl shadow-2xl animate-float" 
                />
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-primary/20 to-secondary/20 animate-pulse" />
                <div className="absolute -inset-4 rounded-3xl bg-gradient-to-r from-primary/10 to-secondary/10 blur-xl animate-pulse delay-500" />
              </div>
              
              {/* Floating particles around logo */}
              <div className="absolute -top-2 -right-2 w-3 h-3 bg-primary rounded-full animate-bounce delay-100" />
              <div className="absolute -bottom-2 -left-2 w-2 h-2 bg-secondary rounded-full animate-bounce delay-300" />
              <div className="absolute top-1/2 -right-4 w-2 h-2 bg-accent rounded-full animate-bounce delay-500" />
            </div>
          </div>

          {/* Hero Content */}
          <div 
            className={`transition-all duration-1000 ease-out delay-300 ${
              isContentVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
            }`}
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-foreground via-primary to-foreground bg-clip-text text-transparent leading-tight">
              Your AI
              <br />
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Companion
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
              Experience the future of AI conversation with Sura AI. 
              Intelligent, secure, and always ready to help.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <Button 
                size="lg" 
                onClick={() => navigate('/chat')}
                className="group text-lg px-8 py-6 bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Start Chatting
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              
              <Button 
                variant="outline" 
                size="lg"
                className="text-lg px-8 py-6 border-2 hover:bg-accent/50 transition-all duration-300 relative overflow-hidden group"
                disabled
              >
                <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-secondary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="relative flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                  <span>Sura AI Pro</span>
                </div>
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-2xl mx-auto">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">10M+</div>
                <div className="text-muted-foreground">Conversations</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-secondary mb-2">99.9%</div>
                <div className="text-muted-foreground">Uptime</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-accent mb-2">24/7</div>
                <div className="text-muted-foreground">Support</div>
              </div>
            </div>
          </div>
        </main>

        {/* Features Section */}
        <section className="mb-20">
          <div 
            className={`transition-all duration-1000 ease-out delay-500 ${
              isContentVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
            }`}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 bg-gradient-to-r from-foreground to-primary bg-clip-text text-transparent">
              Why Choose Sura AI?
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {features.map((feature, index) => (
                <Card 
                  key={index}
                  className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-0 bg-card/50 backdrop-blur-sm"
                >
                  <CardHeader className="text-center pb-4">
                    <div className="mx-auto w-12 h-12 rounded-lg bg-gradient-to-r from-primary/10 to-secondary/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <div className="text-primary group-hover:text-secondary transition-colors">
                        {feature.icon}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="text-center">
                    <CardTitle className="text-lg mb-2">{feature.title}</CardTitle>
                    <CardDescription className="text-sm leading-relaxed">
                      {feature.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Founder Section */}
        <section className="mb-20">
          <div 
            className={`transition-all duration-1000 ease-out delay-600 ${
              isContentVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
            }`}
          >
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-foreground to-primary bg-clip-text text-transparent">
                Meet the Founder
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Behind every great innovation lies a visionary mind
              </p>
            </div>
            
            <div className="max-w-4xl mx-auto">
              <Card className="bg-gradient-to-r from-primary/5 to-secondary/5 border-0 backdrop-blur-sm overflow-hidden group hover:shadow-2xl transition-all duration-500">
                <div className="relative">
                  {/* Background decorative elements */}
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-secondary/5 opacity-50" />
                  <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl group-hover:bg-primary/20 transition-all duration-500" />
                  <div className="absolute bottom-0 left-0 w-32 h-32 bg-secondary/10 rounded-full blur-3xl group-hover:bg-secondary/20 transition-all duration-500" />
                  
                  <CardContent className="relative z-10 p-12">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
                      {/* Founder Profile Image with Animated Border */}
                      <div className="flex justify-center lg:justify-start">
                        <div className="relative">
                          {/* Animated Border Ring */}
                          <div className="absolute -inset-4 rounded-full bg-gradient-to-r from-primary via-secondary to-primary animate-spin-slow opacity-75 blur-sm" />
                          <div className="absolute -inset-2 rounded-full bg-gradient-to-r from-primary via-secondary to-primary animate-spin-slow opacity-50" />
                          <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-primary via-secondary to-primary animate-spin-slow opacity-25" />
                          
                          {/* Profile Image Container */}
                          <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-background shadow-2xl group-hover:scale-105 transition-transform duration-500">
                            <img 
                              src="https://media.licdn.com/dms/image/v2/D5603AQGfl_w7HEkPFQ/profile-displayphoto-scale_400_400/B56ZgmrzbAG0Ag-/0/1752995676420?e=1759363200&v=beta&t=wWvpuZ9Ujh63vH5XW9Nmeio_ELV0hcT0_oaUj-Jy3M4"
                              alt="Surag - Founder of Sura AI"
                              className="w-full h-full object-cover"
                            />
                            
                            {/* Image Overlay on Hover */}
                            <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                          </div>
                          
                          {/* Status Indicator */}
                          <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-accent rounded-full flex items-center justify-center border-4 border-background shadow-lg">
                            <div className="w-3 h-3 bg-primary rounded-full animate-pulse" />
                          </div>
                          
                          {/* Floating Particles */}
                          <div className="absolute -top-3 -left-3 w-2 h-2 bg-primary rounded-full animate-bounce delay-100" />
                          <div className="absolute -top-2 -right-2 w-1.5 h-1.5 bg-secondary rounded-full animate-bounce delay-300" />
                          <div className="absolute -bottom-3 -right-3 w-1 h-1 bg-accent rounded-full animate-bounce delay-500" />
                        </div>
                      </div>
                      
                      {/* Founder Information */}
                      <div className="lg:col-span-2 text-center lg:text-left">
                        <div className="mb-4">
                          <h3 className="text-2xl md:text-3xl font-bold mb-2 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                            Surag
                          </h3>
                          <p className="text-xl text-muted-foreground font-medium">
                            Founder & CEO
                          </p>
                          <p className="text-lg text-primary font-semibold">
                            Sura AI
                          </p>
                        </div>
                        
                        <div className="space-y-4 text-muted-foreground leading-relaxed">
                          <p className="text-base">
                            A passionate technologist and AI enthusiast, Surag envisioned a future where artificial intelligence 
                            becomes an accessible companion for everyone. With deep expertise in machine learning and user experience design, 
                            he founded Sura AI to bridge the gap between cutting-edge AI technology and everyday human interaction.
                          </p>
                          
                          <p className="text-base">
                            Under Surag's leadership, Sura AI has evolved from a concept to a powerful platform that empowers 
                            users to engage with AI in meaningful, productive conversations. His commitment to innovation, 
                            security, and user privacy drives every aspect of the platform's development.
                          </p>
                          
                          <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-lg p-4 border border-primary/20">
                            <div className="flex items-center gap-3 mb-2">
                              <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                              <span className="text-sm font-semibold text-primary">Technical Innovation</span>
                            </div>
                            <p className="text-sm text-muted-foreground">
                              <strong>Gemini API Integration:</strong> Sura AI leverages Google's advanced Gemini API to enhance 
                              thinking power and provide more intelligent, context-aware responses. This integration enables 
                              superior reasoning capabilities and more natural conversational experiences.
                            </p>
                          </div>
                        </div>
                        
                        {/* Founder Stats */}
                        <div className="grid grid-cols-3 gap-6 mt-8 pt-6 border-t border-border/20">
                          <div className="text-center">
                            <div className="text-2xl font-bold text-primary mb-1">5+</div>
                            <div className="text-sm text-muted-foreground">Years Experience</div>
                          </div>
                          <div className="text-center">
                            <div className="text-2xl font-bold text-secondary mb-1">10+</div>
                            <div className="text-sm text-muted-foreground">Projects Delivered</div>
                          </div>
                          <div className="text-center">
                            <div className="text-2xl font-bold text-accent mb-1">AI + FS</div>
                            <div className="text-sm text-muted-foreground">AI Specialization + Full Stack Developer</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </div>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="text-center mb-20">
          <div 
            className={`transition-all duration-1000 ease-out delay-700 ${
              isContentVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
            }`}
          >
            <Card className="bg-gradient-to-r from-primary/10 to-secondary/10 border-0 backdrop-blur-sm">
              <CardContent className="py-16">
                <h3 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-foreground to-primary bg-clip-text text-transparent">
                  Ready to Get Started?
                </h3>
                <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                  Join thousands of users who are already experiencing the power of AI conversation.
                </p>
                <Button 
                  size="lg" 
                  onClick={() => navigate('/chat')}
                  className="text-lg px-8 py-6 bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <Star className="mr-2 h-5 w-5" />
                  Start Your Journey
                </Button>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Footer */}
        <footer className="text-center py-8 border-t border-border/20">
          <div className="flex items-center justify-center gap-3 mb-4">
            <img src={suraLogo} alt="Sura AI" className="w-6 h-6 rounded" />
            <span className="text-sm text-muted-foreground font-medium">
              © 2025 Surag Artificial Intelligence 'Sura AI'
            </span>
          </div>
          <div className="flex items-center justify-center gap-6 text-sm text-muted-foreground">
            <span className="font-medium text-primary">Powered by Surag Dev Studio</span>
            <span className="cursor-pointer hover:text-foreground transition-colors">Privacy</span>
            <span className="cursor-pointer hover:text-foreground transition-colors">Terms</span>
            <span className="cursor-pointer hover:text-foreground transition-colors">Support</span>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Landing;

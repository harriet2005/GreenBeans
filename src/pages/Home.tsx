import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight, Users, Trophy, TrendingUp, Leaf, Target, Globe, Heart, CheckCircle2 } from "lucide-react";
import heroBackground from "@/assets/hero-background.jpg";
import communityImage from "@/assets/community-image.jpg";

export default function Home() {
  const features = [
    {
      icon: Users,
      title: "Join Environmental Clubs",
      description: "Connect with local clubs focused on sustainability and environmental action",
    },
    {
      icon: TrendingUp,
      title: "Activity Feed",
      description: "Stay updated with projects, challenges, and community activities",
    },
    {
      icon: Trophy,
      title: "Earn Rewards",
      description: "Complete challenges and earn badges for your environmental impact",
    },
  ];

  const stats = [
    { value: "500+", label: "Active Members" },
    { value: "50+", label: "Environmental Clubs" },
    { value: "200+", label: "Projects Completed" },
  ];

  const impactStats = [
    { value: "2.5K", label: "Trees Planted", icon: Leaf },
    { value: "15K", label: "Volunteer Hours", icon: Heart },
    { value: "30+", label: "Communities Reached", icon: Globe },
  ];

  const benefits = [
    "Connect with like-minded youth activists",
    "Access exclusive environmental projects",
    "Track your environmental impact",
    "Earn recognition and badges",
  ];

  return (
    <div className="pb-20 md:pb-0">
      {/* Hero Section with Background Image */}
      <section className="relative overflow-hidden min-h-[600px] md:min-h-[700px] flex items-center">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${heroBackground})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-primary/90 via-primary/70 to-accent/80"></div>
        </div>
        
        <div className="container relative px-4 mx-auto py-20 md:py-32">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
              <Leaf className="h-4 w-4 text-white" />
              <span className="text-sm font-medium text-white">Youth Environmental Community</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
              Transform Your World Through 
              <span className="block mt-2 italic font-light">Environmental Action</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-white/95 mb-10 leading-relaxed">
              Join GreenBeans to connect with environmental clubs, participate in sustainability projects, and make a real impact on our planet.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/auth">
                <Button size="lg" className="bg-white text-primary hover:bg-white/90 font-semibold text-lg px-8 py-6 h-auto shadow-lg">
                  Get Started Free
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link to="/clubs">
                <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white/10 font-semibold text-lg px-8 py-6 h-auto">
                  Explore Clubs
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="bg-white dark:bg-card border-b">
        <div className="container px-4 mx-auto py-12">
          <div className="grid grid-cols-3 gap-8 max-w-4xl mx-auto">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-primary mb-2">{stat.value}</div>
                <div className="text-sm md:text-base text-muted-foreground font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-background">
        <div className="container px-4 mx-auto">
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Everything You Need to 
              <span className="block mt-2 text-primary italic font-light">Make an Impact</span>
            </h2>
            <p className="text-xl text-muted-foreground">
              GreenBeans provides all the tools and community support to drive environmental change
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card 
                  key={index} 
                  className="p-8 hover:shadow-xl transition-all duration-300 border-2 hover:border-primary/30 group"
                >
                  <div className="h-16 w-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                    <Icon className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-2xl font-bold mb-3 text-foreground">{feature.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Impact Section with Image */}
      <section className="py-24 bg-secondary/30">
        <div className="container px-4 mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
            <div className="order-2 md:order-1">
              <img 
                src={communityImage} 
                alt="Students collaborating on environmental projects" 
                className="rounded-2xl shadow-2xl w-full"
              />
            </div>
            <div className="order-1 md:order-2">
              <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
                Building a Sustainable 
                <span className="block mt-2 text-primary italic font-light">Future Together</span>
              </h2>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                Join thousands of young environmental leaders who are making a difference in their communities through collaborative action and shared commitment to our planet.
              </p>
              
              <div className="space-y-4 mb-8">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <CheckCircle2 className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-foreground font-medium">{benefit}</span>
                  </div>
                ))}
              </div>

              <Link to="/auth">
                <Button size="lg" className="font-semibold text-lg px-8 py-6 h-auto">
                  Join Our Community
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Impact Stats */}
      <section className="py-24 bg-background">
        <div className="container px-4 mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Our Collective <span className="text-primary italic font-light">Impact</span>
          </h2>
          <p className="text-xl text-muted-foreground mb-16 max-w-2xl mx-auto">
            Together, we're creating measurable change for our environment
          </p>

          <div className="grid md:grid-cols-3 gap-12 max-w-4xl mx-auto">
            {impactStats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className="text-center">
                  <div className="h-20 w-20 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-6">
                    <Icon className="h-10 w-10 text-primary" />
                  </div>
                  <div className="text-5xl font-bold text-primary mb-2">{stat.value}</div>
                  <div className="text-lg text-muted-foreground font-medium">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-br from-primary to-accent relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzRjMC0yLjIwOS0xLjc5MS00LTQtNHMtNCAxLjc5MS00IDQgMS43OTEgNCA0IDQgNC0xLjc5MSA0LTR6bTAtMzBjMC0yLjIwOS0xLjc5MS00LTQtNHMtNCAxLjc5MS00IDQgMS43OTEgNCA0IDQgNC0xLjc5MSA0LTR6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-20"></div>
        
        <div className="container px-4 mx-auto text-center relative">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Start Your 
            <span className="block mt-2 italic font-light">Environmental Journey?</span>
          </h2>
          <p className="text-xl text-white/95 mb-10 max-w-2xl mx-auto">
            Join thousands of young people making a difference in their communities
          </p>
          <Link to="/auth">
            <Button size="lg" className="bg-white text-primary hover:bg-white/90 font-semibold text-lg px-8 py-6 h-auto shadow-xl">
              Join GreenBeans Today
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}

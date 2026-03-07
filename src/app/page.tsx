
"use client";

import { AuthProvider } from "@/components/auth/auth-context";
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/layout/app-sidebar";
import { ChatContainer } from "@/components/chat/chat-container";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { 
  Bot, 
  Sparkles, 
  MessageSquare, 
  Mic, 
  ArrowRight,
  ImageIcon,
  LayoutGrid,
  Settings,
  Sun,
  Moon,
  AlertCircle,
  Send,
  User,
  Phone,
  Mail,
  MessageCircle,
  ThumbsUp,
  UserCircle,
  LogIn,
  UserPlus,
  Lock,
  Mail as MailIcon
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { Toaster } from "@/components/ui/toaster";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

function LandingPage({ onEnterApp }: { onEnterApp: () => void }) {
  const { toast } = useToast();
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [currentTheme, setCurrentTheme] = useState<'light' | 'dark'>('dark');

  useEffect(() => {
    const isDark = document.documentElement.classList.contains('dark');
    setCurrentTheme(isDark ? 'dark' : 'light');
  }, []);

  const setTheme = (theme: 'light' | 'dark') => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    setCurrentTheme(theme);
  };

  const handlePendingClick = (e: React.MouseEvent, section: string) => {
    e.preventDefault();
    toast({
      className: "bg-white text-red-600 border-red-100 py-2 px-4 shadow-xl min-h-0 h-10 flex items-center justify-center",
      description: (
        <div className="flex items-center gap-2 text-[10px] font-bold whitespace-nowrap uppercase tracking-wider">
          <AlertCircle size={14} className="shrink-0" />
          <span>Work on {section} section is currently pending</span>
        </div>
      ),
    });
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Message Sent",
      description: "Thank you for reaching out! We'll get back to you soon.",
    });
    (e.target as HTMLFormElement).reset();
  };

  const handleAuthAction = (e?: React.FormEvent | React.MouseEvent) => {
    e?.preventDefault();
    setIsAuthModalOpen(false);
    onEnterApp();
  };

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary/30 scroll-smooth">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-xl border-b border-border/50">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <a href="/" className="flex items-center gap-2 font-black text-2xl tracking-tighter text-primary hover:opacity-80 transition-opacity">
             <div className="h-8 w-8 bg-primary rounded-lg flex items-center justify-center text-primary-foreground">N</div>
             <span>NOVA</span>
          </a>
          <div className="hidden lg:flex items-center gap-8 text-sm font-medium text-muted-foreground">
            <a href="/" className="hover:text-primary transition-colors">Home</a>
            <a href="#about" onClick={(e) => handlePendingClick(e, "About")} className="hover:text-primary transition-colors">About</a>
            <a href="#features" className="hover:text-primary transition-colors">Features</a>
            <a href="#security" onClick={(e) => handlePendingClick(e, "Security")} className="hover:text-primary transition-colors">Security</a>
            <a href="#pricing" onClick={(e) => handlePendingClick(e, "Pricing")} className="hover:text-primary transition-colors">Pricing</a>
            <a href="#contacts" className="hover:text-primary transition-colors">Contacts</a>
          </div>
          <div className="flex items-center gap-3">
            <Button 
              onClick={() => setIsSettingsModalOpen(true)} 
              variant="ghost" 
              size="icon" 
              className="rounded-full text-muted-foreground hover:text-primary"
            >
              <Settings size={20} />
            </Button>
            <Button 
              onClick={() => setIsAuthModalOpen(true)} 
              variant="ghost" 
              size="icon" 
              className="rounded-full h-10 w-10 text-primary hover:bg-primary/10 transition-colors"
              title="Sign In"
            >
              <UserCircle size={24} />
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-40 pb-20 px-4">
        <div className="max-w-5xl mx-auto text-center space-y-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-bold tracking-widest uppercase border border-primary/20 animate-in fade-in slide-in-from-bottom-4 duration-1000">
            <Sparkles size={14} />
            The Future of Personal Intelligence
          </div>
          <h1 className="text-[56px] md:text-[92px] font-black font-headline leading-[1] tracking-tighter animate-in fade-in slide-in-from-bottom-6 duration-1000 delay-150 cursor-default drop-shadow-[0_0_20px_rgba(var(--primary),0.5)] hover:scale-[1.02] transition-all duration-300">
            Meet Nova, Your <span className="text-primary italic">Universal</span> Assistant.
          </h1>
          <p className="text-[20px] md:text-[20px] text-muted-foreground leading-relaxed max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-300">
            Nova AI combines next-generation reasoning with seamless voice interaction, image generation, and a powerful suite of productivity tools. Experience intelligence that actually understands you.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-in fade-in slide-in-from-bottom-10 duration-1000 delay-500">
            <Button onClick={() => setIsAuthModalOpen(true)} size="lg" className="h-14 px-8 rounded-2xl text-lg font-bold shadow-xl shadow-primary/25 hover:scale-[1.03] transition-transform">
              Get Started for Free
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button variant="outline" size="lg" className="h-14 px-8 rounded-2xl text-lg font-bold border-2 hover:bg-muted/50">
              How it works
            </Button>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="py-24 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-3xl md:text-5xl font-black font-headline">Intelligence Without Limits</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
              Designed for speed, versatility, and true human-like interaction.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <FeatureCard 
              icon={<ImageIcon className="text-accent" />}
              title="AI Image Generator"
              description="Turn text into stunning visuals. From photorealistic renders to abstract art, Nova creates in seconds."
              accentColor="bg-accent/10"
              onClick={() => setIsAuthModalOpen(true)}
            />
            <FeatureCard 
              icon={<MessageSquare className="text-primary" />}
              title="AI Chat System"
              description="Deep reasoning and instant answers. Engage with an assistant that remembers context and nuance."
              accentColor="bg-primary/10"
              onClick={() => setIsAuthModalOpen(true)}
            />
            <FeatureCard 
              icon={<Mic className="text-orange-500" />}
              title="Voice Assistant"
              description="Natural, expressive voice interaction. Nova listens carefully and responds with high-fidelity speech."
              accentColor="bg-orange-500/10"
              onClick={() => setIsAuthModalOpen(true)}
            />
            <FeatureCard 
              icon={<LayoutGrid className="text-purple-500" />}
              title="AI Tools Section"
              description="A powerhouse of productivity. Code generation, document analysis, and data extraction at your fingertips."
              accentColor="bg-purple-500/10"
              onClick={() => setIsAuthModalOpen(true)}
            />
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contacts" className="py-24 px-4 relative overflow-hidden">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-3xl md:text-5xl font-black font-headline tracking-tight">Connect with Us</h2>
            <p className="text-muted-foreground text-lg">
              Have questions or feedback? We'd love to hear from you.
            </p>
          </div>

          <div className="bg-card border border-border/50 rounded-[2.5rem] p-8 md:p-12 shadow-2xl relative">
            <div className="absolute top-0 right-0 p-8 text-primary/10 -z-10">
              <MessageCircle size={120} />
            </div>
            
            <form onSubmit={handleContactSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
                    <User size={14} className="text-primary" /> Full Name
                  </Label>
                  <Input id="name" required placeholder="John Doe" className="h-12 rounded-xl bg-background border-2 focus:border-primary transition-all" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
                    <Phone size={14} className="text-primary" /> Phone Number
                  </Label>
                  <Input id="phone" type="tel" placeholder="+1 (555) 000-0000" className="h-12 rounded-xl bg-background border-2 focus:border-primary transition-all" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
                  <Mail size={14} className="text-primary" /> Email Address
                </Label>
                <Input id="email" type="email" required placeholder="john@example.com" className="h-12 rounded-xl bg-background border-2 focus:border-primary transition-all" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="issues" className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
                  <AlertCircle size={14} className="text-primary" /> Describe your Issues
                </Label>
                <Textarea id="issues" placeholder="What's on your mind?" className="min-h-[120px] rounded-xl bg-background border-2 focus:border-primary transition-all resize-none" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="experience" className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
                  <ThumbsUp size={14} className="text-primary" /> Your Experience
                </Label>
                <Textarea id="experience" placeholder="Tell us about your experience with Nova..." className="min-h-[100px] rounded-xl bg-background border-2 focus:border-primary transition-all resize-none" />
              </div>

              <Button type="submit" className="w-full h-14 rounded-2xl text-lg font-bold shadow-xl shadow-primary/20 hover:scale-[1.01] transition-transform flex items-center justify-center gap-2">
                Send Message
                <Send size={18} />
              </Button>
            </form>
          </div>
        </div>
      </section>

      {/* Auth Modal */}
      <Dialog open={isAuthModalOpen} onOpenChange={setIsAuthModalOpen}>
        <DialogContent className="sm:max-w-[440px] rounded-[2.5rem] p-0 overflow-hidden border-none shadow-2xl">
          <div className="p-8 space-y-8 bg-card">
            <DialogHeader className="space-y-4">
              <div className="flex justify-center">
                <div className="h-16 w-16 bg-primary/10 rounded-2xl flex items-center justify-center text-primary animate-pulse">
                  <Bot size={36} />
                </div>
              </div>
              <DialogTitle className="text-3xl font-black text-center tracking-tight">Welcome to Nova</DialogTitle>
              <DialogDescription className="text-center text-base">
                Experience the next generation of personal AI.
              </DialogDescription>
            </DialogHeader>

            <div className="flex flex-col gap-8">
              {/* Login Option */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-primary/60">
                  <LogIn size={14} /> Log In to your account
                </div>
                <form onSubmit={handleAuthAction} className="space-y-3">
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input placeholder="Username" className="h-12 pl-10 rounded-xl bg-muted/30 border-none focus-visible:ring-2 focus-visible:ring-primary/50" />
                  </div>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input type="password" placeholder="Password" className="h-12 pl-10 rounded-xl bg-muted/30 border-none focus-visible:ring-2 focus-visible:ring-primary/50" />
                  </div>
                  <Button type="submit" className="w-full h-12 rounded-xl font-bold shadow-lg shadow-primary/10 hover:scale-[1.02] transition-transform">
                    Log In
                  </Button>
                </form>
              </div>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <Separator className="w-full" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-card px-3 text-muted-foreground font-bold">OR</span>
                </div>
              </div>

              {/* Sign Up Option */}
              <div className="space-y-4 pb-2">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-primary/60">
                  <UserPlus size={14} /> New here? Sign Up
                </div>
                <Button 
                  variant="outline"
                  onClick={handleAuthAction}
                  className="w-full h-14 rounded-xl flex items-center justify-center gap-3 font-bold border-2 hover:bg-muted/50 hover:scale-[1.02] transition-transform"
                >
                  <svg className="h-5 w-5" viewBox="0 0 24 24">
                    <path
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      fill="#4285F4"
                    />
                    <path
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      fill="#34A853"
                    />
                    <path
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                      fill="#FBBC05"
                    />
                    <path
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                      fill="#EA4335"
                    />
                  </svg>
                  Continue with Google
                </Button>
              </div>
            </div>
          </div>
          <div className="p-4 bg-muted/30 border-t flex justify-center">
            <p className="text-[10px] text-muted-foreground font-medium uppercase tracking-tighter">
              By continuing, you agree to Nova's Terms & Privacy
            </p>
          </div>
        </DialogContent>
      </Dialog>

      {/* Settings Modal */}
      <Dialog open={isSettingsModalOpen} onOpenChange={setIsSettingsModalOpen}>
        <DialogContent className="sm:max-w-[400px] rounded-[2rem] p-8">
          <DialogHeader className="space-y-4 mb-6">
            <div className="flex justify-center">
              <div className="h-12 w-12 bg-muted rounded-2xl flex items-center justify-center text-primary">
                <Settings size={28} />
              </div>
            </div>
            <DialogTitle className="text-2xl font-black text-center">Appearance</DialogTitle>
            <DialogDescription className="text-center">
              Customize how Nova looks on your screen.
            </DialogDescription>
          </DialogHeader>
          <div className="grid grid-cols-2 gap-4">
            <Button 
              variant={currentTheme === 'light' ? 'default' : 'outline'}
              onClick={() => setTheme('light')}
              className="h-24 rounded-2xl flex flex-col gap-2 font-bold border-2"
            >
              <Sun size={24} />
              Day Mode
            </Button>
            <Button 
              variant={currentTheme === 'dark' ? 'default' : 'outline'}
              onClick={() => setTheme('dark')}
              className="h-24 rounded-2xl flex flex-col gap-2 font-bold border-2"
            >
              <Moon size={24} />
              Night Mode
            </Button>
          </div>
          <Button 
            variant="ghost" 
            onClick={() => setIsSettingsModalOpen(false)}
            className="mt-6 w-full rounded-xl font-bold"
          >
            Close
          </Button>
        </DialogContent>
      </Dialog>

      {/* Footer */}
      <footer className="py-12 border-t mt-12">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-8">
          <a href="/" className="flex items-center gap-2 font-black text-xl text-primary opacity-50 hover:opacity-100 transition-opacity">
             <div className="h-6 w-6 bg-primary rounded flex items-center justify-center text-primary-foreground">N</div>
             <span>NOVA</span>
          </a>
          <div className="flex gap-8 text-sm text-muted-foreground">
            <a href="#" className="hover:text-primary transition-colors">Twitter</a>
            <a href="#" className="hover:text-primary transition-colors">GitHub</a>
            <a href="#" className="hover:text-primary transition-colors">Privacy</a>
            <a href="#" className="hover:text-primary transition-colors">Terms</a>
          </div>
          <p className="text-sm text-muted-foreground">© 2024 Nova AI. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({ 
  icon, 
  title, 
  description, 
  accentColor,
  onClick
}: { 
  icon: React.ReactNode, 
  title: string, 
  description: string,
  accentColor: string,
  onClick?: () => void
}) {
  return (
    <div 
      onClick={onClick}
      className={cn(
        "bg-card p-8 rounded-[2rem] border border-border/50 shadow-sm hover:shadow-xl hover:border-primary/20 transition-all group",
        onClick && "cursor-pointer"
      )}
    >
      <div className={`h-14 w-14 ${accentColor} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500`}>
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-3">{title}</h3>
      <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
    </div>
  );
}

function ChatAppContent() {
  const [showApp, setShowApp] = useState(false);
  const [selectedChatId, setSelectedChatId] = useState<string | null>(null);

  if (!showApp) {
    return <LandingPage onEnterApp={() => setShowApp(true)} />;
  }

  return (
    <SidebarProvider defaultOpen={true}>
      <AppSidebar currentChatId={selectedChatId} onSelectChat={setSelectedChatId} onExitApp={() => setShowApp(false)} />
      <SidebarInset className="bg-background flex flex-col relative overflow-hidden">
        <header className="h-16 flex items-center px-4 border-b sticky top-0 z-20 bg-background/80 backdrop-blur-md">
          <SidebarTrigger className="mr-4 hover:bg-muted rounded-lg transition-colors" />
          <div className="flex items-center gap-2 font-bold font-headline truncate">
            {selectedChatId ? (
              <>
                <MessageSquare size={18} className="text-primary" />
                <span>Conversation</span>
              </>
            ) : (
              <>
                <Bot size={18} className="text-primary" />
                <span>Nova AI Assistant</span>
              </>
            )}
          </div>
        </header>
        <ChatContainer chatId={selectedChatId} />
      </SidebarInset>
    </SidebarProvider>
  );
}

export default function Home() {
  return (
    <AuthProvider>
      <ChatAppContent />
      <Toaster />
    </AuthProvider>
  );
}


"use client";

import { useAuth, AuthProvider } from "@/components/auth/auth-context";
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/layout/app-sidebar";
import { ChatContainer } from "@/components/chat/chat-container";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { 
  LogIn, 
  Bot, 
  Sparkles, 
  MessageSquare, 
  ShieldCheck, 
  Mic, 
  ArrowRight,
  Zap,
  Globe,
  Lock
} from "lucide-react";
import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";

function LandingPage() {
  const { signInWithGoogle } = useAuth();
  
  const heroImage = PlaceHolderImages.find(img => img.id === "hero-ai");
  const secureImage = PlaceHolderImages.find(img => img.id === "feature-secure");
  const voiceImage = PlaceHolderImages.find(img => img.id === "feature-voice");

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary/30">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-xl border-b border-border/50">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 font-black text-2xl tracking-tighter text-primary">
             <div className="h-8 w-8 bg-primary rounded-lg flex items-center justify-center text-primary-foreground">N</div>
             <span>NOVA</span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-muted-foreground">
            <a href="#features" className="hover:text-primary transition-colors">Features</a>
            <a href="#security" className="hover:text-primary transition-colors">Security</a>
            <a href="#pricing" className="hover:text-primary transition-colors">Pricing</a>
          </div>
          <Button onClick={signInWithGoogle} variant="default" size="sm" className="rounded-full px-6 font-bold shadow-lg shadow-primary/20">
            Sign In
          </Button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-bold tracking-widest uppercase border border-primary/20 animate-fade-in">
              <Sparkles size={14} />
              The Future of Personal Intelligence
            </div>
            <h1 className="text-5xl md:text-7xl font-black font-headline leading-[1.1] tracking-tight">
              Meet Nova, Your <span className="text-primary italic">Universal</span> Assistant.
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto lg:mx-0">
              Nova AI combines next-generation reasoning with seamless voice interaction and rock-solid privacy. Experience intelligence that actually understands you.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button onClick={signInWithGoogle} size="lg" className="h-14 px-8 rounded-2xl text-lg font-bold shadow-xl shadow-primary/25 hover:scale-[1.03] transition-transform">
                Get Started for Free
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button variant="outline" size="lg" className="h-14 px-8 rounded-2xl text-lg font-bold border-2 hover:bg-muted/50">
                View Documentation
              </Button>
            </div>
            <div className="flex items-center justify-center lg:justify-start gap-6 pt-4 text-muted-foreground/60">
              <div className="flex -space-x-3">
                {[1, 2, 3, 4].map(i => (
                  <div key={i} className="h-10 w-10 rounded-full border-2 border-background bg-muted flex items-center justify-center text-[10px] font-bold">
                    <img src={`https://picsum.photos/seed/user-${i}/40/40`} className="rounded-full" alt="User" />
                  </div>
                ))}
              </div>
              <p className="text-sm font-medium">Trusted by 50,000+ pioneers</p>
            </div>
          </div>
          
          <div className="relative group perspective-1000">
             <div className="absolute -inset-4 bg-primary/20 rounded-[2rem] blur-3xl opacity-50 group-hover:opacity-100 transition-opacity duration-1000"></div>
             <div className="relative aspect-[4/3] rounded-[2rem] overflow-hidden border border-border/50 shadow-2xl bg-card">
               {heroImage && (
                 <Image 
                   src={heroImage.imageUrl} 
                   alt={heroImage.description}
                   fill
                   className="object-cover group-hover:scale-105 transition-transform duration-1000"
                   data-ai-hint={heroImage.imageHint}
                 />
               )}
               <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent"></div>
               <div className="absolute bottom-8 left-8 right-8 p-6 bg-card/60 backdrop-blur-md rounded-2xl border border-white/10 shadow-xl animate-float">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="h-8 w-8 bg-primary rounded-lg flex items-center justify-center"><Bot size={18} /></div>
                    <span className="font-bold">Nova AI</span>
                  </div>
                  <p className="text-sm italic text-muted-foreground">"I've optimized your schedule and summarized your daily briefings. Ready for your voice command."</p>
               </div>
             </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="py-24 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-3xl md:text-5xl font-black font-headline">Intelligence Without Limits</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
              Designed for speed, privacy, and true human-like interaction.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard 
              icon={<Mic className="text-accent" />}
              title="Voice First"
              description="Speak naturally. Nova understands context, nuance, and emotion with state-of-the-art voice recognition."
            />
            <FeatureCard 
              icon={<ShieldCheck className="text-primary" />}
              title="Secure History"
              description="Your conversations are yours. End-to-end encrypted and stored securely in your private vault."
            />
            <FeatureCard 
              icon={<Zap className="text-yellow-500" />}
              title="Flash Reasoning"
              description="Powered by the latest LLM architectures for near-instant responses to complex queries."
            />
          </div>
        </div>
      </section>

      {/* Deep Dive Section */}
      <section id="security" className="py-24">
        <div className="max-w-7xl mx-auto px-4 grid lg:grid-cols-2 gap-20 items-center">
          <div className="order-2 lg:order-1 relative">
            <div className="aspect-square rounded-[3rem] overflow-hidden border border-border shadow-2xl relative">
              {secureImage && (
                <Image 
                  src={secureImage.imageUrl} 
                  alt={secureImage.description} 
                  fill 
                  className="object-cover"
                  data-ai-hint={secureImage.imageHint}
                />
              )}
              <div className="absolute inset-0 bg-primary/10 mix-blend-overlay"></div>
            </div>
            <div className="absolute -bottom-10 -right-10 bg-card p-8 rounded-3xl border shadow-2xl max-w-xs space-y-4">
               <Lock className="text-primary h-10 w-10" />
               <h4 className="font-bold text-xl">Privacy by Default</h4>
               <p className="text-sm text-muted-foreground">We never train our models on your private data. Your thoughts remain yours alone.</p>
            </div>
          </div>
          
          <div className="order-1 lg:order-2 space-y-8">
            <h2 className="text-4xl md:text-5xl font-black font-headline leading-tight">Your data. <br/>Your security. <br/><span className="text-primary">Our priority.</span></h2>
            <div className="space-y-6">
              <CheckItem text="AES-256 Military grade encryption" />
              <CheckItem text="No personal data harvesting" />
              <CheckItem text="Compliant with global privacy standards" />
              <CheckItem text="Self-destructing chat history options" />
            </div>
            <Button onClick={signInWithGoogle} variant="outline" className="h-12 rounded-xl">Learn about our Security</Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-2 font-black text-xl text-primary opacity-50">
             <div className="h-6 w-6 bg-primary rounded flex items-center justify-center text-primary-foreground">N</div>
             <span>NOVA</span>
          </div>
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

function FeatureCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
  return (
    <div className="bg-card p-10 rounded-[2.5rem] border border-border/50 shadow-sm hover:shadow-xl hover:border-primary/20 transition-all group">
      <div className="h-16 w-16 bg-muted rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500">
        {icon}
      </div>
      <h3 className="text-2xl font-bold mb-4">{title}</h3>
      <p className="text-muted-foreground leading-relaxed">{description}</p>
    </div>
  );
}

function CheckItem({ text }: { text: string }) {
  return (
    <div className="flex items-center gap-3">
      <div className="h-6 w-6 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0">
        <Sparkles size={14} />
      </div>
      <span className="font-medium text-lg">{text}</span>
    </div>
  );
}

function ChatAppContent() {
  const { user, loading, signInWithGoogle } = useAuth();
  const [selectedChatId, setSelectedChatId] = useState<string | null>(null);

  if (loading) {
    return (
      <div className="h-screen w-full flex flex-col items-center justify-center bg-background">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        <p className="mt-4 text-muted-foreground animate-pulse font-medium tracking-tight">Initializing Nova AI...</p>
      </div>
    );
  }

  if (!user) {
    return <LandingPage />;
  }

  return (
    <SidebarProvider defaultOpen={true}>
      <AppSidebar currentChatId={selectedChatId} onSelectChat={setSelectedChatId} />
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
    </AuthProvider>
  );
}

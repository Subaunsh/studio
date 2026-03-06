"use client";

import { useAuth, AuthProvider } from "@/components/auth/auth-context";
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/layout/app-sidebar";
import { ChatContainer } from "@/components/chat/chat-container";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { LogIn, Bot, Sparkles, MessageSquare } from "lucide-react";

function ChatAppContent() {
  const { user, loading, signInWithGoogle } = useAuth();
  const [selectedChatId, setSelectedChatId] = useState<string | null>(null);

  if (loading) {
    return (
      <div className="h-screen w-full flex flex-col items-center justify-center bg-background">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        <p className="mt-4 text-muted-foreground animate-pulse">Initializing Nova AI...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="h-screen w-full flex flex-col items-center justify-center bg-background px-4">
        <div className="max-w-md w-full text-center p-10 bg-card border rounded-3xl shadow-xl space-y-8">
          <div className="flex justify-center">
             <div className="h-20 w-20 bg-primary/10 text-primary rounded-3xl flex items-center justify-center shadow-inner">
               <Bot size={44} />
             </div>
          </div>
          <div className="space-y-3">
            <h1 className="text-4xl font-black font-headline tracking-tight text-foreground">
              Nova AI
            </h1>
            <p className="text-muted-foreground text-lg leading-relaxed">
              Your intelligent, secure, and personal voice-enabled AI companion.
            </p>
          </div>
          
          <div className="grid gap-4">
            <Button 
              onClick={signInWithGoogle} 
              size="lg" 
              className="h-14 rounded-2xl bg-primary hover:bg-primary/90 text-lg font-semibold w-full transition-all hover:scale-[1.02]"
            >
              <LogIn className="mr-2" />
              Sign in with Google
            </Button>
            <p className="text-xs text-muted-foreground">
              By continuing, you agree to our terms and privacy policy.
            </p>
          </div>

          <div className="pt-6 grid grid-cols-2 gap-4 text-left border-t">
             <div className="flex gap-2 text-sm">
                <Sparkles className="h-4 w-4 text-accent shrink-0" />
                <span>Next-gen intelligence</span>
             </div>
             <div className="flex gap-2 text-sm">
                <MessageSquare className="h-4 w-4 text-accent shrink-0" />
                <span>Secure histories</span>
             </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <SidebarProvider defaultOpen={true}>
      <AppSidebar currentChatId={selectedChatId} onSelectChat={setSelectedChatId} />
      <SidebarInset className="bg-background flex flex-col relative">
        <header className="h-16 flex items-center px-4 border-b sticky top-0 z-10 bg-background/80 backdrop-blur-md">
          <SidebarTrigger className="mr-4" />
          <h1 className="font-bold font-headline truncate">
            {selectedChatId ? "Conversation" : "Nova AI Assistant"}
          </h1>
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
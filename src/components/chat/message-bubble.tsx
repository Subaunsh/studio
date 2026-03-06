"use client";

import { cn } from "@/lib/utils";
import { User, Bot, Copy, Check, Volume2 } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useSpeech } from "@/hooks/use-speech";

interface MessageProps {
  role: "user" | "assistant";
  content: string;
  timestamp: any;
}

export function MessageBubble({ role, content, timestamp }: MessageProps) {
  const [copied, setCopied] = useState(false);
  const { speak } = useSpeech();

  const handleCopy = () => {
    navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const formattedTime = timestamp?.toDate
    ? timestamp.toDate().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    : new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  return (
    <div className={cn("flex w-full mb-6 group", role === "user" ? "justify-end" : "justify-start")}>
      <div className={cn(
        "flex max-w-[85%] md:max-w-[70%] gap-3",
        role === "user" ? "flex-row-reverse" : "flex-row"
      )}>
        <div className={cn(
          "h-8 w-8 rounded-full flex items-center justify-center shrink-0",
          role === "user" ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
        )}>
          {role === "user" ? <User size={18} /> : <Bot size={18} />}
        </div>
        
        <div className="flex flex-col gap-1">
          <div className={cn(
            "rounded-2xl px-4 py-3 shadow-sm",
            role === "user" 
              ? "bg-primary text-primary-foreground rounded-tr-none" 
              : "bg-card border text-card-foreground rounded-tl-none"
          )}>
            <p className="text-sm leading-relaxed whitespace-pre-wrap">{content}</p>
          </div>
          
          <div className={cn(
            "flex items-center gap-2 mt-1 px-1",
            role === "user" ? "justify-end" : "justify-start"
          )}>
            <span className="text-[10px] text-muted-foreground opacity-70">
              {formattedTime}
            </span>
            {role === "assistant" && (
              <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <Button variant="ghost" size="icon" className="h-5 w-5" onClick={handleCopy}>
                  {copied ? <Check className="h-3 w-3 text-green-500" /> : <Copy className="h-3 w-3" />}
                </Button>
                <Button variant="ghost" size="icon" className="h-5 w-5" onClick={() => speak(content)}>
                  <Volume2 className="h-3 w-3" />
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export function TypingBubble() {
  return (
    <div className="flex w-full mb-6 justify-start">
      <div className="flex flex-row gap-3">
        <div className="h-8 w-8 rounded-full bg-muted text-muted-foreground flex items-center justify-center shrink-0">
          <Bot size={18} />
        </div>
        <div className="bg-card border rounded-2xl rounded-tl-none px-4 py-3 flex items-center">
          <div className="typing-animation flex items-center h-4">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      </div>
    </div>
  );
}
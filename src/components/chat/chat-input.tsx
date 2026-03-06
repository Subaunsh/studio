"use client";

import { useState, useRef, useEffect } from "react";
import { Send, Mic, MicOff, StopCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useSpeech } from "@/hooks/use-speech";
import { cn } from "@/lib/utils";

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  disabled?: boolean;
}

export function ChatInput({ onSendMessage, disabled }: ChatInputProps) {
  const [input, setInput] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const { isListening, startListening, supported } = useSpeech();

  const handleSend = () => {
    if (input.trim() && !disabled) {
      onSendMessage(input.trim());
      setInput("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const toggleVoice = () => {
    if (isListening) return; // SpeechRecognition usually stops on its own for one-shot
    startListening((text) => {
      setInput((prev) => prev + (prev ? " " : "") + text);
    });
  };

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 200)}px`;
    }
  }, [input]);

  return (
    <div className="p-4 bg-background/80 backdrop-blur-md border-t">
      <div className="max-w-4xl mx-auto flex items-end gap-2 bg-card border rounded-2xl p-2 shadow-sm focus-within:ring-2 focus-within:ring-primary/20 transition-all">
        <Textarea
          ref={textareaRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type your message..."
          className="min-h-[44px] max-h-48 border-0 focus-visible:ring-0 focus-visible:ring-offset-0 bg-transparent resize-none py-3"
          rows={1}
          disabled={disabled}
        />
        <div className="flex items-center gap-1 mb-1">
          {supported && (
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={toggleVoice}
              disabled={disabled}
              className={cn(
                "h-9 w-9 rounded-xl",
                isListening ? "text-accent bg-accent/10 animate-pulse" : "text-muted-foreground"
              )}
            >
              {isListening ? <StopCircle className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
            </Button>
          )}
          <Button
            type="button"
            size="icon"
            onClick={handleSend}
            disabled={disabled || !input.trim()}
            className="h-9 w-9 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground transition-all"
          >
            <Send className="h-5 w-5" />
          </Button>
        </div>
      </div>
      <p className="text-[10px] text-center text-muted-foreground mt-2">
        Nova AI Assistant can make mistakes. Consider checking important information.
      </p>
    </div>
  );
}

"use client";

import { useState, useEffect, useRef } from "react";
import { db } from "@/lib/firebase";
import { collection, addDoc, query, orderBy, onSnapshot, serverTimestamp, doc, updateDoc } from "firebase/firestore";
import { MessageBubble, TypingBubble } from "./message-bubble";
import { ChatInput } from "./chat-input";
import { receiveAIMessageResponse } from "@/ai/flows/receive-ai-message-response";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useSpeech } from "@/hooks/use-speech";
import { Bot } from "lucide-react";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: any;
}

interface ChatContainerProps {
  chatId: string | null;
}

export function ChatContainer({ chatId }: ChatContainerProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const { speak } = useSpeech();
  const greetingRef = useRef(false);
  
  // Using a fixed guest-user ID for the open version
  const GUEST_UID = "guest-user";

  useEffect(() => {
    if (!chatId) {
      setMessages([]);
      return;
    }

    const q = query(
      collection(db, "users", GUEST_UID, "chats", chatId, "messages"),
      orderBy("timestamp", "asc")
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const msgs = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Message[];
      setMessages(msgs);
    });

    return () => unsubscribe();
  }, [chatId]);

  useEffect(() => {
    if (!chatId && messages.length === 0 && !greetingRef.current) {
      speak("Hello I am Nova. How may I help you?");
      greetingRef.current = true;
    }
  }, [chatId, messages.length, speak]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isTyping]);

  const handleSendMessage = async (text: string) => {
    let currentChatId = chatId;

    if (!currentChatId) {
      const chatRef = await addDoc(collection(db, "users", GUEST_UID, "chats"), {
        title: text.slice(0, 30) + (text.length > 30 ? "..." : ""),
        createdAt: serverTimestamp(),
        lastMessageAt: serverTimestamp(),
      });
      currentChatId = chatRef.id;
    }

    await addDoc(collection(db, "users", GUEST_UID, "chats", currentChatId, "messages"), {
      role: "user",
      content: text,
      timestamp: serverTimestamp(),
    });

    await updateDoc(doc(db, "users", GUEST_UID, "chats", currentChatId), {
      lastMessageAt: serverTimestamp(),
    });

    setIsTyping(true);

    try {
      const aiResponse = await receiveAIMessageResponse({ message: text });
      
      await addDoc(collection(db, "users", GUEST_UID, "chats", currentChatId, "messages"), {
        role: "assistant",
        content: aiResponse.response,
        timestamp: serverTimestamp(),
      });

      await updateDoc(doc(db, "users", GUEST_UID, "chats", currentChatId), {
        lastMessageAt: serverTimestamp(),
      });
    } catch (error) {
      console.error("AI Error:", error);
    } finally {
      setIsTyping(false);
    }
  };

  if (!chatId && messages.length === 0) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-8 text-center animate-in fade-in duration-700">
        <div className="h-20 w-20 bg-primary/10 text-primary rounded-3xl flex items-center justify-center mb-6 shadow-sm">
          <Bot size={40} />
        </div>
        <h2 className="text-3xl font-bold font-headline mb-3">How may I help you?</h2>
        <p className="text-muted-foreground max-w-md text-lg leading-relaxed">
          Your personal AI assistant. What is your question today?
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-10 max-w-2xl w-full">
          {["Explain quantum physics", "Write a short story", "Help me plan a trip", "Daily task summary"].map((tip) => (
            <button
              key={tip}
              onClick={() => handleSendMessage(tip)}
              className="p-4 bg-card border rounded-2xl text-sm text-left hover:border-primary/50 hover:bg-primary/5 transition-all shadow-sm"
            >
              {tip}
            </button>
          ))}
        </div>
        <div className="flex-1" />
        <div className="w-full">
           <ChatInput onSendMessage={handleSendMessage} />
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col h-full overflow-hidden">
      <ScrollArea className="flex-1 px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {messages.map((msg) => (
            <MessageBubble key={msg.id} {...msg} />
          ))}
          {isTyping && <TypingBubble />}
          <div ref={scrollRef} />
        </div>
      </ScrollArea>
      <ChatInput onSendMessage={handleSendMessage} disabled={isTyping} />
    </div>
  );
}

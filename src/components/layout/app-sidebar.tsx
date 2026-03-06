
"use client";

import { db } from "@/lib/firebase";
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";
import { useState, useEffect } from "react";
import { 
  MessageSquare, 
  Plus, 
  Sun, 
  Moon,
  History,
  Trash2,
  MoreVertical,
  Home
} from "lucide-react";
import { 
  Sidebar, 
  SidebarContent, 
  SidebarFooter, 
  SidebarGroup, 
  SidebarGroupContent, 
  SidebarGroupLabel, 
  SidebarHeader, 
  SidebarMenu, 
  SidebarMenuButton, 
  SidebarMenuItem
} from "@/components/ui/sidebar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

interface Chat {
  id: string;
  title: string;
  createdAt: any;
}

interface AppSidebarProps {
  currentChatId: string | null;
  onSelectChat: (id: string | null) => void;
  onExitApp: () => void;
}

export function AppSidebar({ currentChatId, onSelectChat, onExitApp }: AppSidebarProps) {
  const [chats, setChats] = useState<Chat[]>([]);
  const [isDarkMode, setIsDarkMode] = useState(true);

  useEffect(() => {
    // For unauthenticated version, we use a fixed guest-user path or local storage
    // Here we use 'guest-user' as a default bucket for demonstration
    const q = query(
      collection(db, "users", "guest-user", "chats"),
      orderBy("lastMessageAt", "desc")
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const fetchedChats = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Chat[];
      setChats(fetchedChats);
    });

    return () => unsubscribe();
  }, []);

  const toggleTheme = () => {
    const root = document.documentElement;
    root.classList.toggle("dark");
    setIsDarkMode(!isDarkMode);
  };

  return (
    <Sidebar variant="inset" collapsible="icon">
      <SidebarHeader className="h-16 flex items-center px-4">
        <div className="flex items-center gap-3 font-headline font-bold text-xl text-primary overflow-hidden">
          <div className="h-8 w-8 bg-primary rounded-lg flex items-center justify-center text-primary-foreground shrink-0">
            N
          </div>
          <span className="group-data-[collapsible=icon]:hidden">Nova AI</span>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton 
                onClick={() => onSelectChat(null)}
                className="bg-primary/10 text-primary hover:bg-primary/20 h-12 rounded-xl mb-4"
                tooltip="New Chat"
              >
                <Plus />
                <span className="font-semibold">New Chat</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel className="flex items-center gap-2 mb-2">
            <History size={14} />
            <span>Chat History</span>
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {chats.map((chat) => (
                <SidebarMenuItem key={chat.id}>
                  <SidebarMenuButton 
                    isActive={currentChatId === chat.id}
                    onClick={() => onSelectChat(chat.id)}
                    className="h-10 px-3 group/item rounded-lg"
                  >
                    <MessageSquare size={16} className="text-muted-foreground group-data-[active=true]:text-primary" />
                    <span className="truncate flex-1">{chat.title}</span>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <button className="opacity-0 group-hover/item:opacity-100 p-1 hover:bg-accent rounded transition-opacity">
                          <MoreVertical size={14} />
                        </button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem className="text-destructive flex items-center gap-2">
                          <Trash2 size={14} />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
              {chats.length === 0 && (
                <div className="px-3 py-4 text-xs text-muted-foreground text-center group-data-[collapsible=icon]:hidden">
                  No conversations yet
                </div>
              )}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-4">
        <SidebarMenu>
          <SidebarMenuItem>
             <SidebarMenuButton onClick={onExitApp} tooltip="Home">
                <Home />
                <span>Back to Home</span>
             </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
             <SidebarMenuButton onClick={toggleTheme} tooltip="Toggle Theme">
                {isDarkMode ? <Sun /> : <Moon />}
                <span>{isDarkMode ? "Light Mode" : "Dark Mode"}</span>
             </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}

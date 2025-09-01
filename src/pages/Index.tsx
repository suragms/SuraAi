import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ChatInterface } from '@/components/ChatInterface';
import { Sidebar } from '@/components/Sidebar';
import { Menu, Sparkles, X } from 'lucide-react';
import suraLogo from '@/assets/sura-ai-logo.png';
import { useNavigate } from 'react-router-dom';
import { useIsMobile } from '@/hooks/use-mobile';

interface Chat {
  id: string;
  title: string;
  timestamp: Date;
}

const Index = () => {
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const [sidebarOpen, setSidebarOpen] = useState(false); // Start with closed sidebar
  const [isInitialized, setIsInitialized] = useState(false);
  const [chats, setChats] = useState<Chat[]>([
    {
      id: '1',
      title: 'Welcome to Sura AI',
      timestamp: new Date(),
    }
  ]);
  const [currentChatId, setCurrentChatId] = useState<string>('1');

  // Initialize sidebar state based on screen size
  useEffect(() => {
    // Only set sidebar open on desktop, keep closed on mobile
    if (!isMobile) {
      setSidebarOpen(true);
    }
    setIsInitialized(true);
  }, [isMobile]);

  // Manage body scroll when mobile sidebar is open
  useEffect(() => {
    if (isMobile && sidebarOpen) {
      document.body.classList.add('sidebar-open');
    } else {
      document.body.classList.remove('sidebar-open');
    }

    return () => {
      document.body.classList.remove('sidebar-open');
    };
  }, [isMobile, sidebarOpen]);

  const createNewChat = () => {
    const newChat: Chat = {
      id: Date.now().toString(),
      title: 'New Chat',
      timestamp: new Date(),
    };
    setChats(prev => [newChat, ...prev]);
    setCurrentChatId(newChat.id);
  };

  const switchChat = (chatId: string) => {
    setCurrentChatId(chatId);
  };

  const updateChatTitle = (chatId: string, title: string) => {
    setChats(prev => prev.map(chat => 
      chat.id === chatId ? { ...chat, title } : chat
    ));
  };

  const deleteChat = (chatId: string) => {
    // Don't delete the welcome chat
    if (chatId === '1') return;
    
    setChats(prev => prev.filter(chat => chat.id !== chatId));
    
    // If we're deleting the current chat, switch to the first available chat
    if (currentChatId === chatId) {
      const remainingChats = chats.filter(chat => chat.id !== chatId);
      if (remainingChats.length > 0) {
        setCurrentChatId(remainingChats[0].id);
      } else {
        // If no chats left, create a new one
        createNewChat();
      }
    }
  };

  const currentChat = chats.find(chat => chat.id === currentChatId);

  // Close sidebar on mobile when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (isMobile && sidebarOpen && !target.closest('.sidebar')) {
        setSidebarOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [sidebarOpen, isMobile]);

  // Show loading state while initializing
  if (!isInitialized) {
    return (
      <div className="h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <div className="w-8 h-8 mx-auto mb-4 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen flex bg-background">
      {/* Sidebar */}
      <Sidebar 
        isOpen={sidebarOpen} 
        onToggle={() => setSidebarOpen(!sidebarOpen)}
        chats={chats}
        currentChatId={currentChatId}
        onNewChat={createNewChat}
        onSwitchChat={switchChat}
        onUpdateChatTitle={updateChatTitle}
        onDeleteChat={deleteChat}
      />
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 main-content">
        {/* Top Bar */}
        <div className="sticky top-0 z-20 flex items-center justify-between p-4 border-b bg-card/70 backdrop-blur supports-[backdrop-filter]:bg-card/50">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="hover:bg-accent rounded-full"
            >
              <Menu className="h-4 w-4" />
            </Button>
            
            <div className="flex items-center gap-2">
              <img src={suraLogo} alt="Sura AI" className="w-7 h-7 rounded shadow-glow" />
              <h1 className="text-lg font-semibold bg-gradient-primary bg-clip-text text-transparent leading-tight">
                Sura AI
              </h1>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-2 px-3 py-1 bg-accent/50 rounded-full border border-border/40">
              <Sparkles className="h-3 w-3 text-primary" />
              <span className="text-xs font-medium">AI Powered</span>
            </div>
            <Button
              onClick={() => navigate('/')}
              variant="ghost"
              size="sm"
              className="px-3 py-1.5 hover:bg-gradient-to-r from-red-500/10 to-pink-500/10 text-red-500 hover:text-pink-600 border border-red-200 hover:border-pink-300 transition-all duration-300 text-xs font-medium"
            >
              <X className="h-3 w-3 mr-1.5" />
              Close Chats
            </Button>
          </div>
        </div>
        
        {/* Chat Interface */}
        <div className="flex-1 min-h-0">
          <ChatInterface 
            chatId={currentChatId}
            onUpdateChatTitle={updateChatTitle}
          />
        </div>
      </div>
    </div>
  );
};

export default Index;

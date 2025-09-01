import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card } from '@/components/ui/card';
import { Send, User, Bot, Sparkles, Loader2 } from 'lucide-react';
import suraLogo from '@/assets/sura-ai-logo.png';
import { toast } from '@/components/ui/sonner';
import { useIsMobile } from '@/hooks/use-mobile';

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

interface ChatInterfaceProps {
  chatId: string;
  onUpdateChatTitle: (chatId: string, title: string) => void;
}

export const ChatInterface = ({ chatId, onUpdateChatTitle }: ChatInterfaceProps) => {
  const isMobile = useIsMobile();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: 'Hello! I\'m Sura AI, your intelligent assistant. How can I help you today?',
      sender: 'ai',
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Reset messages when chat changes
  useEffect(() => {
    // All chats start with the same welcome message
    setMessages([
      {
        id: '1',
        content: 'Hello! I\'m Sura AI, your intelligent assistant. How can I help you today?',
        sender: 'ai',
        timestamp: new Date(),
      },
    ]);
    setInputValue('');
  }, [chatId]);

  const scrollToBottom = () => {
    if (scrollAreaRef.current) {
      const scrollContainer = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]');
      if (scrollContainer) {
        (scrollContainer as HTMLElement).scrollTop = (scrollContainer as HTMLElement).scrollHeight;
      }
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const callGemini = async (prompt: string): Promise<string> => {
    const apiKey = import.meta.env.VITE_GEMINI_API_KEY as string | undefined;
    if (!apiKey) {
      throw new Error('Gemini API key is not set. Add VITE_GEMINI_API_KEY to .env and restart.');
    }

    const resp = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=' + encodeURIComponent(apiKey), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [
          {
            role: 'user',
            parts: [{ text: prompt }],
          },
        ],
      }),
    });

    if (!resp.ok) {
      const text = await resp.text();
      throw new Error(`Gemini error ${resp.status}: ${text}`);
    }

    const data = await resp.json();
    const text = data?.candidates?.[0]?.content?.parts?.[0]?.text as string | undefined;
    return text ?? 'No response received from Gemini API.';
  };

  const handleSendMessage = async () => {
    if (isLoading) return;
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    
    // Update chat title with first user message if it's a new chat
    if (messages.length === 1 && chatId !== '1') {
      const title = inputValue.length > 30 ? inputValue.substring(0, 30) + '...' : inputValue;
      onUpdateChatTitle(chatId, title);
    }

    setInputValue('');
    setIsLoading(true);

    try {
      const aiText = await callGemini(userMessage.content);
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: aiText,
        sender: 'ai',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, aiMessage]);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Unknown error';
      toast.error('Chat request failed', { description: message });
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: message,
        sender: 'ai',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, aiMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="flex flex-col h-full bg-gradient-subtle">
      {/* Professional Header */}
      <div className={`sticky top-0 z-10 border-b border-border/20 bg-card/80 backdrop-blur-sm ${
        isMobile ? 'mobile-chat-header' : ''
      }`}>
        <div className="flex items-center justify-center px-4 py-3">
          <div className="flex items-center gap-3">
            <div className="relative">
              <img 
                src={suraLogo} 
                alt="Sura AI" 
                className={`rounded-lg shadow-sm ${isMobile ? 'h-8 w-8 mobile-avatar' : 'h-8 w-8'}`}
              />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white shadow-sm"></div>
            </div>
            <div className="text-center">
              <h2 className="font-semibold text-sm text-foreground">Sura AI</h2>
              <p className="text-xs text-muted-foreground font-medium">Professional Assistant</p>
              <div className="flex items-center justify-center gap-1 mt-0.5">
                <Sparkles className="h-3 w-3 text-primary" />
                <span className="text-xs text-primary font-medium">AI Powered</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Messages */}
      <ScrollArea ref={scrollAreaRef} className={`flex-1 ${isMobile ? 'px-3 chat-scroll-area' : 'px-4'}`}>
        <div className={`mx-auto space-y-4 ${isMobile ? 'max-w-full' : 'max-w-3xl'}`}>
          {messages.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              <div className="w-16 h-16 mx-auto mb-4 bg-primary/10 rounded-full flex items-center justify-center">
                <Bot className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2 text-foreground">Start a conversation</h3>
              <p className="text-sm text-muted-foreground max-w-sm mx-auto">
                Ask me anything and I'll help you with intelligent, context-aware responses.
              </p>
            </div>
          ) : (
            messages.map((message) => (
              <div
                key={message.id}
                className={`flex gap-3 ${
                  message.sender === 'user' ? 'justify-end' : 'justify-start'
                }`}
              >
                {message.sender === 'ai' && (
                  <Avatar className={`shadow-sm ${isMobile ? 'h-7 w-7 mobile-avatar' : 'h-8 w-8'}`}>
                    <AvatarImage src={suraLogo} alt="Sura AI" />
                    <AvatarFallback className="bg-gradient-primary text-primary-foreground">
                      <Bot className="h-3 w-3" />
                    </AvatarFallback>
                  </Avatar>
                )}
                
                <Card className={`${
                  isMobile ? 'max-w-[85%] p-3 chat-message-bubble' : 'max-w-[80%] p-4'
                } rounded-2xl ${
                  message.sender === 'user'
                    ? 'bg-gradient-to-r from-primary to-primary/90 text-primary-foreground shadow-lg'
                    : 'bg-card text-foreground shadow-sm border border-border/50'
                }`}>
                  <p className={`leading-relaxed whitespace-pre-wrap ${
                    isMobile ? 'text-sm mobile-text' : 'text-[0.95rem]'
                  }`}>
                    {message.content}
                  </p>
                  <div className={`flex items-center gap-1 mt-2 ${
                    message.sender === 'user' ? 'justify-end' : 'justify-start'
                  }`}>
                    <span className={`opacity-70 ${
                      isMobile ? 'text-[10px]' : 'text-xs'
                    }`}>
                      {message.timestamp.toLocaleTimeString([], { 
                        hour: '2-digit', 
                        minute: '2-digit' 
                      })}
                    </span>
                    {message.sender === 'ai' && (
                      <Sparkles className={`text-primary ${
                        isMobile ? 'h-3 w-3' : 'h-3 w-3'
                      }`} />
                    )}
                  </div>
                </Card>

                {message.sender === 'user' && (
                  <Avatar className={`shadow-sm ${isMobile ? 'h-7 w-7 mobile-avatar' : 'h-8 w-8'}`}>
                    <AvatarFallback className="bg-secondary text-secondary-foreground">
                      <User className="h-3 w-3" />
                    </AvatarFallback>
                  </Avatar>
                )}
              </div>
            ))
          )}
          
          {isLoading && (
            <div className="flex gap-3 justify-start">
              <Avatar className={`shadow-sm ${isMobile ? 'h-7 w-7 mobile-avatar' : 'h-8 w-8'}`}>
                <AvatarImage src={suraLogo} alt="Sura AI" />
                <AvatarFallback className="bg-gradient-primary text-primary-foreground">
                  <Bot className="h-3 w-3" />
                </AvatarFallback>
              </Avatar>
              <Card className={`bg-card text-foreground shadow-sm border border-border/50 ${
                isMobile ? 'p-3 chat-message-bubble' : 'p-4'
              } rounded-2xl`}>
                <div className="flex items-center gap-2">
                  <Loader2 className="h-4 w-4 text-primary animate-spin" />
                  <span className={`text-muted-foreground ${
                    isMobile ? 'text-sm mobile-text' : 'text-base'
                  }`}>
                    Sura AI is thinking...
                  </span>
                </div>
              </Card>
            </div>
          )}
        </div>
      </ScrollArea>

      {/* Professional Input */}
      <div className={`border-t border-border/20 bg-card/80 backdrop-blur-sm ${
        isMobile ? 'p-3' : 'p-4'
      }`}>
        <div className={`mx-auto flex gap-3 ${
          isMobile ? 'max-w-full' : 'max-w-3xl'
        }`}>
          <Input
            ref={inputRef}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type your message..."
            className={`flex-1 bg-background/90 border-border/50 focus:border-primary transition-all duration-200 rounded-full px-4 ${
              isMobile ? 'h-12 text-sm chat-input-field mobile-touch-target' : 'h-11'
            } shadow-sm`}
            disabled={isLoading}
          />
          <Button
            onClick={handleSendMessage}
            disabled={!inputValue.trim() || isLoading}
            className={`bg-gradient-primary hover:opacity-90 text-primary-foreground shadow-lg px-4 rounded-full transition-all duration-200 ${
              isMobile ? 'h-12 w-12 p-0 mobile-send-button mobile-touch-target' : 'h-11'
            }`}
          >
            {isLoading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <>
                <Send className="h-4 w-4" />
                {!isMobile && <span className="ml-1">Send</span>}
              </>
            )}
          </Button>
        </div>
        
        {/* Mobile-friendly tip */}
        {isMobile && (
          <div className="text-center mt-2">
            <p className="text-xs text-muted-foreground">
              Press Enter to send • Tap and hold for more options
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
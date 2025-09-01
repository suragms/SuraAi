import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card } from '@/components/ui/card';
import { Send, User, Bot, Sparkles } from 'lucide-react';
import suraLogo from '@/assets/sura-ai-logo.png';
import { toast } from '@/components/ui/sonner';

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
      {/* Header */}
      <div className="sticky top-0 z-10 border-b border-transparent bg-transparent">
        <div className="flex items-center justify-center px-4 py-3">
          <div className="flex items-center gap-2">
            <div className="relative">
              <img 
                src={suraLogo} 
                alt="Sura AI" 
                className="h-6 w-6 rounded-sm shadow-sm"
              />
              <div className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-green-500 rounded-full border border-white"></div>
            </div>
            <div className="text-center">
              <h2 className="font-semibold text-sm text-blue-600">Sura AI</h2>
              <p className="text-xs text-gray-500 font-medium">Surag Artificial Intelligence</p>
              <p className="text-xs text-gray-400">Powered by Gemini API Key</p>
            </div>
          </div>
        </div>
      </div>



      {/* Messages */}
      <ScrollArea ref={scrollAreaRef} className="flex-1 p-4">
        <div className="max-w-3xl mx-auto space-y-4">
          {messages.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <Bot className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p className="text-lg font-medium mb-2">Start a new conversation</p>
              <p className="text-sm">Ask me anything and I'll help you out!</p>
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
                  <Avatar className="h-8 w-8 shadow-subtle">
                    <AvatarImage src={suraLogo} alt="Sura AI" />
                    <AvatarFallback className="bg-gradient-primary text-primary-foreground">
                      <Bot className="h-4 w-4" />
                    </AvatarFallback>
                  </Avatar>
                )}
                
                <Card className={`max-w-[80%] p-3 sm:p-4 rounded-2xl ${
                  message.sender === 'user'
                    ? 'bg-chat-user text-chat-user-foreground shadow-glow'
                    : 'bg-chat-ai text-chat-ai-foreground shadow-subtle'
                }`}>
                  <p className="text-sm sm:text-[0.95rem] leading-relaxed whitespace-pre-wrap">
                    {message.content}
                  </p>
                  <span className="text-[10px] sm:text-xs opacity-70 mt-2 block">
                    {message.timestamp.toLocaleTimeString([], { 
                      hour: '2-digit', 
                      minute: '2-digit' 
                    })}
                  </span>
                </Card>

                {message.sender === 'user' && (
                  <Avatar className="h-8 w-8 shadow-subtle">
                    <AvatarFallback className="bg-secondary text-secondary-foreground">
                      <User className="h-4 w-4" />
                    </AvatarFallback>
                  </Avatar>
                )}
              </div>
            ))
          )}
          
          {isLoading && (
            <div className="flex gap-3 justify-start">
              <Avatar className="h-8 w-8 shadow-subtle">
                <AvatarImage src={suraLogo} alt="Sura AI" />
                <AvatarFallback className="bg-gradient-primary text-primary-foreground">
                  <Bot className="h-4 w-4" />
                </AvatarFallback>
              </Avatar>
              <Card className="bg-chat-ai text-chat-ai-foreground shadow-subtle p-3 sm:p-4 rounded-2xl">
                <div className="flex gap-1">
                  <div className="w-2 h-2 bg-primary/80 rounded-full animate-pulse"></div>
                  <div className="w-2 h-2 bg-primary/80 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                  <div className="w-2 h-2 bg-primary/80 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                </div>
              </Card>
            </div>
          )}
        </div>
      </ScrollArea>

      {/* Input */}
      <div className="p-4 border-t bg-card/50 backdrop-blur-sm">
        <div className="max-w-3xl mx-auto flex gap-2">
          <Input
            ref={inputRef}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type your message..."
            className="flex-1 bg-chat-input/90 border-border/50 focus:border-primary transition-colors rounded-full px-4 h-11"
            disabled={isLoading}
          />
          <Button
            onClick={handleSendMessage}
            disabled={!inputValue.trim() || isLoading}
            className="bg-gradient-primary hover:opacity-90 text-primary-foreground shadow-glow px-4 h-11 rounded-full"
          >
            <Send className="h-4 w-4 mr-1" />
            <span className="hidden sm:inline">Send</span>
          </Button>
        </div>
      </div>
    </div>
  );
};
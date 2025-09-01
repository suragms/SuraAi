import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import {
  MessageCircle,
  History,
  Plus,
  Moon,
  Sun,
  Trash2,
  MoreVertical,
  AlertTriangle,
  Edit3,
} from 'lucide-react';
import suraLogo from '@/assets/sura-ai-logo.png';

interface Chat {
  id: string;
  title: string;
  timestamp: Date;
}

interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
  chats: Chat[];
  currentChatId: string;
  onNewChat: () => void;
  onSwitchChat: (chatId: string) => void;
  onUpdateChatTitle: (chatId: string, title: string) => void;
  onDeleteChat: (chatId: string) => void;
}

export const Sidebar = ({ 
  isOpen, 
  onToggle, 
  chats, 
  currentChatId, 
  onNewChat, 
  onSwitchChat,
  onUpdateChatTitle,
  onDeleteChat
}: SidebarProps) => {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [hoveredChatId, setHoveredChatId] = useState<string | null>(null);
  const [chatToDelete, setChatToDelete] = useState<Chat | null>(null);
  const [contextMenu, setContextMenu] = useState<{ x: number; y: number; chat: Chat } | null>(null);
  const [editingChat, setEditingChat] = useState<{ id: string; title: string } | null>(null);
  
  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    document.documentElement.classList.toggle('dark', newTheme === 'dark');
  };

  const formatTimeAgo = (timestamp: Date) => {
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - timestamp.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes} min ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)} hour${Math.floor(diffInMinutes / 60) === 1 ? '' : 's'} ago`;
    return `${Math.floor(diffInMinutes / 1440)} day${Math.floor(diffInMinutes / 1440) === 1 ? '' : 's'} ago`;
  };

  const handleDeleteChat = (e: React.MouseEvent, chat: Chat) => {
    e.stopPropagation();
    if (chat.id === '1') return; // Don't delete welcome chat
    setChatToDelete(chat);
  };

  const confirmDelete = () => {
    if (chatToDelete) {
      onDeleteChat(chatToDelete.id);
      setChatToDelete(null);
    }
  };

  const cancelDelete = () => {
    setChatToDelete(null);
  };

  const handleContextMenu = (e: React.MouseEvent, chat: Chat) => {
    e.preventDefault();
    if (chat.id === '1') return; // No context menu for welcome chat
    
    setContextMenu({
      x: e.clientX,
      y: e.clientY,
      chat
    });
  };

  const closeContextMenu = () => {
    setContextMenu(null);
  };

  const startEditing = (chat: Chat) => {
    setEditingChat({ id: chat.id, title: chat.title });
    closeContextMenu();
  };

  const saveEdit = () => {
    if (editingChat) {
      onUpdateChatTitle(editingChat.id, editingChat.title);
      setEditingChat(null);
    }
  };

  const cancelEdit = () => {
    setEditingChat(null);
  };

  const handleEditKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      saveEdit();
    } else if (e.key === 'Escape') {
      cancelEdit();
    }
  };

  // Close context menu when clicking outside
  const handleClickOutside = () => {
    closeContextMenu();
  };

  return (
    <div className={`sidebar ${
      isOpen ? 'w-72 sm:w-80' : 'w-0'
    } transition-[width] duration-300 ease-out bg-chat-sidebar border-r border-border flex flex-col overflow-hidden`}>
      {/* Header */}
      <div className="sticky top-0 z-10 p-4 border-b border-border/50 bg-chat-sidebar/80 backdrop-blur">
        <div className="flex items-center gap-3 mb-3">
          <img src={suraLogo} alt="Sura AI" className="w-8 h-8 rounded-lg shadow-glow" />
          <div>
            <h2 className="font-semibold text-foreground leading-tight">Sura AI</h2>
            <p className="text-xs text-muted-foreground">Professional Assistant</p>
          </div>
        </div>
        <Button 
          onClick={onNewChat}
          className="w-full bg-gradient-primary hover:opacity-90 text-primary-foreground gap-2 shadow-glow rounded-full"
        >
          <Plus className="h-4 w-4" />
          New Chat
        </Button>
      </div>

      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-border/50 scrollbar-track-transparent">
        {/* Chat History */}
        <div className="px-4 pb-4">
          <div className="flex items-center gap-2 mb-2">
            <History className="h-4 w-4 text-muted-foreground" />
            <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Recent</span>
          </div>
          <div className="space-y-2">
            {chats.map((chat) => (
              <div
                key={chat.id}
                className="group relative"
                onMouseEnter={() => setHoveredChatId(chat.id)}
                onMouseLeave={() => setHoveredChatId(null)}
                onContextMenu={(e) => handleContextMenu(e, chat)}
              >
                {editingChat?.id === chat.id ? (
                  <div className="flex items-center gap-2 p-3 bg-accent/50 rounded-xl border border-border">
                    <input
                      type="text"
                      value={editingChat.title}
                      onChange={(e) => setEditingChat({ ...editingChat, title: e.target.value })}
                      onKeyDown={handleEditKeyPress}
                      onBlur={saveEdit}
                      className="flex-1 bg-transparent border-none outline-none text-sm font-medium"
                      autoFocus
                    />
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={saveEdit}
                      className="h-6 w-6 p-0"
                    >
                      ✓
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={cancelEdit}
                      className="h-6 w-6 p-0"
                    >
                      ✕
                    </Button>
                  </div>
                ) : (
                  <>
                    <Button
                      variant={chat.id === currentChatId ? "secondary" : "ghost"}
                      onClick={() => onSwitchChat(chat.id)}
                      className={`w-full justify-start h-auto p-3 text-left rounded-xl ${
                        chat.id === currentChatId 
                          ? 'bg-secondary text-secondary-foreground' 
                          : 'hover:bg-accent/50'
                      }`}
                    >
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start gap-2">
                          <MessageCircle className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                          <div className="min-w-0 flex-1">
                            <p className="text-sm font-medium truncate">{chat.title}</p>
                            <p className="text-xs text-muted-foreground">{formatTimeAgo(chat.timestamp)}</p>
                          </div>
                        </div>
                      </div>
                    </Button>
                    
                    {/* Delete button - only show on hover and not for welcome chat */}
                    {hoveredChatId === chat.id && chat.id !== '1' && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={(e) => handleDeleteChat(e, chat)}
                        className="absolute right-2 top-1/2 -translate-y-1/2 h-6 w-6 p-0 hover:bg-destructive hover:text-destructive-foreground rounded-full opacity-80 hover:opacity-100 transition-all"
                        title="Delete chat"
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    )}
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      <Separator />

      {/* Theme Toggle */}
      <div className="p-3 sm:p-4">
        <Button
          variant="ghost"
          onClick={toggleTheme}
          className="w-full justify-start gap-2 rounded-xl"
        >
          {theme === 'light' ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
          <span className="text-sm">{theme === 'light' ? 'Dark Mode' : 'Light Mode'}</span>
        </Button>
      </div>

      {/* Context Menu */}
      {contextMenu && (
        <div 
          className="fixed z-50 bg-card border rounded-lg shadow-lg p-1 min-w-[160px]"
          style={{ left: contextMenu.x, top: contextMenu.y }}
          onClick={handleClickOutside}
        >
          <Button
            variant="ghost"
            size="sm"
            onClick={() => startEditing(contextMenu.chat)}
            className="w-full justify-start gap-2 h-8 px-2 rounded-md"
          >
            <Edit3 className="h-3 w-3" />
            Rename
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              setChatToDelete(contextMenu.chat);
              closeContextMenu();
            }}
            className="w-full justify-start gap-2 h-8 px-2 rounded-md text-destructive hover:text-destructive hover:bg-destructive/10"
          >
            <Trash2 className="h-3 w-3" />
            Delete
          </Button>
        </div>
      )}

      {/* Delete Confirmation Dialog */}
      {chatToDelete && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-card p-6 rounded-lg shadow-lg max-w-sm mx-4 border">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-destructive/10 rounded-full">
                <AlertTriangle className="h-5 w-5 text-destructive" />
              </div>
              <div>
                <h3 className="font-semibold text-lg">Delete Chat</h3>
                <p className="text-sm text-muted-foreground">This action cannot be undone.</p>
              </div>
            </div>
            
            <p className="text-sm mb-6">
              Are you sure you want to delete "<span className="font-medium">{chatToDelete.title}</span>"?
            </p>
            
            <div className="flex gap-3 justify-end">
              <Button
                variant="outline"
                onClick={cancelDelete}
                className="px-4"
              >
                Cancel
              </Button>
              <Button
                variant="destructive"
                onClick={confirmDelete}
                className="px-4"
              >
                Delete
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
import { useNavigate } from 'react-router-dom';
import { useChatList } from '../../hooks/useChat';
import { useAuth } from '../../context/AuthContext';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { MessageSquare, Loader2 } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

const Chats = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { chats, isLoading } = useChatList(true);

  const getOtherParticipant = (chat) => {
    return chat.participants?.find(p => p._id !== user?._id) || chat.participants?.[0];
  };

  const getInitials = (name) => {
    if (!name) return 'U';
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-display font-bold flex items-center gap-3">
          <MessageSquare className="w-8 h-8" />
          Chats
        </h1>
        <p className="text-muted-foreground mt-1">Your conversations with helpers</p>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" />
        </div>
      ) : chats.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <MessageSquare className="w-12 h-12 text-muted-foreground mb-4" />
            <p className="text-lg font-medium">No chats yet</p>
            <p className="text-muted-foreground">Start a conversation by responding to a request</p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-3">
          {chats.map((chat) => {
            const otherUser = getOtherParticipant(chat);
            return (
              <Card
                key={chat._id}
                className="cursor-pointer transition-all duration-200 hover:shadow-md hover:border-primary/50"
                onClick={() => navigate(`/dashboard/chats/${chat._id}`)}
              >
                <CardContent className="p-4">
                  <div className="flex items-center gap-4">
                    <Avatar className="w-12 h-12">
                      <AvatarImage src={otherUser?.avatar} />
                      <AvatarFallback className="bg-primary/10 text-primary">
                        {getInitials(otherUser?.fullName)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <p className="font-medium truncate">{otherUser?.fullName}</p>
                        {chat.lastMessage && (
                          <span className="text-xs text-muted-foreground">
                            {formatDistanceToNow(new Date(chat.lastMessage.createdAt), { addSuffix: true })}
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground truncate">
                        @{otherUser?.userName}
                      </p>
                      {chat.lastMessage && (
                        <p className="text-sm text-muted-foreground truncate mt-1">
                          {chat.lastMessage.content || '📷 Image'}
                        </p>
                      )}
                      {chat.request && (
                        <Badge variant="secondary" className="mt-2 text-xs">
                          {chat.request.title}
                        </Badge>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Chats;

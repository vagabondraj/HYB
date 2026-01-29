import { useAuth } from '../../context/AuthContext';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';

const Profile = () => {
  const { user } = useAuth();

  const getInitials = (name) => {
    if (!name) return 'U';
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  if (!user) return null;

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <Card>
        <CardHeader className="pb-0">
          <div className="flex flex-col sm:flex-row items-center gap-6">
            <Avatar className="w-24 h-24">
              <AvatarImage src={user.avatar} />
              <AvatarFallback className="text-3xl bg-primary/10 text-primary">
                {getInitials(user.fullName)}
              </AvatarFallback>
            </Avatar>

            <div className="text-center sm:text-left">
              <h1 className="text-2xl font-display font-bold">{user.fullName}</h1>
              <p className="text-muted-foreground">@{user.userName}</p>

              <div className="flex flex-wrap justify-center sm:justify-start gap-2 mt-3">
                {user.branch && <Badge variant="secondary">{user.branch}</Badge>}
                {user.year && <Badge variant="outline">Year {user.year}</Badge>}
                {user.hostel && <Badge variant="outline">{user.hostel}</Badge>}
              </div>
            </div>
          </div>
        </CardHeader>

        <CardContent className="pt-6 space-y-3 text-sm">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Email</span>
            <span>{user.email}</span>
          </div>

          <div className="flex justify-between">
            <span className="text-muted-foreground">Role</span>
            <span className="capitalize">{user.role}</span>
          </div>

          <div className="flex justify-between">
            <span className="text-muted-foreground">Help Count</span>
            <span>{user.helpCount || 0}</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Profile;

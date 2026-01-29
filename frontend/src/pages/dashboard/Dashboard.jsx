import { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import api from '../../api/axios';
import { Link, useNavigate } from 'react-router-dom';
import { 
  HelpCircle, MessageSquare, Clock, TrendingUp, 
  Users, Heart, ArrowRight, Plus, CheckCircle,
  AlertCircle, Loader2
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { motion } from 'framer-motion';

const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [statsData, setStatsData] = useState({
  activeRequests: 0,
  chats: 0,
  });

  useEffect(() => {
  const fetchStats = async () => {
    try {
      const [requestsRes, chatsRes] = await Promise.all([
        api.get('/req?status=active'),
        api.get('/chat'),
      ]);

      setStatsData({
        activeRequests: requestsRes.data.data?.requests?.length || 0,
        chats: chatsRes.data.data?.chats?.length || 0,
      });
    } catch (error) {
      console.error('Failed to load dashboard stats', error);
    }
  };

  fetchStats();
}, []);



const stats = [
  {
    label: 'Active Requests',
    value: statsData.activeRequests,
    icon: HelpCircle,
    color: 'text-primary',
    path: '/dashboard/requests',
  },
  {
    label: 'Chats',
    value: statsData.chats,
    icon: MessageSquare,
    color: 'text-info',
    path: '/dashboard/chats',
  },
  {
    label: 'Help Count',
    value: user?.helpCount || 0,
    icon: TrendingUp,
    color: 'text-success',
  },
];



  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-display font-bold text-foreground">
              Welcome back, {user?.fullName?.split(' ')[0] || 'Friend'}! 👋
            </h1>
            <p className="text-muted-foreground mt-1">
              Here's what's happening in your community today
            </p>
          </div>
          <Button asChild className="btn-gradient-primary gap-2 shrink-0">
            <Link to="/dashboard/requests/create">
              <Plus className="w-4 h-4" />
              Create Request
            </Link>
          </Button>
        </div>
      </motion.div>

      {/* Stats Grid */}
      <motion.div 
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-2 lg:grid-cols-4 gap-4"
      >
        {stats.map((stat, index) => (
          <motion.div key={stat.label} variants={item}>
            <Card
                className={`glass-card hover-lift ${stat.path ? 'cursor-pointer hover:border-primary' : ''}`}
                onClick={() => {
                  if (stat.path) {
                    navigate(stat.path);
                  }
                }}
              >

              <CardContent className="p-5">
                <div className="flex items-center justify-between mb-3">
                  <div className={`w-10 h-10 rounded-xl bg-muted flex items-center justify-center ${stat.color}`}>
                    <stat.icon className="w-5 h-5" />
                  </div>
                </div>
                <p className="text-2xl font-bold font-display">{stat.value}</p>
                {stat.path && (
                  <p className="text-xs text-muted-foreground mt-1">
                    Click to open
                  </p>
                )}
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      {/* Main Content Grid */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Recent Requests */}
        <motion.div 
          className="lg:col-span-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="glass-card h-full">
            <CardHeader className="flex flex-row items-center justify-between pb-4">
              <div>
                <CardTitle className="text-lg font-display">Recent Requests</CardTitle>
                <CardDescription>Latest help requests from the community</CardDescription>
              </div>
              <Button variant="ghost" size="sm" asChild className="gap-1">
                <Link to="/dashboard/requests">
                  View all
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Empty State */}
                <div className="py-12 text-center">
                  <div className="w-16 h-16 rounded-full bg-muted mx-auto flex items-center justify-center mb-4">
                    <HelpCircle className="w-8 h-8 text-muted-foreground" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-1">No requests yet</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Be the first to ask for help or explore existing requests
                  </p>
                  <Button asChild variant="outline" size="sm">
                    <Link to="/dashboard/requests">Browse Requests</Link>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Quick Actions & Tips */}
        <motion.div 
          className="space-y-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          {/* Quick Actions */}
          <Card className="glass-card">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg font-display">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button asChild variant="outline" className="w-full justify-start gap-3 h-11">
                <Link to="/dashboard/requests/create">
                  <Plus className="w-4 h-4 text-primary" />
                  Create Help Request
                </Link>
              </Button>
              <Button asChild variant="outline" className="w-full justify-start gap-3 h-11">
                <Link to="/dashboard/requests">
                  <HelpCircle className="w-4 h-4 text-info" />
                  Browse Requests
                </Link>
              </Button>
              <Button asChild variant="outline" className="w-full justify-start gap-3 h-11">
                <Link to="/dashboard/chats">
                  <MessageSquare className="w-4 h-4 text-success" />
                  View Chats
                </Link>
              </Button>
            </CardContent>
          </Card>

          {/* Tips Card */}
          <Card className="glass-card border-accent/30" style={{ background: 'linear-gradient(135deg, hsl(var(--accent) / 0.1) 0%, hsl(var(--accent) / 0.05) 100%)' }}>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg font-display flex items-center gap-2">
                <span className="text-2xl">💡</span>
                Pro Tips
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3 text-sm">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-success mt-0.5 shrink-0" />
                  <span>Be specific about what you need for faster help</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-success mt-0.5 shrink-0" />
                  <span>Set appropriate urgency levels</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-success mt-0.5 shrink-0" />
                  <span>Help others to build your reputation</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* User Stats */}
          <Card className="glass-card">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg font-display">Your Profile</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Username</span>
                  <span className="font-medium">@{user?.userName || '—'}</span>
                </div>
                {user?.branch && (
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Branch</span>
                    <span className="font-medium">{user.branch}</span>
                  </div>
                )}
                {user?.year && (
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Year</span>
                    <span className="font-medium">Year {user.year}</span>
                  </div>
                )}
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Help Count</span>
                  <Badge variant="secondary" className="bg-success/10 text-success">
                    {user?.helpCount || 0} helped
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;

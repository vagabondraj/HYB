// 🔽 UPDATED IMPORTS (added Flag, Moon, Sun)
import {
  Heart,
  Home,
  HelpCircle,
  MessageSquare,
  Bell,
  User,
  Settings,
  LogOut,
  Menu,
  X,
  Plus,
  ChevronDown,
  Search,
  HandHeart,
  Flag,
  Moon,
  Sun,
  Users
} from 'lucide-react';

import { useState } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import { useNotifications } from '../../hooks/useNotifications';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

const DashboardLayout = () => {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const { unreadCount } = useNotifications(true);
  const location = useLocation();
  const navigate = useNavigate();
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  const navItems = [
    { path: '/dashboard', icon: Home, label: 'Dashboard' },
    { path: '/dashboard/requests', icon: HelpCircle, label: 'Requests' },
    { path: '/dashboard/my-requests', icon: HandHeart, label: 'My Requests' },
    { path: '/dashboard/users', icon: Users, label: 'Find Users' },
    { path: '/dashboard/chats', icon: MessageSquare, label: 'Chats' },
    { path: '/dashboard/notifications', icon: Bell, label: 'Notifications', badge: unreadCount },
  ];

  const isActive = (path) => {
    if (path === '/dashboard') return location.pathname === path;
    return location.pathname.startsWith(path);
  };

  const getInitials = (name) => {
    if (!name) return 'U';
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-background flex">
      {/* ================= DESKTOP SIDEBAR ================= */}
      <aside className="hidden lg:flex lg:flex-col lg:w-64 bg-sidebar border-r border-sidebar-border fixed h-screen">
        {/* Logo */}
        <div className="h-16 flex items-center px-6 border-b border-sidebar-border">
          <Link to="/dashboard" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
              <Heart className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-display font-bold text-sidebar-foreground">HYB</span>
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-6 overflow-y-auto custom-scrollbar">
          <div className="space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200",
                  isActive(item.path)
                    ? "bg-sidebar-primary text-sidebar-primary-foreground shadow-md"
                    : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                )}
              >
                <item.icon className="w-5 h-5" />
                <span className="font-medium">{item.label}</span>
                {item.badge > 0 && (
                  <Badge className="ml-auto bg-accent text-accent-foreground text-xs">
                    {item.badge > 9 ? '9+' : item.badge}
                  </Badge>
                )}
              </Link>
            ))}

            {/* 🔽 ADDED: ADMIN / MODERATOR LINK */}
            {(user?.role === 'admin' || user?.role === 'moderator') && (
              <Link
                to="/dashboard/admin/reports"
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 mt-2",
                  location.pathname.startsWith('/dashboard/admin')
                    ? "bg-destructive text-destructive-foreground shadow-md"
                    : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                )}
              >
                <Flag className="w-5 h-5" />
                <span className="font-medium">Reports</span>
              </Link>
            )}
          </div>

          {/* Create Request Button */}
          <div className="mt-8 px-2">
            <Button
              onClick={() => navigate('/dashboard/requests/create')}
              className="w-full btn-gradient-primary gap-2"
            >
              <Plus className="w-4 h-4" />
              New Request
            </Button>
          </div>
        </nav>
      </aside>

      {/* ================= MAIN CONTENT ================= */}
      <div className="flex-1 lg:ml-64 flex flex-col min-h-screen">
        {/* ================= HEADER ================= */}
        <header className="h-16 bg-card/80 backdrop-blur-xl border-b border-border sticky top-0 z-30">
          <div className="h-full px-4 lg:px-8 flex items-center justify-between">
            {/* Left */}
            <div className="flex items-center gap-4">
              <button
                onClick={() => setIsMobileSidebarOpen(true)}
                className="lg:hidden p-2 rounded-lg hover:bg-muted"
              >
                <Menu className="w-5 h-5" />
              </button>

              <div className="hidden sm:block relative w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input placeholder="Search requests..." className="pl-9 h-10" />
              </div>
            </div>

            {/* Right */}
            <div className="flex items-center gap-3">
              {/* 🔽 ADDED: THEME TOGGLE */}
              <Button variant="ghost" size="icon" onClick={toggleTheme}>
                {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </Button>

              {/* 🔽 UPDATED: NOTIFICATIONS WITH BADGE */}
              <Button
                variant="ghost"
                size="icon"
                className="relative"
                onClick={() => navigate('/dashboard/notifications')}
              >
                <Bell className="w-5 h-5" />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-destructive text-destructive-foreground text-xs rounded-full flex items-center justify-center">
                    {unreadCount > 9 ? '9+' : unreadCount}
                  </span>
                )}
              </Button>
            </div>
          </div>
        </header>

        {/* ================= PAGE CONTENT ================= */}
        <main className="flex-1 p-4 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;

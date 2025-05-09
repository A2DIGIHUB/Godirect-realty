
import { useState } from "react";
import { Link } from "react-router-dom";
import { 
  Search, 
  MessageSquare,
  Menu,
  User,
  LogOut,
  Moon,
  Sun,
  Settings,
  Clock,
  FileText,
  AlertTriangle,
  Calendar
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useSidebar } from "@/components/ui/sidebar";
import { useAuth } from "@/contexts/AuthContext";
import { NotificationSystem } from "@/components/dashboard/NotificationSystem";

type DashboardTopBarProps = {
  userType: "admin" | "agent" | "user";
};

export default function DashboardTopBar({ userType }: DashboardTopBarProps) {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const { toggleSidebar, isMobile } = useSidebar();
  const [searchOpen, setSearchOpen] = useState(false);
  const { user, signOut } = useAuth();

  // Toggle dark mode
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle("dark");
  };

  // Get user details based on type
  const getUserInfo = () => {
    const defaultInfo = {
      name: user?.user_metadata?.first_name ? 
        `${user.user_metadata.first_name} ${user.user_metadata.last_name || ''}` : 
        (user?.email?.split('@')[0] || "User"),
      email: user?.email || "user@example.com",
      image: user?.user_metadata?.avatar_url || null
    };
    
    return defaultInfo;
  };

  // Get notifications based on user type - these would ideally come from a database
  const getNotifications = () => {
    // Fetch these from database in the future
    const commonNotifications = [
      {
        id: 1,
        title: "System Update",
        message: "The system will undergo maintenance tonight at 12 AM.",
        time: "2 hours ago",
        icon: <Clock className="h-5 w-5 text-blue-500" />,
        bgColor: "bg-blue-500/10"
      }
    ];
    
    if (userType === "admin") {
      return [
        ...commonNotifications,
        {
          id: 2,
          title: "New Report Available",
          message: "The monthly sales report is now available for review.",
          time: "3 hours ago",
          icon: <FileText className="h-5 w-5 text-green-500" />,
          bgColor: "bg-green-500/10"
        },
        {
          id: 3,
          title: "Urgent: System Alert",
          message: "High server load detected. Please check the system status.",
          time: "1 day ago",
          icon: <AlertTriangle className="h-5 w-5 text-amber-500" />,
          bgColor: "bg-amber-500/10"
        }
      ];
    }
    
    if (userType === "agent") {
      return [
        ...commonNotifications,
        {
          id: 2,
          title: "New Lead Assigned",
          message: "A new lead has been assigned to you. Check your dashboard.",
          time: "5 hours ago",
          icon: <User className="h-5 w-5 text-green-500" />,
          bgColor: "bg-green-500/10"
        },
        {
          id: 3,
          title: "Appointment Reminder",
          message: "You have a property viewing scheduled tomorrow at 2 PM.",
          time: "Yesterday",
          icon: <Calendar className="h-5 w-5 text-violet-500" />,
          bgColor: "bg-violet-500/10"
        }
      ];
    }
    
    // User notifications
    return [
      ...commonNotifications,
      {
        id: 2,
        title: "Message from Agent",
        message: "Agent Smith sent you a message about your inquiry.",
        time: "4 hours ago",
        icon: <MessageSquare className="h-5 w-5 text-green-500" />,
        bgColor: "bg-green-500/10"
      },
      {
        id: 3,
        title: "Price Drop Alert",
        message: "A property in your favorites list has a 5% price reduction.",
        time: "Yesterday",
        icon: <AlertTriangle className="h-5 w-5 text-amber-500" />,
        bgColor: "bg-amber-500/10"
      }
    ];
  };

  const userInfo = getUserInfo();

  return (
    <div className="sticky top-0 z-30 w-full border-b bg-background shadow-sm">
      <div className="flex h-16 items-center px-4 md:px-6 transition-all duration-300 ease-in-out">
        {/* Mobile menu toggle */}
        <Button 
          variant="ghost" 
          size="icon" 
          className="mr-2 md:hidden" 
          onClick={toggleSidebar}
        >
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle menu</span>
        </Button>

        {/* Logo - mobile only */}
        <div className="flex items-center md:hidden">
          <Link to={`/${userType}-dashboard`} className="flex items-center gap-2 font-semibold">
            <div className="h-7 w-7 rounded-md bg-primary flex items-center justify-center">
              <span className="text-primary-foreground text-xs font-bold">GD</span>
            </div>
            <span>GODIRECT</span>
          </Link>
        </div>

        {/* Desktop search */}
        <div className="hidden md:flex md:flex-1 md:mx-6 transition-all duration-300 ease-in-out">
          <div className="relative w-full max-w-md transition-all duration-300 ease-in-out">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search..."
              className="w-full pl-8 bg-background border-muted transition-all duration-300 ease-in-out"
            />
          </div>
        </div>
        
        {/* Mobile search toggle */}
        <div className="flex md:hidden ml-auto">
          <Button variant="ghost" size="icon" onClick={() => setSearchOpen(!searchOpen)}>
            <Search className="h-5 w-5" />
          </Button>
        </div>

        {/* Mobile search dropdown */}
        {searchOpen && (
          <div className="absolute left-0 right-0 top-16 p-4 bg-background border-b md:hidden z-30">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search..."
                className="w-full pl-8"
                autoFocus
              />
            </div>
          </div>
        )}
        
        {/* Action buttons */}
        <div className="flex items-center gap-2 md:gap-4 transition-all duration-300 ease-in-out">
          {/* Notifications System */}
          <NotificationSystem />
          {/* Messages - Desktop only */}
          <Button variant="ghost" size="icon" className="relative hidden md:flex">
            <MessageSquare className="h-5 w-5" />
            <Badge variant="success" className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center">5</Badge>
            <span className="sr-only">Messages</span>
          </Button>

          {/* Dark mode toggle */}
          <Button variant="ghost" size="icon" onClick={toggleDarkMode}>
            {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            <span className="sr-only">Toggle theme</span>
          </Button>

          {/* User dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={userInfo.image || undefined} alt={userInfo.name} />
                  <AvatarFallback className="bg-primary text-primary-foreground">{userInfo.name.substring(0, 2)}</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56 bg-card">
              <DropdownMenuLabel>
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">{userInfo.name}</p>
                  <p className="text-xs leading-none text-muted-foreground">{userInfo.email}</p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link to={`/${userType}-dashboard/profile`} className="flex items-center">
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to={`/${userType}-dashboard/settings`} className="flex items-center">
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={signOut} className="text-destructive focus:text-destructive">
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
}

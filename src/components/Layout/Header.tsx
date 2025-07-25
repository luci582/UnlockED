import { Link, useLocation, useNavigate } from "react-router-dom";
import { Search, User, GraduationCap, LogOut, Settings, Menu, X, Shield, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { ThemeToggle } from "./ThemeToggle";
import { useState } from "react";
import { useAuth, usePermissions } from "@/hooks/use-auth";

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const permissions = usePermissions();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const navItems = [
    { href: "/", label: "Home", icon: GraduationCap },
    { href: "/courses", label: "Courses" },
    { href: "/leaderboard", label: "Leaderboard" },
    { href: "/submit-review", label: "Submit Review" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60">
      <div className="container flex h-16 items-center">
        <Link to="/" className="flex items-center space-x-2 group">
          {/* Styled logo container with hover effect */}
          <div className="p-2 bg-primary/10 rounded-lg transition-colors group-hover:bg-primary/20">
            <GraduationCap className="h-6 w-6 text-primary" />
          </div>
          <span className="text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            UnlockED
          </span>
        </Link>
        
        {/* Desktop Navigation */}
        <nav className="mx-6 hidden md:flex items-center space-x-4 lg:space-x-6">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.href;
            
            return (
              <Link
                key={item.href}
                to={item.href}
                className={`text-sm font-medium transition-all duration-200 hover:text-primary ${
                  isActive
                    ? "text-primary bg-primary/10 px-3 py-2 rounded-full"
                    : "text-muted-foreground hover:bg-primary/5 px-3 py-2 rounded-full"
                }`}
              >
                <div className="flex items-center space-x-1">
                  {Icon && <Icon className="h-4 w-4" />}
                  <span>{item.label}</span>
                </div>
              </Link>
            );
          })}
        </nav>

        <div className="ml-auto flex items-center space-x-3">
          <div className="relative hidden lg:block">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search courses..."
              className="pl-8 w-64"
            />
          </div>
          <ThemeToggle />
          
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full" data-testid="user-menu-trigger">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="" alt={user.firstName} />
                    <AvatarFallback className="bg-primary text-primary-foreground">
                      {user.firstName[0]}{user.lastName[0]}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">
                      {user.firstName} {user.lastName}
                    </p>
                    <p className="text-xs leading-none text-muted-foreground">
                      {user.email}
                    </p>
                    <div className="flex items-center space-x-2 mt-1">
                      <Badge variant="outline" className="text-xs">
                        {user.role}
                      </Badge>
                      <Badge variant="secondary" className="text-xs">
                        {user.totalPoints} pts
                      </Badge>
                    </div>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => navigate("/profile")}>
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </DropdownMenuItem>
                
                {permissions.canManageCourses && (
                  <DropdownMenuItem onClick={() => navigate("/instructor")}>
                    <BookOpen className="mr-2 h-4 w-4" />
                    <span>Instructor Dashboard</span>
                  </DropdownMenuItem>
                )}
                
                {permissions.isAdmin && (
                  <DropdownMenuItem onClick={() => navigate("/admin")}>
                    <Shield className="mr-2 h-4 w-4" />
                    <span>Admin Panel</span>
                  </DropdownMenuItem>
                )}
                
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button variant="outline" size="sm" onClick={() => navigate("/login")}>
              <User className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">Login</span>
            </Button>
          )}

          {/* Mobile Menu */}
          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon" data-testid="mobile-menu-trigger">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-80">
              <SheetHeader>
                <SheetTitle>Navigation</SheetTitle>
              </SheetHeader>
              <div className="flex flex-col space-y-4 mt-6">
                {/* Mobile Search */}
                <div className="relative lg:hidden">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search courses..."
                    className="pl-8"
                  />
                </div>
                
                {/* Mobile Navigation Links */}
                <nav className="flex flex-col space-y-2">
                  {navItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = location.pathname === item.href;
                    
                    return (
                      <Link
                        key={item.href}
                        to={item.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className={`flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
                          isActive
                            ? "text-primary bg-primary/10"
                            : "text-muted-foreground hover:text-primary hover:bg-primary/5"
                        }`}
                      >
                        {Icon && <Icon className="h-5 w-5" />}
                        <span className="font-medium">{item.label}</span>
                      </Link>
                    );
                  })}
                </nav>
                
                {/* Mobile User Section */}
                {user ? (
                  <div className="border-t pt-4 mt-4">
                    <div className="flex items-center space-x-3 px-3 py-2">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src="" alt={user.firstName} />
                        <AvatarFallback className="bg-primary text-primary-foreground">
                          {user.firstName[0]}{user.lastName[0]}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <p className="text-sm font-medium">
                          {user.firstName} {user.lastName}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {user.email}
                        </p>
                        <div className="flex items-center space-x-2 mt-1">
                          <Badge variant="outline" className="text-xs">
                            {user.role}
                          </Badge>
                          <Badge variant="secondary" className="text-xs">
                            {user.totalPoints} pts
                          </Badge>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col space-y-1 mt-2">
                      <Button 
                        variant="ghost" 
                        className="justify-start" 
                        size="sm"
                        onClick={() => {
                          navigate("/profile");
                          setMobileMenuOpen(false);
                        }}
                      >
                        <Settings className="mr-2 h-4 w-4" />
                        Profile
                      </Button>
                      
                      {permissions.canManageCourses && (
                        <Button 
                          variant="ghost" 
                          className="justify-start" 
                          size="sm"
                          onClick={() => {
                            navigate("/instructor");
                            setMobileMenuOpen(false);
                          }}
                        >
                          <BookOpen className="mr-2 h-4 w-4" />
                          Instructor
                        </Button>
                      )}
                      
                      {permissions.isAdmin && (
                        <Button 
                          variant="ghost" 
                          className="justify-start" 
                          size="sm"
                          onClick={() => {
                            navigate("/admin");
                            setMobileMenuOpen(false);
                          }}
                        >
                          <Shield className="mr-2 h-4 w-4" />
                          Admin
                        </Button>
                      )}
                      
                      <Button 
                        variant="ghost" 
                        className="justify-start" 
                        size="sm" 
                        onClick={() => {
                          handleLogout();
                          setMobileMenuOpen(false);
                        }}
                      >
                        <LogOut className="mr-2 h-4 w-4" />
                        Log out
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="border-t pt-4 mt-4">
                    <Button 
                      className="w-full" 
                      onClick={() => {
                        navigate("/login");
                        setMobileMenuOpen(false);
                      }}
                    >
                      <User className="h-4 w-4 mr-2" />
                      Login
                    </Button>
                  </div>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default Header;

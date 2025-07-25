import { Link, useLocation } from "react-router-dom";
import { Home, BookOpen, PlusCircle, Trophy, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const BottomTabBar = () => {
  const location = useLocation();

  const tabs = [
    {
      href: "/",
      label: "Home",
      icon: Home,
    },
    {
      href: "/courses",
      label: "Courses",
      icon: BookOpen,
    },
    {
      href: "/submit-review",
      label: "Review",
      icon: PlusCircle,
      isSpecial: true, // This will be the prominent center button
    },
    {
      href: "/leaderboard",
      label: "Leaderboard",
      icon: Trophy,
    },
    {
      href: "/profile",
      label: "Profile",
      icon: User,
    },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden">
      <div className="bg-background/95 backdrop-blur-md border-t border-border">
        <div className="flex items-center justify-around px-2 py-2">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = location.pathname === tab.href;
            
            if (tab.isSpecial) {
              return (
                <Link key={tab.href} to={tab.href} className="flex-1 flex justify-center">
                  <Button
                    className={`h-12 w-12 rounded-full transition-all duration-200 ${
                      isActive 
                        ? "bg-primary text-primary-foreground shadow-lg scale-110" 
                        : "bg-primary text-primary-foreground hover:bg-primary/90 hover:scale-105"
                    }`}
                    size="icon"
                  >
                    <Icon className="h-6 w-6" />
                  </Button>
                </Link>
              );
            }

            return (
              <Link 
                key={tab.href} 
                to={tab.href}
                className="flex-1 flex flex-col items-center py-2 px-1 transition-all duration-200"
              >
                <div className={`flex flex-col items-center space-y-1 ${
                  isActive ? "text-primary" : "text-muted-foreground"
                }`}>
                  <Icon className={`h-5 w-5 transition-transform ${
                    isActive ? "scale-110" : "scale-100"
                  }`} />
                  <span className="text-xs font-medium leading-none">
                    {tab.label}
                  </span>
                  {isActive && (
                    <div className="w-1 h-1 bg-primary rounded-full" />
                  )}
                </div>
              </Link>
            );
          })}
        </div>
      </div>
      {/* Safe area for devices with bottom bars */}
      <div className="h-safe-area-inset-bottom bg-background/95" />
    </div>
  );
};

export default BottomTabBar;

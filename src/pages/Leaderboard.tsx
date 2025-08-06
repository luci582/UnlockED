import { useState, useEffect } from "react";
import { Trophy, Medal, Award, Star, MessageSquare, TrendingUp, MapPin, Crown, Zap, Target, Users } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { Avatar, AvatarFallback } from "../components/ui/avatar";
import { Separator } from "../components/ui/separator";
import { Progress } from "../components/ui/progress";
import { Link } from "react-router-dom";
import { useAuth } from "../hooks/use-auth";
import { getLeaderboard } from "../lib/api";

const Leaderboard = () => {
  const { user } = useAuth();
  const [leaderboardData, setLeaderboardData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const result = await getLeaderboard();
        if (result.success && result.data?.leaderboard) {
          setLeaderboardData(result.data.leaderboard);
        }
      } catch (error) {
        console.error('Failed to fetch leaderboard:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchLeaderboard();
  }, []);

  // Find current user in leaderboard
  const currentUserData = leaderboardData.find((u: any) => u.email === user?.email);

  // Current user data (fallback to defaults if not found)
  const currentUser = currentUserData || {
    id: user?.id || 999,
    name: user?.username || "You",
    email: user?.email || "",
    reviewCount: user?.reviewCount || 0,
    points: 0, // Default points for new users
    rank: 999, // Will be calculated properly below
    badge: "🆕 New Reviewer",
    recentActivity: user?.reviewCount > 0 ? "Recently submitted a review" : "No reviews yet",
    helpful: 0,
    degree: "Student",
    streakCount: 0,
    hasStreak: false
  };

  // Static top contributors for display purposes (mix with real data)
  const staticTopContributors = [
    {
      id: 1,
      name: "Alex Chen",
      email: "alex.chen@student.unsw.edu.au",
      reviewCount: 47,
      points: 2350,
      rank: 1,
      badge: "🏆 Top Reviewer",
      recentActivity: "Reviewed COMP2511",
      helpful: 156,
      degree: "Computer Science",
      streakCount: 6,
      hasStreak: true
    },
    {
      id: 2,
      name: "Sarah Williams",
      email: "sarah.williams@student.unsw.edu.au",
      reviewCount: 39,
      points: 1950,
      rank: 2,
      badge: "✅ Verified Student",
      recentActivity: "Reviewed MGMT1001",
      helpful: 142,
      degree: "Commerce",
      streakCount: 3,
      hasStreak: true
    },
    {
      id: 3,
      name: "Jordan Smith",
      email: "jordan.smith@student.unsw.edu.au",
      reviewCount: 34,
      points: 1700,
      rank: 3,
      badge: "📚 Course Expert",
      recentActivity: "Reviewed PSYC1001",
      helpful: 128,
      degree: "Psychology",
      streakCount: 5,
      hasStreak: true
    },
    {
      id: 4,
      name: "Emily Davis",
      email: "emily.davis@student.unsw.edu.au",
      reviewCount: 28,
      points: 1400,
      rank: 4,
      badge: "🌟 Helpful Reviewer",
      recentActivity: "Reviewed MATH1131",
      helpful: 89,
      degree: "Engineering",
      streakCount: 2,
      hasStreak: false
    },
    {
      id: 5,
      name: "Michael Brown",
      email: "michael.brown@student.unsw.edu.au",
      reviewCount: 25,
      points: 1250,
      rank: 5,
      badge: "⚡ Active Member",
      recentActivity: "Reviewed ECON1101",
      helpful: 76,
      degree: "Economics",
      streakCount: 4,
      hasStreak: false
    },
    {
      id: 6,
      name: "Jessica Lee",
      email: "jessica.lee@student.unsw.edu.au",
      reviewCount: 22,
      points: 1100,
      rank: 6,
      badge: "🎯 Detail Expert",
      recentActivity: "Reviewed FINS1613",
      helpful: 67,
      degree: "Finance",
      streakCount: 1,
      hasStreak: false
    },
    {
      id: 7,
      name: "David Wilson",
      email: "david.wilson@student.unsw.edu.au",
      reviewCount: 19,
      points: 950,
      rank: 7,
      badge: "📝 Writer",
      recentActivity: "Reviewed ENGG1000",
      helpful: 54,
      degree: "Engineering",
      streakCount: 0,
      hasStreak: false
    },
    {
      id: 8,
      name: "Amanda Garcia",
      email: "amanda.garcia@student.unsw.edu.au",
      reviewCount: 16,
      points: 800,
      rank: 8,
      badge: "🚀 Rising Star",
      recentActivity: "Reviewed BIOS1101",
      helpful: 43,
      degree: "Science",
      streakCount: 3,
      hasStreak: false
    }
  ];

  // Combine real users with static ones, sort by points
  const allUsers = [...staticTopContributors, ...leaderboardData];
  const topContributors = allUsers
    .sort((a, b) => (b.points || 0) - (a.points || 0))
    .slice(0, 10)
    .map((user, index) => ({ ...user, rank: index + 1 }));

  // Update current user rank based on actual position
  if (currentUser.email === user?.email) {
    const userPosition = allUsers
      .sort((a, b) => (b.points || 0) - (a.points || 0))
      .findIndex((u) => u.email === user?.email);
    currentUser.rank = userPosition >= 0 ? userPosition + 1 : allUsers.length + 1;
  }

  const achievements = [
    {
      icon: Trophy,
      title: "First Review",
      description: "Submit your first course review",
      points: 50,
      unlocked: true
    },
    {
      icon: Medal,
      title: "Helpful Reviewer",
      description: "Receive 10 helpful votes",
      points: 100,
      unlocked: true
    },
    {
      icon: Star,
      title: "Detail Expert",
      description: "Write 5 detailed reviews",
      points: 200,
      unlocked: false
    },
    {
      icon: Award,
      title: "Community Leader",
      description: "Reach top 10 on leaderboard",
      points: 500,
      unlocked: false
    }
  ];

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Trophy className="h-5 w-5 text-yellow-500" />;
      case 2:
        return <Medal className="h-5 w-5 text-gray-400" />;
      case 3:
        return <Award className="h-5 w-5 text-amber-600" />;
      default:
        return <span className="text-lg font-bold text-muted-foreground">#{rank}</span>;
    }
  };

  const getRankStyles = (rank: number) => {
    switch (rank) {
      case 1:
        return "bg-gradient-to-r from-yellow-50 to-yellow-100 border-yellow-300 dark:from-yellow-950/30 dark:to-yellow-900/20 dark:border-yellow-700";
      case 2:
        return "bg-gradient-to-r from-gray-50 to-gray-100 border-gray-300 dark:from-gray-950/30 dark:to-gray-900/20 dark:border-gray-700";
      case 3:
        return "bg-gradient-to-r from-amber-50 to-amber-100 border-amber-300 dark:from-amber-950/30 dark:to-amber-900/20 dark:border-amber-700";
      default:
        return "";
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Enhanced Header with Stats Overview */}
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-6 gap-4">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <Crown className="h-6 w-6 md:h-8 md:w-8 text-yellow-500" />
                <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-yellow-600 to-orange-600 bg-clip-text text-transparent">
                  Community Leaderboard
                </h1>
              </div>
              <p className="text-sm md:text-base text-muted-foreground">
                Recognizing our top contributors who help fellow students make informed decisions
              </p>
            </div>
            <div className="flex lg:flex-col xl:flex-row items-center gap-2 lg:gap-4">
              <Card className="p-3 md:p-4 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20 border-blue-200 dark:border-blue-800 flex-1 lg:flex-none">
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 md:h-5 md:w-5 text-blue-600" />
                  <div>
                    <div className="text-xs md:text-sm font-medium text-blue-800 dark:text-blue-200">Active Users</div>
                    <div className="text-base md:text-lg font-bold text-blue-900 dark:text-blue-100">{leaderboardData.length || staticTopContributors.length}</div>
                  </div>
                </div>
              </Card>
              <Card className="p-3 md:p-4 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20 border-green-200 dark:border-green-800 flex-1 lg:flex-none">
                <div className="flex items-center gap-2">
                  <Target className="h-4 w-4 md:h-5 md:w-5 text-green-600" />
                  <div>
                    <div className="text-xs md:text-sm font-medium text-green-800 dark:text-green-200">Total Reviews</div>
                    <div className="text-base md:text-lg font-bold text-green-900 dark:text-green-100">
                      {(leaderboardData.length > 0 ? leaderboardData : staticTopContributors).reduce((sum: number, user: any) => sum + user.reviewCount, 0)}
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>

        {isLoading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading leaderboard...</p>
          </div>
        ) : (
          <>
            {/* Enhanced Current User Stats Card */}
            {user && (
              <div className="mb-8">
                <Card className="overflow-hidden bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 border-primary/20 shadow-lg">
                  <CardContent className="p-0">
                    <div className="bg-gradient-to-r from-primary/10 to-transparent p-6">
                      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-4 gap-4">
                        <div className="flex items-center gap-3 md:gap-4">
                          <div className="relative">
                            <Avatar className="h-12 w-12 md:h-16 md:w-16 border-2 border-primary/20">
                              <AvatarFallback className="text-sm md:text-lg font-bold bg-primary/10">
                                {currentUser.name.split(' ').map(n => n[0]).join('')}
                              </AvatarFallback>
                            </Avatar>
                            <div className="absolute -bottom-1 -right-1 bg-primary text-primary-foreground rounded-full px-1.5 md:px-2 py-0.5 text-xs font-bold">
                              #{currentUser.rank}
                            </div>
                          </div>
                          
                          <div className="min-w-0 flex-1">
                            <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 mb-2">
                              <h3 className="text-lg md:text-xl font-bold text-primary truncate">{currentUser.name}</h3>
                              {currentUser.hasStreak && (
                                <Badge className="bg-gradient-to-r from-orange-500 to-red-500 text-white animate-pulse text-xs w-fit">
                                  🔥 {currentUser.streakCount} day streak
                                </Badge>
                              )}
                            </div>
                            <div className="flex flex-wrap items-center gap-1 md:gap-2 mb-1">
                              <Badge variant="secondary" className="text-xs">
                                {currentUser.badge}
                              </Badge>
                              <Badge variant="outline" className="text-xs bg-primary/10 border-primary/30">
                                {currentUser.degree}
                              </Badge>
                            </div>
                            <p className="text-xs md:text-sm text-muted-foreground truncate">
                              {currentUser.recentActivity}
                            </p>
                          </div>
                        </div>
                        
                        <Link to="/submit-review" className="self-start lg:self-auto">
                          <Button className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 shadow-lg w-full sm:w-auto">
                            <Zap className="h-4 w-4 mr-2" />
                            Write Review
                          </Button>
                        </Link>
                      </div>
                      
                      {/* Stats Grid */}
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
                        <div className="text-center">
                          <div className="flex items-center justify-center mb-1">
                            <MessageSquare className="h-3 w-3 md:h-4 md:w-4 text-blue-600 mr-1" />
                            <span className="text-lg md:text-2xl font-bold text-blue-600">{currentUser.reviewCount}</span>
                          </div>
                          <p className="text-xs text-muted-foreground">Reviews</p>
                        </div>
                        
                        <div className="text-center">
                          <div className="flex items-center justify-center mb-1">
                            <Star className="h-3 w-3 md:h-4 md:w-4 text-yellow-500 mr-1" />
                            <span className="text-lg md:text-2xl font-bold text-yellow-600">{currentUser.helpful}</span>
                          </div>
                          <p className="text-xs text-muted-foreground">Helpful</p>
                        </div>
                        
                        <div className="text-center">
                          <div className="flex items-center justify-center mb-1">
                            <Trophy className="h-3 w-3 md:h-4 md:w-4 text-primary mr-1" />
                            <span className="text-lg md:text-2xl font-bold text-primary">{currentUser.points}</span>
                          </div>
                          <p className="text-xs text-muted-foreground">Points</p>
                        </div>
                        
                        <div className="text-center">
                          <div className="flex items-center justify-center mb-1">
                            <TrendingUp className="h-3 w-3 md:h-4 md:w-4 text-green-600 mr-1" />
                            <span className="text-lg md:text-2xl font-bold text-green-600">#{currentUser.rank}</span>
                          </div>
                          <p className="text-xs text-muted-foreground">Rank</p>
                        </div>
                      </div>
                      
                      {/* Progress to next level */}
                      <div className="mt-4 pt-4 border-t border-primary/10">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between text-sm mb-2 gap-1">
                          <span className="text-muted-foreground">Progress to next badge</span>
                          <span className="font-medium">{Math.min(currentUser.points, 2500)}/2500 pts</span>
                        </div>
                        <Progress 
                          value={(currentUser.points / 2500) * 100} 
                          className="h-2"
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

        <div className="grid gap-6 lg:gap-8 lg:grid-cols-3">
          {/* Leaderboard */}
          <div className="lg:col-span-2 order-1 lg:order-1">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <TrendingUp className="h-4 w-4 md:h-5 md:w-5" />
                  <span className="text-base md:text-lg">Top Contributors</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-3 md:p-6">
                <div className="space-y-3 md:space-y-4">
                  {topContributors.map((contributor) => (
                    <div
                      key={contributor.id}
                      className={`flex items-center gap-3 p-3 md:p-4 rounded-lg border ${
                        contributor.rank <= 3 
                          ? getRankStyles(contributor.rank)
                          : "hover:bg-muted/50"
                      }`}
                    >
                      {/* Rank Icon */}
                      <div className="flex items-center justify-center w-6 md:w-8 flex-shrink-0">
                        {getRankIcon(contributor.rank)}
                      </div>
                      
                      {/* Avatar */}
                      <Avatar className="h-8 w-8 md:h-10 md:w-10 flex-shrink-0">
                        <AvatarFallback className="text-xs md:text-sm">
                          {contributor.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      
                      {/* User Info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-semibold text-sm md:text-base truncate">
                            {contributor.name}
                          </span>
                          <Badge variant="secondary" className="text-xs shrink-0 hidden md:inline-flex">
                            {contributor.badge}
                          </Badge>
                        </div>
                        <div className="text-xs md:text-sm text-muted-foreground truncate">
                          {contributor.recentActivity}
                        </div>
                      </div>
                      
                      {/* Stats */}
                      <div className="flex flex-col items-end gap-1 flex-shrink-0">
                        <div className="flex items-center gap-2 text-xs md:text-sm">
                          <MessageSquare className="h-3 w-3" />
                          <span>{contributor.reviewCount}</span>
                        </div>
                        <div className="font-semibold text-primary text-xs md:text-sm">
                          {contributor.points} pts
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                {/* "You Are Here" section - only show if user is not in top 10 */}
                {currentUser.rank > 10 && (
                  <>
                    <div className="flex items-center justify-center my-3 md:my-4">
                      <div className="flex-1 border-t border-dashed border-muted-foreground/30"></div>
                      <span className="px-3 text-xs text-muted-foreground">Your Position</span>
                      <div className="flex-1 border-t border-dashed border-muted-foreground/30"></div>
                    </div>
                    
                    <div className="flex items-center gap-3 p-3 md:p-4 rounded-lg border-2 border-primary/50 bg-primary/5">
                      {/* Rank */}
                      <div className="flex items-center justify-center w-6 md:w-8 flex-shrink-0">
                        <span className="text-sm md:text-base font-bold text-primary">#{currentUser.rank}</span>
                      </div>
                      
                      {/* Avatar */}
                      <Avatar className="h-8 w-8 md:h-10 md:w-10 flex-shrink-0 ring-2 ring-primary/30">
                        <AvatarFallback className="bg-primary/20 text-primary font-semibold text-xs md:text-sm">
                          {currentUser.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      
                      {/* User Info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-semibold text-primary text-sm md:text-base truncate">{currentUser.name}</span>
                          <Badge variant="default" className="text-xs bg-primary text-primary-foreground shrink-0 hidden md:inline-flex">
                            {currentUser.badge}
                          </Badge>
                        </div>
                        <div className="text-xs md:text-sm text-muted-foreground truncate">
                          {currentUser.recentActivity}
                        </div>
                      </div>
                      
                      {/* Stats */}
                      <div className="flex flex-col items-end gap-1 flex-shrink-0">
                        <div className="flex items-center gap-2 text-xs md:text-sm">
                          <MessageSquare className="h-3 w-3" />
                          <span>{currentUser.reviewCount}</span>
                        </div>
                        <div className="font-semibold text-primary text-xs md:text-sm">
                          {currentUser.points} pts
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-4 lg:space-y-6 order-2 lg:order-2">
            {/* CTA Card */}
            <Card className="bg-gradient-to-br from-primary/5 to-accent/5">
              <CardContent className="p-4 md:p-6 text-center">
                <Trophy className="h-8 w-8 md:h-12 md:w-12 text-primary mx-auto mb-3 md:mb-4" />
                <h3 className="font-semibold mb-2 text-sm md:text-base">Join the Leaderboard!</h3>
                <p className="text-xs md:text-sm text-muted-foreground mb-3 md:mb-4">
                  Start reviewing courses to earn Reward Points and help fellow students
                </p>
                <Link to="/submit-review">
                  <Button className="w-full text-sm">Submit Your First Review</Button>
                </Link>
              </CardContent>
            </Card>

            {/* Achievements */}
            <Card>
              <CardHeader className="pb-3 md:pb-6">
                <CardTitle className="text-base md:text-lg">Achievements</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 md:space-y-4">
                  {achievements.map((achievement, index) => {
                    const Icon = achievement.icon;
                    return (
                      <div
                        key={index}
                        className={`flex items-start space-x-2 md:space-x-3 p-2 md:p-3 rounded-lg ${
                          achievement.unlocked 
                            ? "bg-course-skill-tag/30" 
                            : "bg-muted/30 opacity-60"
                        }`}
                      >
                        <Icon className={`h-4 w-4 md:h-5 md:w-5 mt-0.5 shrink-0 ${
                          achievement.unlocked ? "text-primary" : "text-muted-foreground"
                        }`} />
                        <div className="flex-1 min-w-0">
                          <div className="font-medium text-xs md:text-sm truncate">{achievement.title}</div>
                          <div className="text-xs text-muted-foreground mb-1 line-clamp-2">
                            {achievement.description}
                          </div>
                          <Badge variant="outline" className="text-xs">
                            {achievement.points} pts
                          </Badge>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Points System */}
            <Card>
              <CardHeader className="pb-3 md:pb-6">
                <CardTitle className="text-base md:text-lg">How Reward Points Work</CardTitle>
              </CardHeader>
              <CardContent className="text-xs md:text-sm space-y-2">
                <div className="flex justify-between">
                  <span>Submit review</span>
                  <span className="font-medium">+50 pts</span>
                </div>
                <div className="flex justify-between">
                  <span>Helpful vote received</span>
                  <span className="font-medium">+5 pts</span>
                </div>
                <div className="flex justify-between">
                  <span>Detailed review bonus</span>
                  <span className="font-medium">+25 pts</span>
                </div>
                <div className="flex justify-between">
                  <span>First review of course</span>
                  <span className="font-medium">+100 pts</span>
                </div>
                <div className="flex justify-between">
                  <span>Review streak bonus</span>
                  <span className="font-medium">+50 pts</span>
                </div>
                <Separator className="my-3" />
                <div className="text-xs text-muted-foreground">
                  🔥 Hot Streak: Review courses for 3+ consecutive semesters for extra points!
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* UNSW Merchandise Rewards */}
        <div className="mt-8 lg:mt-12">
          <Card className="bg-gradient-to-br from-primary/5 to-accent/5">
            <CardHeader className="pb-4 lg:pb-6">
              <CardTitle className="flex items-center space-x-2 text-base md:text-lg">
                <Trophy className="h-4 w-4 md:h-5 md:w-5 text-primary" />
                <span>Redeem UNSW Merchandise</span>
              </CardTitle>
              <p className="text-xs md:text-sm text-muted-foreground">
                Use your Reward Points to claim exclusive UNSW merchandise
              </p>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:gap-6 md:grid-cols-2 max-w-2xl mx-auto">
                <div className="bg-background rounded-lg p-4 md:p-6 border shadow-sm">
                   <div className="text-center">
                     <div className="w-16 h-16 md:w-20 md:h-20 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-3 md:mb-4 overflow-hidden">
                       <img 
                         src="https://thegradshop.arc.unsw.edu.au/cdn/shop/files/Artboard10.jpg?v=1696568056" 
                         alt="UNSW Hoodie" 
                         className="w-full h-full object-cover"
                       />
                     </div>
                     <h3 className="font-semibold mb-2 text-sm md:text-base">UNSW Hoodie</h3>
                     <p className="text-xs md:text-sm text-muted-foreground mb-3 md:mb-4">
                       Official UNSW branded hoodie in navy blue
                     </p>
                    <div className="flex items-center justify-center space-x-2 mb-3 md:mb-4">
                      <Star className="h-3 w-3 md:h-4 md:w-4 text-course-rating" />
                      <span className="font-bold text-base md:text-lg">1,500 pts</span>
                    </div>
                    <Button variant="outline" className="w-full text-sm" disabled>
                      Claim Reward
                    </Button>
                  </div>
                </div>

                <div className="bg-background rounded-lg p-4 md:p-6 border shadow-sm">
                   <div className="text-center">
                     <div className="w-16 h-16 md:w-20 md:h-20 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-3 md:mb-4 overflow-hidden">
                       <img 
                         src="https://thegradshop.arc.unsw.edu.au/cdn/shop/files/ToteBag2.jpg?v=1710824794" 
                         alt="UNSW Tote Bag" 
                         className="w-full h-full object-cover"
                       />
                     </div>
                     <h3 className="font-semibold mb-2 text-sm md:text-base">UNSW Tote Bag</h3>
                     <p className="text-xs md:text-sm text-muted-foreground mb-3 md:mb-4">
                       Eco-friendly UNSW branded tote bag
                     </p>
                    <div className="flex items-center justify-center space-x-2 mb-3 md:mb-4">
                      <Star className="h-3 w-3 md:h-4 md:w-4 text-course-rating" />
                      <span className="font-bold text-base md:text-lg">800 pts</span>
                    </div>
                    <Button variant="outline" className="w-full text-sm" disabled>
                      Claim Reward
                    </Button>
                  </div>
                </div>
              </div>

              <div className="text-center mt-4 md:mt-6">
                <p className="text-xs text-muted-foreground px-4">
                  Rewards will be available for pickup at the Student Hub. More items coming soon!
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Leaderboard;
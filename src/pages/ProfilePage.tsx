import { useState } from "react";
import { User, Star, MessageSquare, Trophy, Award, Medal, Lock, BookOpen, Target } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

const ProfilePage = () => {
  const [activeTab, setActiveTab] = useState("overview");

  // Mock user data
  const user = {
    name: "Alex Chen",
    email: "alex.chen@student.unsw.edu.au",
    studentId: "z5555555",
    degree: "Bachelor of Computer Science",
    reviewCount: 8,
    points: 425,
    rank: 234,
    helpful: 12,
    joinDate: "March 2024",
  };

  // Achievements data
  const achievements = [
    {
      id: "first-review",
      icon: MessageSquare,
      title: "First Review",
      description: "Submit your first course review",
      points: 50,
      unlocked: true,
      unlockedDate: "March 15, 2024",
      progress: 100,
      requirement: "Submit 1 review",
    },
    {
      id: "helpful-reviewer",
      icon: Star,
      title: "Helpful Reviewer",
      description: "Receive 10 helpful votes",
      points: 100,
      unlocked: true,
      unlockedDate: "April 2, 2024",
      progress: 100,
      requirement: "Receive 10 helpful votes",
    },
    {
      id: "detail-expert",
      icon: BookOpen,
      title: "Detail Expert",
      description: "Write 5 detailed reviews (200+ words)",
      points: 200,
      unlocked: false,
      progress: 60,
      requirement: "Write 5 detailed reviews",
      current: "3/5 detailed reviews",
    },
    {
      id: "community-leader",
      icon: Trophy,
      title: "Community Leader",
      description: "Reach top 100 on leaderboard",
      points: 500,
      unlocked: false,
      progress: 25,
      requirement: "Reach top 100",
      current: "Currently rank #234",
    },
    {
      id: "course-explorer",
      icon: Target,
      title: "Course Explorer",
      description: "Review courses from 3 different faculties",
      points: 150,
      unlocked: false,
      progress: 66,
      requirement: "Review 3 different faculties",
      current: "2/3 faculties reviewed",
    },
    {
      id: "prolific-writer",
      icon: Award,
      title: "Prolific Writer",
      description: "Submit 25 course reviews",
      points: 300,
      unlocked: false,
      progress: 32,
      requirement: "Submit 25 reviews",
      current: "8/25 reviews submitted",
    },
    {
      id: "hot-streak",
      icon: Medal,
      title: "Hot Streak",
      description: "Review courses for 3 consecutive semesters",
      points: 250,
      unlocked: false,
      progress: 66,
      requirement: "3 consecutive semesters",
      current: "2/3 semesters",
    },
    {
      id: "master-reviewer",
      icon: Trophy,
      title: "Master Reviewer",
      description: "Reach 1000 Reward Points",
      points: 1000,
      unlocked: false,
      progress: 42,
      requirement: "Earn 1000 points",
      current: "425/1000 points",
    },
  ];

  const recentReviews = [
    {
      courseCode: "COMP1511",
      courseName: "Programming Fundamentals",
      rating: 4,
      date: "May 15, 2024",
      helpful: 3,
    },
    {
      courseCode: "MATH1131",
      courseName: "Mathematics 1A",
      rating: 5,
      date: "May 10, 2024",
      helpful: 5,
    },
    {
      courseCode: "COMP1521",
      courseName: "Computer Systems Fundamentals",
      rating: 4,
      date: "April 28, 2024",
      helpful: 2,
    },
  ];

  const unlockedAchievements = achievements.filter(a => a.unlocked);
  const lockedAchievements = achievements.filter(a => !a.unlocked);

  return (
    <div className="min-h-screen bg-background">
      <div className="container py-8 max-w-6xl">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-start space-x-6">
            <Avatar className="h-20 w-20">
              <AvatarFallback className="text-xl">
                {user.name.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <h1 className="text-3xl font-bold">{user.name}</h1>
              <p className="text-muted-foreground">{user.degree}</p>
              <p className="text-sm text-muted-foreground">{user.email}</p>
              <div className="flex items-center space-x-4 mt-4">
                <Badge variant="outline" className="bg-primary/10">
                  Rank #{user.rank}
                </Badge>
                <Badge variant="outline">
                  {user.points} Reward Points
                </Badge>
                <Badge variant="outline">
                  {user.reviewCount} Reviews
                </Badge>
              </div>
            </div>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="achievements">
              Achievements ({unlockedAchievements.length}/{achievements.length})
            </TabsTrigger>
            <TabsTrigger value="reviews">Reviews</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-base">Review Stats</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm">Total Reviews</span>
                    <span className="font-semibold">{user.reviewCount}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Helpful Votes</span>
                    <span className="font-semibold">{user.helpful}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Member Since</span>
                    <span className="font-semibold">{user.joinDate}</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-base">Progress to Next Rank</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Current: #{user.rank}</span>
                      <span>Next: #{user.rank - 1}</span>
                    </div>
                    <Progress value={75} className="h-2" />
                    <p className="text-xs text-muted-foreground">
                      25 more points needed to rank up
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-base">Recent Achievement</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-primary/10 rounded-full">
                      <Star className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium text-sm">Helpful Reviewer</p>
                      <p className="text-xs text-muted-foreground">Unlocked April 2, 2024</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="achievements" className="space-y-6">
            <TooltipProvider>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {achievements.map((achievement) => {
                  const Icon = achievement.icon;
                  return (
                    <Tooltip key={achievement.id}>
                      <TooltipTrigger asChild>
                        <Card 
                          className={`transition-all duration-200 hover:scale-105 cursor-pointer ${
                            achievement.unlocked 
                              ? "bg-primary/5 border-primary/20 shadow-md" 
                              : "opacity-60"
                          }`}
                        >
                          <CardHeader className="pb-3">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-3">
                                <div className={`p-2 rounded-full ${
                                  achievement.unlocked 
                                    ? "bg-primary/20 text-primary" 
                                    : "bg-muted text-muted-foreground"
                                }`}>
                                  {achievement.unlocked ? (
                                    <Icon className="h-5 w-5" />
                                  ) : (
                                    <Lock className="h-5 w-5" />
                                  )}
                                </div>
                                <div>
                                  <h3 className="font-semibold text-sm">{achievement.title}</h3>
                                  <Badge variant="outline" className="text-xs">
                                    {achievement.points} pts
                                  </Badge>
                                </div>
                              </div>
                            </div>
                          </CardHeader>
                          <CardContent className="space-y-3">
                            <p className="text-xs text-muted-foreground">
                              {achievement.description}
                            </p>
                            
                            {!achievement.unlocked && (
                              <div className="space-y-2">
                                <div className="flex justify-between text-xs">
                                  <span>{achievement.current}</span>
                                  <span>{achievement.progress}%</span>
                                </div>
                                <Progress value={achievement.progress} className="h-1.5" />
                              </div>
                            )}
                            
                            {achievement.unlocked && (
                              <div className="flex items-center space-x-1 text-xs text-primary">
                                <Trophy className="h-3 w-3" />
                                <span>Unlocked {achievement.unlockedDate}</span>
                              </div>
                            )}
                          </CardContent>
                        </Card>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="text-sm">{achievement.requirement}</p>
                      </TooltipContent>
                    </Tooltip>
                  );
                })}
              </div>
            </TooltipProvider>
          </TabsContent>

          <TabsContent value="reviews" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Your Recent Reviews</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {recentReviews.map((review, index) => (
                  <div key={index}>
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-semibold">{review.courseCode}</h4>
                        <p className="text-sm text-muted-foreground">{review.courseName}</p>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center space-x-1 mb-1">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star
                              key={i}
                              className={`h-3 w-3 ${
                                i < review.rating
                                  ? "fill-primary text-primary"
                                  : "text-muted-foreground"
                              }`}
                            />
                          ))}
                        </div>
                        <p className="text-xs text-muted-foreground">
                          {review.helpful} helpful • {review.date}
                        </p>
                      </div>
                    </div>
                    {index < recentReviews.length - 1 && <Separator className="mt-4" />}
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ProfilePage;

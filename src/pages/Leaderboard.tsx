import { Trophy, Medal, Award, Star, MessageSquare, TrendingUp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Link } from "react-router-dom";

const Leaderboard = () => {
  const topContributors = [
    {
      id: 1,
      name: "Alex Chen",
      reviewCount: 47,
      points: 2350,
      rank: 1,
      badge: "Top Reviewer",
      recentActivity: "Reviewed COMP2511",
      helpful: 156,
      degree: "Computer Science",
      streakCount: 6,
      hasStreak: true
    },
    {
      id: 2,
      name: "Sarah Williams",
      reviewCount: 39,
      points: 1950,
      rank: 2,
      badge: "Verified Student",
      recentActivity: "Reviewed MGMT1001",
      helpful: 142,
      degree: "Commerce",
      streakCount: 3,
      hasStreak: true
    },
    {
      id: 3,
      name: "Jordan Smith",
      reviewCount: 34,
      points: 1700,
      rank: 3,
      badge: "Course Expert",
      recentActivity: "Reviewed PSYC1001",
      helpful: 128,
      degree: "Psychology",
      streakCount: 5,
      hasStreak: true
    },
    {
      id: 4,
      name: "Emily Davis",
      reviewCount: 28,
      points: 1400,
      rank: 4,
      badge: "Helpful Reviewer",
      recentActivity: "Reviewed MATH1131",
      helpful: 89,
      degree: "Engineering",
      streakCount: 2,
      hasStreak: false
    },
    {
      id: 5,
      name: "Michael Brown",
      reviewCount: 25,
      points: 1250,
      rank: 5,
      badge: "Active Member",
      recentActivity: "Reviewed ECON1101",
      helpful: 76,
      degree: "Economics",
      streakCount: 4,
      hasStreak: false
    }
  ];

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
      <div className="container py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Community Leaderboard</h1>
          <p className="text-muted-foreground">
            Recognizing our top contributors who help fellow students make informed decisions
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Leaderboard */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <TrendingUp className="h-5 w-5" />
                  <span>Top Contributors</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {topContributors.map((contributor) => (
                    <div
                      key={contributor.id}
                      className={`flex items-center space-x-4 p-4 rounded-lg border transition-all duration-200 hover:scale-[1.02] hover:shadow-md ${
                        contributor.rank <= 3 
                          ? getRankStyles(contributor.rank)
                          : "hover:bg-muted/50"
                      }`}
                    >
                      <div className="flex items-center justify-center w-12">
                        {getRankIcon(contributor.rank)}
                      </div>
                      
                      <Avatar className="h-10 w-10">
                        <AvatarFallback>
                          {contributor.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <span className="font-semibold">{contributor.name}</span>
                          <Badge variant="secondary" className="text-xs">
                            {contributor.badge}
                          </Badge>
                          <Badge variant="outline" className="text-xs bg-primary/10">
                            {contributor.degree}
                          </Badge>
                          {contributor.hasStreak && (
                            <Badge className="text-xs bg-course-rating text-foreground">
                              🔥 Hot Streak ({contributor.streakCount})
                            </Badge>
                          )}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {contributor.recentActivity}
                        </div>
                      </div>
                      
                      <div className="text-right">
                        <div className="flex items-center space-x-4 text-sm">
                          <div className="flex items-center space-x-1">
                            <MessageSquare className="h-3 w-3" />
                            <span>{contributor.reviewCount}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Star className="h-3 w-3" />
                            <span>{contributor.helpful}</span>
                          </div>
                          <div className="font-semibold text-primary">
                            {contributor.points} pts
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* CTA Card */}
            <Card className="bg-gradient-to-br from-primary/5 to-accent/5">
              <CardContent className="p-6 text-center">
                <Trophy className="h-12 w-12 text-primary mx-auto mb-4" />
                <h3 className="font-semibold mb-2">Join the Leaderboard!</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Start reviewing courses to earn Reward Points and help fellow students
                </p>
                <Link to="/submit-review">
                  <Button className="w-full">Submit Your First Review</Button>
                </Link>
              </CardContent>
            </Card>

            {/* Achievements */}
            <Card>
              <CardHeader>
                <CardTitle>Achievements</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {achievements.map((achievement, index) => {
                    const Icon = achievement.icon;
                    return (
                      <div
                        key={index}
                        className={`flex items-start space-x-3 p-3 rounded-lg ${
                          achievement.unlocked 
                            ? "bg-course-skill-tag/30" 
                            : "bg-muted/30 opacity-60"
                        }`}
                      >
                        <Icon className={`h-5 w-5 mt-0.5 ${
                          achievement.unlocked ? "text-primary" : "text-muted-foreground"
                        }`} />
                        <div className="flex-1">
                          <div className="font-medium text-sm">{achievement.title}</div>
                          <div className="text-xs text-muted-foreground mb-1">
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
              <CardHeader>
                <CardTitle>How Reward Points Work</CardTitle>
              </CardHeader>
              <CardContent className="text-sm space-y-2">
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
        <div className="mt-12">
          <Card className="bg-gradient-to-br from-primary/5 to-accent/5">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Trophy className="h-5 w-5 text-primary" />
                <span>Redeem UNSW Merchandise</span>
              </CardTitle>
              <p className="text-sm text-muted-foreground">
                Use your Reward Points to claim exclusive UNSW merchandise
              </p>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 md:grid-cols-2 max-w-2xl mx-auto">
                <div className="bg-background rounded-lg p-6 border shadow-sm">
                   <div className="text-center">
                     <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                       <span className="text-2xl">👕</span>
                     </div>
                     <h3 className="font-semibold mb-2">UNSW Hoodie</h3>
                     <p className="text-sm text-muted-foreground mb-4">
                       Official UNSW branded hoodie in navy blue
                     </p>
                    <div className="flex items-center justify-center space-x-2 mb-4">
                      <Star className="h-4 w-4 text-course-rating" />
                      <span className="font-bold text-lg">1,500 pts</span>
                    </div>
                    <Button variant="outline" className="w-full" disabled>
                      Claim Reward
                    </Button>
                  </div>
                </div>

                <div className="bg-background rounded-lg p-6 border shadow-sm">
                   <div className="text-center">
                     <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                       <span className="text-2xl">👜</span>
                     </div>
                     <h3 className="font-semibold mb-2">UNSW Tote Bag</h3>
                     <p className="text-sm text-muted-foreground mb-4">
                       Eco-friendly UNSW branded tote bag
                     </p>
                    <div className="flex items-center justify-center space-x-2 mb-4">
                      <Star className="h-4 w-4 text-course-rating" />
                      <span className="font-bold text-lg">800 pts</span>
                    </div>
                    <Button variant="outline" className="w-full" disabled>
                      Claim Reward
                    </Button>
                  </div>
                </div>
              </div>

              <div className="text-center mt-6">
                <p className="text-xs text-muted-foreground">
                  Rewards will be available for pickup at the Student Hub. More items coming soon!
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;
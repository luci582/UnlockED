import { ArrowRight, BookOpen, Star, TrendingUp, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import CourseCard from "@/components/Course/CourseCard";

const HomepageSimple = () => {
  const stats = [
    {
      icon: BookOpen,
      value: "1,200+",
      label: "Courses Reviewed",
      color: "text-primary"
    },
    {
      icon: Users,
      value: "15,000+",
      label: "Active Students",
      color: "text-accent"
    },
    {
      icon: Star,
      value: "4.3",
      label: "Average Rating",
      color: "text-primary"
    },
    {
      icon: TrendingUp,
      value: "92%",
      label: "Find It Helpful",
      color: "text-secondary"
    }
  ];

  // Just one test course to see if CourseCard works
  const testCourse = {
    id: "comp1511",
    title: "Programming Fundamentals",
    code: "COMP1511", 
    faculty: "Engineering",
    rating: 4.5,
    reviewCount: 234,
    skills: ["Programming", "Problem Solving", "Logic"],
    mode: "hybrid" as const,
    featured: true,
    effortLevel: "moderate" as const
  };

  return (
    <main className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-accent/5 to-secondary/10 py-20 md:py-32">
        <div className="container relative">
          <div className="mx-auto max-w-4xl text-center">
            <h1 className="text-4xl font-bold tracking-tight md:text-6xl lg:text-7xl">
              Make{" "}
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                informed
              </span>{" "}
              course choices
            </h1>
            <p className="mx-auto mt-8 max-w-2xl text-lg text-muted-foreground md:text-xl">
              Discover what UNSW courses are really like through authentic peer reviews, 
              practical insights, and student experiences to guide your enrolment decisions.
            </p>
            <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:justify-center">
              <Link to="/courses">
                <Button size="lg" className="w-full sm:w-auto">
                  Browse Courses
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link to="/submit-review">
                <Button variant="outline" size="lg" className="w-full sm:w-auto">
                  Share Your Experience
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 border-b">
        <div className="container">
          <div className="grid grid-cols-2 gap-4 md:gap-6 md:grid-cols-4">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <Card key={index} className="text-center">
                  <CardContent className="p-4 md:p-6">
                    <Icon className={`h-5 w-5 md:h-6 md:w-6 mx-auto mb-2 md:mb-3 ${stat.color}`} />
                    <div className="text-lg md:text-2xl font-bold">{stat.value}</div>
                    <div className="text-xs md:text-sm text-muted-foreground mt-1">{stat.label}</div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Featured Courses Placeholder */}
      <section className="py-20">
        <div className="container">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-3xl font-bold">Featured Courses</h2>
              <p className="text-muted-foreground mt-2">
                Popular and highly-rated courses from our community
              </p>
            </div>
            <Link to="/courses">
              <Button variant="outline">
                View All Courses
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <CourseCard {...testCourse} />
            <Card className="text-center p-8">
              <h3 className="text-lg font-semibold">More courses coming soon</h3>
              <p className="text-muted-foreground mt-2">Additional CourseCard components will be added</p>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold">How UnlockED Works</h2>
            <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">
              Get the insights you need to choose courses that align with your goals and interests
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            <Card className="text-center">
              <CardContent className="p-8">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <BookOpen className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Browse Courses</h3>
                <p className="text-muted-foreground">
                  Explore our comprehensive database of UNSW courses with ratings, 
                  skill tags, and detailed information.
                </p>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="p-8">
                <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center mx-auto mb-4">
                  <Users className="h-6 w-6 text-accent" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Read Reviews</h3>
                <p className="text-muted-foreground">
                  Get authentic insights from fellow students about workload, 
                  teaching quality, and what to expect.
                </p>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="p-8">
                <div className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center mx-auto mb-4">
                  <Star className="h-6 w-6 text-secondary" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Share & Earn</h3>
                <p className="text-muted-foreground">
                  Contribute your own experiences and earn reward points while helping 
                  fellow students make informed decisions.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </main>
  );
};

export default HomepageSimple;

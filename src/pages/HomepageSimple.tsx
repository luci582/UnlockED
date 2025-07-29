import { ArrowRight, BookOpen, Star, TrendingUp, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import CourseCard from "@/components/Course/CourseCard";
import { useAuth } from "@/hooks/use-auth";
import { useEffect, useState } from "react";
import { fetchCourses, DatabaseCourse } from "@/lib/api";

const HomepageSimple = () => {
  const { user } = useAuth();
  const [topCourses, setTopCourses] = useState<DatabaseCourse[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch top courses (rating >= 4.5) for Featured Courses section
  useEffect(() => {
    const loadTopCourses = async () => {
      try {
        const response = await fetchCourses(1, 50); // Fetch more courses to filter
        if (response.success && response.data) {
          // Filter for courses with rating >= 4.5 (Top Course 2024)
          const filteredCourses = response.data.filter(course => 
            course.rating && course.rating >= 4.5
          );
          setTopCourses(filteredCourses);
        }
      } catch (error) {
        console.error('Failed to load top courses:', error);
      } finally {
        setLoading(false);
      }
    };

    loadTopCourses();
  }, []);
  
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
            {loading ? (
              // Loading skeleton
              Array.from({ length: 3 }).map((_, index) => (
                <Card key={index} className="animate-pulse">
                  <div className="p-6 space-y-3">
                    <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                    <div className="h-3 bg-gray-300 rounded w-1/2"></div>
                    <div className="space-y-2">
                      <div className="h-3 bg-gray-300 rounded"></div>
                      <div className="h-3 bg-gray-300 rounded w-5/6"></div>
                    </div>
                  </div>
                </Card>
              ))
            ) : topCourses.length > 0 ? (
              // Display top courses with hidden ratings
              topCourses.map((course) => (
                <CourseCard 
                  key={course.id} 
                  {...course} 
                  userRole={user?.role || null}
                  hideRating={true} // Hide ratings on homepage
                />
              ))
            ) : (
              // Fallback if no top courses
              <Card className="text-center p-8 col-span-full">
                <h3 className="text-lg font-semibold">Top courses coming soon</h3>
                <p className="text-muted-foreground mt-2">Stay tuned for our featured course selection</p>
              </Card>
            )}
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

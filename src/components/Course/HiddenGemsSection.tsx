import { useState, useEffect } from "react";
import { Gem, ChevronRight, Star, Users } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { fetchCourses, DatabaseCourse } from "@/lib/api";

const HiddenGemsSection = () => {
  const [newCourses, setNewCourses] = useState<DatabaseCourse[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadNewCourses = async () => {
      try {
        const result = await fetchCourses();
        if (result.success && result.data) {
          // Filter courses created in the last 30 days
          const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
          const hiddenGems = result.data
            .filter(course => new Date(course.createdAt) > thirtyDaysAgo)
            .slice(0, 3); // Show only 3 hidden gems
          setNewCourses(hiddenGems);
        }
      } catch (error) {
        console.error('Failed to load new courses:', error);
      } finally {
        setLoading(false);
      }
    };

    loadNewCourses();
  }, []);

  if (loading || newCourses.length === 0) {
    return null;
  }

  return (
    <section className="py-12 bg-gradient-to-br from-primary/5 to-accent/5">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Gem className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h2 className="text-2xl font-bold">Hidden Gems</h2>
              <p className="text-muted-foreground">Discover newly added courses worth exploring</p>
            </div>
          </div>
          <Link to="/courses">
            <Button variant="outline" className="gap-2">
              View All
              <ChevronRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {newCourses.map((course) => (
            <Card 
              key={course.id} 
              className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 relative overflow-hidden border-primary/20"
            >
              {/* New Badge */}
              <div className="absolute top-3 right-3 z-10">
                <Badge className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-semibold border-0 shadow-lg">
                  <Gem className="h-3 w-3 mr-1" />
                  New
                </Badge>
              </div>

              {/* Gradient Background */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              <CardHeader className="pb-3 relative z-10">
                <div className="space-y-2">
                  <div className="flex items-start justify-between">
                    <h3 className="font-bold text-lg leading-tight group-hover:text-primary transition-colors">
                      {course.title.match(/^([A-Z]{4}\d{4})/)?.[1] || course.title.substring(0, 8).toUpperCase()}
                    </h3>
                  </div>
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {course.description || course.title}
                  </p>
                </div>
              </CardHeader>

              <CardContent className="pt-0 relative z-10">
                {/* Course Stats */}
                <div className="flex items-center gap-4 mb-4 text-sm text-muted-foreground">
                  {course.rating && (
                    <div className="flex items-center gap-1">
                      <Star className="h-3 w-3 fill-primary text-primary" />
                      <span className="font-medium">{course.rating.toFixed(1)}</span>
                    </div>
                  )}
                  <div className="flex items-center gap-1">
                    <Users className="h-3 w-3" />
                    <span>{course.enrollmentCount || 0} enrolled</span>
                  </div>
                </div>

                {/* Skills Preview */}
                <div className="flex flex-wrap gap-1 mb-4">
                  {course.skills?.slice(0, 3).map((skill) => (
                    <Badge 
                      key={skill.skill.name} 
                      variant="secondary" 
                      className="text-xs px-2 py-1"
                    >
                      {skill.skill.name}
                    </Badge>
                  ))}
                  {course.skills && course.skills.length > 3 && (
                    <Badge variant="outline" className="text-xs px-2 py-1">
                      +{course.skills.length - 3} more
                    </Badge>
                  )}
                </div>

                {/* View Course Button */}
                <Link to={`/courses/${course.id}`} className="block">
                  <Button 
                    variant="outline" 
                    className="w-full group-hover:bg-primary group-hover:text-primary-foreground group-hover:border-primary transition-all duration-200"
                  >
                    Explore Course
                    <ChevronRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>

        {newCourses.length === 0 && (
          <div className="text-center py-12">
            <div className="p-4 bg-muted/20 rounded-lg inline-block mb-4">
              <Gem className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold mb-2">No Hidden Gems Yet</h3>
            <p className="text-muted-foreground">
              Check back soon for newly added courses!
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default HiddenGemsSection;

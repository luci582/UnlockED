import { useState, useEffect } from "react";
import { Gem, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { fetchCourses, DatabaseCourse } from "@/lib/api";
import CourseCard from "@/components/Course/CourseCard";

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
    <section className="py-20">
      <div className="container">
        <div className="flex items-center justify-between mb-12">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Gem className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h2 className="text-3xl font-bold">Hidden Gems</h2>
              <p className="text-muted-foreground mt-2">Discover newly added courses worth exploring</p>
            </div>
          </div>
          <Link to="/courses">
            <Button variant="outline">
              View All
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {newCourses.map((course) => (
            <CourseCard 
              key={course.id} 
              {...course} 
              userRole={null} // Pass null to ensure consistent behavior
              hideRating={true} // Hide ratings to match Featured Courses
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default HiddenGemsSection;

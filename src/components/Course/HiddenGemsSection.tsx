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
          // Filter for specific hidden gem courses
          const hiddenGemCodes = ['COMP2521', 'MATH1131', 'ACCT1501'];
          const hiddenGems = result.data
            .filter(course => {
              // Extract course code from title (e.g., "COMP2521 - Data Structures" -> "COMP2521")
              const courseCode = course.title.match(/^([A-Z]{4}\d{4})/)?.[1];
              return courseCode && hiddenGemCodes.includes(courseCode);
            })
            .slice(0, 3); // Ensure we don't show more than 3
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
              isHiddenGem={true} // Mark as hidden gem to show special badge
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default HiddenGemsSection;

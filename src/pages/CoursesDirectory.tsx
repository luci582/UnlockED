import { useState, useMemo, useEffect } from "react";
import { Search, SlidersHorizontal, Grid, List, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import CourseCard from "@/components/Course/CourseCard";
import CourseCardSkeleton from "@/components/Course/CourseCardSkeleton";
import FilterPanel from "@/components/Filter/FilterPanel";
import { fetchCourses, DatabaseCourse } from "@/lib/api";
import { useCourseComparison } from "@/hooks/use-course-comparison";
import { useAuth } from "@/hooks/use-auth";

interface Filters {
  faculty: string[];
  mode: string[];
  skills: string[];
  rating: string[];
}

const CoursesDirectory = () => {
  const { user } = useAuth();
  const { addCourse, removeCourse, isSelected, selectedCourses } = useCourseComparison();
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [isLoading, setIsLoading] = useState(true);
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [showDesktopFilters, setShowDesktopFilters] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("rating");
  const [courses, setCourses] = useState<DatabaseCourse[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<Filters>({
    faculty: [],
    mode: [],
    skills: [],
    rating: [],
  });

  // Fetch courses from database
  useEffect(() => {
    const loadCourses = async () => {
      setIsLoading(true);
      try {
        const result = await fetchCourses();
        if (result.success && result.data) {
          setCourses(result.data);
        } else {
          setError(result.error || 'Failed to load courses');
        }
      } catch (err) {
        setError('Failed to load courses');
        console.error('Error loading courses:', err);
      } finally {
        setIsLoading(false);
      }
    };

    loadCourses();
  }, []);

  // Filter and sort courses
  const filteredCourses = useMemo(() => {
    // Courses now come with effortLevel from the API, but provide fallback if missing
    const coursesWithEffort = courses.map(course => {
      const effortLevel = course.effortLevel || 
                         (course.difficulty?.toLowerCase() === 'beginner' ? 'light' :
                         course.difficulty?.toLowerCase() === 'intermediate' ? 'moderate' :
                         course.difficulty?.toLowerCase() === 'advanced' ? 'heavy' : 
                         'moderate');
      
      // Extract delivery mode from learningOutcomes JSON
      let deliveryMode = "hybrid"; // Default fallback
      if (course.learningOutcomes) {
        try {
          const outcomes = JSON.parse(course.learningOutcomes);
          deliveryMode = outcomes.deliveryMode || "hybrid";
        } catch (e) {
          // If JSON parsing fails, use default
          deliveryMode = "hybrid";
        }
      }
      
      return {
        ...course,
        effortLevel: effortLevel as "light" | "moderate" | "heavy" | "very-heavy",
        mode: deliveryMode as "online" | "in-person" | "hybrid"
      };
    });

    const filtered = coursesWithEffort.filter(course => {
      // Search filter - now includes skills/tags and categories
      const courseSkills = course.skills?.map(s => s.skill.name) || [];
      const courseCategories = course.categories?.map(c => c.category.name) || [];
      const searchMatch = searchQuery === "" || 
        course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.instructor.toLowerCase().includes(searchQuery.toLowerCase()) ||
        courseSkills.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase())) ||
        courseCategories.some(category => category.toLowerCase().includes(searchQuery.toLowerCase()));

      // Faculty filter (now using categories)
      const facultyMatch = filters.faculty.length === 0 || 
        courseCategories.some(category => filters.faculty.includes(category));

      // Rating filter - filter by course rating ranges
      const ratingMatch = filters.rating.length === 0 || 
        filters.rating.some(ratingRange => {
          const courseRating = course.rating || 0;
          // Debug: log rating data
          if (filters.rating.length > 0) {
            console.log(`Course: ${course.title}, Rating: ${courseRating}, Filter: ${ratingRange}`);
          }
          switch (ratingRange) {
            case "4-5":
              return courseRating >= 4;
            case "3-4":
              return courseRating >= 3;
            case "2-3":
              return courseRating >= 2;
            case "1-2":
              return courseRating >= 1;
            default:
              return false;
          }
        });

      // Mode filter - use the extracted delivery mode
      const modeMatch = filters.mode.length === 0 || 
        filters.mode.includes(course.mode);

      // Skills filter - course must have ALL selected skills
      const skillsMatch = filters.skills.length === 0 || 
        filters.skills.every(skill => courseSkills.includes(skill));

      return searchMatch && facultyMatch && ratingMatch && modeMatch && skillsMatch;
    });

    // Sort courses
    switch (sortBy) {
      case "rating":
        filtered.sort((a, b) => (b.rating || 0) - (a.rating || 0));
        break;
      case "reviews":
        filtered.sort((a, b) => b.reviewCount - a.reviewCount);
        break;
      case "alphabetical":
        // Extract course code from title for sorting
        filtered.sort((a, b) => {
          const getCode = (title: string) => {
            const match = title.match(/^([A-Z]{4}\d{4})/);
            return match ? match[1] : title;
          };
          return getCode(a.title).localeCompare(getCode(b.title));
        });
        break;
      case "newest":
        // Sort by creation date
        filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        break;
    }

    return filtered;
  }, [searchQuery, filters, sortBy, courses]);

  const handleFiltersChange = (newFilters: Filters) => {
    setFilters(newFilters);
  };

  const handleSkillClick = (skill: string) => {
    setFilters(prev => {
      const newSkills = prev.skills.includes(skill) 
        ? prev.skills.filter(s => s !== skill)
        : [...prev.skills, skill];
      return { ...prev, skills: newSkills };
    });
  };

  const handleCompareToggle = (courseId: string) => {
    const course = courses.find(c => c.id === courseId);
    if (!course) return;

    if (isSelected(courseId)) {
      removeCourse(courseId);
    } else {
      if (selectedCourses.length >= 3) {
        // Could show a toast here that max 3 courses can be compared
        return;
      }
      
      // Convert DatabaseCourse to Course format for comparison
      const convertedCourse = {
        id: course.id,
        title: course.title,
        code: course.title.match(/^([A-Z]{4}\d{4})/)?.[1] || course.id.substring(0, 8).toUpperCase(),
        faculty: course.institution || "UNSW Sydney",
        rating: course.rating || 0,
        reviewCount: course.reviewCount,
        skills: course.skills?.map(s => s.skill.name) || [],
        mode: "hybrid" as const,
        featured: course.rating && course.rating >= 4.5,
        isNew: new Date(course.createdAt) > new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
        effortLevel: course.difficulty.toLowerCase() === 'beginner' ? 'light' as const :
                     course.difficulty.toLowerCase() === 'intermediate' ? 'moderate' as const :
                     course.difficulty.toLowerCase() === 'advanced' ? 'heavy' as const : 'moderate' as const,
      };
      
      addCourse(convertedCourse);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Course Directory</h1>
          <p className="text-muted-foreground">
            Discover and compare UNSW courses with peer reviews and insights
          </p>
        </div>

        {/* Search and Controls */}
        <div className="flex flex-col lg:flex-row gap-4 mb-8">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Search by course code, title, faculty, or skills..." 
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <div className="flex gap-2">
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="rating">Highest Rated</SelectItem>
                <SelectItem value="reviews">Most Reviews</SelectItem>
                <SelectItem value="alphabetical">Alphabetical</SelectItem>
                <SelectItem value="newest">Newest</SelectItem>
              </SelectContent>
            </Select>

            <Button
              variant="outline"
              size="icon"
              onClick={() => setShowMobileFilters(!showMobileFilters)}
              className="lg:hidden"
              data-testid="mobile-filter-toggle"
            >
              <SlidersHorizontal className="h-4 w-4" />
            </Button>

            <Button
              variant="outline"
              size="icon"
              onClick={() => setShowDesktopFilters(!showDesktopFilters)}
              className="hidden lg:flex"
              data-testid="desktop-filter-toggle"
              title={showDesktopFilters ? "Hide Filters" : "Show Filters"}
            >
              <SlidersHorizontal className="h-4 w-4" />
            </Button>

            <div className="hidden sm:flex border rounded-md">
              <Button
                variant={viewMode === "grid" ? "default" : "ghost"}
                size="sm"
                onClick={() => setViewMode("grid")}
                className="rounded-r-none"
              >
                <Grid className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === "list" ? "default" : "ghost"}
                size="sm"
                onClick={() => setViewMode("list")}
                className="rounded-l-none"
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex gap-8">
          {/* Desktop Filters Sidebar - Always visible on large screens */}
          {showDesktopFilters && (
            <div className="w-80 shrink-0 hidden lg:block">
              <FilterPanel 
                onFiltersChange={handleFiltersChange}
                currentFilters={filters}
                onSkillClick={handleSkillClick}
              />
            </div>
          )}

          {/* Course Grid/List */}
          <div className="flex-1">
            <div className="mb-4 flex items-center justify-between">
              <p className="text-sm text-muted-foreground">
                {isLoading ? "Loading courses..." : `Showing ${filteredCourses.length} courses`}
              </p>
            </div>

            {error ? (
              <div className="text-center py-12">
                <p className="text-red-500 mb-4">Error loading courses: {error}</p>
                <Button variant="outline" onClick={() => window.location.reload()}>
                  Retry
                </Button>
              </div>
            ) : isLoading ? (
              <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
                {Array.from({ length: 6 }).map((_, index) => (
                  <CourseCardSkeleton key={index} />
                ))}
              </div>
            ) : viewMode === "grid" ? (
              <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
                {filteredCourses.map((course) => {
                  // Check if this course is a hidden gem
                  const courseCode = course.title.match(/^([A-Z]{4}\d{4})/)?.[1];
                  const isHiddenGem = courseCode && ['COMP2521', 'MATH1131', 'ACCT1501'].includes(courseCode);
                  
                  return (
                    <CourseCard 
                      key={course.id} 
                      {...course} 
                      onSkillClick={handleSkillClick}
                      selectedSkills={filters.skills}
                      onCompareToggle={handleCompareToggle}
                      isSelected={isSelected(course.id)}
                      userRole={user?.role || null}
                      isHiddenGem={isHiddenGem}
                    />
                  );
                })}
              </div>
            ) : (
              <div className="space-y-4">
                {filteredCourses.map((course) => {
                  // Check if this course is a hidden gem
                  const courseCode = course.title.match(/^([A-Z]{4}\d{4})/)?.[1];
                  const isHiddenGem = courseCode && ['COMP2521', 'MATH1131', 'ACCT1501'].includes(courseCode);
                  
                  return (
                    <div key={course.id} className="w-full">
                      <CourseCard 
                        {...course} 
                        onSkillClick={handleSkillClick}
                        selectedSkills={filters.skills}
                        onCompareToggle={handleCompareToggle}
                        isSelected={isSelected(course.id)}
                        userRole={user?.role || null}
                        isHiddenGem={isHiddenGem}
                      />
                    </div>
                  );
                })}
              </div>
            )}

            {filteredCourses.length === 0 && (
              <div className="text-center py-12">
                <p className="text-muted-foreground mb-4">No courses found matching your criteria.</p>
                <Button variant="outline" onClick={() => {
                  setSearchQuery("");
                  setFilters({ faculty: [], mode: [], skills: [], rating: [] });
                }}>
                  Clear all filters
                </Button>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Filter Sheet */}
        <Sheet open={showMobileFilters} onOpenChange={setShowMobileFilters}>
          <SheetContent side="right" className="w-80 lg:hidden">
            <SheetHeader>
              <SheetTitle>Filters</SheetTitle>
            </SheetHeader>
            <div className="mt-6">
              <FilterPanel 
                onFiltersChange={handleFiltersChange}
                currentFilters={filters}
                onSkillClick={handleSkillClick}
              />
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
};

export default CoursesDirectory;
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

interface Filters {
  faculty: string[];
  rating: number;
  mode: string[];
  skills: string[];
}

// Convert database course to the format expected by the UI
const convertDatabaseCourse = (dbCourse: DatabaseCourse) => {
  // Extract course code from title if it follows UNSW format (e.g., "COMP1511 - Programming Fundamentals")
  const codeMatch = dbCourse.title.match(/^([A-Z]{4}\d{4})\s*-\s*/);
  const courseCode = codeMatch ? codeMatch[1] : dbCourse.id.substring(0, 8).toUpperCase();
  
  // Check if course is new (created within last 30 days)
  const createdDate = new Date(dbCourse.createdAt);
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
  const isNew = createdDate > thirtyDaysAgo;
  
  return {
    id: dbCourse.id,
    title: dbCourse.title,
    code: courseCode,
    faculty: dbCourse.institution || "UNSW Sydney",
    rating: dbCourse.rating || 0,
    reviewCount: dbCourse.reviewCount,
    skills: dbCourse.skills?.map(s => s.skill.name) || [],
    mode: "hybrid" as const, // Most UNSW courses are hybrid
    effortLevel: dbCourse.difficulty.toLowerCase() === 'beginner' ? 'light' as const :
                 dbCourse.difficulty.toLowerCase() === 'intermediate' ? 'moderate' as const :
                 dbCourse.difficulty.toLowerCase() === 'advanced' ? 'heavy' as const : 'moderate' as const,
    featured: dbCourse.rating && dbCourse.rating >= 4.5,
    instructor: dbCourse.instructor,
    difficulty: dbCourse.difficulty,
    enrollmentCount: dbCourse.enrollmentCount,
    isNew: isNew, // Add this for the "New" badge
  };
};

interface Filters {
  faculty: string[];
  rating: number;
  mode: string[];
  skills: string[];
}

const CoursesDirectory = () => {
  const { addCourse, removeCourse, isSelected, selectedCourses } = useCourseComparison();
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [isLoading, setIsLoading] = useState(true);
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [showDesktopFilters, setShowDesktopFilters] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("rating");
  const [courses, setCourses] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<Filters>({
    faculty: [],
    rating: 0,
    mode: [],
    skills: [],
  });

  // Fetch courses from database
  useEffect(() => {
    const loadCourses = async () => {
      setIsLoading(true);
      try {
        const result = await fetchCourses();
        if (result.success && result.data) {
          const convertedCourses = result.data.map(convertDatabaseCourse);
          setCourses(convertedCourses);
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
    const filtered = courses.filter(course => {
      // Search filter - now includes skills/tags
      const searchMatch = searchQuery === "" || 
        course.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.faculty.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.skills.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase()));

      // Faculty filter
      const facultyMatch = filters.faculty.length === 0 || filters.faculty.includes(course.faculty);

      // Rating filter
      const ratingMatch = filters.rating === 0 || course.rating >= filters.rating;

      // Mode filter
      const modeMatch = filters.mode.length === 0 || filters.mode.includes(course.mode);

      // Skills filter - course must have ALL selected skills
      const skillsMatch = filters.skills.length === 0 || 
        filters.skills.every(skill => course.skills.includes(skill));

      return searchMatch && facultyMatch && ratingMatch && modeMatch && skillsMatch;
    });

    // Sort courses
    switch (sortBy) {
      case "rating":
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case "reviews":
        filtered.sort((a, b) => b.reviewCount - a.reviewCount);
        break;
      case "alphabetical":
        filtered.sort((a, b) => a.code.localeCompare(b.code));
        break;
      case "newest":
        filtered.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
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
      addCourse(course);
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
                {filteredCourses.map((course) => (
                  <CourseCard 
                    key={course.id} 
                    {...course} 
                    onSkillClick={handleSkillClick}
                    selectedSkills={filters.skills}
                    onCompareToggle={handleCompareToggle}
                    isSelected={isSelected(course.id)}
                  />
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {filteredCourses.map((course) => (
                  <div key={course.id} className="w-full">
                    <CourseCard 
                      {...course} 
                      onSkillClick={handleSkillClick}
                      selectedSkills={filters.skills}
                      onCompareToggle={handleCompareToggle}
                      isSelected={isSelected(course.id)}
                    />
                  </div>
                ))}
              </div>
            )}

            {filteredCourses.length === 0 && (
              <div className="text-center py-12">
                <p className="text-muted-foreground mb-4">No courses found matching your criteria.</p>
                <Button variant="outline" onClick={() => {
                  setSearchQuery("");
                  setFilters({ faculty: [], rating: 0, mode: [], skills: [] });
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
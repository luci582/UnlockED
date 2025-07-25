import { useState, useMemo } from "react";
import { Search, SlidersHorizontal, Grid, List } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import CourseCard from "@/components/Course/CourseCard";
import FilterPanel from "@/components/Filter/FilterPanel";

interface Course {
  id: string;
  title: string;
  code: string;
  faculty: string;
  rating: number;
  reviewCount: number;
  skills: string[];
  mode: "online" | "in-person" | "hybrid";
  effortLevel?: "light" | "moderate" | "heavy" | "very-heavy";
  featured?: boolean;
  isNew?: boolean;
}

interface Filters {
  faculty: string[];
  rating: number;
  mode: string[];
  skills: string[];
}

const CoursesDirectory = () => {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [showFilters, setShowFilters] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("rating");
  const [filters, setFilters] = useState<Filters>({
    faculty: [],
    rating: 0,
    mode: [],
    skills: [],
  });

  // Mock course data
  const allCourses: Course[] = [
    {
      id: "comp1511",
      title: "Programming Fundamentals",
      code: "COMP1511",
      faculty: "Engineering",
      rating: 4.5,
      reviewCount: 234,
      skills: ["Programming", "Problem Solving", "Logic", "Algorithms"],
      mode: "hybrid",
      effortLevel: "moderate",
      featured: true,
    },
    {
      id: "mgmt1001", 
      title: "Managing Organisations and People",
      code: "MGMT1001",
      faculty: "Business School",
      rating: 4.2,
      reviewCount: 189,
      skills: ["Leadership", "Teamwork", "Communication", "Management"],
      mode: "in-person",
      effortLevel: "light",
    },
    {
      id: "psyc1001",
      title: "Psychology 1A",
      code: "PSYC1001", 
      faculty: "Science",
      rating: 4.7,
      reviewCount: 312,
      skills: ["Research", "Critical Thinking", "Analysis", "Statistics"],
      mode: "online",
      effortLevel: "heavy",
      featured: true,
    },
    {
      id: "math1131",
      title: "Mathematics 1A",
      code: "MATH1131",
      faculty: "Science", 
      rating: 3.8,
      reviewCount: 156,
      skills: ["Calculus", "Problem Solving", "Logic", "Analysis"],
      mode: "in-person",
      effortLevel: "very-heavy",
    },
    {
      id: "econ1101",
      title: "Microeconomics 1",
      code: "ECON1101",
      faculty: "Business School",
      rating: 4.1,
      reviewCount: 203,
      skills: ["Economics", "Critical Thinking", "Analysis", "Mathematics"],
      mode: "hybrid",
      effortLevel: "moderate",
    },
    {
      id: "arts1000",
      title: "Arts Foundation Course",
      code: "ARTS1000",
      faculty: "Arts & Social Sciences",
      rating: 4.4,
      reviewCount: 98,
      skills: ["Writing", "Research", "Critical Thinking", "Communication"],
      mode: "online",
      effortLevel: "light",
      isNew: true,
    },
    {
      id: "comp1521",
      title: "Computer Systems Fundamentals",
      code: "COMP1521",
      faculty: "Engineering",
      rating: 4.3,
      reviewCount: 178,
      skills: ["Programming", "Systems", "Assembly", "Hardware"],
      mode: "hybrid",
      effortLevel: "heavy",
    },
    {
      id: "fins1613",
      title: "Business Finance",
      code: "FINS1613",
      faculty: "Business School",
      rating: 3.9,
      reviewCount: 145,
      skills: ["Finance", "Excel", "Analysis", "Mathematics"],
      mode: "in-person",
      effortLevel: "moderate",
    },
  ];

  // Filter and sort courses
  const filteredCourses = useMemo(() => {
    let filtered = allCourses.filter(course => {
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
  }, [allCourses, searchQuery, filters, sortBy]);

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
              onClick={() => setShowFilters(!showFilters)}
              className="lg:hidden"
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
          {/* Filters Sidebar */}
          {showFilters && (
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
                Showing {filteredCourses.length} courses
              </p>
            </div>

            {viewMode === "grid" ? (
              <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
                {filteredCourses.map((course) => (
                  <CourseCard 
                    key={course.id} 
                    {...course} 
                    onSkillClick={handleSkillClick}
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
        {showFilters && (
          <div className="lg:hidden fixed inset-0 z-50 bg-background/80 backdrop-blur-sm">
            <div className="fixed inset-y-0 right-0 w-80 bg-background border-l p-6 overflow-y-auto">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold">Filters</h2>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowFilters(false)}
                >
                  Close
                </Button>
              </div>
              <FilterPanel 
                onFiltersChange={handleFiltersChange}
                currentFilters={filters}
                onSkillClick={handleSkillClick}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CoursesDirectory;
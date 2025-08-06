import { useState, useEffect } from "react";
import { ChevronDown, Filter, Star, Monitor, Users, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/hooks/use-auth";

interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
}

interface FilterPanelProps {
  onFiltersChange?: (filters: {
    faculty: string[];
    mode: string[];
    skills: string[];
    rating: string[];
  }) => void;
  currentFilters?: {
    faculty: string[];
    mode: string[];
    skills: string[];
    rating: string[];
  };
  onSkillClick?: (skill: string) => void;
  showActiveCount?: boolean;
}

const FilterPanel = ({ onFiltersChange, currentFilters, onSkillClick, showActiveCount = false }: FilterPanelProps) => {
  const { user } = useAuth();
  const [filters, setFilters] = useState(currentFilters || {
    faculty: [],
    mode: [],
    skills: [],
    rating: [],
  });

  const [faculties, setFaculties] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch categories/faculties from API
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('/api/courses');
        if (response.ok) {
          const result = await response.json();
          if (result.success && result.courses) {
            // Extract unique faculty categories from courses
            const allCategories = new Set<string>();
            result.courses.forEach((course: any) => {
              if (course.categories) {
                course.categories.forEach((cat: any) => {
                  allCategories.add(cat.category.name);
                });
              }
            });
            setFaculties(Array.from(allCategories).sort());
          }
        }
      } catch (error) {
        console.error('Failed to fetch categories:', error);
        // Fallback to hardcoded list
        setFaculties([
          "Arts & Social Sciences",
          "Business School",
          "Computer Science & Engineering", 
          "Engineering",
          "Medicine & Health",
          "Science"
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    if (currentFilters) {
      setFilters(currentFilters);
    }
  }, [currentFilters]);

  const deliveryModes = [
    { id: "online", label: "Online", icon: Monitor },
    { id: "in-person", label: "In-Person", icon: Users },
    { id: "hybrid", label: "Hybrid", icon: MapPin }
  ];

  const skillTags = [
    "Programming", "Problem Solving", "Logic", "Analysis", "Critical Thinking", 
    "Research", "Statistics", "Leadership", "Management", "Communication",
    "Teamwork", "Mathematics", "Calculus", "Economics", "Algorithms",
    "Writing", "Excel", "Collaboration", "Public Speaking"
  ];

  const ratingOptions = [
    { id: "4-5", label: "4+ Stars", icon: Star },
    { id: "3-4", label: "3+ Stars", icon: Star },
    { id: "2-3", label: "2+ Stars", icon: Star },
    { id: "1-2", label: "1+ Stars", icon: Star }
  ];

  const [openSections, setOpenSections] = useState({
    faculty: true,
    mode: true,
    skills: true,
    rating: true
  });

  const toggleSection = (section: string) => {
    setOpenSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const updateFilters = (newFilters: {
    faculty: string[];
    mode: string[];
    skills: string[];
    rating: string[];
  }) => {
    setFilters(newFilters);
    onFiltersChange?.(newFilters);
  };

  const clearAllFilters = () => {
    const clearedFilters = {
      faculty: [],
      mode: [],
      skills: [],
      rating: [],
    };
    updateFilters(clearedFilters);
  };

  const getActiveFiltersCount = () => {
    return filters.faculty.length + 
           filters.mode.length + 
           filters.skills.length +
           filters.rating.length;
  };

  const handleFacultyChange = (faculty: string, checked: boolean) => {
    const newFaculty = checked
      ? [...filters.faculty, faculty]
      : filters.faculty.filter(f => f !== faculty);
    updateFilters({ ...filters, faculty: newFaculty });
  };



  const handleModeChange = (mode: string, checked: boolean) => {
    const newMode = checked
      ? [...filters.mode, mode]
      : filters.mode.filter(m => m !== mode);
    updateFilters({ ...filters, mode: newMode });
  };

  const handleRatingChange = (rating: string, checked: boolean) => {
    const newRating = checked
      ? [...filters.rating, rating]
      : filters.rating.filter(r => r !== rating);
    updateFilters({ ...filters, rating: newRating });
  };

  const handleSkillToggle = (skill: string) => {
    // Just call the parent's skill click handler
    onSkillClick?.(skill);
  };

  return (
    <Card className="sticky top-20">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg flex items-center space-x-2">
            <Filter className="h-5 w-5" />
            <span>Filters</span>
            {showActiveCount && getActiveFiltersCount() > 0 && (
              <Badge className="bg-primary text-primary-foreground">
                {getActiveFiltersCount()}
              </Badge>
            )}
          </CardTitle>
          <Button variant="ghost" size="sm" onClick={clearAllFilters}>
            Clear All
          </Button>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Faculty Filter */}
        <Collapsible open={openSections.faculty} onOpenChange={() => toggleSection('faculty')}>
          <CollapsibleTrigger className="flex w-full items-center justify-between py-2">
            <Label className="font-medium">Faculty</Label>
            <ChevronDown className={`h-4 w-4 transition-transform ${openSections.faculty ? 'rotate-180' : ''}`} />
          </CollapsibleTrigger>
          <CollapsibleContent className="space-y-2 pt-2">
            {faculties.map((faculty) => (
              <div key={faculty} className="flex items-center space-x-2">
                <Checkbox 
                  id={faculty} 
                  checked={filters.faculty.includes(faculty)}
                  onCheckedChange={(checked) => handleFacultyChange(faculty, !!checked)}
                />
                <Label htmlFor={faculty} className="text-sm">{faculty}</Label>
              </div>
            ))}
          </CollapsibleContent>
        </Collapsible>



        {/* Delivery Mode Filter */}
        <Collapsible open={openSections.mode} onOpenChange={() => toggleSection('mode')}>
          <CollapsibleTrigger className="flex w-full items-center justify-between py-2">
            <Label className="font-medium">Delivery Mode</Label>
            <ChevronDown className={`h-4 w-4 transition-transform ${openSections.mode ? 'rotate-180' : ''}`} />
          </CollapsibleTrigger>
          <CollapsibleContent className="space-y-2 pt-2">
            {deliveryModes.map((mode) => {
              const Icon = mode.icon;
              return (
                <div key={mode.id} className="flex items-center space-x-2">
                  <Checkbox 
                    id={mode.id} 
                    checked={filters.mode.includes(mode.id)}
                    onCheckedChange={(checked) => handleModeChange(mode.id, !!checked)}
                  />
                  <Label htmlFor={mode.id} className="flex items-center space-x-2 text-sm">
                    <Icon className="h-3 w-3" />
                    <span>{mode.label}</span>
                  </Label>
                </div>
              );
            })}
          </CollapsibleContent>
        </Collapsible>

        {/* Review Rating Filter - Only for Teachers */}
        {user && (user.role === 'INSTRUCTOR' || user.role === 'ADMIN') && (
          <Collapsible open={openSections.rating} onOpenChange={() => toggleSection('rating')}>
            <CollapsibleTrigger className="flex w-full items-center justify-between py-2">
              <Label className="font-medium">Review Rating</Label>
              <ChevronDown className={`h-4 w-4 transition-transform ${openSections.rating ? 'rotate-180' : ''}`} />
            </CollapsibleTrigger>
            <CollapsibleContent className="space-y-2 pt-2">
              {ratingOptions.map((rating) => {
                const Icon = rating.icon;
                return (
                  <div key={rating.id} className="flex items-center space-x-2">
                    <Checkbox 
                      id={rating.id} 
                      checked={filters.rating.includes(rating.id)}
                      onCheckedChange={(checked) => handleRatingChange(rating.id, !!checked)}
                    />
                    <Label htmlFor={rating.id} className="flex items-center space-x-2 text-sm">
                      <Icon className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                      <span>{rating.label}</span>
                    </Label>
                  </div>
                );
              })}
            </CollapsibleContent>
          </Collapsible>
        )}

        {/* Skills Filter */}
        <Collapsible open={openSections.skills} onOpenChange={() => toggleSection('skills')}>
          <CollapsibleTrigger className="flex w-full items-center justify-between py-2" data-testid="skills-filter-trigger">
            <Label className="font-medium">Competencies</Label>
            <ChevronDown className={`h-4 w-4 transition-transform ${openSections.skills ? 'rotate-180' : ''}`} />
          </CollapsibleTrigger>
          <CollapsibleContent className="pt-2 space-y-2">
            <div className="flex flex-wrap gap-2 items-start">
              {skillTags.map((skill) => {
                const isSelected = filters.skills.includes(skill);
                return (
                  <Badge 
                    key={skill}
                    variant={isSelected ? "default" : "outline"}
                    className={`cursor-pointer transition-all duration-200 text-xs shrink-0 hover:scale-105 active:scale-95 ${
                      isSelected 
                        ? "bg-primary text-primary-foreground hover:bg-primary/90 shadow-md" 
                        : "hover:bg-primary/10 hover:text-primary hover:border-primary/50 hover:shadow-sm"
                    }`}
                    onClick={() => handleSkillToggle(skill)}
                    data-testid={`skill-filter-${skill.toLowerCase().replace(/\s+/g, '-')}`}
                  >
                    {skill}
                  </Badge>
                );
              })}
            </div>
          </CollapsibleContent>
        </Collapsible>
      </CardContent>
    </Card>
  );
};

export default FilterPanel;

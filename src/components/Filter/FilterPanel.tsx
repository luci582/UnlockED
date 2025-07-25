import { useState, useEffect } from "react";
import { ChevronDown, Filter, Star, Monitor, Users, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Badge } from "@/components/ui/badge";

interface FilterPanelProps {
  onFiltersChange?: (filters: any) => void;
  currentFilters?: {
    faculty: string[];
    rating: number;
    mode: string[];
    skills: string[];
  };
  onSkillClick?: (skill: string) => void;
}

const FilterPanel = ({ onFiltersChange, currentFilters, onSkillClick }: FilterPanelProps) => {
  const [filters, setFilters] = useState(currentFilters || {
    faculty: [],
    rating: 0,
    mode: [],
    skills: [],
  });

  useEffect(() => {
    if (currentFilters) {
      setFilters(currentFilters);
    }
  }, [currentFilters]);

  const faculties = [
    "Business School",
    "Engineering", 
    "Science",
    "Arts & Social Sciences",
    "Medicine & Health",
    "Law & Justice",
    "Built Environment"
  ];

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

  const [openSections, setOpenSections] = useState({
    faculty: true,
    rating: true,
    mode: true,
    skills: true
  });

  const toggleSection = (section: string) => {
    setOpenSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const updateFilters = (newFilters: any) => {
    setFilters(newFilters);
    onFiltersChange?.(newFilters);
  };

  const clearAllFilters = () => {
    const clearedFilters = {
      faculty: [],
      rating: 0,
      mode: [],
      skills: [],
    };
    updateFilters(clearedFilters);
  };

  const handleFacultyChange = (faculty: string, checked: boolean) => {
    const newFaculty = checked
      ? [...filters.faculty, faculty]
      : filters.faculty.filter(f => f !== faculty);
    updateFilters({ ...filters, faculty: newFaculty });
  };

  const handleRatingChange = (rating: number, checked: boolean) => {
    updateFilters({ ...filters, rating: checked ? rating : 0 });
  };

  const handleModeChange = (mode: string, checked: boolean) => {
    const newMode = checked
      ? [...filters.mode, mode]
      : filters.mode.filter(m => m !== mode);
    updateFilters({ ...filters, mode: newMode });
  };

  const handleSkillToggle = (skill: string) => {
    const isSelected = filters.skills.includes(skill);
    const newSkills = isSelected
      ? filters.skills.filter(s => s !== skill)
      : [...filters.skills, skill];
    const newFilters = { ...filters, skills: newSkills };
    updateFilters(newFilters);
    
    // Also notify parent about the skill click
    onSkillClick?.(skill);
  };

  return (
    <Card className="sticky top-20">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg flex items-center space-x-2">
            <Filter className="h-5 w-5" />
            <span>Filters</span>
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

        {/* Rating Filter */}
        <Collapsible open={openSections.rating} onOpenChange={() => toggleSection('rating')}>
          <CollapsibleTrigger className="flex w-full items-center justify-between py-2">
            <Label className="font-medium">Minimum Rating</Label>
            <ChevronDown className={`h-4 w-4 transition-transform ${openSections.rating ? 'rotate-180' : ''}`} />
          </CollapsibleTrigger>
          <CollapsibleContent className="space-y-2 pt-2">
            {[4, 3, 2, 1].map((rating) => (
              <div key={rating} className="flex items-center space-x-2">
                <Checkbox 
                  id={`rating-${rating}`} 
                  checked={filters.rating >= rating}
                  onCheckedChange={(checked) => handleRatingChange(rating, !!checked)}
                />
                <Label htmlFor={`rating-${rating}`} className="flex items-center space-x-1 text-sm">
                  <Star className="h-3 w-3 fill-primary text-primary" />
                  <span>{rating}+ stars</span>
                </Label>
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

        {/* Skills Filter */}
        <Collapsible open={openSections.skills} onOpenChange={() => toggleSection('skills')}>
          <CollapsibleTrigger className="flex w-full items-center justify-between py-2">
            <Label className="font-medium">Skills</Label>
            <ChevronDown className={`h-4 w-4 transition-transform ${openSections.skills ? 'rotate-180' : ''}`} />
          </CollapsibleTrigger>
          <CollapsibleContent className="pt-2 space-y-2">
            <div className="flex flex-wrap gap-2 items-start">
              {skillTags.map((skill) => (
                <Badge 
                  key={skill}
                  variant={filters.skills.includes(skill) ? "default" : "outline"}
                  className="cursor-pointer hover:bg-primary/20 transition-colors text-xs shrink-0"
                  onClick={() => handleSkillToggle(skill)}
                >
                  {skill}
                </Badge>
              ))}
            </div>
          </CollapsibleContent>
        </Collapsible>
      </CardContent>
    </Card>
  );
};

export default FilterPanel;

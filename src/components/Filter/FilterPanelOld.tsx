import { useState } from "react";
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
    mode: string[];
    skills: string[];
  };
  onSkillClick?: (skill: string) => void;
}

const FilterPanel = ({ onFiltersChange, currentFilters, onSkillClick }: FilterPanelProps) => {
  const [filters, setFilters] = useState(currentFilters || {
    faculty: [],
    mode: [],
    skills: [],
  });

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
    "Critical Thinking", "Excel", "Collaboration", "Writing", "Statistics",
    "Public Speaking", "Research", "Programming", "Leadership", "Analysis"
  ];

  const [openSections, setOpenSections] = useState({
    faculty: true,
    mode: true,
    skills: true
  });

  const toggleSection = (section: string) => {
    setOpenSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const clearAllFilters = () => {
    setFilters({
      faculty: [],
      mode: [],
      skills: [],
    });
    onFiltersChange?.({
      faculty: [],
      mode: [],
      skills: [],
    });
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
                <Checkbox id={faculty} />
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
                  <Checkbox id={mode.id} />
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
          <CollapsibleContent className="pt-2">
            <div className="flex flex-wrap gap-2">
              {skillTags.map((skill) => (
                <Badge 
                  key={skill}
                  variant="outline" 
                  className="cursor-pointer hover:bg-course-skill-tag transition-colors text-xs"
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
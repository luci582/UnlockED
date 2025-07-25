import { Star, Users, Clock, ArrowRight, Plus, Check, Monitor, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { useState } from "react";

interface CourseCardProps {
  id: string;
  title: string;
  code: string;
  faculty: string;
  rating: number;
  reviewCount: number;
  skills: string[];
  mode: "online" | "in-person" | "hybrid";
  featured?: boolean;
  isNew?: boolean;
  effortLevel?: "light" | "moderate" | "heavy" | "very-heavy";
  onSkillClick?: (skill: string) => void;
  selectedSkills?: string[];
  onCompareToggle?: (courseId: string) => void;
  isSelected?: boolean;
}

/**
 * CourseCard Component - Refined Version
 * 
 * Features comprehensive improvements including:
 * - Fixed card height for consistent grid alignment
 * - Enhanced Compare button with clear states
 * - Improved hover effects and interactivity
 * - Better information hierarchy and readability
 * - Interactive skill tags with tooltip for overflow
 * - Consistent styling for all tag types
 * 
 * @param props CourseCardProps - Course data and interaction handlers
 */
const CourseCard = ({
  id,
  title,
  code,
  faculty,
  rating,
  reviewCount,
  skills,
  mode,
  featured = false,
  isNew = false,
  effortLevel,
  onSkillClick,
  selectedSkills = [],
  onCompareToggle,
  isSelected = false,
}: CourseCardProps) => {
  const [showAllSkills, setShowAllSkills] = useState(false);

  const getEffortLabel = (effort: string) => {
    switch (effort) {
      case "light": return "Light";
      case "moderate": return "Moderate";
      case "heavy": return "Heavy";
      case "very-heavy": return "Very Heavy";
      default: return effort;
    }
  };

  const getEffortColor = (effort: string) => {
    switch (effort) {
      case "light": return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300 border-green-200 dark:border-green-800";
      case "moderate": return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300 border-yellow-200 dark:border-yellow-800";
      case "heavy": return "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300 border-orange-200 dark:border-orange-800";
      case "very-heavy": return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300 border-red-200 dark:border-red-800";
      default: return "bg-muted text-muted-foreground border-border";
    }
  };

  const getModeIcon = (mode: string) => {
    switch (mode) {
      case "online": return <Monitor className="h-3.5 w-3.5" />;
      case "in-person": return <MapPin className="h-3.5 w-3.5" />;
      case "hybrid": return <div className="flex items-center gap-0.5"><Monitor className="h-2.5 w-2.5" /><MapPin className="h-2.5 w-2.5" /></div>;
      default: return <Clock className="h-3.5 w-3.5" />;
    }
  };

  const displayedSkills = showAllSkills ? skills : skills.slice(0, 3);
  const hasMoreSkills = skills.length > 3;

  return (
    <Card className={`group relative overflow-hidden transition-all duration-300 
      hover:-translate-y-1 hover:shadow-xl hover:shadow-black/5 
      dark:hover:shadow-white/5 
      /* Responsive heights for different aspect ratios */
      min-h-[280px] sm:min-h-[300px] lg:min-h-[320px] xl:min-h-[300px] 2xl:min-h-[280px]
      /* Ultra-wide and narrow screen adaptations */
      [@media(min-aspect-ratio:21/9)]:min-h-[260px]
      [@media(max-aspect-ratio:4/3)]:min-h-[340px]
      flex flex-col
      ${featured ? "border-primary/30 shadow-md bg-primary/5 dark:bg-primary/10" : "hover:border-primary/20"}
      ${isSelected ? "ring-2 ring-primary/20 border-primary/40" : ""}
    `}>
      {featured && (
        <div className="absolute top-0 right-0 bg-primary text-primary-foreground px-3 py-1.5 text-xs font-semibold rounded-bl-lg flex items-center gap-1.5 shadow-sm">
          <Star className="h-3 w-3 fill-current" />
          Featured
        </div>
      )}
      
      {/* Header Section - Responsive layout */}
      <CardHeader className="pb-2 sm:pb-3 flex-shrink-0">
        <div className="flex items-start justify-between gap-2 sm:gap-3">
          <div className="flex-1 min-w-0">
            {/* Course Code and Status Tags Row */}
            <div className="flex items-center gap-1.5 sm:gap-2 mb-1.5 sm:mb-2 flex-wrap">
              <h3 className="font-bold text-base sm:text-lg leading-tight group-hover:text-primary transition-colors duration-200">
                {code}
              </h3>
              <div className="flex items-center gap-1 sm:gap-1.5 flex-wrap">
                {isNew && (
                  <Badge className="bg-accent text-accent-foreground text-xs font-medium px-2 py-0.5 sm:px-2.5 sm:py-1 border border-accent/20 whitespace-nowrap">
                    New
                  </Badge>
                )}
                {effortLevel && (
                  <Badge className={`text-xs font-medium px-2 py-0.5 sm:px-2.5 sm:py-1 border whitespace-nowrap ${getEffortColor(effortLevel)}`}>
                    {getEffortLabel(effortLevel)}
                  </Badge>
                )}
              </div>
            </div>
            {/* Faculty */}
            <p className="text-xs sm:text-sm text-muted-foreground font-medium">{faculty}</p>
          </div>
          
          {/* Rating and Compare Section */}
          <div className="flex flex-col items-end gap-1.5 sm:gap-2 flex-shrink-0">
            <div className="flex items-center gap-0.5 sm:gap-1">
              <Star className="h-3.5 w-3.5 sm:h-4 sm:w-4 fill-primary text-primary" />
              <span className="text-xs sm:text-sm font-bold text-foreground">{rating.toFixed(1)}</span>
            </div>
            {onCompareToggle && (
              <Button
                variant={isSelected ? "default" : "outline"}
                size="sm"
                className={`h-6 px-2 sm:h-7 sm:px-2.5 text-xs font-medium transition-all duration-200 group/compare
                  ${isSelected 
                    ? "bg-primary text-primary-foreground hover:bg-primary/90 shadow-sm" 
                    : "border-muted-foreground/20 hover:border-primary/50 hover:bg-primary/10 hover:text-primary"
                  }
                `}
                onClick={() => onCompareToggle(id)}
              >
                {isSelected ? (
                  <>
                    <Check className="h-2.5 w-2.5 sm:h-3 sm:w-3 mr-0.5 sm:mr-1" />
                    <span className="hidden sm:inline">Comparing</span>
                    <span className="sm:hidden">✓</span>
                  </>
                ) : (
                  <>
                    <Plus className="h-2.5 w-2.5 sm:h-3 sm:w-3 mr-0.5 sm:mr-1 group-hover/compare:scale-110 transition-transform" />
                    <span className="hidden sm:inline">Compare</span>
                    <span className="sm:hidden">+</span>
                  </>
                )}
              </Button>
            )}
          </div>
        </div>
        
        {/* Course Title */}
        <h2 className="text-xs sm:text-sm text-foreground font-semibold mt-1.5 sm:mt-2 leading-relaxed line-clamp-2 group-hover:text-primary transition-colors duration-200">{title}</h2>
      </CardHeader>

      {/* Body Section - Flexible responsive content */}
      <CardContent className="pb-2 sm:pb-3 flex-1 flex flex-col">
        {/* Stats Row with improved readability */}
        <div className="flex items-center gap-3 sm:gap-4 text-xs sm:text-sm text-muted-foreground mb-3 sm:mb-4">
          <div className="flex items-center gap-1 sm:gap-1.5 font-medium">
            <Users className="h-3 w-3 sm:h-4 sm:w-4 text-primary/70" />
            <span className="text-foreground/80">{reviewCount}</span>
            <span className="hidden sm:inline">reviews</span>
            <span className="sm:hidden">rev</span>
          </div>
          <div className="flex items-center gap-1 sm:gap-1.5 font-medium">
            {getModeIcon(mode)}
            <span className="capitalize text-foreground/80">{mode}</span>
          </div>
        </div>
        
        {/* Skills Section with adaptive layout */}
        <div className="flex flex-wrap gap-2 flex-1 content-start 
          /* Adaptive max height based on screen size */
          max-h-[60px] sm:max-h-[70px] lg:max-h-[80px] xl:max-h-[70px] 2xl:max-h-[60px]
          /* Ultra-wide and narrow screen adaptations */
          [@media(min-aspect-ratio:21/9)]:max-h-[50px]
          [@media(max-aspect-ratio:4/3)]:max-h-[100px]
          overflow-y-auto skills-container">
          {displayedSkills.map((skill) => {
            const isSkillSelected = selectedSkills.includes(skill);
            return (
              <Badge 
                key={skill} 
                variant={isSkillSelected ? "default" : "secondary"} 
                className={`text-xs font-medium px-2.5 py-1 transition-all duration-200 border
                  /* Responsive text sizing */
                  sm:text-xs lg:text-xs xl:text-xs
                  /* Responsive padding */
                  sm:px-3 sm:py-1.5 lg:px-3 lg:py-1.5
                  ${onSkillClick 
                    ? `cursor-pointer ${
                        isSkillSelected 
                          ? 'bg-primary text-primary-foreground hover:bg-primary/90 shadow-sm border-primary/20' 
                          : 'bg-secondary/80 dark:bg-secondary/60 hover:bg-primary/15 hover:text-primary hover:shadow-sm hover:border-primary/30 border-secondary/50'
                      } hover:scale-105 active:scale-95` 
                    : isSkillSelected 
                      ? 'bg-primary text-primary-foreground border-primary/20' 
                      : 'bg-secondary/80 dark:bg-secondary/60 border-secondary/50'
                  }`}
                onClick={() => onSkillClick?.(skill)}
              >
                {skill}
              </Badge>
            );
          })}
          {hasMoreSkills && !showAllSkills && (
            <Badge 
              variant="outline" 
              className="text-xs font-medium px-2.5 py-1 cursor-pointer 
                sm:px-3 sm:py-1.5 lg:px-3 lg:py-1.5
                hover:bg-primary/15 hover:text-primary hover:border-primary/50 
                transition-all duration-200 hover:scale-105 active:scale-95
                border-dashed border-muted-foreground/30 hover:border-primary/50"
              onClick={() => setShowAllSkills(true)}
            >
              +{skills.length - 3} more
            </Badge>
          )}
          {showAllSkills && hasMoreSkills && (
            <Badge 
              variant="outline" 
              className="text-xs font-medium px-2.5 py-1 cursor-pointer 
                sm:px-3 sm:py-1.5 lg:px-3 lg:py-1.5
                hover:bg-primary/15 hover:text-primary hover:border-primary/50 
                transition-all duration-200 hover:scale-105 active:scale-95
                border-dashed border-muted-foreground/30 hover:border-primary/50"
              onClick={() => setShowAllSkills(false)}
            >
              Show less
            </Badge>
          )}
        </div>
      </CardContent>

      {/* Footer Section - Responsive View Course Button */}
      <CardFooter className="pt-0 flex-shrink-0">
        <Link to={`/course/${id}`} className="w-full">
          <Button className="w-full group/btn font-medium transition-all duration-200 
            hover:shadow-sm hover:bg-primary/90 h-8 sm:h-9 text-xs sm:text-sm" size="sm">
            <span className="hidden sm:inline">View Course</span>
            <span className="sm:hidden">View</span>
            <ArrowRight className="h-3 w-3 sm:h-3.5 sm:w-3.5 ml-1 sm:ml-2 transition-transform duration-200 group-hover/btn:translate-x-1" />
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default CourseCard;
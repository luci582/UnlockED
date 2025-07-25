import { Star, Users, Clock, ArrowRight } from "lucide-react";
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
}

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
      case "light": return "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400";
      case "moderate": return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400";
      case "heavy": return "bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-400";
      case "very-heavy": return "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400";
      default: return "bg-muted text-muted-foreground";
    }
  };
  return (
    <Card className={`group relative overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-lg ${
      featured ? "border-primary shadow-md bg-primary/5" : ""
    }`}>
      {featured && (
        <div className="absolute top-0 right-0 bg-primary text-primary-foreground px-3 py-1 text-xs font-medium rounded-bl-lg">
          Featured
        </div>
      )}
      
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center space-x-2 mb-1">
              <h3 className="font-semibold text-lg leading-tight group-hover:text-primary transition-colors">
                {code}
              </h3>
              {isNew && (
                <Badge className="bg-accent text-accent-foreground text-xs">
                  New
                </Badge>
              )}
              {effortLevel && (
                <Badge className={`text-xs ${getEffortColor(effortLevel)}`}>
                  {getEffortLabel(effortLevel)}
                </Badge>
              )}
            </div>
            <p className="text-sm text-muted-foreground mt-1">{faculty}</p>
          </div>
          <div className="flex items-center space-x-1">
            <Star className="h-4 w-4 fill-primary text-primary" />
            <span className="text-sm font-medium">{rating.toFixed(1)}</span>
          </div>
        </div>
        <p className="text-sm text-foreground font-medium mt-2">{title}</p>
      </CardHeader>

      <CardContent className="pb-3">
        <div className="flex items-center space-x-4 text-xs text-muted-foreground mb-3">
          <div className="flex items-center space-x-1">
            <Users className="h-3 w-3" />
            <span>{reviewCount} reviews</span>
          </div>
          <div className="flex items-center space-x-1">
            <Clock className="h-3 w-3" />
            <span className="capitalize">{mode}</span>
          </div>
        </div>
        
        <div className="flex flex-wrap gap-1">
          {(showAllSkills ? skills : skills.slice(0, 3)).map((skill) => (
            <Badge 
              key={skill} 
              variant="secondary" 
              className={`text-xs bg-secondary/60 hover:bg-secondary/80 ${
                onSkillClick ? 'cursor-pointer transition-colors hover:bg-primary/20' : ''
              }`}
              onClick={() => onSkillClick?.(skill)}
            >
              {skill}
            </Badge>
          ))}
          {skills.length > 3 && !showAllSkills && (
            <Badge 
              variant="outline" 
              className="text-xs cursor-pointer hover:bg-primary/10 transition-colors"
              onClick={() => setShowAllSkills(true)}
            >
              +{skills.length - 3} more
            </Badge>
          )}
          {showAllSkills && skills.length > 3 && (
            <Badge 
              variant="outline" 
              className="text-xs cursor-pointer hover:bg-primary/10 transition-colors"
              onClick={() => setShowAllSkills(false)}
            >
              Show less
            </Badge>
          )}
        </div>
      </CardContent>

      <CardFooter className="pt-0">
        <Link to={`/course/${id}`} className="w-full">
          <Button className="w-full group/btn" size="sm">
            View Course
            <ArrowRight className="h-3 w-3 ml-2 transition-transform group-hover/btn:translate-x-1" />
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default CourseCard;
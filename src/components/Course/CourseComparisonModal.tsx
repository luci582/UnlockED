import { useState } from "react";
import { X, Star, Users, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useCourseComparison } from "@/hooks/use-course-comparison";

interface CourseComparisonModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CourseComparisonModal = ({ isOpen, onClose }: CourseComparisonModalProps) => {
  const { selectedCourses, removeCourse, clearAll } = useCourseComparison();

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

  if (selectedCourses.length === 0) {
    return null;
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <span>Course Comparison ({selectedCourses.length})</span>
            <Button variant="outline" size="sm" onClick={clearAll}>
              Clear All
            </Button>
          </DialogTitle>
        </DialogHeader>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {selectedCourses.map((course) => (
            <Card key={course.id} className="relative">
              <Button
                variant="ghost"
                size="sm"
                className="absolute top-2 right-2 h-6 w-6 p-0"
                onClick={() => removeCourse(course.id)}
              >
                <X className="h-4 w-4" />
              </Button>
              
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">{course.code}</CardTitle>
                <p className="text-sm text-muted-foreground">{course.faculty}</p>
                <p className="text-sm font-medium">{course.title}</p>
              </CardHeader>
              
              <CardContent className="space-y-4">
                {/* Rating */}
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Overall Rating</span>
                  <div className="flex items-center space-x-1">
                    <Star className="h-4 w-4 fill-primary text-primary" />
                    <span className="font-medium">{course.rating.toFixed(1)}</span>
                  </div>
                </div>
                
                {/* Reviews Count */}
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Reviews</span>
                  <div className="flex items-center space-x-1">
                    <Users className="h-4 w-4 text-muted-foreground" />
                    <span>{course.reviewCount}</span>
                  </div>
                </div>
                
                {/* Mode */}
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Delivery Mode</span>
                  <div className="flex items-center space-x-1">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span className="capitalize">{course.mode}</span>
                  </div>
                </div>
                
                {/* Effort Level */}
                {course.effortLevel && (
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Workload</span>
                    <Badge className={`text-xs ${getEffortColor(course.effortLevel)}`}>
                      {getEffortLabel(course.effortLevel)}
                    </Badge>
                  </div>
                )}
                
                {/* Skills */}
                <div>
                  <span className="text-sm font-medium">Skills Developed</span>
                  <div className="flex flex-wrap gap-1 mt-2">
                    {course.skills.slice(0, 4).map((skill) => (
                      <Badge key={skill} variant="secondary" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                    {course.skills.length > 4 && (
                      <Badge variant="outline" className="text-xs">
                        +{course.skills.length - 4} more
                      </Badge>
                    )}
                  </div>
                </div>
                
                {/* Special Tags */}
                <div className="flex gap-2">
                  {course.featured && (
                    <Badge className="bg-primary text-primary-foreground text-xs">
                      <Star className="h-3 w-3 mr-1 fill-current" />
                      Featured
                    </Badge>
                  )}
                  {course.isNew && (
                    <Badge className="bg-accent text-accent-foreground text-xs">
                      New
                    </Badge>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CourseComparisonModal;

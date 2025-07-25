import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useCourseComparison } from "@/hooks/use-course-comparison";
import CourseComparisonModal from "./CourseComparisonModal";
import { BarChart3 } from "lucide-react";

const ComparisonTray = () => {
  const { selectedCourses } = useCourseComparison();
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (selectedCourses.length === 0) {
    return null;
  }

  return (
    <>
      <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50">
        <Button
          onClick={() => setIsModalOpen(true)}
          className="bg-primary text-primary-foreground shadow-lg hover:shadow-xl transition-all duration-200 px-6 py-3 rounded-full"
          size="lg"
        >
          <BarChart3 className="h-5 w-5 mr-2" />
          Compare ({selectedCourses.length})
          <Badge 
            className="ml-2 bg-primary-foreground text-primary hover:bg-primary-foreground"
            variant="secondary"
          >
            {selectedCourses.length}/3
          </Badge>
        </Button>
      </div>
      
      <CourseComparisonModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </>
  );
};

export default ComparisonTray;

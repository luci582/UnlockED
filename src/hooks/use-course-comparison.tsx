import { createContext, useContext, useState, ReactNode } from 'react';

interface Course {
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
}

interface CourseComparisonContextType {
  selectedCourses: Course[];
  addCourse: (course: Course) => void;
  removeCourse: (courseId: string) => void;
  clearAll: () => void;
  isSelected: (courseId: string) => boolean;
}

const CourseComparisonContext = createContext<CourseComparisonContextType | undefined>(undefined);

export const CourseComparisonProvider = ({ children }: { children: ReactNode }) => {
  const [selectedCourses, setSelectedCourses] = useState<Course[]>([]);

  const addCourse = (course: Course) => {
    if (selectedCourses.length >= 3) {
      return; // Max 3 courses for comparison
    }
    setSelectedCourses(prev => [...prev, course]);
  };

  const removeCourse = (courseId: string) => {
    setSelectedCourses(prev => prev.filter(course => course.id !== courseId));
  };

  const clearAll = () => {
    setSelectedCourses([]);
  };

  const isSelected = (courseId: string) => {
    return selectedCourses.some(course => course.id === courseId);
  };

  return (
    <CourseComparisonContext.Provider 
      value={{ selectedCourses, addCourse, removeCourse, clearAll, isSelected }}
    >
      {children}
    </CourseComparisonContext.Provider>
  );
};

export const useCourseComparison = () => {
  const context = useContext(CourseComparisonContext);
  if (context === undefined) {
    throw new Error('useCourseComparison must be used within a CourseComparisonProvider');
  }
  return context;
};

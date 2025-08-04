import { useState } from "react";
import { ChevronLeft, Star, MessageSquare, ArrowRight, ArrowLeft } from "lucide-react";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Textarea } from "../components/ui/textarea";
import { Checkbox } from "../components/ui/checkbox";
import { Badge } from "../components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { Link, useNavigate } from "react-router-dom";
import { useToast } from "../hooks/use-toast";
import { Progress } from "../components/ui/progress";
import { useAuth } from "../hooks/use-auth";
import { allCourses } from "../data/courses";

interface ReviewFormData {
  courseCode: string;
  semester: string;
  overallRating: number;
  review: string;
  workload: string;
  teachingQuality: string[];
  assessments: string[];
  skillsDeveloped: string[];
}

const MultiStepSubmitReview = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const { user, updateUser } = useAuth();
  const [currentStep, setCurrentStep] = useState(1);
  const [hoverRating, setHoverRating] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [formData, setFormData] = useState<ReviewFormData>({
    courseCode: "",
    semester: "",
    overallRating: 0,
    review: "",
    workload: "",
    teachingQuality: [],
    assessments: [],
    skillsDeveloped: [],
  });

  // Rating labels for interactive feedback
  const getRatingLabel = (rating: number) => {
    const labels = {
      1: "1 - Poor",
      2: "2 - Fair", 
      3: "3 - Good",
      4: "4 - Very Good",
      5: "5 - Excellent"
    };
    return labels[rating as keyof typeof labels] || "";
  };

  const skillOptions = [
    "Programming", "Problem Solving", "Critical Thinking", "Communication",
    "Leadership", "Teamwork", "Research", "Writing", "Statistics",
    "Excel", "Public Speaking", "Analysis", "Creativity", "Mathematics"
  ];

  // UNSW semester options (T1, T2, T3 for each year)
  const semesterOptions = [
    "2025 T2", "2025 T1",
    "2024 T3", "2024 T2", "2024 T1",
    "2023 T3", "2023 T2", "2023 T1",
    "2022 T3", "2022 T2", "2022 T1"
  ];

  const workloadOptions = [
    { id: "light", label: "Light workload (< 5 hours/week)" },
    { id: "moderate", label: "Moderate workload (5-10 hours/week)" },
    { id: "heavy", label: "Heavy workload (10-15 hours/week)" },
    { id: "very-heavy", label: "Very heavy workload (15+ hours/week)" }
  ];

  const teachingQualityOptions = [
    { id: "excellent", label: "Excellent teaching quality" },
    { id: "clear", label: "Clear and well-structured" },
    { id: "engaging", label: "Engaging and interactive" },
    { id: "helpful", label: "Helpful feedback provided" }
  ];

  const assessmentOptions = [
    { id: "fair", label: "Fair and well-designed" },
    { id: "relevant", label: "Relevant to course content" },
    { id: "challenging", label: "Appropriately challenging" },
    { id: "timely", label: "Timely feedback provided" }
  ];

  const handleArrayFieldToggle = (
    field: 'teachingQuality' | 'assessments' | 'skillsDeveloped',
    value: string
  ) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].includes(value)
        ? prev[field].filter(item => item !== value)
        : [...prev[field], value]
    }));
  };

  const handleNext = () => {
    if (currentStep === 1) {
      // Validate required fields for step 1 - only rating is required, text is optional
      if (!formData.courseCode || !formData.semester || !formData.overallRating) {
        toast({
          title: "Please fill in all required fields",
          description: "Course code, semester, and rating are required.",
          variant: "destructive",
        });
        return;
      }
    }
    setCurrentStep(2);
  };

  const handleBack = () => {
    setCurrentStep(1);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user?.email) {
      toast({
        title: "Error",
        description: "You must be logged in to submit a review.",
        variant: "destructive"
      });
      return;
    }
    
    // Validate required fields - only rating is mandatory, text is optional
    if (!formData.courseCode || !formData.semester || !formData.overallRating) {
      toast({
        title: "Missing Required Fields",
        description: "Please fill in course code, semester, and rating.",
        variant: "destructive",
      });
      return;
    }

    // Optional: validate review length only if provided
    if (formData.review.trim().length > 0 && formData.review.trim().length < 10) {
      toast({
        title: "Review Too Short",
        description: "If you provide a review, please write at least 10 characters.",
        variant: "destructive",
      });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Simulate API call with mock success
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Update user points locally (mock backend response)
      const updatedUser = {
        ...user,
        totalPoints: (user.totalPoints || 0) + 50,
        reviewCount: (user.reviewCount || 0) + 1
      };
      updateUser(updatedUser);
      
      toast({
        title: "Review Submitted!",
        description: "Thank you for sharing your experience. You've earned 50 Reward Points!",
      });
      
      // Reset form
      setFormData({
        courseCode: "",
        semester: "",
        overallRating: 0,
        review: "",
        workload: "",
        teachingQuality: [],
        assessments: [],
        skillsDeveloped: [],
      });
      
      // Navigate to courses page after success
      setTimeout(() => {
        navigate('/courses');
      }, 2000);
      
    } catch (error) {
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const progressValue = (currentStep / 2) * 100;

  return (
    <div className="min-h-screen bg-background">
      <div className="container py-8 max-w-4xl">
        {/* Breadcrumb */}
        <div className="flex items-center space-x-2 text-sm text-muted-foreground mb-6">
          <Link to="/courses" className="hover:text-primary">Courses</Link>
          <ChevronLeft className="h-4 w-4 rotate-180" />
          <span>Submit Review</span>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <h1 className="text-3xl font-bold">Submit Course Review</h1>
            <span className="text-sm text-muted-foreground">Step {currentStep} of 2</span>
          </div>
          <Progress value={progressValue} className="h-2" />
        </div>

        <form onSubmit={handleSubmit}>
          {currentStep === 1 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <MessageSquare className="h-5 w-5 text-primary" />
                  <span>Basic Information</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Course Code */}
                <div className="space-y-2">
                  <Label htmlFor="courseCode">Course Code *</Label>
                  <Select 
                    value={formData.courseCode} 
                    onValueChange={(value) => setFormData(prev => ({...prev, courseCode: value}))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select a course..." />
                    </SelectTrigger>
                    <SelectContent>
                      {allCourses.map((course) => (
                        <SelectItem key={course.id} value={course.code}>
                          {course.code} - {course.title}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Semester */}
                <div className="space-y-2">
                  <Label htmlFor="semester">Semester Taken *</Label>
                  <Select 
                    value={formData.semester} 
                    onValueChange={(value) => setFormData(prev => ({...prev, semester: value}))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select semester (e.g., 2024 T1)" />
                    </SelectTrigger>
                    <SelectContent>
                      {semesterOptions.map((semester) => (
                        <SelectItem key={semester} value={semester}>
                          {semester}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Overall Rating */}
                <div className="space-y-3">
                  <Label className="text-base font-medium">Overall Rating *</Label>
                  <div className="flex items-center space-x-1">
                    {[1, 2, 3, 4, 5].map((rating) => (
                      <button
                        key={rating}
                        type="button"
                        className="focus:outline-none transition-transform hover:scale-110"
                        onMouseEnter={() => setHoverRating(rating)}
                        onMouseLeave={() => setHoverRating(0)}
                        onClick={() => setFormData(prev => ({...prev, overallRating: rating}))}
                      >
                        <Star
                          className={`h-8 w-8 transition-colors ${
                            rating <= (hoverRating || formData.overallRating)
                              ? "fill-primary text-primary"
                              : "text-muted-foreground"
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                  {(hoverRating || formData.overallRating) > 0 && (
                    <p className="text-sm text-muted-foreground">
                      {getRatingLabel(hoverRating || formData.overallRating)}
                    </p>
                  )}
                </div>

                {/* Review Text */}
                <div className="space-y-2">
                  <Label htmlFor="review">Your Review (Optional)</Label>
                  <Textarea
                    id="review"
                    placeholder="Share your experience with this course (optional)..."
                    className="min-h-[120px]"
                    value={formData.review}
                    onChange={(e) => setFormData(prev => ({...prev, review: e.target.value}))}
                  />
                  <div className="bg-muted/50 border border-muted-foreground/20 rounded-lg p-3">
                    <div className="flex items-start space-x-2">
                      <MessageSquare className="h-4 w-4 text-muted-foreground mt-0.5 shrink-0" />
                      <div className="text-xs text-muted-foreground space-y-1">
                        <p className="font-medium">Review Guidelines:</p>
                        <ul className="space-y-0.5 list-disc list-inside">
                          <li>Please focus on course content, structure, and your learning experience</li>
                          <li><strong>Do not comment on specific teaching staff members</strong></li>
                          <li>Keep feedback constructive and respectful</li>
                          <li>All reviews are moderated before publication</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button type="button" onClick={handleNext} className="min-w-32">
                    Next
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {currentStep === 2 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Star className="h-5 w-5 text-primary" />
                  <span>Additional Details (Optional)</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Workload */}
                <div className="space-y-3">
                  <Label className="text-base font-medium">Workload</Label>
                  <div className="grid grid-cols-1 gap-3">
                    {workloadOptions.map((option) => (
                      <div key={option.id} className="flex items-center space-x-2">
                        <input
                          type="radio"
                          id={option.id}
                          name="workload"
                          checked={formData.workload === option.id}
                          onChange={() => setFormData(prev => ({...prev, workload: option.id}))}
                          className="text-primary"
                        />
                        <Label htmlFor={option.id} className="text-sm">{option.label}</Label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Teaching Quality */}
                <div className="space-y-3">
                  <Label className="text-base font-medium">Teaching Quality</Label>
                  <div className="grid grid-cols-1 gap-3">
                    {teachingQualityOptions.map((option) => (
                      <div key={option.id} className="flex items-center space-x-2">
                        <Checkbox
                          id={option.id}
                          checked={formData.teachingQuality.includes(option.id)}
                          onCheckedChange={() => handleArrayFieldToggle('teachingQuality', option.id)}
                        />
                        <Label htmlFor={option.id} className="text-sm">{option.label}</Label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Assessments */}
                <div className="space-y-3">
                  <Label className="text-base font-medium">Assessments</Label>
                  <div className="grid grid-cols-1 gap-3">
                    {assessmentOptions.map((option) => (
                      <div key={option.id} className="flex items-center space-x-2">
                        <Checkbox
                          id={option.id}
                          checked={formData.assessments.includes(option.id)}
                          onCheckedChange={() => handleArrayFieldToggle('assessments', option.id)}
                        />
                        <Label htmlFor={option.id} className="text-sm">{option.label}</Label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Skills Developed */}
                <div className="space-y-3">
                  <Label className="text-base font-medium">Skills Developed</Label>
                  <div className="flex flex-wrap gap-2">
                    {skillOptions.map((skill) => (
                      <Badge
                        key={skill}
                        variant={formData.skillsDeveloped.includes(skill) ? "default" : "outline"}
                        className="cursor-pointer transition-all duration-200 hover:scale-105"
                        onClick={() => handleArrayFieldToggle('skillsDeveloped', skill)}
                      >
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="flex justify-between">
                  <Button type="button" variant="outline" onClick={handleBack} className="min-w-32">
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Back
                  </Button>
                  <Button type="submit" className="min-w-32" disabled={isSubmitting}>
                    {isSubmitting ? "Submitting..." : "Submit Review"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </form>
      </div>
    </div>
  );
};

export default MultiStepSubmitReview;

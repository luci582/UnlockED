import { useState } from "react";
import { ChevronLeft, Star, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const SubmitReview = () => {
  const { toast } = useToast();
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [selectedWorkload, setSelectedWorkload] = useState<string>("");
  const [selectedTeaching, setSelectedTeaching] = useState<string[]>([]);
  const [selectedAssessments, setSelectedAssessments] = useState<string[]>([]);

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

  const workloadOptions = [
    { id: "light", label: "Light workload (< 5 hours/week)" },
    { id: "moderate", label: "Moderate workload (5-10 hours/week)" },
    { id: "heavy", label: "Heavy workload (10-15 hours/week)" },
    { id: "very-heavy", label: "Very heavy workload (15+ hours/week)" }
  ];

  const deliveryOptions = [
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

  const handleTeachingToggle = (teaching: string) => {
    setSelectedTeaching(prev => 
      prev.includes(teaching) 
        ? prev.filter(t => t !== teaching)
        : [...prev, teaching]
    );
  };

  const handleAssessmentToggle = (assessment: string) => {
    setSelectedAssessments(prev => 
      prev.includes(assessment) 
        ? prev.filter(a => a !== assessment)
        : [...prev, assessment]
    );
  };

  const handleSkillToggle = (skill: string) => {
    setSelectedSkills(prev => 
      prev.includes(skill) 
        ? prev.filter(s => s !== skill)
        : [...prev, skill]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Review Submitted!",
      description: "Thank you for sharing your experience. You've earned 50 Reward Points!",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container py-8 max-w-4xl">
        {/* Breadcrumb */}
        <div className="flex items-center space-x-2 text-sm text-muted-foreground mb-6">
          <Link to="/courses" className="hover:text-primary">Courses</Link>
          <ChevronLeft className="h-4 w-4 rotate-180" />
          <span>Submit Review</span>
        </div>

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Submit Course Review</h1>
          <p className="text-muted-foreground">
            Share your experience to help fellow students make informed decisions
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Course Selection */}
          <Card>
            <CardHeader>
              <CardTitle>Course Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <Label htmlFor="courseCode">Course Code</Label>
                  <Input 
                    id="courseCode" 
                    placeholder="e.g., COMP1511" 
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="semester">Semester Taken</Label>
                  <Input 
                    id="semester" 
                    placeholder="e.g., T1 2024" 
                    className="mt-1"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Overall Rating */}
          <Card>
            <CardHeader>
              <CardTitle>Overall Rating</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      onMouseEnter={() => setHoverRating(star)}
                      onMouseLeave={() => setHoverRating(0)}
                      className="p-1 transition-transform hover:scale-110"
                    >
                      <Star
                        className={`h-8 w-8 transition-colors ${
                          star <= (hoverRating || rating)
                            ? "fill-course-rating text-course-rating"
                            : "text-muted stroke-muted-foreground"
                        }`}
                      />
                    </button>
                  ))}
                </div>
                <span className="text-sm text-muted-foreground font-medium">
                  {hoverRating > 0 ? getRatingLabel(hoverRating) : (rating > 0 ? getRatingLabel(rating) : "Select a rating")}
                </span>
              </div>
            </CardContent>
          </Card>

          {/* Course Aspects */}
          <div className="grid gap-6 md:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Workload</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex flex-wrap gap-2">
                  {workloadOptions.map((option) => (
                    <Badge
                      key={option.id}
                      variant={selectedWorkload === option.id ? "default" : "outline"}
                      className="cursor-pointer transition-all hover:scale-105"
                      onClick={() => {
                        setSelectedWorkload(prev => prev === option.id ? "" : option.id);
                      }}
                    >
                      {option.label}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Teaching Quality</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex flex-wrap gap-2">
                  {deliveryOptions.map((option) => (
                    <Badge
                      key={option.id}
                      variant={selectedTeaching.includes(option.id) ? "default" : "outline"}
                      className="cursor-pointer transition-all hover:scale-105"
                      onClick={() => handleTeachingToggle(option.id)}
                    >
                      {option.label}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Assessments</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex flex-wrap gap-2">
                  {assessmentOptions.map((option) => (
                    <Badge
                      key={option.id}
                      variant={selectedAssessments.includes(option.id) ? "default" : "outline"}
                      className="cursor-pointer transition-all hover:scale-105"
                      onClick={() => handleAssessmentToggle(option.id)}
                    >
                      {option.label}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Skills Gained */}
          <Card>
            <CardHeader>
              <CardTitle>Skills Developed</CardTitle>
              <p className="text-sm text-muted-foreground">
                Select the skills you developed or improved in this course
              </p>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {skillOptions.map((skill) => (
                  <Badge
                    key={skill}
                    variant={selectedSkills.includes(skill) ? "default" : "outline"}
                    className="cursor-pointer hover:bg-primary/80 transition-colors"
                    onClick={() => handleSkillToggle(skill)}
                  >
                    {skill}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Review Guidelines */}
          <Card className="bg-muted/20 border-primary/20">
            <CardContent className="p-6">
              <div className="flex items-start space-x-3">
                <MessageSquare className="h-6 w-6 text-primary mt-0.5" />
                <div>
                  <h3 className="font-semibold mb-2">Review Guidelines</h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    Please focus your review on your personal experience with the course content and structure. 
                    Your insights about workload, difficulty, skills gained, and course organization are valuable to fellow students.
                  </p>
                  <p className="text-sm text-muted-foreground font-medium">
                    ⚠️ Important: Do not mention or comment on any teaching staff members in your review.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Written Review */}
          <Card>
            <CardHeader>
              <CardTitle>Your Review</CardTitle>
              <p className="text-sm text-muted-foreground">
                Share your experience to help future students
              </p>
            </CardHeader>
             <CardContent>
               <Textarea
                 placeholder="What did you like about this course? What challenges did you face? Any tips for future students?"
                 className="min-h-[120px]"
               />
               <p className="text-xs text-muted-foreground mt-3">
                 Note: All reviews are moderated. Please ensure your comments are respectful and appropriate.
               </p>
             </CardContent>
          </Card>

          {/* Reward Notice */}
          <Card className="bg-course-featured/20 border-primary/20">
            <CardContent className="p-6">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <Star className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold">Earn Reward Points!</h3>
                  <p className="text-sm text-muted-foreground">
                    Submitting this review will earn you 50 Reward Points for helping the community
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Submit Button */}
          <div className="flex justify-end space-x-4">
            <Link to="/courses">
              <Button variant="outline">Cancel</Button>
            </Link>
            <Button type="submit" size="lg">
              Submit Review
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SubmitReview;
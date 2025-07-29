import { useState } from "react";
import { ChevronLeft, Star, MessageSquare, BookOpen, Users, Clock, Award, Target, Lightbulb } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Progress } from "@/components/ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
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
  const [courseName, setCourseName] = useState<string>("");
  const [instructor, setInstructor] = useState<string>("");
  const [semester, setSemester] = useState<string>("");
  const [reviewText, setReviewText] = useState<string>("");

  // Calculate form completion progress
  const calculateProgress = () => {
    let completed = 0;
    const total = 7; // Total required sections
    
    if (courseName) completed++;
    if (instructor) completed++;
    if (semester) completed++;
    if (rating > 0) completed++;
    if (selectedWorkload) completed++;
    if (selectedSkills.length > 0) completed++;
    if (reviewText.trim().length > 50) completed++;
    
    return (completed / total) * 100;
  };

  const progress = calculateProgress();

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

  // UNSW semester options (T1, T2, T3 for each year)
  const semesterOptions = [
    "2025 T2", "2025 T1",
    "2024 T3", "2024 T2", "2024 T1",
    "2023 T3", "2023 T2", "2023 T1",
    "2022 T3", "2022 T2", "2022 T1"
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
    
    // Basic validation
    if (!courseName || !rating || !semester) {
      toast({
        title: "Missing Required Fields",
        description: "Please fill in course code, rating, and semester.",
        variant: "destructive",
      });
      return;
    }

    if (reviewText.trim().length < 50) {
      toast({
        title: "Review Too Short",
        description: "Please write at least 50 characters for your review.",
        variant: "destructive",
      });
      return;
    }

    // Success
    toast({
      title: "Review Submitted!",
      description: "Thank you for sharing your experience. You've earned 50 Reward Points!",
    });

    // Reset form
    setCourseName("");
    setInstructor("");
    setSemester("");
    setRating(0);
    setSelectedWorkload("");
    setSelectedSkills([]);
    setReviewText("");
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

        {/* Enhanced Header with Progress */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <Award className="h-8 w-8 text-primary" />
                <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                  Submit Course Review
                </h1>
              </div>
              <p className="text-muted-foreground">
                Share your experience to help fellow students make informed decisions
              </p>
            </div>
            <div className="hidden md:flex items-center gap-4">
              <Card className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20 border-green-200 dark:border-green-800">
                <div className="flex items-center gap-2">
                  <Target className="h-5 w-5 text-green-600" />
                  <div>
                    <div className="text-sm font-medium text-green-800 dark:text-green-200">Reward</div>
                    <div className="text-lg font-bold text-green-900 dark:text-green-100">50 pts</div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
          
          {/* Progress Tracker */}
          <Card className="bg-gradient-to-r from-primary/5 to-transparent border-primary/20">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">Form Progress</span>
                <span className="text-sm text-muted-foreground">{Math.round(progress)}% Complete</span>
              </div>
              <Progress value={progress} className="h-2" />
              <div className="flex items-center gap-4 mt-3 text-xs text-muted-foreground">
                <div className="flex items-center gap-1">
                  <BookOpen className="h-3 w-3" />
                  <span>Course Info</span>
                </div>
                <div className="flex items-center gap-1">
                  <Star className="h-3 w-3" />
                  <span>Rating</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  <span>Workload</span>
                </div>
                <div className="flex items-center gap-1">
                  <Lightbulb className="h-3 w-3" />
                  <span>Skills</span>
                </div>
                <div className="flex items-center gap-1">
                  <MessageSquare className="h-3 w-3" />
                  <span>Review</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Enhanced Course Information Section */}
          <Card className="relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-blue-600"></div>
            <CardHeader className="pb-4">
              <div className="flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-blue-600" />
                <CardTitle>Course Information</CardTitle>
              </div>
              <p className="text-sm text-muted-foreground">
                Help us identify the course you're reviewing
              </p>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <Label htmlFor="courseCode" className="text-sm font-medium">Course Code *</Label>
                  <Input 
                    id="courseCode" 
                    placeholder="e.g., COMP1511" 
                    className="mt-2"
                    value={courseName}
                    onChange={(e) => setCourseName(e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="instructor" className="text-sm font-medium">Instructor</Label>
                  <Input 
                    id="instructor" 
                    placeholder="e.g., Dr. Smith" 
                    className="mt-2"
                    value={instructor}
                    onChange={(e) => setInstructor(e.target.value)}
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="semester" className="text-sm font-medium">Semester Taken *</Label>
                <Select value={semester} onValueChange={setSemester}>
                  <SelectTrigger className="mt-2">
                    <SelectValue placeholder="Select semester (e.g., 2024 T1)" />
                  </SelectTrigger>
                  <SelectContent>
                    {semesterOptions.map((sem) => (
                      <SelectItem key={sem} value={sem}>
                        {sem}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Enhanced Overall Rating Section */}
          <Card className="relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-yellow-500 to-orange-500"></div>
            <CardHeader className="pb-4">
              <div className="flex items-center gap-2">
                <Star className="h-5 w-5 text-yellow-500" />
                <CardTitle>Overall Rating</CardTitle>
              </div>
              <p className="text-sm text-muted-foreground">
                Rate your overall experience with this course
              </p>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-center space-x-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      onMouseEnter={() => setHoverRating(star)}
                      onMouseLeave={() => setHoverRating(0)}
                      className="p-2 transition-all duration-200 hover:scale-125 active:scale-110"
                    >
                      <Star
                        className={`h-10 w-10 transition-all duration-200 ${
                          star <= (hoverRating || rating)
                            ? "fill-yellow-400 text-yellow-400 drop-shadow-lg"
                            : "text-gray-300 hover:text-yellow-200"
                        }`}
                      />
                    </button>
                  ))}
                </div>
                <div className="text-center">
                  <span className={`text-lg font-medium transition-colors duration-200 ${
                    (hoverRating || rating) > 0 ? "text-primary" : "text-muted-foreground"
                  }`}>
                    {hoverRating > 0 ? getRatingLabel(hoverRating) : (rating > 0 ? getRatingLabel(rating) : "Select a rating")}
                  </span>
                </div>
                {rating > 0 && (
                  <div className="bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-950/20 dark:to-orange-950/20 rounded-lg p-3 border border-yellow-200 dark:border-yellow-800">
                    <p className="text-sm text-center text-yellow-800 dark:text-yellow-200">
                      {rating >= 4 ? "🎉 Great choice! Your positive review will help other students." :
                       rating === 3 ? "👍 Thanks for your balanced feedback." :
                       "💭 Your honest feedback helps improve the course experience."}
                    </p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Enhanced Course Aspects */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Card className="relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-green-500 to-emerald-500"></div>
              <CardHeader className="pb-4">
                <div className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-green-600" />
                  <CardTitle className="text-lg">Workload</CardTitle>
                </div>
                <p className="text-xs text-muted-foreground">
                  How many hours per week did you spend?
                </p>
              </CardHeader>
              <CardContent>
                <RadioGroup value={selectedWorkload} onValueChange={setSelectedWorkload}>
                  {workloadOptions.map((option) => (
                    <div key={option.id} className="flex items-center space-x-2">
                      <RadioGroupItem value={option.id} id={option.id} />
                      <Label htmlFor={option.id} className="text-sm cursor-pointer">
                        {option.label}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
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

          {/* Enhanced Skills Section */}
          <Card className="relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 to-pink-500"></div>
            <CardHeader className="pb-4">
              <div className="flex items-center gap-2">
                <Lightbulb className="h-5 w-5 text-purple-600" />
                <CardTitle>Skills Developed</CardTitle>
              </div>
              <p className="text-sm text-muted-foreground">
                Select the skills you developed or improved in this course (select multiple)
              </p>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                {skillOptions.map((skill) => (
                  <div
                    key={skill}
                    className={`p-3 rounded-lg border-2 cursor-pointer transition-all duration-200 hover:scale-105 ${
                      selectedSkills.includes(skill)
                        ? 'border-primary bg-primary/10 shadow-md'
                        : 'border-gray-200 dark:border-gray-700 hover:border-primary/50'
                    }`}
                    onClick={() => handleSkillToggle(skill)}
                  >
                    <div className="flex items-center gap-2">
                      <div className={`w-4 h-4 rounded border-2 flex items-center justify-center ${
                        selectedSkills.includes(skill)
                          ? 'border-primary bg-primary'
                          : 'border-gray-300 dark:border-gray-600'
                      }`}>
                        {selectedSkills.includes(skill) && (
                          <svg className="w-2.5 h-2.5 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        )}
                      </div>
                      <span className="text-sm font-medium">{skill}</span>
                    </div>
                  </div>
                ))}
              </div>
              {selectedSkills.length > 0 && (
                <div className="mt-4 p-3 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-950/20 dark:to-pink-950/20 rounded-lg border border-purple-200 dark:border-purple-800">
                  <p className="text-sm text-purple-800 dark:text-purple-200">
                    ✨ Selected {selectedSkills.length} skill{selectedSkills.length > 1 ? 's' : ''}: {selectedSkills.join(', ')}
                  </p>
                </div>
              )}
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

          {/* Enhanced Written Review Section */}
          <Card className="relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 to-blue-500"></div>
            <CardHeader className="pb-4">
              <div className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5 text-indigo-600" />
                <CardTitle>Your Review</CardTitle>
              </div>
              <p className="text-sm text-muted-foreground">
                Share your detailed experience to help future students (minimum 50 characters)
              </p>
            </CardHeader>
             <CardContent className="space-y-4">
               <Textarea
                 placeholder="What did you like about this course? What challenges did you face? How was the workload? Any tips for future students? What skills did you develop?"
                 className="min-h-[150px] resize-none"
                 value={reviewText}
                 onChange={(e) => setReviewText(e.target.value)}
               />
               <div className="flex items-center justify-between text-xs">
                 <span className={`${reviewText.length >= 50 ? 'text-green-600' : 'text-muted-foreground'}`}>
                   {reviewText.length}/50 characters minimum
                 </span>
                 <span className="text-muted-foreground">
                   {reviewText.length}/2000 characters
                 </span>
               </div>
               {reviewText.length >= 50 && (
                 <div className="p-3 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20 rounded-lg border border-green-200 dark:border-green-800">
                   <p className="text-sm text-green-800 dark:text-green-200">
                     ✓ Great! Your review meets the minimum length requirement.
                   </p>
                 </div>
               )}
               <p className="text-xs text-muted-foreground">
                 💡 Tip: Mention specific aspects like assignments, difficulty, and what you learned to make your review more helpful.
               </p>
             </CardContent>
          </Card>

          {/* Enhanced Reward Notice */}
          <Card className="bg-gradient-to-r from-amber-50 to-yellow-50 dark:from-amber-950/20 dark:to-yellow-950/20 border-amber-200 dark:border-amber-800">
            <CardContent className="p-6">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-amber-500 to-yellow-500 flex items-center justify-center">
                  <Award className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-amber-800 dark:text-amber-200">Earn Reward Points!</h3>
                  <p className="text-sm text-amber-700 dark:text-amber-300">
                    Submitting this review will earn you <strong>50 Reward Points</strong> for helping the community
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Enhanced Submit Section */}
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-4">
            <div className="text-sm text-muted-foreground">
              Form completion: <strong>{Math.round(progress)}%</strong>
            </div>
            <div className="flex space-x-4">
              <Link to="/courses">
                <Button variant="outline" size="lg">
                  Cancel
                </Button>
              </Link>
              <Button 
                type="submit" 
                size="lg" 
                className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 shadow-lg px-8"
                disabled={!courseName || !rating || !semester || reviewText.trim().length < 50}
              >
                <Award className="h-4 w-4 mr-2" />
                Submit Review & Earn 50 pts
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SubmitReview;
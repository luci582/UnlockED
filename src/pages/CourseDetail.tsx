import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Star, ThumbsUp, Clock, Users, Monitor, ChevronLeft, Play, MessageSquare, ExternalLink, Filter, CheckCircle, BookOpen, Lightbulb } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const CourseDetail = () => {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState("overview");
  const [reviewSort, setReviewSort] = useState("most-recent");

  // Mock course data - in real app, fetch based on ID
  const course = {
    id: "comp1511",
    title: "Programming Fundamentals", 
    code: "COMP1511",
    faculty: "Engineering",
    rating: 4.5,
    reviewCount: 234,
    skills: ["C Programming Language", "Data Structures (Arrays, Linked Lists)", "Algorithm Design", "Problem Decomposition", "Debugging & Testing", "Code Documentation", "Teamwork & Collaboration", "Critical Thinking"],
    mode: "hybrid",
    description: "An introduction to programming and software development. Students learn fundamental programming concepts using the C programming language.",
    checklist: [
      "Learn C programming fundamentals",
      "Understand data structures and algorithms",
      "Practice problem-solving techniques", 
      "Complete weekly programming exercises",
      "Work on group projects",
      "Develop debugging skills"
    ],
    assessments: [
      {
        name: "Weekly Programming Exercises (20%)",
        description: "Practical coding challenges focusing on C programming fundamentals, data structures, and problem-solving techniques. Submit solutions online with automated testing."
      },
      {
        name: "Midterm Exam (25%)",
        description: "Written examination covering programming concepts, syntax, debugging, and algorithm analysis. Includes both theoretical questions and code reading/writing."
      },
      {
        name: "Group Project (25%)",
        description: "Collaborative software development project where teams build a complete C program. Emphasizes teamwork, code documentation, and project management."
      },
      {
        name: "Final Exam (30%)",
        description: "Comprehensive examination testing all course content including advanced programming concepts, data structures, and practical problem-solving skills."
      }
    ],
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    tips: [
      "Start assignments early - they take longer than expected",
      "Practice coding problems daily for better understanding",
      "Don't hesitate to ask for help during lab sessions",
      "Form study groups with classmates for problem-solving"
    ]
  };

  const allReviews = [
    {
      id: 1,
      author: "Alex Chen",
      rating: 5,
      date: "2 weeks ago",
      dateSort: new Date("2024-01-15"),
      comment: "Excellent course for beginners. The progression is well-structured and the lab sessions are incredibly helpful. Marc is an amazing lecturer!",
      upvotes: 23,
      helpful: true
    },
    {
      id: 2, 
      author: "Sarah Williams",
      rating: 4,
      date: "1 month ago",
      dateSort: new Date("2024-01-01"),
      comment: "Good introduction to programming. Can be challenging if you have no prior experience, but very rewarding. Make sure to attend all labs.",
      upvotes: 15,
      helpful: false
    },
    {
      id: 3,
      author: "Jordan Smith",
      rating: 4,
      date: "2 months ago",
      dateSort: new Date("2023-12-15"),
      comment: "Great foundation course. The assignments are tough but fair. Really helps build logical thinking skills that are useful beyond just programming.",
      upvotes: 31,
      helpful: true
    },
    {
      id: 4,
      author: "Emily Davis",
      rating: 3,
      date: "3 months ago",
      dateSort: new Date("2023-12-01"),
      comment: "Decent course but can be overwhelming for complete beginners. The lab demonstrators are very helpful though.",
      upvotes: 8,
      helpful: false
    }
  ];

  const getSortedReviews = () => {
    switch (reviewSort) {
      case "most-recent":
        return [...allReviews].sort((a, b) => b.dateSort.getTime() - a.dateSort.getTime());
      case "top-rated":
        return [...allReviews].sort((a, b) => b.rating - a.rating || b.upvotes - a.upvotes);
      default:
        return allReviews;
    }
  };

  const reviews = getSortedReviews();

  const tabs = [
    { id: "overview", label: "Overview" },
    { id: "reviews", label: "Reviews" },
    { id: "video", label: "Student Video" }
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="container py-8">
        {/* Breadcrumb */}
        <div className="flex items-center space-x-2 text-sm text-muted-foreground mb-6">
          <Link to="/courses" className="hover:text-primary">Courses</Link>
          <ChevronLeft className="h-4 w-4 rotate-180" />
          <span>{course.code}</span>
        </div>

        {/* Course Header */}
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
            <div className="flex-1">
              <div className="flex items-center space-x-3 mb-2">
                <h1 className="text-5xl font-bold text-primary">{course.code}</h1>
                <Badge variant="outline">{course.faculty}</Badge>
                <Badge variant="secondary" className="capitalize">{course.mode}</Badge>
              </div>
              <h2 className="text-xl text-muted-foreground mb-4">{course.title}</h2>
              <p className="text-foreground">{course.description}</p>
            </div>
            
            <Card className="lg:w-80">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <Star className="h-5 w-5 fill-course-rating text-course-rating" />
                    <span className="text-2xl font-bold">{course.rating}</span>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-muted-foreground">{course.reviewCount} reviews</div>
                  </div>
                </div>
                <Link to="/submit-review" className="w-full">
                  <Button className="w-full">Submit Review</Button>
                </Link>
              </CardContent>
            </Card>
          </div>

          {/* Skills Tags */}
          <div className="mt-6">
            <h3 className="text-sm font-medium text-muted-foreground mb-3">Skills You'll Develop</h3>
            <div className="flex flex-wrap gap-2">
              {course.skills.map((skill) => (
                <Badge key={skill} className="bg-course-skill-tag hover:bg-course-skill-tag/80">
                  {skill}
                </Badge>
              ))}
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b mb-8">
          <div className="flex space-x-8">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === tab.id
                    ? "border-primary text-primary"
                    : "border-transparent text-muted-foreground hover:text-foreground"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === "overview" && (
          <div className="space-y-8">
            <div className="grid gap-8 lg:grid-cols-2">
              {/* Course Checklist */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <CheckCircle className="h-5 w-5 text-primary" />
                    <span>What This Course Entails</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {course.checklist.map((item, index) => (
                      <li key={index} className="flex items-start space-x-3">
                        <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center mt-0.5">
                          <div className="w-2 h-2 rounded-full bg-primary" />
                        </div>
                        <span className="text-sm">{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              {/* Assessments */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <BookOpen className="h-5 w-5 text-accent" />
                    <span>Assessment Structure</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-4">
                    {course.assessments.map((assessment, index) => (
                      <li key={index} className="flex items-start space-x-3">
                        <div className="w-5 h-5 rounded-full bg-accent/20 flex items-center justify-center mt-0.5">
                          <div className="w-2 h-2 rounded-full bg-accent" />
                        </div>
                        <div className="flex-1">
                          <div className="font-medium text-sm mb-1">{assessment.name}</div>
                          <div className="text-xs text-muted-foreground">{assessment.description}</div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>

            <div className="grid gap-8 lg:grid-cols-2">
              {/* Peer Tips */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Lightbulb className="h-5 w-5 text-accent" />
                    <span>Peer Tips</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-4">
                    {course.tips.map((tip, index) => (
                      <li key={index} className="flex items-start space-x-3">
                        <MessageSquare className="h-4 w-4 text-accent mt-1 flex-shrink-0" />
                        <span className="text-sm">{tip}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              {/* External Resources */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <ExternalLink className="h-5 w-5 text-primary" />
                    <span>External Resources</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Link 
                    to={`https://www.handbook.unsw.edu.au/undergraduate/courses/2024/${course.code}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50 transition-colors"
                  >
                    <div>
                      <h4 className="font-medium">UNSW Handbook</h4>
                      <p className="text-sm text-muted-foreground">Official course information and requirements</p>
                    </div>
                    <ExternalLink className="h-4 w-4 text-muted-foreground" />
                  </Link>
                  <Link 
                    to="https://myplan.unsw.edu.au/app/welcome"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50 transition-colors"
                  >
                    <div>
                       <h4 className="font-medium">UNSW MyPlan</h4>
                       <p className="text-sm text-muted-foreground">Plan your degree and check prerequisites</p>
                    </div>
                    <ExternalLink className="h-4 w-4 text-muted-foreground" />
                  </Link>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {activeTab === "reviews" && (
          <div className="space-y-6">
            {/* Review Guidelines */}
            <Card className="bg-muted/20 border-primary/20 mb-6">
              <CardContent className="p-4">
                <div className="flex items-start space-x-3">
                  <MessageSquare className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-sm mb-1">Review Guidelines</h4>
                    <p className="text-xs text-muted-foreground">
                      Please focus your review on course content, structure, and your personal learning experience. 
                      Do not mention or comment on any teaching staff members.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Review Controls */}
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Reviews ({reviews.length})</h3>
              <div className="flex items-center space-x-2">
                <Filter className="h-4 w-4 text-muted-foreground" />
                <Select value={reviewSort} onValueChange={setReviewSort}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="most-recent">Most Recent</SelectItem>
                    <SelectItem value="top-rated">Top Rated</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Reviews List */}
            {reviews.map((review) => (
              <Card key={review.id}>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <Avatar>
                        <AvatarFallback>{review.author.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">{review.author}</div>
                        <div className="text-sm text-muted-foreground">{review.date}</div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${
                            i < review.rating
                              ? "fill-course-rating text-course-rating"
                              : "text-muted"
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                  <p className="text-foreground mb-4">{review.comment}</p>
                  <div className="flex items-center space-x-4">
                    <Button variant="ghost" size="sm" className="text-muted-foreground">
                      <ThumbsUp className="h-4 w-4 mr-2" />
                      {review.upvotes}
                    </Button>
                    {review.helpful && (
                      <Badge variant="secondary" className="text-xs">Helpful</Badge>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {activeTab === "video" && (
          <Card>
            <CardHeader>
              <CardTitle>Student Reflection Video</CardTitle>
              <p className="text-sm text-muted-foreground">
                Watch a 60-second insight from a top student who completed this course
              </p>
            </CardHeader>
            <CardContent>
              <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <Play className="h-12 w-12 text-muted-foreground mx-auto mb-2" />
                  <p className="text-muted-foreground">Video content would be embedded here</p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default CourseDetail;
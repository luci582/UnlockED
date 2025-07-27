import { useState } from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import { Star, ArrowUp, Clock, Users, Monitor, ChevronLeft, Play, MessageSquare, ExternalLink, Filter, CheckCircle, BookOpen, Lightbulb } from "lucide-react";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Separator } from "../components/ui/separator";
import { Avatar, AvatarFallback } from "../components/ui/avatar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { courseDetails } from "../data/courses";
import RatingDistributionChart from "../components/Course/RatingDistributionChart";

const CourseDetail = () => {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState("overview");
  const [reviewSort, setReviewSort] = useState("most-recent");

  // Get course data from shared data source
  const course = id ? courseDetails[id] : null;

  // If course not found, redirect to 404 or courses page
  if (!course) {
    return <Navigate to="/courses" replace />;
  }

  // Mock rating distribution data
  const ratingDistribution = {
    5: 45,
    4: 23,
    3: 12,
    2: 4,
    1: 2
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
                <Button asChild className="w-full">
                  <Link to="/submit-review">Submit Review</Link>
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Skills Tags */}
          <div className="mt-6">
            <h3 className="text-sm font-medium text-muted-foreground mb-3">Skills You'll Develop</h3>
            <div className="flex flex-wrap gap-2">
              {(course.detailedSkills || course.skills).map((skill) => (
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

            {/* Rating Distribution */}
            <div className="mb-8">
              <RatingDistributionChart 
                ratings={ratingDistribution} 
                totalReviews={course.reviewCount} 
              />
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
                    {(course.tips || []).map((tip, index) => (
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
                    <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-primary">
                      <ArrowUp className="h-4 w-4 mr-2" />
                      Helpful ({review.upvotes})
                    </Button>
                    {review.helpful && (
                      <Badge variant="secondary" className="text-xs">Top Review</Badge>
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
              <div className="aspect-video bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-lg flex items-center justify-center border-2 border-dashed border-blue-300 dark:border-blue-700">
                <div className="text-center p-8">
                  <div className="relative">
                    <Play className="h-16 w-16 text-blue-500 mx-auto mb-4 hover:text-blue-600 transition-colors cursor-pointer" />
                    <div className="absolute inset-0 bg-blue-500/20 rounded-full blur-lg"></div>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
                    Student Success Story
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    "This course changed my perspective on computer science. The hands-on projects really helped me understand complex algorithms."
                  </p>
                  <p className="text-sm text-blue-600 dark:text-blue-400 font-medium">
                    - Sarah Chen, Computer Science Graduate
                  </p>
                  <div className="mt-4 text-xs text-muted-foreground">
                    🎬 Demo video coming soon
                  </div>
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
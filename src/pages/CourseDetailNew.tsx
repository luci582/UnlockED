import { useState, useEffect } from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import { Star, ArrowUp, Clock, Users, Monitor, ChevronLeft, Play, MessageSquare, ExternalLink, Filter, CheckCircle, BookOpen, Lightbulb } from "lucide-react";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Separator } from "../components/ui/separator";
import { Avatar, AvatarFallback } from "../components/ui/avatar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { fetchCourseById, DatabaseCourse } from "../lib/api";
import RatingDistributionChart from "../components/Course/RatingDistributionChart";

const CourseDetail = () => {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState("overview");
  const [reviewSort, setReviewSort] = useState("most-recent");
  const [course, setCourse] = useState<DatabaseCourse & { reviews: any[] } | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadCourse = async () => {
      if (!id) {
        setError("Course ID not provided");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const response = await fetchCourseById(id);
        
        if (response.success && response.data) {
          setCourse(response.data);
        } else {
          setError(response.error || "Failed to load course");
        }
      } catch (error) {
        setError("Failed to load course");
        console.error("Course fetch error:", error);
      } finally {
        setLoading(false);
      }
    };

    loadCourse();
  }, [id]);

  // Loading state
  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>
          <div className="h-64 bg-gray-200 rounded mb-4"></div>
          <div className="h-32 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  // Error state
  if (error || !course) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">Course Not Found</h1>
          <p className="text-gray-600 mb-4">{error || "The requested course could not be found."}</p>
          <Link to="/courses">
            <Button>
              <ChevronLeft className="h-4 w-4 mr-2" />
              Back to Courses
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  // Mock rating distribution data - TODO: get from real data
  const ratingDistribution = {
    5: 45,
    4: 23,
    3: 12,
    2: 4,
    1: 2
  };

  // Process course skills
  const skills = course.skills?.map(cs => cs.skill.name) || [];

  // Process course reviews
  const allReviews = course.reviews || [];

  // Format difficulty
  const difficultyMap: Record<string, string> = {
    'BEGINNER': 'Beginner',
    'INTERMEDIATE': 'Intermediate', 
    'ADVANCED': 'Advanced',
    'EXPERT': 'Expert'
  };

  const formattedDifficulty = difficultyMap[course.difficulty] || course.difficulty;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center gap-4 mb-6">
            <Link 
              to="/courses" 
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <ChevronLeft className="h-4 w-4" />
              <span>Back to Courses</span>
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Course Info */}
            <div className="lg:col-span-2">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h1 className="text-3xl font-bold mb-2">{course.title}</h1>
                  <p className="text-lg text-muted-foreground mb-4">{course.description}</p>
                  
                  <div className="flex items-center gap-4 mb-4">
                    <div className="flex items-center gap-2">
                      <Star className="h-5 w-5 fill-primary text-primary" />
                      <span className="font-semibold">{course.rating?.toFixed(1) || 'N/A'}</span>
                      <span className="text-muted-foreground">({course.reviewCount} reviews)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">{course.enrollmentCount} enrolled</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    <Badge variant="secondary">{formattedDifficulty}</Badge>
                    <Badge variant="outline">{course.instructor}</Badge>
                    {course.institution && (
                      <Badge variant="outline">{course.institution}</Badge>
                    )}
                    {skills.slice(0, 3).map((skill) => (
                      <Badge key={skill} variant="secondary">
                        {skill}
                      </Badge>
                    ))}
                    {skills.length > 3 && (
                      <Badge variant="outline">+{skills.length - 3} more</Badge>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <Card>
                <CardHeader>
                  <CardTitle>Course Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Instructor:</span>
                    <span className="font-medium">{course.instructor}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Difficulty:</span>
                    <span className="font-medium">{formattedDifficulty}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Students:</span>
                    <span className="font-medium">{course.enrollmentCount}</span>
                  </div>
                  <div className="space-y-2">
                    <span className="text-muted-foreground text-sm">Fees (per semester):</span>
                    {(() => {
                      let localFee = null;
                      let internationalFee = null;
                      
                      if (course.learningOutcomes) {
                        try {
                          const outcomes = JSON.parse(course.learningOutcomes);
                          localFee = outcomes.localFee;
                          internationalFee = outcomes.internationalFee;
                        } catch (e) {
                          // If JSON parsing fails, fall back to legacy display
                        }
                      }
                      
                      if (localFee && internationalFee) {
                        return (
                          <div className="space-y-1">
                            <div className="flex justify-between text-sm">
                              <span className="text-muted-foreground">Local students (CSP):</span>
                              <span className="font-medium">${localFee.toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                              <span className="text-muted-foreground">International students:</span>
                              <span className="font-medium">${internationalFee.toLocaleString()}</span>
                            </div>
                          </div>
                        );
                      } else {
                        return (
                          <div className="flex justify-between">
                            <span className="font-medium">
                              {course.isFree ? 'Free' : `$${course.price}`}
                            </span>
                          </div>
                        );
                      }
                    })()}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex space-x-8 border-b mb-8">
          <button
            onClick={() => setActiveTab("overview")}
            className={`pb-4 px-1 border-b-2 font-medium transition-colors ${
              activeTab === "overview"
                ? "border-primary text-primary"
                : "border-transparent text-muted-foreground hover:text-foreground"
            }`}
          >
            Overview
          </button>
          <button
            onClick={() => setActiveTab("reviews")}
            className={`pb-4 px-1 border-b-2 font-medium transition-colors ${
              activeTab === "reviews"
                ? "border-primary text-primary"
                : "border-transparent text-muted-foreground hover:text-foreground"
            }`}
          >
            Reviews ({course.reviewCount})
          </button>
        </div>

        {/* Tab Content */}
        {activeTab === "overview" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BookOpen className="h-5 w-5" />
                    Course Description
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">
                    {course.description}
                  </p>
                </CardContent>
              </Card>

              {skills.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Lightbulb className="h-5 w-5" />
                      Competencies You'll Learn
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-3">
                      {skills.map((skill) => (
                        <div key={skill} className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-primary" />
                          <span className="text-sm">{skill}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>

            <div className="lg:col-span-1">
              <Card>
                <CardHeader>
                  <CardTitle>Rating Breakdown</CardTitle>
                </CardHeader>
                <CardContent>
                  <RatingDistributionChart 
                    ratings={ratingDistribution} 
                    totalReviews={course.reviewCount} 
                  />
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {activeTab === "reviews" && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">
                Student Reviews ({course.reviewCount})
              </h2>
              <Select value={reviewSort} onValueChange={setReviewSort}>
                <SelectTrigger className="w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="most-recent">Most Recent</SelectItem>
                  <SelectItem value="highest-rated">Highest Rated</SelectItem>
                  <SelectItem value="lowest-rated">Lowest Rated</SelectItem>
                  <SelectItem value="most-helpful">Most Helpful</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-4">
                {allReviews.length === 0 ? (
                  <Card>
                    <CardContent className="py-8 text-center">
                      <MessageSquare className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                      <h3 className="text-lg font-semibold mb-2">No Reviews Yet</h3>
                      <p className="text-muted-foreground">
                        Be the first to share your experience with this course!
                      </p>
                    </CardContent>
                  </Card>
                ) : (
                  allReviews.map((review) => (
                    <Card key={review.id}>
                      <CardContent className="pt-6">
                        <div className="flex items-start gap-4">
                          <Avatar>
                            <AvatarFallback>
                              {review.user?.firstName?.[0] || 'U'}
                              {review.user?.lastName?.[0] || ''}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <span className="font-semibold">
                                {review.user?.firstName || 'Anonymous'} {review.user?.lastName || ''}
                              </span>
                              <div className="flex items-center">
                                {[...Array(5)].map((_, i) => (
                                  <Star
                                    key={i}
                                    className={`h-4 w-4 ${
                                      i < review.rating
                                        ? "fill-primary text-primary"
                                        : "text-muted-foreground"
                                    }`}
                                  />
                                ))}
                              </div>
                              <span className="text-sm text-muted-foreground">
                                {new Date(review.createdAt).toLocaleDateString()}
                              </span>
                            </div>
                            <p className="text-muted-foreground leading-relaxed">
                              {review.comment}
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                )}
              </div>

              <div className="lg:col-span-1">
                <Card>
                  <CardHeader>
                    <CardTitle>Rating Breakdown</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <RatingDistributionChart 
                      ratings={ratingDistribution} 
                      totalReviews={course.reviewCount} 
                    />
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CourseDetail;

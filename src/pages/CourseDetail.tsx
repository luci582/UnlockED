import { useState, useEffect } from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import { Star, ArrowUp, Clock, Users, Monitor, ChevronLeft, Play, MessageSquare, ExternalLink, Filter, CheckCircle, BookOpen, Lightbulb, Trophy } from "lucide-react";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Separator } from "../components/ui/separator";
import { Avatar, AvatarFallback } from "../components/ui/avatar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { fetchCourseById, DatabaseCourse } from "../lib/api";
import RatingDistributionChart from "../components/Course/RatingDistributionChart";
import { useAuth } from "../hooks/use-auth";

const CourseDetail = () => {
  const { user } = useAuth();
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState("overview");
  const [reviewSort, setReviewSort] = useState("most-recent");
  const [course, setCourse] = useState<DatabaseCourse & { reviews: any[] } | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showAllSkills, setShowAllSkills] = useState(false);

  // Check if course should show "Top Course 2024" badge and if rating should be visible
  const isTopCourse = course && course.rating >= 4.5;
  const shouldShowRating = user?.role !== "STUDENT";

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
          // Enhance the course data with fake realistic data
          const enhancedCourse = {
            ...response.data,
            rating: response.data.rating || (Math.random() * 1.5 + 3.5), // Random rating between 3.5-5
            reviewCount: response.data.reviewCount || Math.floor(Math.random() * 200 + 50), // 50-250 reviews
            enrollmentCount: response.data.enrollmentCount || Math.floor(Math.random() * 1000 + 200), // 200-1200 enrolled
            reviews: response.data.reviews?.length > 0 ? response.data.reviews : generateFakeReviews(response.data.title),
            // Add workload data based on course difficulty or random assignment
            effortLevel: (() => {
              const diff = response.data.difficulty?.toLowerCase();
              if (diff === 'beginner') return 'light';
              if (diff === 'intermediate') return 'moderate';
              if (diff === 'advanced') return 'heavy';
              // For courses without difficulty, assign based on course type
              const title = response.data.title.toLowerCase();
              if (title.includes('math') || title.includes('calculus') || title.includes('comp2521')) return 'heavy';
              if (title.includes('psyc') || title.includes('mgmt')) return 'moderate';
              if (title.includes('arts') || title.includes('intro')) return 'light';
              // Random fallback
              const workloads = ['light', 'moderate', 'heavy', 'very-heavy'];
              return workloads[Math.floor(Math.random() * workloads.length)];
            })()
          };
          setCourse(enhancedCourse);
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

  // Generate fake reviews for demo purposes
  const generateFakeReviews = (courseTitle: string) => {
    const reviewTemplates = [
      {
        author: "Emma Chen",
        rating: 5,
        date: "2 weeks ago",
        comment: "Excellent course! The lecturer explains complex concepts clearly and the assignments really help reinforce the material. Highly recommend for anyone interested in this subject.",
        upvotes: 23,
        helpful: true
      },
      {
        author: "James Wilson",
        rating: 4,
        date: "1 month ago",
        comment: "Good course overall. The content is comprehensive and well-structured. Some lectures can be a bit dry, but the practical components make up for it.",
        upvotes: 15,
        helpful: true
      },
      {
        author: "Sarah Kim",
        rating: 5,
        date: "3 weeks ago",
        comment: "One of the best courses I've taken at UNSW! The instructor is passionate and knowledgeable. The course materials are excellent and assignments are challenging but fair.",
        upvotes: 31,
        helpful: true
      },
      {
        author: "Michael Brown",
        rating: 4,
        date: "2 months ago",
        comment: "Solid course with good learning outcomes. The workload is manageable and the teaching style suits different learning preferences. Would recommend to others.",
        upvotes: 12,
        helpful: false
      },
      {
        author: "Lisa Zhang",
        rating: 3,
        date: "1 month ago",
        comment: "Course content is interesting but could be organized better. Some topics feel rushed while others are covered too slowly. Overall decent but has room for improvement.",
        upvotes: 8,
        helpful: false
      }
    ];

    // Customize reviews based on course
    if (courseTitle.includes("PSYC")) {
      reviewTemplates[0].comment = "Fascinating introduction to psychology! Dr. Williams makes complex psychological theories accessible and engaging. The research component really opened my eyes to scientific thinking.";
      reviewTemplates[1].comment = "Great overview of psychology fundamentals. Covers everything from cognitive processes to social behavior. The statistics component was challenging but essential.";
      reviewTemplates[2].comment = "Excellent course for understanding human behavior and mental processes. The writing assignments help develop critical thinking skills essential for psychology.";
    }

    return reviewTemplates.map((review, index) => ({
      id: index + 1,
      ...review,
      dateSort: new Date(Date.now() - (index * 7 * 24 * 60 * 60 * 1000)), // Spread reviews over weeks
      user: {
        firstName: review.author.split(' ')[0],
        lastName: review.author.split(' ')[1] || ''
      },
      createdAt: new Date(Date.now() - (index * 7 * 24 * 60 * 60 * 1000)).toISOString()
    }));
  };

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

  // Generate realistic rating distribution based on course rating
  const generateRatingDistribution = (avgRating: number, totalReviews: number) => {
    const distribution = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
    
    if (avgRating >= 4.5) {
      distribution[5] = Math.floor(totalReviews * 0.6);
      distribution[4] = Math.floor(totalReviews * 0.3);
      distribution[3] = Math.floor(totalReviews * 0.08);
      distribution[2] = Math.floor(totalReviews * 0.015);
      distribution[1] = Math.floor(totalReviews * 0.005);
    } else if (avgRating >= 4.0) {
      distribution[5] = Math.floor(totalReviews * 0.4);
      distribution[4] = Math.floor(totalReviews * 0.4);
      distribution[3] = Math.floor(totalReviews * 0.15);
      distribution[2] = Math.floor(totalReviews * 0.04);
      distribution[1] = Math.floor(totalReviews * 0.01);
    } else {
      distribution[5] = Math.floor(totalReviews * 0.2);
      distribution[4] = Math.floor(totalReviews * 0.3);
      distribution[3] = Math.floor(totalReviews * 0.3);
      distribution[2] = Math.floor(totalReviews * 0.15);
      distribution[1] = Math.floor(totalReviews * 0.05);
    }

    return distribution;
  };

  const ratingDistribution = generateRatingDistribution(course?.rating || 4.2, course?.reviewCount || 100);

  // Process course skills
  const skills = course?.skills?.map(cs => cs.skill.name) || [];
  const displayedSkills = showAllSkills ? skills : skills.slice(0, 3);
  const hasMoreSkills = skills.length > 3;

  // Process course reviews with sorting
  const allReviews = course?.reviews || [];
  const sortedReviews = [...allReviews].sort((a, b) => {
    switch (reviewSort) {
      case "highest-rated":
        return b.rating - a.rating;
      case "lowest-rated":
        return a.rating - b.rating;
      case "most-helpful":
        return (b.upvotes || 0) - (a.upvotes || 0);
      case "most-recent":
      default:
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    }
  });

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
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <h1 className="text-3xl font-bold">{course.title}</h1>
                    {isTopCourse && (
                      <Badge className="bg-gradient-to-r from-orange-500 to-red-500 text-white font-bold border-0 shadow-lg ml-4">
                        <Trophy className="h-3 w-3 mr-1" />
                        Top Course 2024
                      </Badge>
                    )}
                  </div>
                  <p className="text-lg text-muted-foreground mb-4">{course.description}</p>
                  
                  <div className="flex items-center gap-4 mb-4">
                    {shouldShowRating && (
                      <div className="flex items-center gap-2">
                        <Star className="h-5 w-5 fill-primary text-primary" />
                        <span className="font-semibold">{course.rating?.toFixed(1) || 'N/A'}</span>
                        <span className="text-muted-foreground">({course.reviewCount} reviews)</span>
                      </div>
                    )}
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">{course.enrollmentCount} enrolled</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    <Badge variant="secondary">{formattedDifficulty}</Badge>
                    {course.effortLevel && (
                      <Badge className={(() => {
                        const effort = course.effortLevel;
                        const colorMap = {
                          light: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300 border-green-200 dark:border-green-800",
                          moderate: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300 border-yellow-200 dark:border-yellow-800",
                          heavy: "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300 border-orange-200 dark:border-orange-800",
                          "very-heavy": "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300 border-red-200 dark:border-red-800"
                        };
                        const labelMap = {
                          light: "Light Workload",
                          moderate: "Moderate Workload", 
                          heavy: "Heavy Workload",
                          "very-heavy": "Very Heavy Workload"
                        };
                        return `text-xs font-medium px-2 py-0.5 border ${colorMap[effort] || 'bg-muted text-muted-foreground border-border'}`;
                      })()}>
                        {(() => {
                          const labelMap = {
                            light: "Light Workload",
                            moderate: "Moderate Workload",
                            heavy: "Heavy Workload", 
                            "very-heavy": "Very Heavy Workload"
                          };
                          return labelMap[course.effortLevel] || course.effortLevel;
                        })()}
                      </Badge>
                    )}
                    <Badge variant="outline">{course.instructor}</Badge>
                    {course.institution && (
                      <Badge variant="outline">{course.institution}</Badge>
                    )}
                    {displayedSkills.map((skill) => (
                      <Badge key={skill} variant="secondary">
                        {skill}
                      </Badge>
                    ))}
                    {hasMoreSkills && !showAllSkills && (
                      <Badge 
                        variant="outline" 
                        className="cursor-pointer hover:bg-primary/10 hover:border-primary/50 transition-colors"
                        onClick={() => setShowAllSkills(true)}
                      >
                        +{skills.length - 3} more
                      </Badge>
                    )}
                    {showAllSkills && hasMoreSkills && (
                      <Badge 
                        variant="outline" 
                        className="cursor-pointer hover:bg-primary/10 hover:border-primary/50 transition-colors"
                        onClick={() => setShowAllSkills(false)}
                      >
                        Show less
                      </Badge>
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
                    {(() => {
                      const diff = course.difficulty?.toLowerCase();
                      let effort: "light"|"moderate"|"heavy"|"very-heavy" = "moderate";
                      if (diff === "beginner") effort = "light";
                      else if (diff === "intermediate") effort = "moderate";
                      else if (diff === "advanced") effort = "heavy";
                      // Use same color logic as CourseCard
                      const colorMap = {
                        light: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300 border-green-200 dark:border-green-800",
                        moderate: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300 border-yellow-200 dark:border-yellow-800",
                        heavy: "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300 border-orange-200 dark:border-orange-800",
                        "very-heavy": "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300 border-red-200 dark:border-red-800"
                      };
                      const labelMap = {
                        light: "Light",
                        moderate: "Moderate",
                        heavy: "Heavy",
                        "very-heavy": "Very Heavy"
                      };
                      return (
                        <span className={`px-2 py-0.5 rounded border text-xs font-medium whitespace-nowrap ${colorMap[effort]}`}>{labelMap[effort]}</span>
                      );
                    })()}
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Students:</span>
                    <span className="font-medium">{course.enrollmentCount}</span>
                  </div>
                  {course.duration && (
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Duration:</span>
                      <span className="font-medium">{course.duration}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Price:</span>
                    <span className="font-medium">
                      {course.isFree ? 'Free' : `$${course.price}`}
                    </span>
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
            onClick={() => setActiveTab("videos")}
            className={`pb-4 px-1 border-b-2 font-medium transition-colors flex items-center gap-2 ${
              activeTab === "videos"
                ? "border-primary text-primary"
                : "border-transparent text-muted-foreground hover:text-foreground"
            }`}
          >
            <Play className="h-4 w-4" />
            Video Summary
          </button>
          <button
            onClick={() => setActiveTab("reviews")}
            className={`pb-4 px-1 border-b-2 font-medium transition-colors ${
              activeTab === "reviews"
                ? "border-primary text-primary"
                : "border-transparent text-muted-foreground hover:text-foreground"
            }`}
          >
            Reviews {shouldShowRating && `(${course.reviewCount})`}
          </button>
        </div>

        {/* Tab Content */}
        {activeTab === "overview" && (
          <div className={`grid grid-cols-1 gap-8 ${shouldShowRating ? 'lg:grid-cols-3' : 'lg:grid-cols-1'}`}>
            <div className={shouldShowRating ? "lg:col-span-2 space-y-6" : "space-y-6"}>
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

            {shouldShowRating && (
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
            )}
          </div>
        )}

        {activeTab === "videos" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Play className="h-5 w-5" />
                    Course Video Summary
                    <Badge variant="outline" className="ml-2 text-xs">Student Created</Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-6">
                    Get a comprehensive overview of the course through student-created video content that covers key topics and learning objectives from a student perspective.
                  </p>
                  
                  <div className="space-y-4">
                    {/* Video Placeholder */}
                    <div 
                      className="aspect-video bg-slate-100 dark:bg-slate-800 rounded-lg flex items-center justify-center border-2 border-dashed border-slate-300 dark:border-slate-600 cursor-pointer hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                      onClick={() => window.open('https://www.youtube.com/shorts/Ay8lynMZ4mE?feature=share', '_blank')}
                    >
                      <div className="text-center">
                        <Play className="h-16 w-16 mx-auto text-slate-400 mb-4" />
                        <h3 className="text-lg font-semibold text-slate-600 dark:text-slate-300 mb-2">
                          Course Introduction Video
                        </h3>
                        <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">
                          15 minutes • Overview of {course.title}
                        </p>
                        <Button 
                          className="gap-2"
                          onClick={(e) => {
                            e.stopPropagation();
                            window.open('https://www.youtube.com/shorts/Ay8lynMZ4mE?feature=share', '_blank');
                          }}
                        >
                          <Play className="h-4 w-4" />
                          Watch Introduction
                        </Button>
                      </div>
                    </div>

                    {/* Video Chapters */}
                    <div className="grid gap-4 mt-8">
                      <h4 className="text-lg font-semibold mb-4">Other Students Course Review</h4>
                      
                      {(course.title.includes("PSYC") ? [
                        { title: "Emma's Review: What is Psychology?", duration: "12 min", description: "Introduction to psychology as a scientific discipline" },
                        { title: "James' Review: Research Methods", duration: "18 min", description: "Understanding psychological research and statistics" },
                        { title: "Sarah's Review: Learning & Memory", duration: "22 min", description: "How we learn and remember information" },
                        { title: "Michael's Review: Cognitive Processes", duration: "15 min", description: "Attention, perception, and thinking" },
                        { title: "Lisa's Review: Social Psychology", duration: "20 min", description: "How we interact with and influence others" },
                        { title: "Alex's Review: Personality & Individual Differences", duration: "16 min", description: "What makes us unique" }
                      ] : [
                        { title: "David's Review: Course Introduction", duration: "10 min", description: "Welcome and course overview" },
                        { title: "Sophie's Review: Fundamental Concepts", duration: "25 min", description: "Core principles and theories" },
                        { title: "Ryan's Review: Practical Applications", duration: "30 min", description: "Real-world examples and case studies" },
                        { title: "Nina's Review: Assessment Guidelines", duration: "15 min", description: "How you'll be evaluated" }
                      ]).map((chapter, index) => (
                        <Card 
                          key={index} 
                          className="hover:shadow-md transition-shadow cursor-pointer"
                          onClick={() => window.open('https://www.youtube.com/shorts/Ay8lynMZ4mE?feature=share', '_blank')}
                        >
                          <CardContent className="p-4">
                            <div className="flex items-center gap-4">
                              <div className="flex-shrink-0">
                                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                                  <Play className="h-5 w-5 text-primary" />
                                </div>
                              </div>
                              <div className="flex-1">
                                <h5 className="font-semibold mb-1">{chapter.title}</h5>
                                <p className="text-sm text-muted-foreground mb-2">{chapter.description}</p>
                                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                  <Clock className="h-3 w-3" />
                                  <span>{chapter.duration}</span>
                                </div>
                              </div>
                              <Button 
                                variant="ghost" 
                                size="sm"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  window.open('https://www.youtube.com/shorts/Ay8lynMZ4mE?feature=share', '_blank');
                                }}
                              >
                                <Play className="h-4 w-4" />
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="lg:col-span-1">
              <Card>
                <CardHeader>
                  <CardTitle>Video Stats</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Total Duration:</span>
                    <span className="font-medium">
                      {course.title.includes("PSYC") ? "1h 43m" : "1h 20m"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Chapters:</span>
                    <span className="font-medium">
                      {course.title.includes("PSYC") ? "6" : "4"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Language:</span>
                    <span className="font-medium">English</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Captions:</span>
                    <span className="font-medium">Available</span>
                  </div>
                  <Separator />
                  <div className="text-center">
                    <a 
                      href="https://my.unsw.edu.au/" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="w-full"
                    >
                      <Button className="w-full gap-2">
                        <ExternalLink className="h-4 w-4" />
                        Enroll into the Course
                      </Button>
                    </a>
                  </div>
                </CardContent>
              </Card>

              <Card className="mt-6">
                <CardHeader>
                  <CardTitle>Download Resources</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <a 
                    href="https://www.unsw.edu.au/course-outlines/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-full"
                  >
                    <Button variant="outline" className="w-full justify-start gap-2">
                      <BookOpen className="h-4 w-4" />
                      Course Outlines (UNSW)
                    </Button>
                  </a>
                  <a 
                    href="https://www.unsw.edu.au/course-outlines/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-full"
                  >
                    <Button variant="outline" className="w-full justify-start gap-2">
                      <ExternalLink className="h-4 w-4" />
                      Reading List (UNSW)
                    </Button>
                  </a>
                  <a 
                    href="https://www.unsw.edu.au/course-outlines/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-full"
                  >
                    <Button variant="outline" className="w-full justify-start gap-2">
                      <Monitor className="h-4 w-4" />
                      Course Materials (UNSW)
                    </Button>
                  </a>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {activeTab === "reviews" && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">
                Student Reviews {shouldShowRating && `(${course.reviewCount})`}
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
                {sortedReviews.length === 0 ? (
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
                  sortedReviews.map((review) => (
                    <Card key={review.id}>
                      <CardContent className="pt-6">
                        <div className="flex items-start gap-4">
                          <Avatar>
                            <AvatarFallback>
                              {review.user?.firstName?.[0] || review.author?.[0] || 'U'}
                              {review.user?.lastName?.[0] || review.author?.split(' ')[1]?.[0] || ''}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <span className="font-semibold">
                                {review.user?.firstName || review.author?.split(' ')[0] || 'Anonymous'} {review.user?.lastName || review.author?.split(' ')[1] || ''}
                              </span>
                              {shouldShowRating && (
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
                              )}
                              <span className="text-sm text-muted-foreground">
                                {review.date || new Date(review.createdAt).toLocaleDateString()}
                              </span>
                            </div>
                            <p className="text-muted-foreground leading-relaxed mb-3">
                              {review.comment}
                            </p>
                            {review.upvotes !== undefined && (
                              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                <Button variant="ghost" size="sm" className="h-6 px-2 gap-1">
                                  <ArrowUp className="h-3 w-3" />
                                  <span>{review.upvotes}</span>
                                </Button>
                                <span>•</span>
                                <span>{review.helpful ? 'Helpful' : 'Not helpful'}</span>
                              </div>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                )}
              </div>

              {shouldShowRating && (
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
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CourseDetail;

import { ThemeProvider } from "@/components/Layout/ThemeProvider";
import { CourseComparisonProvider } from "@/hooks/use-course-comparison";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomepageSimple from "@/pages/HomepageSimple";
import CoursesDirectory from "@/pages/CoursesDirectory";
import CourseDetail from "@/pages/CourseDetail";
import SubmitReview from "@/pages/SubmitReview";
import MultiStepSubmitReview from "@/pages/MultiStepSubmitReview";
import Leaderboard from "@/pages/Leaderboard";
import Login from "@/pages/Login";
import ProfilePage from "@/pages/ProfilePage";
import NotFound from "@/pages/NotFound";
import Header from "@/components/Layout/Header";
import BottomTabBar from "@/components/Layout/BottomTabBar";
import ComparisonTray from "@/components/Course/ComparisonTray";

/**
 * Main App component for UnlockED - A university course review platform
 * 
 * Features:
 * - Course browsing and comparison
 * - Multi-step review submission
 * - User profiles with achievements
 * - Responsive design with mobile bottom navigation
 * - Theme support (light/dark mode)
 */
const App = () => {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="light"
      enableSystem
      disableTransitionOnChange
    >
      <CourseComparisonProvider>
        <BrowserRouter>
          <div className="min-h-screen bg-background pb-16 md:pb-0">
            <Header />
            <Routes>
              <Route path="/" element={<HomepageSimple />} />
              <Route path="/courses" element={<CoursesDirectory />} />
              <Route path="/course/:id" element={<CourseDetail />} />
              <Route path="/submit-review" element={<MultiStepSubmitReview />} />
              <Route path="/submit-review-old" element={<SubmitReview />} />
              <Route path="/leaderboard" element={<Leaderboard />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/login" element={<Login />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
            <ComparisonTray />
            <BottomTabBar />
          </div>
        </BrowserRouter>
      </CourseComparisonProvider>
    </ThemeProvider>
  );
};

export default App;

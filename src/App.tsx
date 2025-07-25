import { ThemeProvider } from "./components/Layout/ThemeProvider";
import { CourseComparisonProvider } from "./hooks/use-course-comparison";
import { AuthProvider } from "./hooks/use-auth";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "sonner";
import HomepageSimple from "./pages/HomepageSimple";
import CoursesDirectory from "./pages/CoursesDirectory";
import CourseDetail from "./pages/CourseDetail";
import SubmitReview from "./pages/SubmitReview";
import MultiStepSubmitReview from "./pages/MultiStepSubmitReview";
import Leaderboard from "./pages/Leaderboard";
import Login from "./pages/Login";
import ProfilePage from "./pages/ProfilePage";
import AdminDashboard from "./pages/AdminDashboard";
import NotFound from "./pages/NotFound";
import Header from "./components/Layout/Header";
import BottomTabBar from "./components/Layout/BottomTabBar";
import ComparisonTray from "./components/Course/ComparisonTray";
import { ProtectedRoute, AdminRoute, InstructorRoute } from "./components/Auth/ProtectedRoute";

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
      <AuthProvider>
        <CourseComparisonProvider>
          <BrowserRouter>
            <div className="min-h-screen bg-background pb-16 md:pb-0">
              <Header />
              <Routes>
                <Route path="/" element={<HomepageSimple />} />
                <Route path="/courses" element={
                  <ProtectedRoute>
                    <CoursesDirectory />
                  </ProtectedRoute>
                } />
                <Route path="/course/:id" element={
                  <ProtectedRoute>
                    <CourseDetail />
                  </ProtectedRoute>
                } />
                <Route path="/login" element={<Login />} />
                
                {/* Protected routes - require authentication */}
                <Route path="/submit-review" element={
                  <ProtectedRoute>
                    <MultiStepSubmitReview />
                  </ProtectedRoute>
                } />
                <Route path="/submit-review-old" element={
                  <ProtectedRoute>
                    <SubmitReview />
                  </ProtectedRoute>
                } />
                <Route path="/profile" element={
                  <ProtectedRoute>
                    <ProfilePage />
                  </ProtectedRoute>
                } />
                <Route path="/leaderboard" element={
                  <ProtectedRoute>
                    <Leaderboard />
                  </ProtectedRoute>
                } />
                
                {/* Admin-only routes */}
                <Route path="/admin" element={
                  <AdminRoute>
                    <AdminDashboard />
                  </AdminRoute>
                } />
                <Route path="/admin/*" element={
                  <AdminRoute>
                    <AdminDashboard />
                  </AdminRoute>
                } />
                
                {/* Instructor routes */}
                <Route path="/instructor/*" element={
                  <InstructorRoute>
                    <div className="container py-8">
                      <h1 className="text-2xl font-bold">Instructor Dashboard</h1>
                      <p className="text-muted-foreground">Instructor tools coming soon...</p>
                    </div>
                  </InstructorRoute>
                } />
                
                <Route path="*" element={<NotFound />} />
              </Routes>
              <ComparisonTray />
              <BottomTabBar />
              <Toaster position="top-right" richColors />
            </div>
          </BrowserRouter>
        </CourseComparisonProvider>
      </AuthProvider>
    </ThemeProvider>
  );
};

export default App;

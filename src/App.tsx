import { ThemeProvider } from "@/components/Layout/ThemeProvider";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomepageSimple from "@/pages/HomepageSimple";
import CoursesDirectory from "@/pages/CoursesDirectory";
import CourseDetail from "@/pages/CourseDetail";
import SubmitReview from "@/pages/SubmitReview";
import Leaderboard from "@/pages/Leaderboard";
import Login from "@/pages/Login";
import NotFound from "@/pages/NotFound";
import Header from "@/components/Layout/Header";

const App = () => {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="light"
      enableSystem
      disableTransitionOnChange
    >
      <BrowserRouter>
        <div className="min-h-screen bg-background">
          <Header />
          <Routes>
            <Route path="/" element={<HomepageSimple />} />
            <Route path="/courses" element={<CoursesDirectory />} />
            <Route path="/course/:id" element={<CourseDetail />} />
            <Route path="/submit-review" element={<SubmitReview />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="/login" element={<Login />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;

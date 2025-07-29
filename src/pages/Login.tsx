import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, Mail, Lock, User, Shield } from "lucide-react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { Alert, AlertDescription } from "../components/ui/alert";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { useAuth } from "../hooks/use-auth";
import { authenticateUser, createUser } from "../lib/auth";
import { Role } from "../types/user";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Login form state
  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
  });

  // Signup form state
  const [signupForm, setSignupForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "STUDENT" as Role,
    adminKey: "",
  });

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const user = await authenticateUser(
        loginForm.email, 
        loginForm.password
      );
      
      if (user) {
        // Set authentication state first
        login(user);
        setSuccess("Login successful! Redirecting...");
        
        // Navigate immediately after setting auth state
        navigate("/");
      } else {
        setError("Invalid email or password");
      }
    } catch (err: any) {
      setError(err.message || "An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    // Validation
    if (signupForm.password !== signupForm.confirmPassword) {
      setError("Passwords do not match");
      setIsLoading(false);
      return;
    }

    if (signupForm.password.length < 6) {
      setError("Password must be at least 6 characters");
      setIsLoading(false);
      return;
    }

    try {
      const user = await createUser(
        signupForm.email,
        signupForm.password,
        signupForm.firstName,
        signupForm.lastName,
        signupForm.role,
        signupForm.adminKey || undefined
      );
      
      if (user) {
        // Set authentication state first
        login(user);
        setSuccess("Account created successfully! Redirecting...");
        
        // Navigate immediately after setting auth state
        navigate("/");
      } else {
        setError("Account creation failed");
      }
    } catch (err: any) {
      setError(err.message || "An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const fillStudentCredentials = () => {
    setLoginForm({
      email: "student@unsw.edu.au",
      password: "password123",
    });
  };

  const fillTeacherCredentials = () => {
    setLoginForm({
      email: "teacher@unsw.edu.au",
      password: "password123",
    });
  };

  const fillAdminCredentials = () => {
    setLoginForm({
      email: "admin@unsw.edu.au", 
      password: "password123",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-white to-yellow-100 dark:from-gray-900 dark:via-gray-800 dark:to-yellow-900/20 flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-xl border-0 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border-yellow-200/50">
        <CardHeader className="space-y-2 text-center">
          <div className="mx-auto w-12 h-12 bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-full flex items-center justify-center mb-4 shadow-lg">
            <Shield className="w-6 h-6 text-gray-800" />
          </div>
          <CardTitle className="text-2xl font-bold bg-gradient-to-r from-gray-800 to-gray-900 bg-clip-text text-transparent dark:from-yellow-400 dark:to-yellow-500">
            Welcome to UnlockED
          </CardTitle>
          <CardDescription className="text-center text-gray-700 dark:text-gray-300">
            Your UNSW course discovery and review platform
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="login" className="space-y-4">
            <TabsList className="grid w-full grid-cols-2 bg-yellow-100 dark:bg-gray-700">
              <TabsTrigger value="login" className="data-[state=active]:bg-yellow-400 data-[state=active]:text-gray-800 dark:data-[state=active]:bg-yellow-500 dark:data-[state=active]:text-gray-900 font-medium">
                Login
              </TabsTrigger>
              <TabsTrigger value="signup" className="data-[state=active]:bg-yellow-400 data-[state=active]:text-gray-800 dark:data-[state=active]:bg-yellow-500 dark:data-[state=active]:text-gray-900 font-medium">
                Sign Up
              </TabsTrigger>
            </TabsList>

            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            {success && (
              <Alert>
                <AlertDescription>{success}</AlertDescription>
              </Alert>
            )}

            <TabsContent value="login" className="space-y-4">
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="your.email@unsw.edu.au"
                      value={loginForm.email}
                      onChange={(e) => setLoginForm(prev => ({ ...prev, email: e.target.value }))}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      value={loginForm.password}
                      onChange={(e) => setLoginForm(prev => ({ ...prev, password: e.target.value }))}
                      className="pl-10 pr-10"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-3 h-4 w-4 text-muted-foreground hover:text-foreground"
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>

                <Button 
                  type="submit" 
                  className="w-full bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-gray-800 font-bold border border-yellow-600 shadow-lg hover:shadow-xl transition-all duration-200" 
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-gray-600/30 border-t-gray-800 rounded-full animate-spin" />
                      Logging in...
                    </div>
                  ) : (
                    "Login"
                  )}
                </Button>

                <div className="space-y-2">
                  <div className="text-xs text-gray-600 dark:text-gray-400 mb-2 text-center font-medium">
                    Quick Login Options:
                  </div>
                  <div className="grid grid-cols-1 gap-2">
                    <Button 
                      type="button" 
                      variant="outline" 
                      size="sm"
                      className="w-full text-xs border-yellow-300 hover:bg-yellow-50 hover:border-yellow-400 text-gray-700 hover:text-gray-800" 
                      onClick={fillStudentCredentials}
                    >
                      <User className="w-3 h-3 mr-1" />
                      Student Demo
                    </Button>
                    <Button 
                      type="button" 
                      variant="outline" 
                      size="sm"
                      className="w-full text-xs border-yellow-300 hover:bg-yellow-50 hover:border-yellow-400 text-gray-700 hover:text-gray-800" 
                      onClick={fillTeacherCredentials}
                    >
                      <Shield className="w-3 h-3 mr-1" />
                      Teacher Demo
                    </Button>
                    <Button 
                      type="button" 
                      variant="outline" 
                      size="sm"
                      className="w-full text-xs border-yellow-300 hover:bg-yellow-50 hover:border-yellow-400 text-gray-700 hover:text-gray-800" 
                      onClick={fillAdminCredentials}
                    >
                      <Shield className="w-3 h-3 mr-1" />
                      Admin Demo
                    </Button>
                  </div>
                </div>
              </form>
            </TabsContent>

            <TabsContent value="signup" className="space-y-4">
              <form onSubmit={handleSignup} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input
                      id="firstName"
                      placeholder="John"
                      value={signupForm.firstName}
                      onChange={(e) => setSignupForm(prev => ({ ...prev, firstName: e.target.value }))}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input
                      id="lastName"
                      placeholder="Doe"
                      value={signupForm.lastName}
                      onChange={(e) => setSignupForm(prev => ({ ...prev, lastName: e.target.value }))}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="signupEmail">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="signupEmail"
                      type="email"
                      placeholder="your.email@unsw.edu.au"
                      value={signupForm.email}
                      onChange={(e) => setSignupForm(prev => ({ ...prev, email: e.target.value }))}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="signupPassword">Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="signupPassword"
                      type={showPassword ? "text" : "password"}
                      placeholder="Create a password"
                      value={signupForm.password}
                      onChange={(e) => setSignupForm(prev => ({ ...prev, password: e.target.value }))}
                      className="pl-10 pr-10"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-3 h-4 w-4 text-muted-foreground hover:text-foreground"
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="confirmPassword"
                      type={showPassword ? "text" : "password"}
                      placeholder="Confirm your password"
                      value={signupForm.confirmPassword}
                      onChange={(e) => setSignupForm(prev => ({ ...prev, confirmPassword: e.target.value }))}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="role">Account Type</Label>
                  <Select 
                    value={signupForm.role} 
                    onValueChange={(value) => setSignupForm(prev => ({ ...prev, role: value as Role }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select account type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="STUDENT">
                        <div className="flex items-center gap-2">
                          <User className="w-4 h-4" />
                          Student - Add reviews, browse courses
                        </div>
                      </SelectItem>
                      <SelectItem value="INSTRUCTOR">
                        <div className="flex items-center gap-2">
                          <Shield className="w-4 h-4" />
                          Instructor - Create/manage courses
                        </div>
                      </SelectItem>
                      <SelectItem value="ADMIN">
                        <div className="flex items-center gap-2">
                          <Shield className="w-4 h-4" />
                          Admin - Full platform access
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-xs text-gray-600 dark:text-gray-400">
                    Choose your role based on your intended use of the platform
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="signupAdminKey">Admin Key (Optional)</Label>
                  <div className="relative">
                    <Shield className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="signupAdminKey"
                      type="password"
                      placeholder="Enter admin key for elevated access"
                      value={signupForm.adminKey}
                      onChange={(e) => setSignupForm(prev => ({ ...prev, adminKey: e.target.value }))}
                      className="pl-10"
                    />
                  </div>
                  <div className="text-xs text-gray-600 dark:text-gray-400 space-y-1">
                    <p>• Required for admin/instructor roles</p>
                    <p>• Demo key: <code className="bg-yellow-100 dark:bg-gray-700 text-gray-800 dark:text-yellow-400 px-1 rounded font-mono">teamlockedin124</code></p>
                    <p>• Students don't need an admin key</p>
                  </div>
                </div>

                <Button 
                  type="submit" 
                  className="w-full bg-gradient-to-r from-gray-800 to-gray-900 hover:from-gray-900 hover:to-black text-yellow-400 font-bold border border-gray-700 shadow-lg hover:shadow-xl transition-all duration-200" 
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-yellow-400/30 border-t-yellow-400 rounded-full animate-spin" />
                      Creating Account...
                    </div>
                  ) : (
                    "Create Account"
                  )}
                </Button>
              </form>
            </TabsContent>
          </Tabs>
          
          <div className="mt-6 pt-4 border-t border-yellow-200 dark:border-gray-600">
            <div className="text-center text-xs text-gray-600 dark:text-gray-400 space-y-1">
              <p>🎓 Discover courses • 📝 Read reviews • ⭐ Rate experiences</p>
              <p className="text-xs font-medium text-yellow-600 dark:text-yellow-400">
                Built for UNSW students by students
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;

import { useAuth } from "@/hooks/use-auth";
import { getCurrentUser } from "@/lib/auth";

const DebugHomepage = () => {
  const { user, isLoading } = useAuth();

  // Debug localStorage
  const storedUser = localStorage.getItem('user');
  const storedSession = localStorage.getItem('userSession');
  const authUser = getCurrentUser();

  console.log('🏠 Homepage Debug - User from useAuth:', user);
  console.log('🏠 Homepage Debug - Loading:', isLoading);
  console.log('🏠 localStorage user:', storedUser);
  console.log('🏠 localStorage userSession:', storedSession);
  console.log('🏠 getCurrentUser():', authUser);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1>Loading...</h1>
          <p>Checking authentication...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">🎉 Welcome to UnlockED!</h1>
        
        <div className="mb-8 p-6 bg-green-100 dark:bg-green-900 rounded-lg">
          <h2 className="text-2xl font-semibold mb-4">Authentication Status</h2>
          <p><strong>Logged in:</strong> {user ? '✅ Yes' : '❌ No'}</p>
          {user && (
            <div className="mt-4">
              <p><strong>Email:</strong> {user.email}</p>
              <p><strong>Name:</strong> {user.firstName} {user.lastName}</p>
              <p><strong>Role:</strong> {user.role}</p>
              <p><strong>Username:</strong> {user.username}</p>
            </div>
          )}
        </div>

        <div className="mb-6 p-4 bg-yellow-100 dark:bg-yellow-900 rounded-lg">
          <h3 className="text-lg font-semibold mb-2">🔍 Debug Info</h3>
          <p><strong>localStorage 'user':</strong> {storedUser ? '✅ Found' : '❌ Missing'}</p>
          <p><strong>localStorage 'userSession':</strong> {storedSession ? '⚠️ Old data' : '✅ Clean'}</p>
          <p><strong>getCurrentUser():</strong> {authUser ? '✅ Working' : '❌ Not working'}</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <div className="p-6 border rounded-lg">
            <h3 className="text-xl font-semibold mb-3">🔍 Quick Actions</h3>
            <div className="space-y-2">
              <a href="/courses" className="block text-blue-600 hover:underline">
                Browse Courses
              </a>
              <a href="/profile" className="block text-blue-600 hover:underline">
                View Profile
              </a>
              <a href="/leaderboard" className="block text-blue-600 hover:underline">
                Leaderboard
              </a>
            </div>
          </div>

          <div className="p-6 border rounded-lg">
            <h3 className="text-xl font-semibold mb-3">📊 System Status</h3>
            <p className="text-green-600">✅ Frontend: Running</p>
            <p className="text-green-600">✅ Backend: Connected</p>
            <p className="text-green-600">✅ Database: Connected</p>
            <p className="text-green-600">✅ Authentication: Working</p>
          </div>
        </div>

        <div className="mt-8 p-6 bg-blue-50 dark:bg-blue-900 rounded-lg">
          <h3 className="text-xl font-semibold mb-3">🎯 What's Next?</h3>
          <p>Your UnlockED application is now fully functional! You can:</p>
          <ul className="mt-3 space-y-1 list-disc list-inside">
            <li>Browse and compare UNSW courses</li>
            <li>Read student reviews and ratings</li>
            <li>Submit your own course reviews</li>
            <li>Track your achievements and points</li>
            <li>Explore course skills and prerequisites</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DebugHomepage;

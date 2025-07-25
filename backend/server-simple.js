const express = require('express');
const cors = require('cors');

const app = express();

// Middleware
app.use(cors({
  origin: ['http://localhost:8080', 'http://localhost:8081', 'http://localhost:8082', 'http://localhost:8083'],
  credentials: true
}));
app.use(express.json());

// In-memory storage for demo purposes
let users = {};
let reviews = [];

// Test route
app.get('/api/test', (req, res) => {
  res.json({ message: 'Backend server is running!' });
});

// Auth routes
app.post('/api/auth/login', async (req, res) => {
  const { email, password, adminKey } = req.body;
  
  // For testing - accept any email/password
  // In production, this would validate against database
  if (email && password) {
    let user = users[email];
    if (!user) {
      // Create new user if doesn't exist
      user = {
        id: email,
        email: email,
        name: email.split('@')[0],
        role: adminKey === 'teamlockedin124' ? 'ADMIN' : 'STUDENT',
        points: 0,
        reviewCount: 0,
        createdAt: new Date(),
        updatedAt: new Date()
      };
      users[email] = user;
    }
    
    // Update role if admin key provided
    if (adminKey === 'teamlockedin124') {
      user.role = 'ADMIN';
    }
    
    res.json({
      success: true,
      user: user,
      token: 'test-jwt-token-' + Date.now()
    });
  } else {
    res.status(401).json({ 
      success: false, 
      error: 'Invalid credentials' 
    });
  }
});

app.post('/api/auth/signup', async (req, res) => {
  const { email, password, name, role = 'STUDENT', adminKey } = req.body;
  
  if (email && password && name) {
    const user = {
      id: email,
      email: email,
      name: name,
      role: adminKey === 'teamlockedin124' ? 'ADMIN' : role,
      points: 0,
      reviewCount: 0,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    users[email] = user;
    
    res.json({
      success: true,
      user: user,
      token: 'test-jwt-token-' + Date.now()
    });
  } else {
    res.status(400).json({ 
      success: false, 
      error: 'Missing required fields' 
    });
  }
});

// Reviews endpoint
app.post('/api/reviews', async (req, res) => {
  const { userEmail, reviewData } = req.body;
  
  if (!userEmail || !reviewData) {
    return res.status(400).json({ 
      success: false, 
      error: 'Missing required fields' 
    });
  }
  
  // Find user
  const user = users[userEmail];
  if (!user) {
    return res.status(404).json({ 
      success: false, 
      error: 'User not found' 
    });
  }
  
  // Create review
  const review = {
    id: reviews.length + 1,
    userId: user.id,
    userName: user.name,
    courseCode: reviewData.courseCode,
    ...reviewData,
    createdAt: new Date()
  };
  
  reviews.push(review);
  
  // Update user points and review count
  user.points = (user.points || 0) + 50;
  user.reviewCount = (user.reviewCount || 0) + 1;
  user.lastReviewedCourse = reviewData.courseCode; // Store last reviewed course
  user.updatedAt = new Date();
  
  res.json({
    success: true,
    review: review,
    user: user
  });
});

// Get user leaderboard
// Leaderboard endpoint
app.get('/api/leaderboard', (req, res) => {
  // Convert users object to array and sort by points
  const userArray = Object.values(users)
    .sort((a, b) => (b.points || 0) - (a.points || 0))
    .map((user, index) => ({
      ...user,
      rank: index + 1
    }));
  
  res.json({
    success: true,
    users: userArray
  });
});

// Admin endpoints
app.get('/api/admin/users', (req, res) => {
  const userArray = Object.values(users).map(user => ({
    ...user,
    createdAt: user.createdAt || new Date().toISOString()
  }));
  
  res.json({
    success: true,
    users: userArray
  });
});

app.get('/api/admin/reviews', (req, res) => {
  res.json({
    success: true,
    reviews: reviews
  });
});

app.delete('/api/admin/users/:userId', (req, res) => {
  const userId = parseInt(req.params.userId);
  
  // Find user by id
  const userToDelete = Object.values(users).find(user => user.id === userId);
  if (!userToDelete) {
    return res.status(404).json({ 
      success: false, 
      error: 'User not found' 
    });
  }
  
  // Remove user from users object
  delete users[userToDelete.email];
  
  // Remove all reviews by this user
  const userReviews = reviews.filter(review => review.userId === userId);
  reviews = reviews.filter(review => review.userId !== userId);
  
  res.json({
    success: true,
    message: `User deleted along with ${userReviews.length} reviews`
  });
});

app.delete('/api/admin/reviews/:reviewId', (req, res) => {
  const reviewId = parseInt(req.params.reviewId);
  
  const reviewIndex = reviews.findIndex(review => review.id === reviewId);
  if (reviewIndex === -1) {
    return res.status(404).json({ 
      success: false, 
      error: 'Review not found' 
    });
  }
  
  const review = reviews[reviewIndex];
  reviews.splice(reviewIndex, 1);
  
  // Find user and decrease their points and review count
  const user = Object.values(users).find(u => u.id === review.userId);
  if (user) {
    user.points = Math.max(0, (user.points || 0) - 50);
    user.reviewCount = Math.max(0, (user.reviewCount || 0) - 1);
  }
  
  res.json({
    success: true,
    message: 'Review deleted successfully'
  });
});

app.post('/api/admin/users', (req, res) => {
  const { name, email, role } = req.body;
  
  if (!name || !email || !role) {
    return res.status(400).json({ 
      success: false, 
      error: 'Missing required fields' 
    });
  }
  
  // Check if user already exists
  if (users[email]) {
    return res.status(400).json({ 
      success: false, 
      error: 'User with this email already exists' 
    });
  }
  
  // Create new user
  const newUser = {
    id: Object.keys(users).length + 1,
    name,
    email,
    role,
    points: 0,
    reviewCount: 0,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
  
  users[email] = newUser;
  
  res.json({
    success: true,
    user: newUser
  });
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`🚀 Backend server running on http://localhost:${PORT}`);
  console.log('📝 Test the auth endpoints:');
  console.log(`   GET  http://localhost:${PORT}/api/test`);
  console.log(`   POST http://localhost:${PORT}/api/auth/login`);
  console.log(`   POST http://localhost:${PORT}/api/auth/signup`);
  console.log(`   POST http://localhost:${PORT}/api/reviews`);
  console.log(`   GET  http://localhost:${PORT}/api/leaderboard`);
  console.log('🔑 Use admin key "teamlockedin124" for admin access');
});

const express = require('express');
const cors = require('cors');

const app = express();

// Middleware
app.use(cors({
  origin: ['http://localhost:8080', 'http://localhost:8081'],
  credentials: true
}));
app.use(express.json());

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
    const user = {
      id: '1',
      email: email,
      name: email.split('@')[0],
      role: adminKey === 'teamlockedin124' ? 'ADMIN' : 'STUDENT',
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
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
      id: '1',
      email: email,
      name: name,
      role: adminKey === 'teamlockedin124' ? 'ADMIN' : role,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
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

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`🚀 Backend server running on http://localhost:${PORT}`);
  console.log('📝 Test the auth endpoints:');
  console.log(`   GET  http://localhost:${PORT}/api/test`);
  console.log(`   POST http://localhost:${PORT}/api/auth/login`);
  console.log(`   POST http://localhost:${PORT}/api/auth/signup`);
  console.log('🔑 Use admin key "teamlockedin124" for admin access');
});

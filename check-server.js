#!/usr/bin/env node

import http from 'http';

const CONFIG = {
  host: 'localhost',
  port: 8081,
  timeout: 5000
};

function checkServer() {
  return new Promise((resolve, reject) => {
    const req = http.get(`http://${CONFIG.host}:${CONFIG.port}`, (res) => {
      resolve({
        status: res.statusCode,
        success: res.statusCode === 200
      });
    });

    req.on('error', (err) => {
      reject(err);
    });

    req.setTimeout(CONFIG.timeout, () => {
      req.destroy();
      reject(new Error('Request timeout'));
    });
  });
}

async function main() {
  console.log('🔍 Checking if development server is running...');
  console.log(`📍 URL: http://${CONFIG.host}:${CONFIG.port}`);
  
  try {
    const result = await checkServer();
    
    if (result.success) {
      console.log('✅ Development server is running!');
      console.log('🚀 Ready to take screenshots with: npm run screenshots');
      process.exit(0);
    } else {
      console.log(`⚠️  Server responded with status: ${result.status}`);
      console.log('🔧 Please check your development server');
      process.exit(1);
    }
  } catch (error) {
    console.log('❌ Development server is not running');
    console.log('💡 Start it with: npm run dev');
    console.log(`📝 Error: ${error.message}`);
    process.exit(1);
  }
}

if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}

export { checkServer };

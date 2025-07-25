#!/usr/bin/env node

import puppeteer from 'puppeteer';
import fs from 'fs/promises';
import path from 'path';

const CONFIG = {
  baseUrl: 'http://localhost:8081',
  screenshotDir: './screenshots-test',
  viewport: { width: 1920, height: 1080 }
};

async function quickTest() {
  console.log('🧪 Running quick screenshot test...');
  
  // Create test directory
  await fs.mkdir(CONFIG.screenshotDir, { recursive: true });
  
  // Launch browser
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  await page.setViewport(CONFIG.viewport);
  
  try {
    // Test 1: Homepage
    console.log('📸 Testing homepage screenshot...');
    await page.goto(`${CONFIG.baseUrl}/`, { waitUntil: 'networkidle0' });
    await new Promise(resolve => setTimeout(resolve, 2000));
    await page.screenshot({ 
      path: path.join(CONFIG.screenshotDir, 'homepage-test.png'),
      fullPage: true 
    });
    console.log('✅ Homepage screenshot saved');
    
    // Test 2: Courses page
    console.log('📸 Testing courses page screenshot...');
    await page.goto(`${CONFIG.baseUrl}/courses`, { waitUntil: 'networkidle0' });
    await new Promise(resolve => setTimeout(resolve, 2000));
    await page.screenshot({ 
      path: path.join(CONFIG.screenshotDir, 'courses-test.png'),
      fullPage: true 
    });
    console.log('✅ Courses page screenshot saved');
    
    // Test 3: Theme toggle
    console.log('🎨 Testing theme toggle...');
    try {
      const themeButton = await page.$('button[class*="h-9 w-9"]');
      if (themeButton) {
        await themeButton.click();
        await new Promise(resolve => setTimeout(resolve, 1000));
        await page.screenshot({ 
          path: path.join(CONFIG.screenshotDir, 'dark-mode-test.png'),
          fullPage: true 
        });
        console.log('✅ Dark mode screenshot saved');
      }
    } catch (error) {
      console.warn('⚠️  Theme toggle test failed:', error.message);
    }
    
    console.log('\n🎉 Quick test completed successfully!');
    console.log(`📁 Test screenshots saved in: ${CONFIG.screenshotDir}`);
    
  } catch (error) {
    console.error('❌ Test failed:', error.message);
    throw error;
  } finally {
    await browser.close();
  }
}

if (import.meta.url === `file://${process.argv[1]}`) {
  quickTest().catch(console.error);
}

export { quickTest };

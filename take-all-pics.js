#!/usr/bin/env node

import puppeteer from 'puppeteer';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuration
const CONFIG = {
  baseUrl: 'http://localhost:8081',
  screenshotDir: './screenshots',
  viewport: {
    width: 1920,
    height: 1080
  },
  mobileViewport: {
    width: 375,
    height: 812
  },
  delay: 2000, // Wait time after navigation
  quality: 90,
  demoCredentials: {
    email: 'admin@unsw.edu.au',
    password: 'password'
  }
};

// Screenshot scenarios to capture
const SCENARIOS = [
  {
    name: 'homepage',
    url: '/',
    description: 'Homepage with hero section and features',
    actions: []
  },
  {
    name: 'courses-directory',
    url: '/courses',
    description: 'Course directory with all courses visible',
    actions: []
  },
  {
    name: 'courses-with-filters',
    url: '/courses',
    description: 'Course directory with filters panel open',
    actions: [
      {
        type: 'click',
        selector: '[data-component-name="CollapsibleTrigger"]',
        description: 'Ensure filters are expanded'
      }
    ]
  },
  {
    name: 'courses-filtered-by-skills',
    url: '/courses',
    description: 'Courses filtered by Programming skill',
    actions: [
      {
        type: 'click',
        selector: 'text="Programming"',
        description: 'Click Programming skill filter'
      },
      {
        type: 'wait',
        duration: 1000
      }
    ]
  },
  {
    name: 'courses-search-active',
    url: '/courses',
    description: 'Course search functionality',
    actions: [
      {
        type: 'type',
        selector: 'input[placeholder*="Search by course"]',
        text: 'Programming',
        description: 'Search for programming courses'
      },
      {
        type: 'wait',
        duration: 1000
      }
    ]
  },
  {
    name: 'course-card-expanded-skills',
    url: '/courses',
    description: 'Course card with expanded skills',
    actions: [
      {
        type: 'click',
        selector: 'text="+1 more"',
        description: 'Click "show more" on first course card'
      },
      {
        type: 'wait',
        duration: 500
      }
    ]
  },
  {
    name: 'login-page',
    url: '/login',
    description: 'Login/signup page',
    actions: []
  },
  {
    name: 'login-signup-tab',
    url: '/login',
    description: 'Signup tab on login page',
    actions: [
      {
        type: 'click',
        selector: '[value="signup"]',
        description: 'Switch to signup tab'
      }
    ]
  },
  {
    name: 'login-with-demo-credentials',
    url: '/login',
    description: 'Login form filled with demo credentials',
    actions: [
      {
        type: 'type',
        selector: '#login-email',
        text: CONFIG.demoCredentials.email,
        description: 'Fill email field'
      },
      {
        type: 'type',
        selector: '#login-password',
        text: CONFIG.demoCredentials.password,
        description: 'Fill password field'
      }
    ]
  },
  {
    name: 'authenticated-header',
    url: '/',
    description: 'Header with authenticated user dropdown',
    requiresAuth: true,
    actions: [
      {
        type: 'click',
        selector: '[role="button"]',
        description: 'Open user dropdown'
      },
      {
        type: 'wait',
        duration: 500
      }
    ]
  },
  {
    name: 'leaderboard',
    url: '/leaderboard',
    description: 'Leaderboard page',
    actions: []
  },
  {
    name: 'submit-review',
    url: '/submit-review',
    description: 'Submit review page',
    actions: []
  }
];

class ScreenshotTaker {
  constructor() {
    this.browser = null;
    this.page = null;
    this.isAuthenticated = false;
  }

  async init() {
    console.log('🚀 Initializing Puppeteer...');
    
    this.browser = await puppeteer.launch({
      headless: 'new',
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage',
        '--disable-web-security',
        '--allow-running-insecure-content'
      ]
    });

    this.page = await this.browser.newPage();
    
    // Set viewport
    await this.page.setViewport(CONFIG.viewport);
    
    // Enable request interception for better loading
    await this.page.setRequestInterception(true);
    this.page.on('request', (req) => {
      if (req.resourceType() === 'stylesheet' || req.resourceType() === 'font') {
        req.continue();
      } else if (req.resourceType() === 'image') {
        req.continue();
      } else {
        req.continue();
      }
    });

    console.log('✅ Puppeteer initialized');
  }

  async createDirectories() {
    const dirs = [
      CONFIG.screenshotDir,
      path.join(CONFIG.screenshotDir, 'light'),
      path.join(CONFIG.screenshotDir, 'dark'),
      path.join(CONFIG.screenshotDir, 'mobile-light'),
      path.join(CONFIG.screenshotDir, 'mobile-dark')
    ];

    for (const dir of dirs) {
      try {
        await fs.mkdir(dir, { recursive: true });
        console.log(`📁 Created directory: ${dir}`);
      } catch (error) {
        if (error.code !== 'EEXIST') {
          console.error(`❌ Error creating directory ${dir}:`, error.message);
        }
      }
    }
  }

  async authenticate() {
    if (this.isAuthenticated) return;

    console.log('🔐 Authenticating user...');
    
    await this.page.goto(`${CONFIG.baseUrl}/login`, { waitUntil: 'networkidle0' });
    await new Promise(resolve => setTimeout(resolve, CONFIG.delay));

    // Fill login form
    await this.page.type('#login-email', CONFIG.demoCredentials.email);
    await this.page.type('#login-password', CONFIG.demoCredentials.password);
    
    // Submit form
    await this.page.click('button[type="submit"]');
    
    // Wait for redirect
    await this.page.waitForNavigation({ waitUntil: 'networkidle0' });
    
    this.isAuthenticated = true;
    console.log('✅ Authentication successful');
  }

  async setTheme(theme) {
    console.log(`🎨 Setting theme to: ${theme}`);
    
    // Go to homepage first
    await this.page.goto(CONFIG.baseUrl, { waitUntil: 'networkidle0' });
    
    try {
      // Find and click theme toggle button
      const themeButton = await this.page.$('button[class*="h-9 w-9"]');
      if (themeButton) {
        // Check current theme by looking at the html class
        const currentTheme = await this.page.evaluate(() => {
          return document.documentElement.classList.contains('dark') ? 'dark' : 'light';
        });
        
        // Toggle if needed
        if (currentTheme !== theme) {
          await themeButton.click();
          await new Promise(resolve => setTimeout(resolve, 500)); // Wait for theme transition
        }
      }
    } catch (error) {
      console.warn(`⚠️  Could not find theme toggle button: ${error.message}`);
    }
    
    // Verify theme was set
    const actualTheme = await this.page.evaluate(() => {
      return document.documentElement.classList.contains('dark') ? 'dark' : 'light';
    });
    
    console.log(`✅ Theme set to: ${actualTheme}`);
  }

  async performActions(actions) {
    for (const action of actions) {
      try {
        switch (action.type) {
          case 'click':
            try {
              // Try different selector strategies
              if (action.selector.startsWith('text=')) {
                const text = action.selector.replace('text=', '').replace(/"/g, '');
                // Find element by text content
                const element = await this.page.evaluateHandle((text) => {
                  const elements = Array.from(document.querySelectorAll('*'));
                  return elements.find(el => el.textContent && el.textContent.trim() === text);
                }, text);
                if (element) {
                  await element.click();
                } else {
                  throw new Error(`Element with text "${text}" not found`);
                }
              } else {
                await this.page.waitForSelector(action.selector, { timeout: 5000 });
                await this.page.click(action.selector);
              }
              console.log(`   🖱️  Clicked: ${action.description}`);
            } catch (error) {
              console.warn(`   ⚠️  Click failed: ${action.description} - ${error.message}`);
            }
            break;
            
          case 'type':
            await this.page.waitForSelector(action.selector, { timeout: 5000 });
            await this.page.type(action.selector, action.text);
            console.log(`   ⌨️  Typed: ${action.description}`);
            break;
            
          case 'wait':
            await new Promise(resolve => setTimeout(resolve, action.duration));
            console.log(`   ⏱️  Waited: ${action.duration}ms`);
            break;
            
          default:
            console.warn(`   ⚠️  Unknown action type: ${action.type}`);
        }
      } catch (error) {
        console.warn(`   ⚠️  Action failed: ${action.description} - ${error.message}`);
      }
    }
  }

  async takeScreenshot(scenario, theme, isMobile = false) {
    const { name, url, description, actions = [], requiresAuth = false } = scenario;
    
    console.log(`📸 Taking screenshot: ${name} (${theme}${isMobile ? ' mobile' : ''})`);
    
    // Authenticate if required
    if (requiresAuth && !this.isAuthenticated) {
      await this.authenticate();
    }
    
    // Set viewport for mobile if needed
    if (isMobile) {
      await this.page.setViewport(CONFIG.mobileViewport);
    } else {
      await this.page.setViewport(CONFIG.viewport);
    }
    
    // Navigate to page
    await this.page.goto(`${CONFIG.baseUrl}${url}`, { waitUntil: 'networkidle0' });
    await new Promise(resolve => setTimeout(resolve, CONFIG.delay));
    
    // Perform any actions
    await this.performActions(actions);
    
    // Wait a bit more for any animations
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Take screenshot
    const dir = isMobile ? `mobile-${theme}` : theme;
    const filename = `${name}.png`;
    const filepath = path.join(CONFIG.screenshotDir, dir, filename);
    
    await this.page.screenshot({
      path: filepath,
      fullPage: true,
      quality: CONFIG.quality
    });
    
    console.log(`✅ Screenshot saved: ${filepath}`);
  }

  async takeAllScreenshots() {
    console.log('📸 Starting screenshot capture process...');
    
    const themes = ['light', 'dark'];
    const viewports = [
      { name: 'desktop', isMobile: false },
      { name: 'mobile', isMobile: true }
    ];
    
    let totalScreenshots = 0;
    const totalScenarios = SCENARIOS.length * themes.length * viewports.length;
    
    for (const theme of themes) {
      await this.setTheme(theme);
      
      for (const viewport of viewports) {
        console.log(`\n🖥️  Capturing ${viewport.name} screenshots in ${theme} mode...\n`);
        
        for (const scenario of SCENARIOS) {
          try {
            await this.takeScreenshot(scenario, theme, viewport.isMobile);
            totalScreenshots++;
          } catch (error) {
            console.error(`❌ Failed to capture ${scenario.name}: ${error.message}`);
          }
        }
      }
    }
    
    console.log(`\n🎉 Screenshot capture complete!`);
    console.log(`📊 Total screenshots taken: ${totalScreenshots}/${totalScenarios}`);
  }

  async generateIndex() {
    console.log('📝 Generating screenshot index...');
    
    const indexContent = `# UnlockED Screenshots

This directory contains screenshots of all application features in both light and dark modes, across desktop and mobile viewports.

## Directory Structure

- \`light/\` - Desktop screenshots in light mode
- \`dark/\` - Desktop screenshots in dark mode  
- \`mobile-light/\` - Mobile screenshots in light mode
- \`mobile-dark/\` - Mobile screenshots in dark mode

## Screenshots

${SCENARIOS.map(scenario => `
### ${scenario.name.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
*${scenario.description}*

| Desktop Light | Desktop Dark | Mobile Light | Mobile Dark |
|---------------|--------------|--------------|-------------|
| ![](light/${scenario.name}.png) | ![](dark/${scenario.name}.png) | ![](mobile-light/${scenario.name}.png) | ![](mobile-dark/${scenario.name}.png) |
`).join('\n')}

## Usage

These screenshots can be used for:
- Documentation and README files
- Marketing materials
- Design reviews
- Bug reports and feature requests
- User onboarding guides

Generated on: ${new Date().toISOString()}
`;

    await fs.writeFile(path.join(CONFIG.screenshotDir, 'README.md'), indexContent);
    console.log('✅ Screenshot index generated');
  }

  async cleanup() {
    if (this.browser) {
      await this.browser.close();
      console.log('🧹 Browser closed');
    }
  }
}

// Main execution function
async function main() {
  const screenshotTaker = new ScreenshotTaker();
  
  try {
    console.log('🎬 Starting UnlockED screenshot capture...\n');
    
    await screenshotTaker.createDirectories();
    await screenshotTaker.init();
    await screenshotTaker.takeAllScreenshots();
    await screenshotTaker.generateIndex();
    
    console.log('\n🎉 All done! Check the ./screenshots directory for your images.');
    console.log('📋 View ./screenshots/README.md for an organized overview.');
    
  } catch (error) {
    console.error('❌ Script failed:', error.message);
    process.exit(1);
  } finally {
    await screenshotTaker.cleanup();
  }
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  main().catch(console.error);
}

export { ScreenshotTaker, CONFIG, SCENARIOS };

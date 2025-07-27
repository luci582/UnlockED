#!/usr/bin/env node

import puppeteer from 'puppeteer';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuration
const CONFIG = {
  baseUrl: 'http://localhost:8082', // Updated to current dev server port
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
  demoCredentials: {
    email: 'admin@unsw.edu.au',
    password: 'password'
  },
  // Available course IDs for random selection
  courseIds: ['comp1511', 'mgmt1001', 'psyc1001', 'math1131', 'econ1101', 'arts1000', 'comp1521', 'fins1613']
};

// Function to randomly select a course ID
function getRandomCourseId() {
  const randomIndex = Math.floor(Math.random() * CONFIG.courseIds.length);
  const selectedCourse = CONFIG.courseIds[randomIndex];
  console.log(`🎲 Randomly selected course: ${selectedCourse.toUpperCase()}`);
  return selectedCourse;
}

// Function to generate dynamic course scenarios
function generateCourseScenarios() {
  const randomCourseId = getRandomCourseId();
  
  return [
    {
      name: 'course-detail-overview',
      url: `/course/${randomCourseId}`,
      description: `Course detail page overview tab for ${randomCourseId.toUpperCase()}`,
      actions: [],
      dynamicCourse: randomCourseId
    },
    {
      name: 'course-detail-reviews',
      url: `/course/${randomCourseId}`,
      description: `Course detail page reviews tab for ${randomCourseId.toUpperCase()}`,
      actions: [
        {
          type: 'click',
          selector: 'text="Reviews"',
          description: 'Switch to Reviews tab'
        },
        {
          type: 'wait',
          duration: 1000
        }
      ],
      dynamicCourse: randomCourseId
    },
    {
      name: 'course-detail-student-video',
      url: `/course/${randomCourseId}`,
      description: `Course detail page student video tab for ${randomCourseId.toUpperCase()}`,
      actions: [
        {
          type: 'click',
          selector: 'text="Student Video"',
          description: 'Switch to Student Video tab'
        },
        {
          type: 'wait',
          duration: 1000
        }
      ],
      dynamicCourse: randomCourseId
    }
  ];
}

// Screenshot scenarios to capture
function getScenarios() {
  const courseScenarios = generateCourseScenarios();
  
  return [
    {
      name: 'homepage',
      url: '/',
      description: 'Homepage with hero section and improved mobile spacing',
      actions: []
    },
    {
      name: 'courses-directory',
      url: '/courses',
      description: 'Course directory with comparison checkboxes and enhanced features',
      actions: [
        {
          type: 'wait',
          duration: 2000 // Wait for skeleton loaders to finish
        }
      ]
    },
    {
      name: 'courses-with-filters',
      url: '/courses',
      description: 'Course directory with filters panel visible and active filter count',
      actions: [
        {
          type: 'wait',
          duration: 2000
        }
      ]
    },
    {
      name: 'courses-without-filters',
      url: '/courses',
      description: 'Course directory with filters panel hidden',
      actions: [
        {
          type: 'wait',
          duration: 2000
        },
        {
          type: 'click',
          selector: '[data-testid="desktop-filter-toggle"]',
          description: 'Hide desktop filter panel'
        }
      ]
    },
    {
      name: 'mobile-filters-open',
      url: '/courses',
      description: 'Mobile filter panel opened',
      actions: [
        {
          type: 'wait',
          duration: 2000
        },
        {
          type: 'click',
          selector: '[data-testid="mobile-filter-toggle"]',
          description: 'Open mobile filter panel'
        }
      ]
    },
    {
      name: 'courses-filtered-by-skills',
      url: '/courses',
      description: 'Courses filtered by Programming skill with active filter indicator',
      actions: [
        {
          type: 'wait',
          duration: 2000
        },
        {
          type: 'click',
          selector: '[data-testid="skill-filter-programming"]',
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
      description: 'Course search functionality with enhanced search',
      actions: [
        {
          type: 'wait',
          duration: 2000
        },
        {
          type: 'type',
          selector: 'input[placeholder*="Search by course code"]',
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
      description: 'Course card with expanded skills and comparison checkbox',
      actions: [
        {
          type: 'wait',
          duration: 2000
        },
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
      name: 'course-comparison-active',
      url: '/courses',
      description: 'Course directory with courses selected for comparison',
      actions: [
        {
          type: 'wait',
          duration: 2000
        },
        {
          type: 'click',
          selector: 'input[type="checkbox"][id^="compare-"]',
          description: 'Select first course for comparison'
        },
        {
          type: 'wait',
          duration: 500
        },
        {
          type: 'click',
          selector: 'input[type="checkbox"][id^="compare-"]:nth-of-type(2)',
          description: 'Select second course for comparison'
        },
        {
          type: 'wait',
          duration: 1000
        }
      ]
    },
    {
      name: 'course-comparison-modal',
      url: '/courses',
      description: 'Course comparison modal with side-by-side view',
      actions: [
        {
          type: 'wait',
          duration: 2000
        },
        {
          type: 'click',
          selector: 'input[type="checkbox"][id^="compare-"]',
          description: 'Select first course for comparison'
        },
        {
          type: 'wait',
          duration: 500
        },
        {
          type: 'click',
          selector: 'input[type="checkbox"][id^="compare-"]:nth-of-type(2)',
          description: 'Select second course for comparison'
        },
        {
          type: 'wait',
          duration: 1000
        },
        {
          type: 'click',
          selector: 'button:has-text("Compare")',
          description: 'Open comparison modal'
        },
        {
          type: 'wait',
          duration: 1000
        }
      ]
    },
    // Add the dynamic course scenarios here
    ...courseScenarios,
    {
      name: 'course-detail-rating-distribution',
      url: `/course/comp1511`,
      description: 'Course detail with rating distribution chart',
      actions: [
        {
          type: 'wait',
          duration: 1500
        }
      ]
    },
    {
      name: 'multi-step-review-step1',
      url: '/submit-review',
      description: 'Multi-step review form - Step 1 (Basic Information)',
      actions: []
    },
    {
      name: 'multi-step-review-step2',
      url: '/submit-review',
      description: 'Multi-step review form - Step 2 (Optional Details)',
      actions: [
        {
          type: 'type',
          selector: '#courseCode',
          text: 'COMP1511',
          description: 'Fill course code'
        },
        {
          type: 'type',
          selector: '#semester',
          text: '2024 T1',
          description: 'Fill semester'
        },
        {
          type: 'click',
          selector: 'button:has(svg.h-8.w-8):nth-of-type(5)',
          description: 'Select 5-star rating'
        },
        {
          type: 'type',
          selector: '#review',
          text: 'This is a great course for learning programming fundamentals.',
          description: 'Fill review text'
        },
        {
          type: 'click',
          selector: 'button:has-text("Next")',
          description: 'Go to step 2'
        },
        {
          type: 'wait',
          duration: 1000
        }
      ]
    },
    {
      name: 'profile-overview',
      url: '/profile',
      description: 'User profile page - Overview tab',
      actions: []
    },
    {
      name: 'profile-achievements',
      url: '/profile',
      description: 'User profile page - Achievements tab with progress tracking',
      actions: [
        {
          type: 'click',
          selector: 'button[value="achievements"]',
          description: 'Switch to achievements tab'
        },
        {
          type: 'wait',
          duration: 1000
        }
      ]
    },
    {
      name: 'leaderboard-with-you-are-here',
      url: '/leaderboard',
      description: 'Leaderboard with "You Are Here" marker',
      actions: []
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
          selector: '[data-state="inactive"]',
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
          selector: '[data-testid="user-menu-trigger"]',
          description: 'Open user dropdown'
        },
        {
          type: 'wait',
          duration: 500
        }
      ]
    },
    {
      name: 'mobile-navigation',
      url: '/',
      description: 'Mobile bottom tab bar navigation',
      actions: [
        {
          type: 'wait',
          duration: 1000
        }
      ]
    },
    {
      name: 'mobile-navigation-active',
      url: '/courses',
      description: 'Mobile navigation with active courses tab',
      actions: [
        {
          type: 'wait',
          duration: 2000
        }
      ]
    }
  ];
}

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
    // First, delete the existing screenshots directory if it exists
    try {
      await fs.rm(CONFIG.screenshotDir, { recursive: true, force: true });
      console.log(`🗑️  Deleted existing screenshots directory`);
    } catch (error) {
      if (error.code !== 'ENOENT') {
        console.error(`❌ Error deleting screenshots directory:`, error.message);
      }
    }

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
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    try {
      // Check current theme by looking at the html class
      const currentTheme = await this.page.evaluate(() => {
        return document.documentElement.classList.contains('dark') ? 'dark' : 'light';
      });
      
      console.log(`Current theme is: ${currentTheme}, want: ${theme}`);
      
      // Toggle if needed
      if (currentTheme !== theme) {
        // Try multiple possible selectors for the theme toggle button
        const possibleSelectors = [
          'button[class*="h-9 w-9"]', // Common theme toggle button size
          'button[aria-label*="theme"]',
          'button[title*="theme"]',
          'button:has(svg[class*="sun"])',
          'button:has(svg[class*="moon"])',
          // Look for buttons in the header area
          'header button',
          '.flex.items-center button'
        ];
        
        let themeButton = null;
        for (const selector of possibleSelectors) {
          try {
            await this.page.waitForSelector(selector, { timeout: 1000 });
            themeButton = await this.page.$(selector);
            if (themeButton) {
              console.log(`Found theme button with selector: ${selector}`);
              break;
            }
          } catch (e) {
            // Continue to next selector
          }
        }
        
        if (themeButton) {
          await themeButton.click();
          await new Promise(resolve => setTimeout(resolve, 2000)); // Wait longer for theme transition
          
          // Verify the theme changed
          const newTheme = await this.page.evaluate(() => {
            return document.documentElement.classList.contains('dark') ? 'dark' : 'light';
          });
          
          console.log(`Theme after toggle: ${newTheme}`);
          
          if (newTheme !== theme) {
            console.warn(`⚠️  Theme toggle didn't work as expected. Got ${newTheme}, wanted ${theme}`);
            // Try clicking again if needed
            if (newTheme !== theme) {
              await themeButton.click();
              await new Promise(resolve => setTimeout(resolve, 2000));
            }
          }
        } else {
          console.warn(`⚠️  Could not find theme toggle button`);
        }
      }
    } catch (error) {
      console.warn(`⚠️  Error setting theme: ${error.message}`);
    }
    
    // Final theme verification
    const actualTheme = await this.page.evaluate(() => {
      return document.documentElement.classList.contains('dark') ? 'dark' : 'light';
    });
    
    console.log(`✅ Final theme state: ${actualTheme}`);
  }

  async tryFallbackClick(action) {
    const { selector, description } = action;
    
    // Fallback strategies based on selector type
    if (selector.includes('mobile-filter-toggle')) {
      // Try generic mobile filter button (should be visible only on mobile)
      const fallbacks = [
        'button.lg\\:hidden[class*="SlidersHorizontal"]',
        'button.lg\\:hidden:has(svg)',
        '.lg\\:hidden button:has(svg[class*="sliders"])',
        '.lg\\:hidden button[variant="outline"]',
        'button:has(svg[class*="SlidersHorizontal"]).lg\\:hidden'
      ];
      
      for (const fallback of fallbacks) {
        try {
          await this.page.waitForSelector(fallback, { timeout: 1000, visible: true });
          await this.page.click(fallback);
          console.log(`   🖱️  Fallback click successful with: ${fallback}`);
          return;
        } catch (e) {
          continue;
        }
      }
    }
    
    if (selector.includes('desktop-filter-toggle')) {
      // Try generic desktop filter button (should be visible only on desktop)
      const fallbacks = [
        'button.hidden.lg\\:flex[class*="SlidersHorizontal"]',
        '.hidden.lg\\:flex button:has(svg)',
        'button.hidden.lg\\:flex:has(svg[class*="sliders"])',
        '.hidden.lg\\:flex button[variant="outline"]',
        'button:has(svg[class*="SlidersHorizontal"]).hidden.lg\\:flex'
      ];
      
      for (const fallback of fallbacks) {
        try {
          await this.page.waitForSelector(fallback, { timeout: 1000, visible: true });
          await this.page.click(fallback);
          console.log(`   🖱️  Fallback click successful with: ${fallback}`);
          return;
        } catch (e) {
          continue;
        }
      }
    }
    
    if (selector.includes('mobile-menu-trigger')) {
      // Try generic mobile menu button
      const fallbacks = [
        'button[class*="md:hidden"]',
        '.md\\:hidden button:has(svg)',
        'header button.md\\:hidden',
        'button:has(svg[class*="menu"])',
        'nav button.md\\:hidden'
      ];
      
      for (const fallback of fallbacks) {
        try {
          await this.page.waitForSelector(fallback, { timeout: 1000, visible: true });
          await this.page.click(fallback);
          console.log(`   🖱️  Fallback click successful with: ${fallback}`);
          return;
        } catch (e) {
          continue;
        }
      }
    }
    
    if (selector.includes('skill-filter-programming')) {
      // Try to find Programming skill badge in different ways
      const fallbacks = [
        'span:has-text("Programming")',
        '.cursor-pointer:has-text("Programming")',
        '[class*="badge"]:has-text("Programming")',
        'div:has-text("Programming")',
        '*:has-text("Programming")',
        '[data-testid*="programming"]',
        'button:has-text("Programming")'
      ];
      
      for (const fallback of fallbacks) {
        try {
          await this.page.waitForSelector(fallback, { timeout: 1000, visible: true });
          await this.page.click(fallback);
          console.log(`   🖱️  Fallback click successful with: ${fallback}`);
          return;
        } catch (e) {
          continue;
        }
      }
      
      // Last resort: find by text content
      try {
        const programmingElement = await this.page.evaluate(() => {
          const elements = Array.from(document.querySelectorAll('*'));
          return elements.find(el => 
            el.textContent && 
            el.textContent.trim() === 'Programming' && 
            el.offsetParent !== null && // Element is visible
            (el.classList.contains('cursor-pointer') || el.tagName === 'BUTTON')
          );
        });
        
        if (programmingElement) {
          await this.page.evaluate((el) => el.click(), programmingElement);
          console.log(`   🖱️  Fallback click successful with text content search`);
          return;
        }
      } catch (e) {
        // Continue to error
      }
    }
    
    // Handle comparison checkboxes
    if (selector.includes('compare-') || selector.includes('input[type="checkbox"]')) {
      const fallbacks = [
        'input[type="checkbox"][id*="compare"]',
        'input[type="checkbox"]',
        'label:has-text("Compare")',
        '[aria-label*="Compare"]'
      ];
      
      for (const fallback of fallbacks) {
        try {
          await this.page.waitForSelector(fallback, { timeout: 1000, visible: true });
          await this.page.click(fallback);
          console.log(`   🖱️  Fallback click successful with: ${fallback}`);
          return;
        } catch (e) {
          continue;
        }
      }
    }
    
    // Handle Compare button
    if (selector.includes('Compare')) {
      const fallbacks = [
        'button:has-text("Compare")',
        '[class*="fixed"]:has-text("Compare")',
        '.z-50 button:has-text("Compare")',
        'button[class*="primary"]:has-text("Compare")'
      ];
      
      for (const fallback of fallbacks) {
        try {
          await this.page.waitForSelector(fallback, { timeout: 1000, visible: true });
          await this.page.click(fallback);
          console.log(`   🖱️  Fallback click successful with: ${fallback}`);
          return;
        } catch (e) {
          continue;
        }
      }
    }
    
    // Handle tab buttons
    if (selector.includes('value="achievements"')) {
      const fallbacks = [
        'button[value="achievements"]',
        'button:has-text("Achievements")',
        '[role="tab"]:has-text("Achievements")',
        '.tabs button:has-text("Achievements")'
      ];
      
      for (const fallback of fallbacks) {
        try {
          await this.page.waitForSelector(fallback, { timeout: 1000, visible: true });
          await this.page.click(fallback);
          console.log(`   🖱️  Fallback click successful with: ${fallback}`);
          return;
        } catch (e) {
          continue;
        }
      }
    }
    
    console.warn(`   ⚠️  All fallback strategies failed for: ${description}`);
    // Don't throw error, just log warning and continue
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
                
                // First try to find by exact text match
                const element = await this.page.evaluateHandle((text) => {
                  const elements = Array.from(document.querySelectorAll('*'));
                  return elements.find(el => 
                    el.textContent && 
                    el.textContent.trim() === text &&
                    el.offsetParent !== null // Element is visible
                  );
                }, text);
                
                if (element && element.asElement()) {
                  await element.click();
                  console.log(`   🖱️  Clicked by text: ${text}`);
                } else {
                  throw new Error(`Element with text "${text}" not found`);
                }
              } else {
                // Try to wait for selector with shorter timeout first
                let elementFound = false;
                try {
                  await this.page.waitForSelector(action.selector, { timeout: 3000, visible: true });
                  elementFound = true;
                } catch (e) {
                  // Element not found, try fallback strategies
                  console.warn(`   ⚠️  Primary selector not found: ${action.selector}`);
                }
                
                if (elementFound) {
                  // Check if element is clickable
                  const isClickable = await this.page.evaluate((selector) => {
                    const element = document.querySelector(selector);
                    if (!element) return false;
                    
                    const rect = element.getBoundingClientRect();
                    const style = window.getComputedStyle(element);
                    
                    return rect.width > 0 && 
                           rect.height > 0 && 
                           style.visibility !== 'hidden' && 
                           style.display !== 'none' &&
                           !element.disabled;
                  }, action.selector);
                  
                  if (isClickable) {
                    await this.page.click(action.selector);
                    console.log(`   🖱️  Clicked: ${action.description}`);
                  } else {
                    console.warn(`   ⚠️  Element not clickable: ${action.selector}`);
                    await this.tryFallbackClick(action);
                  }
                } else {
                  // Try fallback strategies based on action type
                  await this.tryFallbackClick(action);
                }
              }
            } catch (error) {
              console.warn(`   ⚠️  Click failed: ${action.description} - ${error.message}`);
              await this.tryFallbackClick(action);
            }
            break;
            
          case 'type':
            try {
              await this.page.waitForSelector(action.selector, { timeout: 5000 });
              await this.page.click(action.selector); // Focus the input first
              await this.page.keyboard.down('Control');
              await this.page.keyboard.press('KeyA');
              await this.page.keyboard.up('Control');
              await this.page.type(action.selector, action.text);
              console.log(`   ⌨️  Typed: ${action.description}`);
            } catch (error) {
              console.warn(`   ⚠️  Type failed: ${action.description} - ${error.message}`);
            }
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
    
    // Set viewport for mobile if needed BEFORE any navigation
    if (isMobile) {
      await this.page.setViewport(CONFIG.mobileViewport);
    } else {
      await this.page.setViewport(CONFIG.viewport);
    }
    
    // Authenticate if required
    if (requiresAuth && !this.isAuthenticated) {
      await this.authenticate();
    }
    
    // Set theme first by going to homepage
    await this.setTheme(theme);
    
    // Now navigate to the target page
    await this.page.goto(`${CONFIG.baseUrl}${url}`, { waitUntil: 'networkidle0' });
    await new Promise(resolve => setTimeout(resolve, CONFIG.delay));
    
    // Verify theme is still correct after navigation
    const currentTheme = await this.page.evaluate(() => {
      return document.documentElement.classList.contains('dark') ? 'dark' : 'light';
    });
    
    if (currentTheme !== theme) {
      console.warn(`⚠️  Theme changed after navigation. Re-setting to ${theme}`);
      await this.setTheme(theme);
      // Re-navigate if theme changed
      await this.page.goto(`${CONFIG.baseUrl}${url}`, { waitUntil: 'networkidle0' });
      await new Promise(resolve => setTimeout(resolve, CONFIG.delay));
    }
    
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
      fullPage: true
    });
    
    console.log(`✅ Screenshot saved: ${filepath}`);
  }

  async takeAllScreenshots() {
    console.log('📸 Starting screenshot capture process...');
    
    // Generate scenarios with random course selection
    const scenarios = getScenarios();
    
    const themes = ['light', 'dark'];
    const viewports = [
      { name: 'desktop', isMobile: false },
      { name: 'mobile', isMobile: true }
    ];
    
    let totalScreenshots = 0;
    const totalScenarios = scenarios.length * themes.length * viewports.length;
    
    for (const theme of themes) {
      await this.setTheme(theme);
      
      for (const viewport of viewports) {
        console.log(`\n🖥️  Capturing ${viewport.name} screenshots in ${theme} mode...\n`);
        
        for (const scenario of scenarios) {
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
    
    // Use the same scenarios that were used for screenshot generation
    const scenarios = getScenarios();
    
    const indexContent = `# UnlockED Screenshots

This directory contains screenshots of all application features in both light and dark modes, across desktop and mobile viewports.

## Directory Structure

- \`light/\` - Desktop screenshots in light mode
- \`dark/\` - Desktop screenshots in dark mode  
- \`mobile-light/\` - Mobile screenshots in light mode
- \`mobile-dark/\` - Mobile screenshots in dark mode

## Screenshots

${scenarios.map(scenario => `
### ${scenario.name.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
*${scenario.description}*
${scenario.dynamicCourse ? `**Course: ${scenario.dynamicCourse.toUpperCase()}**` : ''}

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

export { ScreenshotTaker, CONFIG, getScenarios };

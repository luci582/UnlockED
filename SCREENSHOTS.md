# Screenshot Automation Guide

## Overview

The UnlockED project includes a comprehensive screenshot automation system built with Puppeteer that captures all application features in both light and dark themes across desktop and mobile viewports.

## Quick Start

### Prerequisites
- Development server running on `http://localhost:8081`
- Node.js 18+ with all dependencies installed

### Commands

```bash
# Test the screenshot system (3 quick screenshots)
npm run screenshots:test

# Full screenshot suite (48+ screenshots)
npm run screenshots

# Automated: start server, take screenshots, stop server
npm run screenshots:dev

# Check if server is ready
node check-server.js
```

## What Gets Captured

### 📱 **Responsive Coverage**
- **Desktop**: 1920x1080 resolution
- **Mobile**: 375x812 resolution (iPhone 12 size)

### 🎨 **Theme Coverage**
- **Light Mode**: Default UNSW yellow theme
- **Dark Mode**: Dark theme with proper contrast

### 🎯 **Feature Coverage**

| Feature | Description | Interactive Elements |
|---------|-------------|---------------------|
| **Homepage** | Hero section, features overview | Theme toggle, navigation |
| **Course Directory** | Full course listing with cards | Filters, search, sort options |
| **Active Filtering** | Filters panel expanded | Skill tag selection |
| **Skill Filtering** | Courses filtered by Programming | Selected filter states |
| **Search Function** | Search for "Programming" courses | Active search input |
| **Expanded Skills** | Course card with all skills shown | "+X more" interaction |
| **Login Page** | Authentication forms | Login/signup tabs |
| **Signup Form** | User registration interface | Form validation |
| **Demo Login** | Pre-filled login credentials | Input field states |
| **Authenticated UI** | User dropdown menu | Profile dropdown |
| **Leaderboard** | Top courses and reviewers | Ranking tables |
| **Submit Review** | Course review form | Form components |

## Output Structure

```
screenshots/
├── README.md                    # Generated index with previews
├── light/                      # Desktop light mode (12 images)
│   ├── homepage.png
│   ├── courses-directory.png
│   ├── courses-with-filters.png
│   ├── courses-filtered-by-skills.png
│   ├── courses-search-active.png
│   ├── course-card-expanded-skills.png
│   ├── login-page.png
│   ├── login-signup-tab.png
│   ├── login-with-demo-credentials.png
│   ├── authenticated-header.png
│   ├── leaderboard.png
│   └── submit-review.png
├── dark/                       # Desktop dark mode (12 images)
│   └── [same files as light/]
├── mobile-light/              # Mobile light mode (12 images)
│   └── [same files as light/]
└── mobile-dark/               # Mobile dark mode (12 images)
    └── [same files as light/]
```

**Total: 48 screenshots** covering all combinations

## Advanced Features

### 🤖 **Smart Automation**
- **Auto Theme Switching**: Detects and toggles between light/dark modes
- **Authentication Flow**: Logs in automatically for protected screenshots
- **Interactive Actions**: Clicks buttons, fills forms, expands elements
- **Responsive Testing**: Switches viewport sizes seamlessly
- **Error Handling**: Continues on failures, reports issues

### 📸 **High Quality Output**
- **Full Page Screenshots**: Captures entire scrollable content
- **90% JPEG Quality**: Balanced file size and visual quality
- **Consistent Timing**: Waits for network idle and animations
- **Loading States**: Ensures content is fully rendered

### 🛡️ **Robust Error Handling**
- **Graceful Failures**: Continues capturing remaining screenshots
- **Detailed Logging**: Reports success/failure for each capture
- **Timeout Protection**: Prevents hanging on slow loads
- **Recovery Mechanisms**: Handles authentication and navigation errors

## Configuration

### Basic Settings (in `take-all-pics.js`)

```javascript
const CONFIG = {
  baseUrl: 'http://localhost:8081',
  viewport: { width: 1920, height: 1080 },
  mobileViewport: { width: 375, height: 812 },
  delay: 2000,                    // Wait after navigation
  quality: 90,                    // Screenshot quality
  demoCredentials: {
    email: 'admin@unsw.edu.au',
    password: 'password'
  }
};
```

### Adding New Screenshots

Add to the `SCENARIOS` array:

```javascript
{
  name: 'my-new-feature',
  url: '/my-page',
  description: 'Description of the feature',
  requiresAuth: false,           // Optional: needs login
  actions: [                     // Optional: interactions
    {
      type: 'click',
      selector: 'button.my-button',
      description: 'Click my button'
    },
    {
      type: 'type',
      selector: 'input[name="search"]',
      text: 'search term',
      description: 'Fill search field'
    },
    {
      type: 'wait',
      duration: 1000,
      description: 'Wait for animation'
    }
  ]
}
```

## Use Cases

### 📚 **Documentation**
- **README Images**: Visual feature showcase
- **User Guides**: Step-by-step screenshots
- **API Documentation**: UI state examples
- **Design System**: Component variations

### 🧪 **Testing & QA**
- **Visual Regression**: Compare screenshots over time
- **Cross-browser Testing**: Ensure consistency
- **Responsive Testing**: Verify mobile layouts
- **Theme Testing**: Validate dark/light modes

### 🎨 **Design & Marketing**
- **Marketing Materials**: Product screenshots
- **Social Media**: Feature highlights
- **Presentation Slides**: Demo visuals
- **Portfolio**: Project showcase

### 🐛 **Development Support**
- **Bug Reports**: Visual issue documentation
- **Feature Demos**: Show new functionality
- **Code Reviews**: UI change validation
- **Onboarding**: Team training materials

## Troubleshooting

### Common Issues

**Server not running:**
```bash
npm run dev
# Wait for "Local: http://localhost:8081"
```

**Screenshots are blank:**
- Increase delay in CONFIG
- Check for JavaScript errors in browser
- Ensure all assets load properly

**Authentication fails:**
- Verify demo credentials are correct
- Check login form selectors haven't changed
- Ensure login page is accessible

**Selectors don't work:**
- Update CSS selectors for changed components
- Use `text=` selectors for stable text-based targeting
- Test selectors in browser dev tools

### Debug Mode

For detailed debugging:

```javascript
// In take-all-pics.js, update browser launch:
const browser = await puppeteer.launch({ 
  headless: false,              // See browser actions
  devtools: true,               // Open DevTools
  slowMo: 250                   // Slow down actions
});
```

### Manual Testing

Use the test script for quick validation:

```bash
npm run screenshots:test
```

This creates 3 test screenshots to verify setup without the full suite.

## Performance

### Timing Benchmarks
- **Full Suite**: ~5-8 minutes (48 screenshots)
- **Per Screenshot**: ~6-10 seconds average
- **Theme Switching**: ~1 second
- **Authentication**: ~3-5 seconds

### Optimization Tips
- Run during low network usage
- Ensure sufficient system memory
- Close unnecessary applications
- Use SSD storage for faster I/O

## Support

### Getting Help
1. **Check Prerequisites**: Server running, dependencies installed
2. **Run Test Suite**: `npm run screenshots:test` first
3. **Review Logs**: Check console output for specific errors
4. **Update Selectors**: If UI changes break automation

### Contributing
- Add new scenarios for new features
- Update selectors when components change
- Improve error handling and recovery
- Optimize performance and timing

---

**Generated Screenshots** provide comprehensive visual documentation of UnlockED's features across all supported themes and devices.

# UnlockED Screenshots

This directory contains comprehensive visual documentation of all application features in both light and dark modes, across desktop and mobile viewports.

## Directory Structure

- `light/` - Desktop screenshots in light mode
- `dark/` - Desktop screenshots in dark mode  
- `mobile-light/` - Mobile screenshots in light mode
- `mobile-dark/` - Mobile screenshots in dark mode

## Overview

These screenshots demonstrate the complete UnlockED user experience, including:

### 🏠 Core Pages
- Homepage with hero section and featured courses
- Course directory with advanced filtering
- Individual course detail pages (randomly selected)
- User authentication flows

### 🎯 Interactive Features  
- Filter panel functionality (desktop & mobile)
- Skill-based course filtering
- Search functionality
- Expandable course cards
- Theme switching (light/dark mode)

### 📱 Responsive Design
- Mobile navigation menus
- Responsive filter panels
- Touch-friendly interfaces
- Adaptive layouts

## Screenshots


### Homepage
*Homepage with hero section and features*

| Desktop Light | Desktop Dark | Mobile Light | Mobile Dark |
|---------------|--------------|--------------|-------------|
| ![](light/homepage.png) | ![](dark/homepage.png) | ![](mobile-light/homepage.png) | ![](mobile-dark/homepage.png) |


### Courses Directory
*Course directory with all courses visible*

| Desktop Light | Desktop Dark | Mobile Light | Mobile Dark |
|---------------|--------------|--------------|-------------|
| ![](light/courses-directory.png) | ![](dark/courses-directory.png) | ![](mobile-light/courses-directory.png) | ![](mobile-dark/courses-directory.png) |


### Courses With Filters
*Course directory with filters panel visible*

| Desktop Light | Desktop Dark | Mobile Light | Mobile Dark |
|---------------|--------------|--------------|-------------|
| ![](light/courses-with-filters.png) | ![](dark/courses-with-filters.png) | ![](mobile-light/courses-with-filters.png) | ![](mobile-dark/courses-with-filters.png) |


### Courses Without Filters
*Course directory with filters panel hidden*

| Desktop Light | Desktop Dark | Mobile Light | Mobile Dark |
|---------------|--------------|--------------|-------------|
| ![](light/courses-without-filters.png) | ![](dark/courses-without-filters.png) | ![](mobile-light/courses-without-filters.png) | ![](mobile-dark/courses-without-filters.png) |


### Mobile Filters Open
*Mobile filter panel opened*

| Desktop Light | Desktop Dark | Mobile Light | Mobile Dark |
|---------------|--------------|--------------|-------------|
| ![](light/mobile-filters-open.png) | ![](dark/mobile-filters-open.png) | ![](mobile-light/mobile-filters-open.png) | ![](mobile-dark/mobile-filters-open.png) |


### Courses Filtered By Skills
*Courses filtered by Programming skill*

| Desktop Light | Desktop Dark | Mobile Light | Mobile Dark |
|---------------|--------------|--------------|-------------|
| ![](light/courses-filtered-by-skills.png) | ![](dark/courses-filtered-by-skills.png) | ![](mobile-light/courses-filtered-by-skills.png) | ![](mobile-dark/courses-filtered-by-skills.png) |


### Courses Search Active
*Course search functionality*

| Desktop Light | Desktop Dark | Mobile Light | Mobile Dark |
|---------------|--------------|--------------|-------------|
| ![](light/courses-search-active.png) | ![](dark/courses-search-active.png) | ![](mobile-light/courses-search-active.png) | ![](mobile-dark/courses-search-active.png) |


### Course Card Expanded Skills
*Course card with expanded skills*

| Desktop Light | Desktop Dark | Mobile Light | Mobile Dark |
|---------------|--------------|--------------|-------------|
| ![](light/course-card-expanded-skills.png) | ![](dark/course-card-expanded-skills.png) | ![](mobile-light/course-card-expanded-skills.png) | ![](mobile-dark/course-card-expanded-skills.png) |


### Login Page
*Login/signup page*

| Desktop Light | Desktop Dark | Mobile Light | Mobile Dark |
|---------------|--------------|--------------|-------------|
| ![](light/login-page.png) | ![](dark/login-page.png) | ![](mobile-light/login-page.png) | ![](mobile-dark/login-page.png) |


### Login Signup Tab
*Signup tab on login page*

| Desktop Light | Desktop Dark | Mobile Light | Mobile Dark |
|---------------|--------------|--------------|-------------|
| ![](light/login-signup-tab.png) | ![](dark/login-signup-tab.png) | ![](mobile-light/login-signup-tab.png) | ![](mobile-dark/login-signup-tab.png) |


### Login With Demo Credentials
*Login form filled with demo credentials*

| Desktop Light | Desktop Dark | Mobile Light | Mobile Dark |
|---------------|--------------|--------------|-------------|
| ![](light/login-with-demo-credentials.png) | ![](dark/login-with-demo-credentials.png) | ![](mobile-light/login-with-demo-credentials.png) | ![](mobile-dark/login-with-demo-credentials.png) |


### Authenticated Header
*Header with authenticated user dropdown*

| Desktop Light | Desktop Dark | Mobile Light | Mobile Dark |
|---------------|--------------|--------------|-------------|
| ![](light/authenticated-header.png) | ![](dark/authenticated-header.png) | ![](mobile-light/authenticated-header.png) | ![](mobile-dark/authenticated-header.png) |


### Leaderboard
*Leaderboard page*

| Desktop Light | Desktop Dark | Mobile Light | Mobile Dark |
|---------------|--------------|--------------|-------------|
| ![](light/leaderboard.png) | ![](dark/leaderboard.png) | ![](mobile-light/leaderboard.png) | ![](mobile-dark/leaderboard.png) |


### Submit Review
*Submit review page*

| Desktop Light | Desktop Dark | Mobile Light | Mobile Dark |
|---------------|--------------|--------------|-------------|
| ![](light/submit-review.png) | ![](dark/submit-review.png) | ![](mobile-light/submit-review.png) | ![](mobile-dark/submit-review.png) |


### Mobile Navigation
*Mobile navigation menu open*

| Desktop Light | Desktop Dark | Mobile Light | Mobile Dark |
|---------------|--------------|--------------|-------------|
| ![](light/mobile-navigation.png) | ![](dark/mobile-navigation.png) | ![](mobile-light/mobile-navigation.png) | ![](mobile-dark/mobile-navigation.png) |


## Usage & Applications

These screenshots can be used for:

### 📚 Documentation
- README files and project documentation
- Feature specification documents
- User guide creation
- Technical documentation

### 🎨 Design & Development
- Design reviews and feedback sessions
- UI/UX consistency checks
- Cross-browser testing reference
- Responsive design validation

### 📢 Marketing & Communication
- Project showcases and portfolios
- Client presentations
- Social media content
- Grant applications and reports

### 🐛 Development Support
- Bug reports with visual context
- Feature request documentation
- Quality assurance testing
- User acceptance testing

### 🎓 Educational Resources
- Student project examples
- Course material supplements
- Tutorial creation
- Learning pathway documentation

## Regeneration

To update these screenshots with the latest application state:

```bash
# Ensure development server is running on localhost:8080
npm run dev

# In a new terminal, run the screenshot script
node take-all-pics.js
```

**Note**: The script randomly selects courses for detail page screenshots, so each run may show different courses (e.g., MGMT1001, PSYC1001, COMP1511, etc.).

---

**Generated on**: 2025-07-25T08:45:10.893Z  
**Application**: UnlockED - UNSW Course Companion  
**Repository**: [UnlockED GitHub](https://github.com/luci582/UnlockED)

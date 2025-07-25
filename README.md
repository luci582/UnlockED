# UnlockED - UNSW Course Companion

## Overview

UnlockED is a comprehensive course discovery and review platform designed specifically for UNSW students. It provides peer-reviewed insights, detailed course information, and advanced filtering capabilities to help students make informed decisions about their academic journey.

## Features

### 🎓 Course Discovery
- **Comprehensive Course Directory**: Browse and search through UNSW courses across all faculties
- **Advanced Filtering**: Filter by faculty, rating, delivery mode, and specific skills
- **Smart Search**: Search by course code, title, faculty, or skills
- **Multiple View Modes**: Grid and list views for optimal browsing experience

### ⭐ Peer Reviews & Ratings
- **Student Reviews**: Read authentic reviews from fellow UNSW students
- **Star Ratings**: Quick visual assessment of course quality
- **Review Submission**: Share your own course experiences
- **Leaderboard**: Top-rated courses and active reviewers

### 🎨 Modern User Experience
- **UNSW-Themed Design**: Official university color scheme and branding
- **Dark/Light Mode**: Toggle between themes for comfortable viewing
- **Responsive Design**: Seamless experience across desktop, tablet, and mobile
- **Interactive Components**: Clickable skill tags, expandable course details

### 🔐 User Authentication
- **Secure Login/Signup**: Student account management
- **Profile System**: Track your reviews and course history
- **Session Management**: Persistent login across browser sessions

## Technical Stack

### Frontend
- **React 18**: Modern React with hooks and functional components
- **TypeScript**: Type-safe development with enhanced IDE support
- **Vite**: Fast build tool and development server
- **React Router**: Client-side routing and navigation

### UI/UX
- **Tailwind CSS**: Utility-first CSS framework for rapid styling
- **shadcn/ui**: High-quality, accessible component library
- **Lucide React**: Beautiful, customizable icons
- **Radix UI**: Unstyled, accessible components (via shadcn/ui)

### State Management
- **React Hooks**: useState, useEffect, useMemo for local state
- **Local Storage**: Client-side persistence for user sessions
- **Context API**: Theme management and global state

## Getting Started

### Prerequisites
- **Node.js** (v18 or higher) - [Install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)
- **npm** or **yarn** package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/luci582/uni-unlockedlockedin.git
   cd uni-unlockedlockedin
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173` to view the application

### Available Scripts

- `npm run dev` - Start development server with hot reloading
- `npm run build` - Build production-ready application
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint for code quality checks

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Course/         # Course-related components
│   ├── Filter/         # Filtering and search components
│   ├── Layout/         # Header, navigation, theme components
│   └── ui/             # shadcn/ui component library
├── pages/              # Route components
│   ├── CoursesDirectory.tsx
│   ├── Homepage.tsx
│   ├── Login.tsx
│   └── ...
├── hooks/              # Custom React hooks
├── lib/                # Utility functions and configurations
└── main.tsx            # Application entry point
```

## Key Features Implementation

### Advanced Filtering System
- **Multi-criteria Filtering**: Combine faculty, rating, mode, and skill filters
- **Real-time Updates**: Instant course list updates as filters change
- **Persistent State**: Filter selections maintained across navigation
- **Smart Skill Matching**: Courses must match ALL selected skills for precise results

### Responsive Course Cards
- **Expandable Skills**: Show/hide additional skill tags with "+X more" functionality
- **Clickable Tags**: All skill tags are interactive for quick filtering
- **Visual Feedback**: Hover effects and selection states
- **Consistent Information**: Rating, reviews, delivery mode, and effort level

### Theme System
- **UNSW Branding**: Official yellow primary color (#FFD700)
- **Dark Mode Support**: Complete dark theme with proper contrast
- **Theme Persistence**: User preference saved across sessions
- **Gradient Elements**: Modern visual effects with brand colors

## Authentication Demo

For demonstration purposes, use these credentials:
- **Email**: `admin@unsw.edu.au`
- **Password**: `password`

## Contributing

1. **Fork the repository**
2. **Create a feature branch** (`git checkout -b feature/amazing-feature`)
3. **Commit your changes** (`git commit -m 'Add amazing feature'`)
4. **Push to the branch** (`git push origin feature/amazing-feature`)
5. **Open a Pull Request**

## Development Guidelines

- **TypeScript**: Use proper typing for all components and functions
- **Component Structure**: Follow the established pattern for new components
- **Styling**: Use Tailwind CSS classes and shadcn/ui components
- **Accessibility**: Ensure all interactive elements are keyboard accessible
- **Responsive Design**: Test on multiple screen sizes

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Support

For questions, issues, or contributions, please:
- **Open an issue** on GitHub
- **Submit a pull request** for improvements
- **Contact the development team** at dev@unlocked.edu.au

---

**UnlockED** - Empowering UNSW students to make informed course decisions through community-driven insights and modern technology.

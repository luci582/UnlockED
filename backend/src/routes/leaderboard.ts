import { Router } from 'express';
import { PrismaClient } from '@prisma/client';
import { logger } from '../utils/logger';

const router = Router();
const prisma = new PrismaClient();

// Get leaderboard data
router.get('/', async (req, res) => {
  try {
    const limit = parseInt(req.query.limit as string) || 50;
    
    // Get top users ordered by total points, then by review count
    const topUsers = await prisma.user.findMany({
      select: {
        id: true,
        username: true,
        firstName: true,
        lastName: true,
        profileImage: true,
        totalPoints: true,
        reviewStreak: true,
        createdAt: true,
        _count: {
          select: {
            reviews: true,
            achievements: true
          }
        }
      },
      orderBy: [
        { totalPoints: 'desc' },
        { reviewStreak: 'desc' },
        { createdAt: 'asc' }
      ],
      take: limit,
      where: {
        isVerified: true // Only show verified users
      }
    });

    // Add rank and additional computed data
    const leaderboard = topUsers.map((user, index) => ({
      ...user,
      rank: index + 1,
      name: `${user.firstName} ${user.lastName}`.trim() || user.username,
      points: user.totalPoints,
      reviewCount: user._count.reviews,
      achievementCount: user._count.achievements,
      streakCount: user.reviewStreak,
      badge: getBadgeForUser(user.totalPoints, user._count.reviews),
      degree: "Student", // Default for now
      helpful: Math.floor(user.totalPoints / 10), // Approximate helpful votes
      recentActivity: user._count.reviews > 0 ? "Recently submitted a review" : "Active member"
    }));

    // Get summary statistics
    const totalUsers = await prisma.user.count({ where: { isVerified: true } });
    const totalReviews = await prisma.review.count();
    const totalCourses = await prisma.course.count({ where: { isActive: true } });

    res.json({
      success: true,
      leaderboard,
      stats: {
        totalUsers,
        totalReviews,
        totalCourses,
        activeUsers: leaderboard.length
      }
    });

  } catch (error) {
    logger.error('Leaderboard fetch error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch leaderboard data'
    });
  }
});

// Helper function to determine user badge based on points and reviews
function getBadgeForUser(points: number, reviewCount: number): string {
  if (points >= 1000) return "🏆 Elite Reviewer";
  if (points >= 500) return "⭐ Expert Reviewer";
  if (points >= 200) return "💎 Advanced Reviewer";
  if (points >= 100) return "🥉 Active Reviewer";
  if (reviewCount >= 5) return "📝 Regular Reviewer";
  if (reviewCount >= 1) return "✍️ New Reviewer";
  return "🆕 Member";
}

// Get user's position in leaderboard
router.get('/position/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    
    // Get user's current position
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        username: true,
        firstName: true,
        lastName: true,
        totalPoints: true,
        reviewStreak: true,
        _count: {
          select: {
            reviews: true,
            achievements: true
          }
        }
      }
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        error: 'User not found'
      });
    }

    // Count users with higher scores
    const higherRankedUsers = await prisma.user.count({
      where: {
        OR: [
          { totalPoints: { gt: user.totalPoints } },
          {
            AND: [
              { totalPoints: user.totalPoints },
              { reviewStreak: { gt: user.reviewStreak } }
            ]
          }
        ],
        isVerified: true
      }
    });

    const userRank = higherRankedUsers + 1;

    return res.json({
      success: true,
      user: {
        ...user,
        rank: userRank,
        name: `${user.firstName} ${user.lastName}`.trim() || user.username,
        points: user.totalPoints,
        reviewCount: user._count.reviews,
        achievementCount: user._count.achievements,
        streakCount: user.reviewStreak,
        badge: getBadgeForUser(user.totalPoints, user._count.reviews)
      }
    });

  } catch (error) {
    logger.error('User position fetch error:', error);
    return res.status(500).json({
      success: false,
      error: 'Failed to fetch user position'
    });
  }
});

export default router;

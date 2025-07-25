import express from 'express';
import { PrismaClient } from '@prisma/client';
import { authenticateToken, requireAdmin } from '../middleware/auth';
import { logger } from '../utils/logger';

const router = express.Router();
const prisma = new PrismaClient();

// GET /api/reviews - Get all reviews
router.get('/', async (req: any, res: any) => {
  try {
    const courseId = req.query.courseId;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const skip = (page - 1) * limit;

    const where = courseId ? { courseId } : {};

    const reviews = await prisma.review.findMany({
      skip,
      take: limit,
      where,
      include: {
        user: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            username: true
          }
        },
        course: {
          select: {
            id: true,
            title: true
          }
        },
        skillRatings: {
          include: {
            skill: true
          }
        }
      },
      orderBy: { createdAt: 'desc' }
    });

    res.json({ success: true, reviews });
  } catch (error) {
    logger.error('Get reviews error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// POST /api/reviews - Create new review
router.post('/', authenticateToken, async (req: any, res: any) => {
  try {
    const reviewData = req.body;
    
    // Check if user already reviewed this course
    const existingReview = await prisma.review.findFirst({
      where: {
        userId: req.user.id,
        courseId: reviewData.courseId
      }
    });

    if (existingReview) {
      return res.status(400).json({ 
        error: 'You have already reviewed this course' 
      });
    }

    const review = await prisma.review.create({
      data: {
        ...reviewData,
        userId: req.user.id
      },
      include: {
        user: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            username: true
          }
        },
        course: {
          select: {
            id: true,
            title: true
          }
        }
      }
    });

    logger.info(`Review created for course ${reviewData.courseId} by ${req.user.email}`);
    res.status(201).json({ success: true, review });
  } catch (error) {
    logger.error('Create review error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// DELETE /api/reviews/:id - Delete review (Admin only)
router.delete('/:id', authenticateToken, requireAdmin, async (req: any, res: any) => {
  try {
    const reviewId = req.params.id;

    await prisma.review.delete({
      where: { id: reviewId }
    });

    logger.info(`Review ${reviewId} deleted by admin ${req.user.email}`);
    res.json({ success: true, message: 'Review deleted successfully' });
  } catch (error) {
    logger.error('Delete review error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;

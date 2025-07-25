import express from 'express';
import { PrismaClient } from '@prisma/client';
import { authenticateToken, requireInstructor } from '../middleware/auth';
import { logger } from '../utils/logger';

const router = express.Router();
const prisma = new PrismaClient();

// GET /api/courses - Get all courses
router.get('/', async (req: any, res: any) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const skip = (page - 1) * limit;

    const courses = await prisma.course.findMany({
      skip,
      take: limit,
      where: { isActive: true },
      include: {
        skills: {
          include: {
            skill: true
          }
        },
        categories: {
          include: {
            category: true
          }
        },
        _count: {
          select: {
            reviews: true,
            enrollments: true
          }
        }
      },
      orderBy: { createdAt: 'desc' }
    });

    res.json({ success: true, courses });
  } catch (error) {
    logger.error('Get courses error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// POST /api/courses - Create new course (Instructor+ only)
router.post('/', authenticateToken, requireInstructor, async (req: any, res: any) => {
  try {
    const courseData = req.body;
    
    const course = await prisma.course.create({
      data: {
        ...courseData,
        instructorId: req.user.id
      },
      include: {
        skills: {
          include: {
            skill: true
          }
        },
        categories: {
          include: {
            category: true
          }
        }
      }
    });

    logger.info(`Course created: ${course.title} by ${req.user.email}`);
    res.status(201).json({ success: true, course });
  } catch (error) {
    logger.error('Create course error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;

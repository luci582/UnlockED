import express from 'express';
import { PrismaClient } from '@prisma/client';
import { authenticateToken, requireInstructor, requireAdmin } from '../middleware/auth';
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

    // Transform courses to include effortLevel from learningOutcomes
    const transformedCourses = courses.map(course => {
      let effortLevel = null;
      
      try {
        if (course.learningOutcomes) {
          const outcomes = typeof course.learningOutcomes === 'string' 
            ? JSON.parse(course.learningOutcomes) 
            : course.learningOutcomes;
          effortLevel = outcomes.effortLevel || null;
        }
      } catch (e) {
        // If parsing fails, effortLevel remains null
      }

      return {
        ...course,
        effortLevel
      };
    });

    res.json({ success: true, courses: transformedCourses });
  } catch (error) {
    logger.error('Get courses error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// POST /api/courses - Create new course (Instructor+ only)
router.post('/', authenticateToken, requireInstructor, async (req: any, res: any) => {
  try {
    const courseData = req.body;
    
    // Add metadata for new courses
    const course = await prisma.course.create({
      data: {
        ...courseData,
        createdById: req.user.id,
        status: 'PUBLISHED',
        // Tag as new course for first 30 days
        createdAt: new Date(),
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

// GET /api/courses/:id - Get single course by ID or course code
router.get('/:id', async (req: any, res: any) => {
  try {
    const { id } = req.params;

    // Try to find course by ID first, then by course code in title
    let course = await prisma.course.findUnique({
      where: { 
        id: id,
        isActive: true 
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
        },
        reviews: {
          include: {
            user: {
              select: {
                firstName: true,
                lastName: true
              }
            }
          },
          orderBy: { createdAt: 'desc' }
        },
        _count: {
          select: {
            reviews: true,
            enrollments: true
          }
        }
      }
    });

    // If not found by ID, try to find by course code in title (e.g., "comp1511" matches "COMP1511 - Programming Fundamentals")
    if (!course) {
      const upperCaseId = id.toUpperCase();
      const courses = await prisma.course.findMany({
        where: { 
          isActive: true 
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
          },
          reviews: {
            include: {
              user: {
                select: {
                  firstName: true,
                  lastName: true
                }
              }
            },
            orderBy: { createdAt: 'desc' }
          },
          _count: {
            select: {
              reviews: true,
              enrollments: true
            }
          }
        }
      });
      
      // Find course by matching the beginning of the title (case insensitive)
      course = courses.find(c => c.title.toUpperCase().startsWith(upperCaseId)) || null;
    }

    if (!course) {
      return res.status(404).json({ error: 'Course not found' });
    }

    // Transform course to include effortLevel from learningOutcomes
    let effortLevel = null;
    
    try {
      if (course.learningOutcomes) {
        const outcomes = typeof course.learningOutcomes === 'string' 
          ? JSON.parse(course.learningOutcomes) 
          : course.learningOutcomes;
        effortLevel = outcomes.effortLevel || null;
      }
    } catch (e) {
      // If parsing fails, effortLevel remains null
    }

    const transformedCourse = {
      ...course,
      effortLevel
    };

    res.json({ success: true, course: transformedCourse });
  } catch (error) {
    logger.error('Get course by ID error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// DELETE /api/courses/:id/teacher - Delete own course (Teacher only)
router.delete('/:id/teacher', authenticateToken, requireInstructor, async (req: any, res: any) => {
  try {
    const { id } = req.params;

    // Check if course exists and belongs to the teacher
    const existingCourse = await prisma.course.findUnique({
      where: { id }
    });

    if (!existingCourse) {
      return res.status(404).json({ error: 'Course not found' });
    }

    // Check if the user is the creator of the course or is an admin
    if (existingCourse.createdById !== req.user.id && req.user.role !== 'ADMIN') {
      return res.status(403).json({ error: 'You can only delete courses you created' });
    }

    // Delete the course
    await prisma.course.delete({
      where: { id }
    });

    logger.info(`Course deleted: ${existingCourse.title} by teacher ${req.user.email}`);
    res.json({ success: true, message: 'Course deleted successfully' });
  } catch (error) {
    logger.error('Delete course error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// DELETE /api/courses/:id - Delete course (Admin only)
router.delete('/:id', authenticateToken, requireAdmin, async (req: any, res: any) => {
  try {
    const { id } = req.params;

    // Check if course exists
    const existingCourse = await prisma.course.findUnique({
      where: { id }
    });

    if (!existingCourse) {
      return res.status(404).json({ error: 'Course not found' });
    }

    // Delete the course
    await prisma.course.delete({
      where: { id }
    });

    logger.info(`Course deleted: ${existingCourse.title} by admin ${req.user.email}`);
    res.json({ success: true, message: 'Course deleted successfully' });
  } catch (error) {
    logger.error('Delete course error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;

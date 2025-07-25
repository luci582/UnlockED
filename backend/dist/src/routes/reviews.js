"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const client_1 = require("@prisma/client");
const auth_1 = require("../middleware/auth");
const logger_1 = require("../utils/logger");
const router = express_1.default.Router();
const prisma = new client_1.PrismaClient();
// GET /api/reviews - Get all reviews
router.get('/', async (req, res) => {
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
    }
    catch (error) {
        logger_1.logger.error('Get reviews error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
// POST /api/reviews - Create new review
router.post('/', auth_1.authenticateToken, async (req, res) => {
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
        logger_1.logger.info(`Review created for course ${reviewData.courseId} by ${req.user.email}`);
        res.status(201).json({ success: true, review });
    }
    catch (error) {
        logger_1.logger.error('Create review error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
// DELETE /api/reviews/:id - Delete review (Admin only)
router.delete('/:id', auth_1.authenticateToken, auth_1.requireAdmin, async (req, res) => {
    try {
        const reviewId = req.params.id;
        await prisma.review.delete({
            where: { id: reviewId }
        });
        logger_1.logger.info(`Review ${reviewId} deleted by admin ${req.user.email}`);
        res.json({ success: true, message: 'Review deleted successfully' });
    }
    catch (error) {
        logger_1.logger.error('Delete review error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
exports.default = router;
//# sourceMappingURL=reviews.js.map
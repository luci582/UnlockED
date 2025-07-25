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
// GET /api/courses - Get all courses
router.get('/', async (req, res) => {
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
    }
    catch (error) {
        logger_1.logger.error('Get courses error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
// POST /api/courses - Create new course (Instructor+ only)
router.post('/', auth_1.authenticateToken, auth_1.requireInstructor, async (req, res) => {
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
        logger_1.logger.info(`Course created: ${course.title} by ${req.user.email}`);
        res.status(201).json({ success: true, course });
    }
    catch (error) {
        logger_1.logger.error('Create course error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
exports.default = router;
//# sourceMappingURL=courses.js.map
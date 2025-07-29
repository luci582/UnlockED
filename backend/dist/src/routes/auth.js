"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const client_1 = require("@prisma/client");
const zod_1 = require("zod");
const logger_1 = require("../utils/logger");
const router = express_1.default.Router();
const prisma = new client_1.PrismaClient();
// Validation schemas
const loginSchema = zod_1.z.object({
    email: zod_1.z.string().email('Invalid email format'),
    password: zod_1.z.string().min(1, 'Password is required')
});
const signupSchema = zod_1.z.object({
    email: zod_1.z.string().email('Invalid email format'),
    username: zod_1.z.string().min(3, 'Username must be at least 3 characters'),
    firstName: zod_1.z.string().min(1, 'First name is required'),
    lastName: zod_1.z.string().min(1, 'Last name is required'),
    password: zod_1.z.string().min(6, 'Password must be at least 6 characters'),
    role: zod_1.z.enum(['STUDENT', 'INSTRUCTOR', 'ADMIN']).optional(),
    adminKey: zod_1.z.string().optional()
});
// Generate JWT token
const generateToken = (userId) => {
    const secret = process.env.JWT_SECRET || 'your-super-secret-jwt-key-change-this-in-production';
    const token = jsonwebtoken_1.default.sign({ userId }, secret);
    return token;
}; // POST /api/auth/login
router.post('/login', async (req, res) => {
    try {
        const validatedData = loginSchema.parse(req.body);
        const { email, password } = validatedData;
        // Find user by email
        const user = await prisma.user.findUnique({
            where: { email },
            select: {
                id: true,
                email: true,
                username: true,
                firstName: true,
                lastName: true,
                role: true,
                totalPoints: true,
                isVerified: true,
                passwordHash: true
            }
        });
        if (!user) {
            return res.status(401).json({
                error: 'Invalid email or password'
            });
        }
        // Verify password
        const isValidPassword = await bcryptjs_1.default.compare(password, user.passwordHash);
        if (!isValidPassword) {
            return res.status(401).json({
                error: 'Invalid email or password'
            });
        }
        // Update last active time
        await prisma.user.update({
            where: { id: user.id },
            data: { lastActiveAt: new Date() }
        });
        // Generate token
        const token = generateToken(user.id);
        // Remove password hash from response
        const { passwordHash, ...userWithoutPassword } = user;
        logger_1.logger.info(`User ${user.email} logged in successfully`);
        return res.json({
            success: true,
            user: userWithoutPassword,
            token,
            expiresIn: process.env.JWT_EXPIRES_IN || '7d'
        });
    }
    catch (error) {
        if (error instanceof zod_1.z.ZodError) {
            return res.status(400).json({
                error: 'Validation failed',
                details: error.errors
            });
        }
        logger_1.logger.error('Login error:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
});
// POST /api/auth/signup
router.post('/signup', async (req, res) => {
    try {
        const validatedData = signupSchema.parse(req.body);
        const { email, username, firstName, lastName, password, role = 'STUDENT', adminKey } = validatedData;
        // Check if user already exists
        const existingUser = await prisma.user.findFirst({
            where: {
                OR: [
                    { email },
                    { username }
                ]
            }
        });
        if (existingUser) {
            return res.status(400).json({
                error: existingUser.email === email
                    ? 'Email already registered'
                    : 'Username already taken'
            });
        }
        // Determine user role
        let userRole = role;
        if (adminKey === 'teamlockedin124') {
            userRole = 'ADMIN';
            logger_1.logger.info(`Admin account created with email: ${email}`);
        }
        // Hash password
        const passwordHash = await bcryptjs_1.default.hash(password, 12);
        // Create user
        const newUser = await prisma.user.create({
            data: {
                email,
                username,
                firstName,
                lastName,
                passwordHash,
                role: userRole,
                isVerified: false
            },
            select: {
                id: true,
                email: true,
                username: true,
                firstName: true,
                lastName: true,
                role: true,
                totalPoints: true,
                isVerified: true
            }
        });
        // Generate token
        const token = generateToken(newUser.id);
        logger_1.logger.info(`New user registered: ${email} with role: ${userRole}`);
        return res.status(201).json({
            success: true,
            user: newUser,
            token,
            expiresIn: process.env.JWT_EXPIRES_IN || '7d'
        });
    }
    catch (error) {
        if (error instanceof zod_1.z.ZodError) {
            return res.status(400).json({
                error: 'Validation failed',
                details: error.errors
            });
        }
        logger_1.logger.error('Signup error:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
});
// POST /api/auth/verify-token
router.post('/verify-token', async (req, res) => {
    try {
        const { token } = req.body;
        if (!token) {
            return res.status(400).json({ error: 'Token is required' });
        }
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET || 'your-super-secret-jwt-key-change-this-in-production');
        const user = await prisma.user.findUnique({
            where: { id: decoded.userId },
            select: {
                id: true,
                email: true,
                username: true,
                firstName: true,
                lastName: true,
                role: true,
                totalPoints: true,
                isVerified: true
            }
        });
        if (!user) {
            return res.status(401).json({ error: 'User not found' });
        }
        return res.json({
            success: true,
            user,
            valid: true
        });
    }
    catch (error) {
        logger_1.logger.error('Token verification error:', error);
        return res.status(401).json({
            error: 'Invalid token',
            valid: false
        });
    }
});
// POST /api/auth/logout
router.post('/logout', (req, res) => {
    // In a real app, you might invalidate the token in a blacklist
    // For now, we'll just return success since JWTs are stateless
    res.json({
        success: true,
        message: 'Logged out successfully'
    });
});
exports.default = router;
//# sourceMappingURL=auth.js.map
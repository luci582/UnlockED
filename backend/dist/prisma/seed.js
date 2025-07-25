"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const prisma = new client_1.PrismaClient();
async function main() {
    console.log('🌱 Starting database seeding...');
    // Clear existing data (in reverse order of dependencies)
    await prisma.userAchievement.deleteMany();
    await prisma.achievement.deleteMany();
    await prisma.notification.deleteMany();
    await prisma.progressReport.deleteMany();
    await prisma.reviewSkillRating.deleteMany();
    await prisma.reviewHelpfulVote.deleteMany();
    await prisma.reviewVote.deleteMany();
    await prisma.review.deleteMany();
    await prisma.courseEnrollment.deleteMany();
    await prisma.courseTag.deleteMany();
    await prisma.tag.deleteMany();
    await prisma.courseCategory.deleteMany();
    await prisma.category.deleteMany();
    await prisma.courseModule.deleteMany();
    await prisma.courseSkill.deleteMany();
    await prisma.course.deleteMany();
    await prisma.userSkillProficiency.deleteMany();
    await prisma.skillPrerequisite.deleteMany();
    await prisma.skill.deleteMany();
    await prisma.user.deleteMany();
    // Create Skills
    console.log('📚 Creating skills...');
    const skills = await Promise.all([
        prisma.skill.create({
            data: {
                name: 'JavaScript',
                description: 'Modern JavaScript programming language',
                category: 'Programming',
                icon: 'javascript',
                color: '#F7DF1E'
            }
        }),
        prisma.skill.create({
            data: {
                name: 'React',
                description: 'React library for building user interfaces',
                category: 'Frontend',
                icon: 'react',
                color: '#61DAFB'
            }
        }),
        prisma.skill.create({
            data: {
                name: 'Node.js',
                description: 'JavaScript runtime for server-side development',
                category: 'Backend',
                icon: 'nodejs',
                color: '#339933'
            }
        }),
        prisma.skill.create({
            data: {
                name: 'Python',
                description: 'Python programming language',
                category: 'Programming',
                icon: 'python',
                color: '#3776AB'
            }
        }),
        prisma.skill.create({
            data: {
                name: 'Machine Learning',
                description: 'Artificial intelligence and machine learning concepts',
                category: 'Data Science',
                icon: 'brain',
                color: '#FF6B6B'
            }
        }),
        prisma.skill.create({
            data: {
                name: 'SQL',
                description: 'Structured Query Language for databases',
                category: 'Database',
                icon: 'database',
                color: '#336791'
            }
        }),
        prisma.skill.create({
            data: {
                name: 'UI/UX Design',
                description: 'User interface and user experience design',
                category: 'Design',
                icon: 'palette',
                color: '#FF6B35'
            }
        }),
        prisma.skill.create({
            data: {
                name: 'Data Analysis',
                description: 'Statistical analysis and data interpretation',
                category: 'Data Science',
                icon: 'chart',
                color: '#4ECDC4'
            }
        }),
        prisma.skill.create({
            data: {
                name: 'TypeScript',
                description: 'Typed superset of JavaScript',
                category: 'Programming',
                icon: 'typescript',
                color: '#3178C6'
            }
        }),
        prisma.skill.create({
            data: {
                name: 'Docker',
                description: 'Containerization platform',
                category: 'DevOps',
                icon: 'docker',
                color: '#2496ED'
            }
        })
    ]);
    // Create skill prerequisites
    console.log('🔗 Creating skill prerequisites...');
    await prisma.skillPrerequisite.createMany({
        data: [
            {
                skillId: skills.find(s => s.name === 'React').id,
                prerequisiteSkillId: skills.find(s => s.name === 'JavaScript').id,
                isRequired: true,
                minimumLevel: client_1.SkillLevel.MEDIUM
            },
            {
                skillId: skills.find(s => s.name === 'TypeScript').id,
                prerequisiteSkillId: skills.find(s => s.name === 'JavaScript').id,
                isRequired: true,
                minimumLevel: client_1.SkillLevel.MEDIUM
            },
            {
                skillId: skills.find(s => s.name === 'Machine Learning').id,
                prerequisiteSkillId: skills.find(s => s.name === 'Python').id,
                isRequired: true,
                minimumLevel: client_1.SkillLevel.HEAVY
            }
        ]
    });
    // Create Categories
    console.log('📁 Creating categories...');
    const categories = await Promise.all([
        prisma.category.create({
            data: {
                name: 'Programming',
                slug: 'programming',
                description: 'Software development and programming courses',
                icon: 'code',
                color: '#3B82F6',
                sortOrder: 1
            }
        }),
        prisma.category.create({
            data: {
                name: 'Data Science',
                slug: 'data-science',
                description: 'Data analysis, machine learning, and AI courses',
                icon: 'chart-bar',
                color: '#8B5CF6',
                sortOrder: 2
            }
        }),
        prisma.category.create({
            data: {
                name: 'Design',
                slug: 'design',
                description: 'UI/UX design and creative courses',
                icon: 'palette',
                color: '#F59E0B',
                sortOrder: 3
            }
        }),
        prisma.category.create({
            data: {
                name: 'Business',
                slug: 'business',
                description: 'Business strategy and management courses',
                icon: 'briefcase',
                color: '#10B981',
                sortOrder: 4
            }
        })
    ]);
    // Create subcategories
    const webDevCategory = await prisma.category.create({
        data: {
            name: 'Web Development',
            slug: 'web-development',
            description: 'Frontend and backend web development',
            icon: 'globe',
            color: '#3B82F6',
            parentId: categories.find(c => c.name === 'Programming').id,
            sortOrder: 1
        }
    });
    // Create Tags
    console.log('🏷️ Creating tags...');
    const tags = await Promise.all([
        prisma.tag.create({ data: { name: 'Beginner Friendly', color: '#10B981' } }),
        prisma.tag.create({ data: { name: 'Project Based', color: '#3B82F6' } }),
        prisma.tag.create({ data: { name: 'Certificate', color: '#F59E0B' } }),
        prisma.tag.create({ data: { name: 'Free', color: '#EF4444' } }),
        prisma.tag.create({ data: { name: 'Hands-on', color: '#8B5CF6' } }),
        prisma.tag.create({ data: { name: 'Industry Expert', color: '#EC4899' } })
    ]);
    // Create Users
    console.log('👥 Creating users...');
    const passwordHash = await bcryptjs_1.default.hash('password123', 12);
    const users = await Promise.all([
        prisma.user.create({
            data: {
                email: 'admin@unlocked.edu',
                username: 'admin',
                firstName: 'Admin',
                lastName: 'User',
                role: client_1.UserRole.ADMIN,
                passwordHash,
                totalPoints: 1000,
                isVerified: true
            }
        }),
        prisma.user.create({
            data: {
                email: 'john.doe@student.com',
                username: 'johndoe',
                firstName: 'John',
                lastName: 'Doe',
                bio: 'Computer Science student passionate about web development',
                passwordHash,
                totalPoints: 750,
                reviewStreak: 5,
                isVerified: true
            }
        }),
        prisma.user.create({
            data: {
                email: 'jane.smith@student.com',
                username: 'janesmith',
                firstName: 'Jane',
                lastName: 'Smith',
                bio: 'Data science enthusiast and machine learning practitioner',
                passwordHash,
                totalPoints: 920,
                reviewStreak: 8,
                isVerified: true
            }
        }),
        prisma.user.create({
            data: {
                email: 'mike.wilson@instructor.com',
                username: 'mikewilson',
                firstName: 'Mike',
                lastName: 'Wilson',
                role: client_1.UserRole.INSTRUCTOR,
                bio: 'Senior software engineer with 10+ years experience',
                passwordHash,
                totalPoints: 500,
                isVerified: true
            }
        }),
        prisma.user.create({
            data: {
                email: 'sarah.chen@student.com',
                username: 'sarahchen',
                firstName: 'Sarah',
                lastName: 'Chen',
                bio: 'UX designer transitioning to full-stack development',
                passwordHash,
                totalPoints: 650,
                reviewStreak: 3,
                isVerified: true
            }
        })
    ]);
    // Create User Skill Proficiencies
    console.log('💪 Creating user skill proficiencies...');
    await prisma.userSkillProficiency.createMany({
        data: [
            {
                userId: users[1].id, // John
                skillId: skills.find(s => s.name === 'JavaScript').id,
                level: client_1.SkillLevel.HEAVY,
                yearsExperience: 3,
                isVerified: true,
                verificationSource: 'Course Completion'
            },
            {
                userId: users[1].id, // John
                skillId: skills.find(s => s.name === 'React').id,
                level: client_1.SkillLevel.MEDIUM,
                yearsExperience: 2,
                isVerified: true,
                verificationSource: 'Portfolio'
            },
            {
                userId: users[2].id, // Jane
                skillId: skills.find(s => s.name === 'Python').id,
                level: client_1.SkillLevel.VERY_HEAVY,
                yearsExperience: 4,
                isVerified: true,
                verificationSource: 'Course Completion'
            },
            {
                userId: users[2].id, // Jane
                skillId: skills.find(s => s.name === 'Machine Learning').id,
                level: client_1.SkillLevel.HEAVY,
                yearsExperience: 2,
                isVerified: true,
                verificationSource: 'Test'
            },
            {
                userId: users[4].id, // Sarah
                skillId: skills.find(s => s.name === 'UI/UX Design').id,
                level: client_1.SkillLevel.VERY_HEAVY,
                yearsExperience: 5,
                isVerified: true,
                verificationSource: 'Portfolio'
            }
        ]
    });
    // Create Courses
    console.log('🎓 Creating courses...');
    const courses = await Promise.all([
        prisma.course.create({
            data: {
                title: 'The Complete JavaScript Course 2024',
                description: 'Master modern JavaScript from beginner to advanced. Build real projects and become a confident JavaScript developer.',
                shortDescription: 'Complete JavaScript course with modern ES6+ features and real projects.',
                imageUrl: 'https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=400',
                courseUrl: 'https://www.udemy.com/course/the-complete-javascript-course/',
                instructor: 'Jonas Schmedtmann',
                institution: 'Udemy',
                duration: '69 hours',
                difficulty: client_1.Difficulty.BEGINNER,
                price: 89.99,
                language: 'English',
                prerequisites: ['Basic computer skills'],
                learningOutcomes: [
                    'Become an advanced JavaScript developer',
                    'Build 6 beautiful real-world projects',
                    'Learn modern JavaScript features',
                    'Master asynchronous JavaScript'
                ],
                createdById: users[3].id // Mike Wilson
            }
        }),
        prisma.course.create({
            data: {
                title: 'React - The Complete Guide',
                description: 'Learn React, Hooks, Redux, React Router, Next.js, Best Practices and way more!',
                shortDescription: 'Complete React course covering hooks, context, and modern patterns.',
                imageUrl: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400',
                courseUrl: 'https://www.udemy.com/course/react-the-complete-guide-incl-redux/',
                instructor: 'Maximilian Schwarzmüller',
                institution: 'Udemy',
                duration: '48 hours',
                difficulty: client_1.Difficulty.INTERMEDIATE,
                price: 94.99,
                language: 'English',
                prerequisites: ['JavaScript fundamentals', 'HTML & CSS'],
                learningOutcomes: [
                    'Build powerful, fast, user-friendly React apps',
                    'Learn React Hooks & Class-based Components',
                    'Master Redux & Context API',
                    'Build real projects'
                ],
                createdById: users[3].id
            }
        }),
        prisma.course.create({
            data: {
                title: 'Machine Learning A-Z',
                description: 'Learn to create Machine Learning Algorithms in Python and R from two Data Science experts.',
                shortDescription: 'Comprehensive machine learning course with Python and R.',
                imageUrl: 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=400',
                courseUrl: 'https://www.udemy.com/course/machinelearning/',
                instructor: 'Kirill Eremenko',
                institution: 'SuperDataScience',
                duration: '44 hours',
                difficulty: client_1.Difficulty.INTERMEDIATE,
                price: 84.99,
                language: 'English',
                prerequisites: ['Basic Python knowledge', 'High school mathematics'],
                learningOutcomes: [
                    'Master Machine Learning algorithms',
                    'Learn Python and R for Data Science',
                    'Build ML models from scratch',
                    'Handle real-world datasets'
                ],
                createdById: users[3].id
            }
        }),
        prisma.course.create({
            data: {
                title: 'CS50: Introduction to Computer Science',
                description: "Harvard University's introduction to the intellectual enterprises of computer science and the art of programming.",
                shortDescription: "Harvard's famous introduction to computer science.",
                imageUrl: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400',
                courseUrl: 'https://cs50.harvard.edu/x/',
                instructor: 'David J. Malan',
                institution: 'Harvard University',
                duration: '12 weeks',
                difficulty: client_1.Difficulty.BEGINNER,
                isFree: true,
                language: 'English',
                prerequisites: ['None'],
                learningOutcomes: [
                    'Think algorithmically and solve problems efficiently',
                    'Learn multiple programming languages',
                    'Understand fundamental CS concepts',
                    'Build web applications'
                ],
                createdById: users[0].id // Admin
            }
        }),
        prisma.course.create({
            data: {
                title: 'UI/UX Design Bootcamp',
                description: 'Learn User Interface and User Experience Design from beginner to professional level.',
                shortDescription: 'Complete UI/UX design course with portfolio projects.',
                imageUrl: 'https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=400',
                courseUrl: 'https://www.coursera.org/specializations/ui-ux-design',
                instructor: 'Google Career Certificates',
                institution: 'Coursera',
                duration: '6 months',
                difficulty: client_1.Difficulty.BEGINNER,
                price: 49.00,
                language: 'English',
                prerequisites: ['Basic computer skills'],
                learningOutcomes: [
                    'Create wireframes and prototypes',
                    'Conduct UX research',
                    'Design accessible interfaces',
                    'Build a professional portfolio'
                ],
                createdById: users[3].id
            }
        }),
        prisma.course.create({
            data: {
                title: 'Node.js, Express, MongoDB & More',
                description: 'Learn by building a complete, beautiful & realistic web app with the latest technologies.',
                shortDescription: 'Full-stack web development with Node.js and MongoDB.',
                imageUrl: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=400',
                courseUrl: 'https://www.udemy.com/course/nodejs-express-mongodb-bootcamp/',
                instructor: 'Jonas Schmedtmann',
                institution: 'Udemy',
                duration: '42 hours',
                difficulty: client_1.Difficulty.ADVANCED,
                price: 89.99,
                language: 'English',
                prerequisites: ['JavaScript proficiency', 'Basic understanding of APIs'],
                learningOutcomes: [
                    'Build complete web applications',
                    'Master Node.js and Express',
                    'Work with MongoDB and Mongoose',
                    'Implement authentication and security'
                ],
                createdById: users[3].id
            }
        })
    ]);
    // Create Course Skills relationships
    console.log('🔧 Creating course-skill relationships...');
    await prisma.courseSkill.createMany({
        data: [
            // JavaScript Course
            { courseId: courses[0].id, skillId: skills.find(s => s.name === 'JavaScript').id, level: client_1.SkillLevel.VERY_HEAVY, isCore: true, percentage: 90 },
            // React Course
            { courseId: courses[1].id, skillId: skills.find(s => s.name === 'React').id, level: client_1.SkillLevel.VERY_HEAVY, isCore: true, percentage: 80 },
            { courseId: courses[1].id, skillId: skills.find(s => s.name === 'JavaScript').id, level: client_1.SkillLevel.HEAVY, isCore: true, percentage: 60 },
            // Machine Learning Course
            { courseId: courses[2].id, skillId: skills.find(s => s.name === 'Machine Learning').id, level: client_1.SkillLevel.VERY_HEAVY, isCore: true, percentage: 85 },
            { courseId: courses[2].id, skillId: skills.find(s => s.name === 'Python').id, level: client_1.SkillLevel.HEAVY, isCore: true, percentage: 70 },
            { courseId: courses[2].id, skillId: skills.find(s => s.name === 'Data Analysis').id, level: client_1.SkillLevel.MEDIUM, isCore: false, percentage: 40 },
            // CS50 Course
            { courseId: courses[3].id, skillId: skills.find(s => s.name === 'Python').id, level: client_1.SkillLevel.MEDIUM, isCore: false, percentage: 30 },
            { courseId: courses[3].id, skillId: skills.find(s => s.name === 'SQL').id, level: client_1.SkillLevel.LIGHT, isCore: false, percentage: 20 },
            // UI/UX Course
            { courseId: courses[4].id, skillId: skills.find(s => s.name === 'UI/UX Design').id, level: client_1.SkillLevel.VERY_HEAVY, isCore: true, percentage: 95 },
            // Node.js Course
            { courseId: courses[5].id, skillId: skills.find(s => s.name === 'Node.js').id, level: client_1.SkillLevel.VERY_HEAVY, isCore: true, percentage: 80 },
            { courseId: courses[5].id, skillId: skills.find(s => s.name === 'JavaScript').id, level: client_1.SkillLevel.HEAVY, isCore: true, percentage: 60 },
            { courseId: courses[5].id, skillId: skills.find(s => s.name === 'SQL').id, level: client_1.SkillLevel.MEDIUM, isCore: false, percentage: 30 }
        ]
    });
    // Create Course Categories
    console.log('📂 Creating course categories...');
    await prisma.courseCategory.createMany({
        data: [
            { courseId: courses[0].id, categoryId: categories.find(c => c.name === 'Programming').id, isPrimary: true },
            { courseId: courses[1].id, categoryId: categories.find(c => c.name === 'Programming').id, isPrimary: true },
            { courseId: courses[2].id, categoryId: categories.find(c => c.name === 'Data Science').id, isPrimary: true },
            { courseId: courses[3].id, categoryId: categories.find(c => c.name === 'Programming').id, isPrimary: true },
            { courseId: courses[4].id, categoryId: categories.find(c => c.name === 'Design').id, isPrimary: true },
            { courseId: courses[5].id, categoryId: categories.find(c => c.name === 'Programming').id, isPrimary: true }
        ]
    });
    // Create Course Tags
    console.log('🏷️ Adding course tags...');
    await prisma.courseTag.createMany({
        data: [
            { courseId: courses[0].id, tagId: tags.find(t => t.name === 'Beginner Friendly').id },
            { courseId: courses[0].id, tagId: tags.find(t => t.name === 'Project Based').id },
            { courseId: courses[1].id, tagId: tags.find(t => t.name === 'Hands-on').id },
            { courseId: courses[1].id, tagId: tags.find(t => t.name === 'Project Based').id },
            { courseId: courses[2].id, tagId: tags.find(t => t.name === 'Industry Expert').id },
            { courseId: courses[3].id, tagId: tags.find(t => t.name === 'Free').id },
            { courseId: courses[3].id, tagId: tags.find(t => t.name === 'Certificate').id },
            { courseId: courses[4].id, tagId: tags.find(t => t.name === 'Beginner Friendly').id },
            { courseId: courses[5].id, tagId: tags.find(t => t.name === 'Hands-on').id }
        ]
    });
    // Create Course Enrollments
    console.log('📝 Creating course enrollments...');
    await prisma.courseEnrollment.createMany({
        data: [
            { userId: users[1].id, courseId: courses[0].id, progress: 75, status: 'active' },
            { userId: users[1].id, courseId: courses[1].id, progress: 100, status: 'completed', completedAt: new Date() },
            { userId: users[2].id, courseId: courses[2].id, progress: 60, status: 'active' },
            { userId: users[2].id, courseId: courses[3].id, progress: 100, status: 'completed', completedAt: new Date() },
            { userId: users[4].id, courseId: courses[4].id, progress: 40, status: 'active' },
            { userId: users[4].id, courseId: courses[0].id, progress: 25, status: 'active' }
        ]
    });
    // Create Reviews
    console.log('⭐ Creating reviews...');
    const reviews = await Promise.all([
        prisma.review.create({
            data: {
                userId: users[1].id,
                courseId: courses[1].id, // React course
                overallRating: 5,
                difficultyRating: 4,
                contentQuality: 5,
                instructorRating: 5,
                valueForMoney: 5,
                wouldRecommend: true,
                title: 'Excellent React Course!',
                content: 'This course is absolutely fantastic! The instructor explains complex concepts in a very clear and understandable way. The projects are real-world applicable and helped me build a strong portfolio.',
                pros: ['Clear explanations', 'Great projects', 'Up-to-date content', 'Responsive instructor'],
                cons: ['Could use more advanced topics'],
                isVerified: true,
                completionDate: new Date(),
                helpfulCount: 15
            }
        }),
        prisma.review.create({
            data: {
                userId: users[2].id,
                courseId: courses[2].id, // ML course
                overallRating: 4,
                difficultyRating: 5,
                contentQuality: 4,
                instructorRating: 4,
                valueForMoney: 4,
                wouldRecommend: true,
                title: 'Great introduction to ML',
                content: 'Solid course for getting started with machine learning. Covers both theory and practical implementation. The Python examples are very helpful.',
                pros: ['Good theory coverage', 'Practical examples', 'Both Python and R'],
                cons: ['Sometimes moves too fast', 'Could use more recent techniques'],
                isVerified: true,
                helpfulCount: 8
            }
        }),
        prisma.review.create({
            data: {
                userId: users[4].id,
                courseId: courses[0].id, // JavaScript course
                overallRating: 5,
                difficultyRating: 3,
                contentQuality: 5,
                instructorRating: 5,
                valueForMoney: 5,
                wouldRecommend: true,
                title: 'Perfect for beginners',
                content: 'As someone transitioning from design to development, this course was exactly what I needed. The pace is perfect and the instructor is very engaging.',
                pros: ['Beginner friendly', 'Engaging instructor', 'Good pacing', 'Practical projects'],
                cons: ['None really'],
                isVerified: false,
                helpfulCount: 12
            }
        })
    ]);
    // Create Review Skill Ratings
    console.log('🎯 Creating review skill ratings...');
    await prisma.reviewSkillRating.createMany({
        data: [
            { reviewId: reviews[0].id, skillId: skills.find(s => s.name === 'React').id, rating: 5 },
            { reviewId: reviews[0].id, skillId: skills.find(s => s.name === 'JavaScript').id, rating: 4 },
            { reviewId: reviews[1].id, skillId: skills.find(s => s.name === 'Machine Learning').id, rating: 4 },
            { reviewId: reviews[1].id, skillId: skills.find(s => s.name === 'Python').id, rating: 4 },
            { reviewId: reviews[2].id, skillId: skills.find(s => s.name === 'JavaScript').id, rating: 5 }
        ]
    });
    // Create Achievements
    console.log('🏆 Creating achievements...');
    const achievements = await Promise.all([
        prisma.achievement.create({
            data: {
                name: 'First Review',
                description: 'Write your first course review',
                icon: 'star',
                type: client_1.AchievementType.FIRST_REVIEW,
                criteria: { reviewCount: 1 },
                points: 50
            }
        }),
        prisma.achievement.create({
            data: {
                name: 'Review Master',
                description: 'Write 10 course reviews',
                icon: 'crown',
                type: client_1.AchievementType.REVIEW_COUNT,
                criteria: { reviewCount: 10 },
                points: 500
            }
        }),
        prisma.achievement.create({
            data: {
                name: 'Course Completer',
                description: 'Complete your first course',
                icon: 'graduation-cap',
                type: client_1.AchievementType.COURSE_COMPLETION,
                criteria: { coursesCompleted: 1 },
                points: 100
            }
        }),
        prisma.achievement.create({
            data: {
                name: 'Learning Streak',
                description: 'Maintain a 7-day review streak',
                icon: 'fire',
                type: client_1.AchievementType.STREAK,
                criteria: { streakDays: 7 },
                points: 200
            }
        }),
        prisma.achievement.create({
            data: {
                name: 'Helpful Reviewer',
                description: 'Get 50 helpful votes on your reviews',
                icon: 'heart',
                type: client_1.AchievementType.HELPFUL_REVIEWS,
                criteria: { helpfulVotes: 50 },
                points: 300
            }
        })
    ]);
    // Create User Achievements
    console.log('🎖️ Awarding user achievements...');
    await prisma.userAchievement.createMany({
        data: [
            { userId: users[1].id, achievementId: achievements[0].id }, // First Review
            { userId: users[1].id, achievementId: achievements[2].id }, // Course Completer
            { userId: users[2].id, achievementId: achievements[0].id }, // First Review
            { userId: users[2].id, achievementId: achievements[2].id }, // Course Completer
            { userId: users[4].id, achievementId: achievements[0].id } // First Review
        ]
    });
    // Update course statistics
    console.log('📊 Updating course statistics...');
    for (const course of courses) {
        const reviewStats = await prisma.review.aggregate({
            where: { courseId: course.id },
            _count: { id: true },
            _avg: { overallRating: true }
        });
        const enrollmentCount = await prisma.courseEnrollment.count({
            where: { courseId: course.id }
        });
        await prisma.course.update({
            where: { id: course.id },
            data: {
                reviewCount: reviewStats._count.id,
                rating: reviewStats._avg.overallRating || null,
                enrollmentCount
            }
        });
    }
    console.log('✅ Database seeding completed successfully!');
    console.log(`Created:
  - ${skills.length} skills
  - ${categories.length + 1} categories (including subcategory)
  - ${tags.length} tags
  - ${users.length} users
  - ${courses.length} courses
  - ${reviews.length} reviews
  - ${achievements.length} achievements`);
}
main()
    .catch((e) => {
    console.error('❌ Error during seeding:', e);
    process.exit(1);
})
    .finally(async () => {
    await prisma.$disconnect();
});
//# sourceMappingURL=seed.js.map
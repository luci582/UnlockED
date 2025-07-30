#!/bin/bash

# Database Migration Script: SQLite to PostgreSQL
# This script exports data from SQLite and imports it to PostgreSQL

echo "🔄 Starting database migration from SQLite to PostgreSQL..."

# Export SQLite data to SQL
echo "📤 Exporting SQLite data..."
cd /home/amin/UnlockED/backend

# Create export directory
mkdir -p migration_exports

# Export all tables from SQLite
sqlite3 prisma/dev.db ".dump" > migration_exports/sqlite_export.sql

# Create a Node.js script to migrate data properly
cat > migration_exports/migrate_data.js << 'EOF'
const { PrismaClient } = require('@prisma/client');
const Database = require('better-sqlite3');
const path = require('path');

async function migrateData() {
  console.log('🔄 Starting data migration...');
  
  // Connect to PostgreSQL
  const postgresClient = new PrismaClient({
    datasources: {
      db: {
        url: process.env.DATABASE_URL
      }
    }
  });

  // Connect to SQLite
  const sqliteDb = new Database('./prisma/dev.db', { readonly: true });

  try {
    // Clear existing PostgreSQL data
    console.log('🧹 Clearing PostgreSQL database...');
    await postgresClient.reviewSkillRating.deleteMany();
    await postgresClient.reviewHelpfulVote.deleteMany();
    await postgresClient.reviewVote.deleteMany();
    await postgresClient.review.deleteMany();
    await postgresClient.courseEnrollment.deleteMany();
    await postgresClient.userAchievement.deleteMany();
    await postgresClient.userSkillProficiency.deleteMany();
    await postgresClient.courseTag.deleteMany();
    await postgresClient.courseCategory.deleteMany();
    await postgresClient.courseSkill.deleteMany();
    await postgresClient.progressReport.deleteMany();
    await postgresClient.notification.deleteMany();
    await postgresClient.courseModule.deleteMany();
    await postgresClient.course.deleteMany();
    await postgresClient.achievement.deleteMany();
    await postgresClient.tag.deleteMany();
    await postgresClient.category.deleteMany();
    await postgresClient.skillPrerequisite.deleteMany();
    await postgresClient.skill.deleteMany();
    await postgresClient.user.deleteMany();

    // Migrate Users
    console.log('👥 Migrating users...');
    const users = sqliteDb.prepare('SELECT * FROM users').all();
    for (const user of users) {
      await postgresClient.user.create({
        data: {
          id: user.id,
          email: user.email,
          username: user.username,
          firstName: user.firstName,
          lastName: user.lastName,
          profileImage: user.profileImage,
          bio: user.bio,
          role: user.role,
          isVerified: Boolean(user.isVerified),
          verificationToken: user.verificationToken,
          passwordHash: user.passwordHash,
          totalPoints: user.totalPoints,
          reviewStreak: user.reviewStreak,
          lastActiveAt: user.lastActiveAt ? new Date(user.lastActiveAt) : new Date(),
          createdAt: new Date(user.createdAt),
          updatedAt: new Date(user.updatedAt)
        }
      });
    }

    // Migrate Skills
    console.log('🛠️ Migrating skills...');
    const skills = sqliteDb.prepare('SELECT * FROM skills').all();
    for (const skill of skills) {
      await postgresClient.skill.create({
        data: {
          id: skill.id,
          name: skill.name,
          description: skill.description,
          category: skill.category,
          icon: skill.icon,
          color: skill.color,
          isActive: Boolean(skill.isActive),
          createdAt: new Date(skill.createdAt),
          updatedAt: new Date(skill.updatedAt)
        }
      });
    }

    // Migrate Categories
    console.log('📁 Migrating categories...');
    const categories = sqliteDb.prepare('SELECT * FROM categories').all();
    for (const category of categories) {
      await postgresClient.category.create({
        data: {
          id: category.id,
          name: category.name,
          slug: category.slug,
          description: category.description,
          icon: category.icon,
          color: category.color,
          parentId: category.parentId,
          sortOrder: category.sortOrder,
          isActive: Boolean(category.isActive),
          createdAt: new Date(category.createdAt),
          updatedAt: new Date(category.updatedAt)
        }
      });
    }

    // Migrate Tags
    console.log('🏷️ Migrating tags...');
    const tags = sqliteDb.prepare('SELECT * FROM tags').all();
    for (const tag of tags) {
      await postgresClient.tag.create({
        data: {
          id: tag.id,
          name: tag.name,
          slug: tag.slug,
          description: tag.description,
          color: tag.color,
          isActive: Boolean(tag.isActive),
          createdAt: new Date(tag.createdAt),
          updatedAt: new Date(tag.updatedAt)
        }
      });
    }

    // Migrate Courses
    console.log('📚 Migrating courses...');
    const courses = sqliteDb.prepare('SELECT * FROM courses').all();
    for (const course of courses) {
      await postgresClient.course.create({
        data: {
          id: course.id,
          title: course.title,
          description: course.description,
          shortDescription: course.shortDescription,
          imageUrl: course.imageUrl,
          thumbnailUrl: course.thumbnailUrl,
          courseUrl: course.courseUrl,
          instructor: course.instructor,
          institution: course.institution,
          duration: course.duration,
          difficulty: course.difficulty,
          status: course.status,
          price: course.price,
          isFree: Boolean(course.isFree),
          language: course.language,
          rating: course.rating,
          reviewCount: course.reviewCount,
          enrollmentCount: course.enrollmentCount,
          isActive: Boolean(course.isActive),
          prerequisites: course.prerequisites,
          learningOutcomes: course.learningOutcomes,
          syllabus: course.syllabus,
          lastUpdated: course.lastUpdated ? new Date(course.lastUpdated) : null,
          createdAt: new Date(course.createdAt),
          updatedAt: new Date(course.updatedAt),
          createdById: course.createdById
        }
      });
    }

    // Migrate Achievements
    console.log('🏆 Migrating achievements...');
    const achievements = sqliteDb.prepare('SELECT * FROM achievements').all();
    for (const achievement of achievements) {
      await postgresClient.achievement.create({
        data: {
          id: achievement.id,
          name: achievement.name,
          description: achievement.description,
          icon: achievement.icon,
          color: achievement.color,
          category: achievement.category,
          points: achievement.points,
          rarity: achievement.rarity,
          isActive: Boolean(achievement.isActive),
          createdAt: new Date(achievement.createdAt),
          updatedAt: new Date(achievement.updatedAt)
        }
      });
    }

    // Migrate relationship tables
    console.log('🔗 Migrating relationships...');

    // Skill Prerequisites
    const skillPrereqs = sqliteDb.prepare('SELECT * FROM skill_prerequisites').all();
    for (const prereq of skillPrereqs) {
      await postgresClient.skillPrerequisite.create({
        data: {
          id: prereq.id,
          skillId: prereq.skillId,
          prerequisiteId: prereq.prerequisiteId,
          createdAt: new Date(prereq.createdAt)
        }
      });
    }

    // Course Skills
    const courseSkills = sqliteDb.prepare('SELECT * FROM course_skills').all();
    for (const courseSkill of courseSkills) {
      await postgresClient.courseSkill.create({
        data: {
          id: courseSkill.id,
          courseId: courseSkill.courseId,
          skillId: courseSkill.skillId,
          level: courseSkill.level,
          isCore: Boolean(courseSkill.isCore),
          percentage: courseSkill.percentage,
          createdAt: new Date(courseSkill.createdAt)
        }
      });
    }

    // Course Categories
    const courseCategories = sqliteDb.prepare('SELECT * FROM course_categories').all();
    for (const courseCategory of courseCategories) {
      await postgresClient.courseCategory.create({
        data: {
          id: courseCategory.id,
          courseId: courseCategory.courseId,
          categoryId: courseCategory.categoryId,
          isPrimary: Boolean(courseCategory.isPrimary)
        }
      });
    }

    // Course Tags
    const courseTags = sqliteDb.prepare('SELECT * FROM course_tags').all();
    for (const courseTag of courseTags) {
      await postgresClient.courseTag.create({
        data: {
          id: courseTag.id,
          courseId: courseTag.courseId,
          tagId: courseTag.tagId
        }
      });
    }

    // Course Enrollments
    const enrollments = sqliteDb.prepare('SELECT * FROM course_enrollments').all();
    for (const enrollment of enrollments) {
      await postgresClient.courseEnrollment.create({
        data: {
          id: enrollment.id,
          userId: enrollment.userId,
          courseId: enrollment.courseId,
          status: enrollment.status,
          progress: enrollment.progress,
          startedAt: new Date(enrollment.startedAt),
          completedAt: enrollment.completedAt ? new Date(enrollment.completedAt) : null,
          lastAccessedAt: enrollment.lastAccessedAt ? new Date(enrollment.lastAccessedAt) : null,
          createdAt: new Date(enrollment.createdAt),
          updatedAt: new Date(enrollment.updatedAt)
        }
      });
    }

    // User Skill Proficiencies
    const proficiencies = sqliteDb.prepare('SELECT * FROM user_skill_proficiencies').all();
    for (const proficiency of proficiencies) {
      await postgresClient.userSkillProficiency.create({
        data: {
          id: proficiency.id,
          userId: proficiency.userId,
          skillId: proficiency.skillId,
          level: proficiency.level,
          experiencePoints: proficiency.experiencePoints,
          isVerified: Boolean(proficiency.isVerified),
          verifiedAt: proficiency.verifiedAt ? new Date(proficiency.verifiedAt) : null,
          verifiedById: proficiency.verifiedById,
          createdAt: new Date(proficiency.createdAt),
          updatedAt: new Date(proficiency.updatedAt)
        }
      });
    }

    // Reviews
    const reviews = sqliteDb.prepare('SELECT * FROM reviews').all();
    for (const review of reviews) {
      await postgresClient.review.create({
        data: {
          id: review.id,
          userId: review.userId,
          courseId: review.courseId,
          rating: review.rating,
          reviewText: review.reviewText,
          workload: review.workload,
          difficulty: review.difficulty,
          teachingQuality: review.teachingQuality,
          courseContent: review.courseContent,
          assessment: review.assessment,
          wouldRecommend: Boolean(review.wouldRecommend),
          semester: review.semester,
          year: review.year,
          isAnonymous: Boolean(review.isAnonymous),
          helpfulCount: review.helpfulCount,
          notHelpfulCount: review.notHelpfulCount,
          isVerified: Boolean(review.isVerified),
          verifiedAt: review.verifiedAt ? new Date(review.verifiedAt) : null,
          status: review.status,
          createdAt: new Date(review.createdAt),
          updatedAt: new Date(review.updatedAt)
        }
      });
    }

    // User Achievements
    const userAchievements = sqliteDb.prepare('SELECT * FROM user_achievements').all();
    for (const userAchievement of userAchievements) {
      await postgresClient.userAchievement.create({
        data: {
          id: userAchievement.id,
          userId: userAchievement.userId,
          achievementId: userAchievement.achievementId,
          earnedAt: new Date(userAchievement.earnedAt),
          createdAt: new Date(userAchievement.createdAt)
        }
      });
    }

    console.log('✅ Migration completed successfully!');
    
    // Display migration summary
    const counts = {
      users: await postgresClient.user.count(),
      skills: await postgresClient.skill.count(),
      categories: await postgresClient.category.count(),
      tags: await postgresClient.tag.count(),
      courses: await postgresClient.course.count(),
      achievements: await postgresClient.achievement.count(),
      reviews: await postgresClient.review.count(),
      enrollments: await postgresClient.courseEnrollment.count()
    };

    console.log('\n📊 Migration Summary:');
    console.log(`👥 Users: ${counts.users}`);
    console.log(`🛠️ Skills: ${counts.skills}`);
    console.log(`📁 Categories: ${counts.categories}`);
    console.log(`🏷️ Tags: ${counts.tags}`);
    console.log(`📚 Courses: ${counts.courses}`);
    console.log(`🏆 Achievements: ${counts.achievements}`);
    console.log(`⭐ Reviews: ${counts.reviews}`);
    console.log(`📝 Enrollments: ${counts.enrollments}`);

  } catch (error) {
    console.error('❌ Migration failed:', error);
    throw error;
  } finally {
    sqliteDb.close();
    await postgresClient.$disconnect();
  }
}

migrateData().catch(console.error);
EOF

echo "✅ Migration script created successfully!"

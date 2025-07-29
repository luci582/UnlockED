const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function createUsers() {
  console.log('🔧 Creating user accounts...');

  try {
    // Hash passwords
    const defaultPassword = 'password123';
    const hashedPassword = await bcrypt.hash(defaultPassword, 10);

    // 1. Create Student User
    const studentUser = await prisma.user.upsert({
      where: { email: 'student@unsw.edu.au' },
      update: {},
      create: {
        email: 'student@unsw.edu.au',
        username: 'student_demo',
        firstName: 'Emma',
        lastName: 'Chen',
        role: 'STUDENT',
        passwordHash: hashedPassword,
        isVerified: true,
        bio: 'Third-year Psychology student at UNSW',
        totalPoints: 150
      }
    });
    console.log('✅ Created Student User:', studentUser.email);

    // 2. Create Teacher User
    const teacherUser = await prisma.user.upsert({
      where: { email: 'teacher@unsw.edu.au' },
      update: {},
      create: {
        email: 'teacher@unsw.edu.au',
        username: 'teacher_demo',
        firstName: 'Dr. Lisa',
        lastName: 'Williams',
        role: 'INSTRUCTOR',
        passwordHash: hashedPassword,
        isVerified: true,
        bio: 'Senior Lecturer in Psychology at UNSW Sydney',
        totalPoints: 500
      }
    });
    console.log('✅ Created Teacher User:', teacherUser.email);

    // 3. Create Admin User
    const adminUser = await prisma.user.upsert({
      where: { email: 'admin@unsw.edu.au' },
      update: {},
      create: {
        email: 'admin@unsw.edu.au',
        username: 'admin_demo',
        firstName: 'John',
        lastName: 'Smith',
        role: 'ADMIN',
        passwordHash: hashedPassword,
        isVerified: true,
        bio: 'System Administrator for UnlockED Platform',
        totalPoints: 1000
      }
    });
    console.log('✅ Created Admin User:', adminUser.email);

    console.log('\n📋 User Account Summary:');
    console.log('========================');
    console.log('Student: student@unsw.edu.au / password123');
    console.log('Teacher: teacher@unsw.edu.au / password123');
    console.log('Admin: admin@unsw.edu.au / password123');
    console.log('\n🔑 All users can login with password: password123');

  } catch (error) {
    console.error('❌ Error creating users:', error);
  } finally {
    await prisma.$disconnect();
  }
}

createUsers();

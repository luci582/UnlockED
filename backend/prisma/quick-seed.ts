import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Starting quick database seeding...')

  // Create a test user for login
  const passwordHash = await bcrypt.hash('password123', 12)
  
  const testUser = await prisma.user.create({
    data: {
      email: 'test@example.com',
      username: 'testuser',
      firstName: 'Test',
      lastName: 'User',
      passwordHash,
      role: 'STUDENT',
      isVerified: true
    }
  })

  // Create an admin user
  const adminPasswordHash = await bcrypt.hash('admin123', 12)
  
  const adminUser = await prisma.user.create({
    data: {
      email: 'admin@example.com',
      username: 'admin',
      firstName: 'Admin',
      lastName: 'User',
      passwordHash: adminPasswordHash,
      role: 'ADMIN',
      isVerified: true
    }
  })

  console.log('✅ Quick seeding completed!')
  console.log('Test user created:')
  console.log('  Email: test@example.com')
  console.log('  Password: password123')
  console.log()
  console.log('Admin user created:')
  console.log('  Email: admin@example.com')
  console.log('  Password: admin123')
}

main()
  .catch((e) => {
    console.error('❌ Error during quick seeding:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })

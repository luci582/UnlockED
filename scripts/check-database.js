#!/usr/bin/env node

/**
 * Database Setup and Verification Script
 * 
 * This script helps verify that the database is properly configured
 * and provides helpful setup instructions.
 */

import { PrismaClient } from '@prisma/client'
import { readFileSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))

const prisma = new PrismaClient()

// Colors for console output
const colors = {
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
  reset: '\x1b[0m',
  bold: '\x1b[1m'
}

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`)
}

function logHeader(message) {
  console.log(`\n${colors.bold}${colors.blue}=== ${message} ===${colors.reset}`)
}

function logSuccess(message) {
  log(`✅ ${message}`, 'green')
}

function logError(message) {
  log(`❌ ${message}`, 'red')
}

function logWarning(message) {
  log(`⚠️  ${message}`, 'yellow')
}

function logInfo(message) {
  log(`ℹ️  ${message}`, 'cyan')
}

async function checkEnvironment() {
  logHeader('Environment Check')
  
  // Check if .env exists
  try {
    const envPath = join(__dirname, '..', '.env')
    const envContent = readFileSync(envPath, 'utf-8')
    
    if (envContent.includes('DATABASE_URL=')) {
      logSuccess('.env file exists and contains DATABASE_URL')
      
      // Check if DATABASE_URL looks valid
      const dbUrl = process.env.DATABASE_URL
      if (dbUrl && dbUrl.startsWith('postgresql://')) {
        logSuccess('DATABASE_URL appears to be a valid PostgreSQL URL')
      } else {
        logWarning('DATABASE_URL may not be properly configured')
        logInfo('Expected format: postgresql://username:password@localhost:5432/database_name')
      }
    } else {
      logError('.env file exists but missing DATABASE_URL')
    }
  } catch (error) {
    logError('.env file not found')
    logInfo('Please copy .env.example to .env and configure your database URL')
  }

  // Check Node.js version
  const nodeVersion = process.version
  const majorVersion = parseInt(nodeVersion.slice(1).split('.')[0])
  if (majorVersion >= 18) {
    logSuccess(`Node.js version ${nodeVersion} is supported`)
  } else {
    logWarning(`Node.js version ${nodeVersion} - recommend upgrading to v18+`)
  }
}

async function checkDatabaseConnection() {
  logHeader('Database Connection Test')
  
  try {
    await prisma.$connect()
    logSuccess('Successfully connected to database')
    
    // Try a simple query
    const result = await prisma.$queryRaw`SELECT 1 as test`
    logSuccess('Database query test passed')
    
    return true
  } catch (error) {
    logError('Failed to connect to database')
    console.error(error.message)
    
    logInfo('Troubleshooting steps:')
    logInfo('1. Make sure PostgreSQL is running')
    logInfo('2. Check your DATABASE_URL in .env file')
    logInfo('3. Verify database exists and user has permissions')
    logInfo('4. For local setup: createdb your_database_name')
    
    return false
  }
}

async function checkSchemaStatus() {
  logHeader('Schema Status Check')
  
  try {
    // Check if tables exist by trying to count users
    const userCount = await prisma.user.count()
    logSuccess(`Schema deployed - found ${userCount} users in database`)
    
    // Check for sample data
    const courseCount = await prisma.course.count()
    const reviewCount = await prisma.review.count()
    const skillCount = await prisma.skill.count()
    
    logInfo(`Database contains:`)
    logInfo(`  - ${userCount} users`)
    logInfo(`  - ${courseCount} courses`)
    logInfo(`  - ${reviewCount} reviews`)
    logInfo(`  - ${skillCount} skills`)
    
    if (userCount === 0 && courseCount === 0) {
      logWarning('Database is empty - consider running: npm run db:seed')
    } else {
      logSuccess('Database contains sample data')
    }
    
    return true
  } catch (error) {
    logError('Schema not deployed or tables missing')
    
    if (error.code === 'P2021') {
      logInfo('Table does not exist. Run: npm run db:push')
    } else {
      console.error(error.message)
    }
    
    logInfo('Setup steps:')
    logInfo('1. npm run db:push     # Deploy schema to database')
    logInfo('2. npm run db:seed     # Add sample data')
    
    return false
  }
}

async function checkPrismaClient() {
  logHeader('Prisma Client Check')
  
  try {
    // Check if client is generated
    const clientInfo = await prisma.$queryRaw`SELECT version() as version`
    logSuccess('Prisma client is generated and working')
    return true
  } catch (error) {
    logError('Prisma client may not be generated')
    logInfo('Run: npm run db:generate')
    return false
  }
}

async function runDiagnostics() {
  logHeader('Database Setup Diagnostics')
  log('UnlockED Database Setup Verification\n', 'bold')
  
  const checks = [
    checkEnvironment,
    checkDatabaseConnection,
    checkPrismaClient,
    checkSchemaStatus
  ]
  
  let allPassed = true
  
  for (const check of checks) {
    try {
      const result = await check()
      if (result === false) allPassed = false
    } catch (error) {
      logError(`Check failed: ${error.message}`)
      allPassed = false
    }
  }
  
  logHeader('Summary')
  
  if (allPassed) {
    logSuccess('🎉 Database setup is complete and working!')
    logInfo('You can now:')
    logInfo('- Start the development server: npm run dev')
    logInfo('- Open Prisma Studio: npm run db:studio')
    logInfo('- View the application at: http://localhost:8082')
  } else {
    logWarning('⚠️  Some checks failed. Please fix the issues above.')
    logInfo('\nQuick setup commands:')
    logInfo('1. cp .env.example .env')
    logInfo('2. # Edit .env with your database credentials')
    logInfo('3. npm run db:push')
    logInfo('4. npm run db:seed')
    logInfo('5. npm run dev')
  }
  
  logHeader('Useful Commands')
  logInfo('npm run db:generate  # Generate Prisma client')
  logInfo('npm run db:push      # Deploy schema changes')
  logInfo('npm run db:seed      # Add sample data')
  logInfo('npm run db:studio    # Open database GUI')
  logInfo('npm run db:reset     # Reset and reseed database')
}

// Run diagnostics
runDiagnostics()
  .catch((error) => {
    logError('Diagnostics failed')
    console.error(error)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })

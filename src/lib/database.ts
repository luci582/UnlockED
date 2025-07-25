import { prisma } from './prisma'

// Course utilities
export const getCourses = async (filters?: {
  search?: string
  skills?: string[]
  difficulty?: string
  category?: string
  isFree?: boolean
  limit?: number
  offset?: number
}) => {
  const where: any = {
    isActive: true,
    status: 'PUBLISHED'
  }

  if (filters?.search) {
    where.OR = [
      { title: { contains: filters.search, mode: 'insensitive' } },
      { description: { contains: filters.search, mode: 'insensitive' } },
      { instructor: { contains: filters.search, mode: 'insensitive' } }
    ]
  }

  if (filters?.skills && filters.skills.length > 0) {
    where.skills = {
      some: {
        skill: {
          name: { in: filters.skills }
        }
      }
    }
  }

  if (filters?.difficulty) {
    where.difficulty = filters.difficulty
  }

  if (filters?.isFree !== undefined) {
    where.isFree = filters.isFree
  }

  if (filters?.category) {
    where.categories = {
      some: {
        category: {
          slug: filters.category
        }
      }
    }
  }

  return prisma.course.findMany({
    where,
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
      tags: {
        include: {
          tag: true
        }
      },
      _count: {
        select: {
          reviews: true,
          enrollments: true
        }
      }
    },
    orderBy: [
      { rating: 'desc' },
      { reviewCount: 'desc' },
      { createdAt: 'desc' }
    ],
    take: filters?.limit || 50,
    skip: filters?.offset || 0
  })
}

export const getCourseById = async (id: string) => {
  return prisma.course.findUnique({
    where: { id },
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
      tags: {
        include: {
          tag: true
        }
      },
      modules: {
        orderBy: {
          sortOrder: 'asc'
        }
      },
      reviews: {
        include: {
          user: {
            select: {
              id: true,
              username: true,
              firstName: true,
              lastName: true,
              profileImage: true
            }
          },
          skillRatings: {
            include: {
              skill: true
            }
          }
        },
        orderBy: {
          createdAt: 'desc'
        }
      },
      _count: {
        select: {
          reviews: true,
          enrollments: true
        }
      }
    }
  })
}

// Review utilities
export const createReview = async (data: {
  userId: string
  courseId: string
  overallRating: number
  difficultyRating?: number
  contentQuality?: number
  instructorRating?: number
  valueForMoney?: number
  wouldRecommend?: boolean
  title: string
  content: string
  pros?: string[]
  cons?: string[]
  isAnonymous?: boolean
  skillRatings?: { skillId: string; rating: number }[]
}) => {
  return prisma.$transaction(async (tx) => {
    // Create the review
    const review = await tx.review.create({
      data: {
        userId: data.userId,
        courseId: data.courseId,
        overallRating: data.overallRating,
        difficultyRating: data.difficultyRating,
        contentQuality: data.contentQuality,
        instructorRating: data.instructorRating,
        valueForMoney: data.valueForMoney,
        wouldRecommend: data.wouldRecommend,
        title: data.title,
        content: data.content,
        pros: data.pros || [],
        cons: data.cons || [],
        isAnonymous: data.isAnonymous || false
      }
    })

    // Create skill ratings if provided
    if (data.skillRatings && data.skillRatings.length > 0) {
      await tx.reviewSkillRating.createMany({
        data: data.skillRatings.map(sr => ({
          reviewId: review.id,
          skillId: sr.skillId,
          rating: sr.rating
        }))
      })
    }

    // Update course statistics
    const courseStats = await tx.review.aggregate({
      where: { courseId: data.courseId },
      _count: { id: true },
      _avg: { overallRating: true }
    })

    await tx.course.update({
      where: { id: data.courseId },
      data: {
        reviewCount: courseStats._count.id,
        rating: courseStats._avg.overallRating
      }
    })

    return review
  })
}

// User utilities
export const getUserById = async (id: string) => {
  return prisma.user.findUnique({
    where: { id },
    include: {
      reviews: {
        include: {
          course: {
            select: {
              id: true,
              title: true,
              imageUrl: true
            }
          }
        },
        orderBy: {
          createdAt: 'desc'
        }
      },
      enrollments: {
        include: {
          course: {
            select: {
              id: true,
              title: true,
              imageUrl: true,
              difficulty: true,
              instructor: true
            }
          }
        }
      },
      achievements: {
        include: {
          achievement: true
        }
      },
      skillProficiencies: {
        include: {
          skill: true
        }
      }
    }
  })
}

// Skill utilities
export const getAllSkills = async () => {
  return prisma.skill.findMany({
    where: { isActive: true },
    orderBy: { name: 'asc' },
    include: {
      _count: {
        select: {
          courses: true
        }
      }
    }
  })
}

// Category utilities
export const getAllCategories = async () => {
  return prisma.category.findMany({
    where: { isActive: true },
    orderBy: [
      { sortOrder: 'asc' },
      { name: 'asc' }
    ],
    include: {
      children: true,
      _count: {
        select: {
          courses: true
        }
      }
    }
  })
}

// Search utilities
export const searchCourses = async (query: string, limit = 10) => {
  return prisma.course.findMany({
    where: {
      isActive: true,
      status: 'PUBLISHED',
      OR: [
        { title: { contains: query, mode: 'insensitive' } },
        { description: { contains: query, mode: 'insensitive' } },
        { instructor: { contains: query, mode: 'insensitive' } },
        { institution: { contains: query, mode: 'insensitive' } }
      ]
    },
    include: {
      skills: {
        include: {
          skill: true
        }
      },
      _count: {
        select: {
          reviews: true
        }
      }
    },
    orderBy: [
      { rating: 'desc' },
      { reviewCount: 'desc' }
    ],
    take: limit
  })
}

// Statistics utilities
export const getDashboardStats = async () => {
  const [
    totalCourses,
    totalReviews,
    totalUsers,
    avgRating
  ] = await Promise.all([
    prisma.course.count({ where: { isActive: true, status: 'PUBLISHED' } }),
    prisma.review.count(),
    prisma.user.count(),
    prisma.review.aggregate({
      _avg: { overallRating: true }
    })
  ])

  return {
    totalCourses,
    totalReviews,
    totalUsers,
    avgRating: avgRating._avg.overallRating || 0
  }
}

// Leaderboard utilities
export const getLeaderboard = async (limit = 10) => {
  return prisma.user.findMany({
    where: {
      role: 'STUDENT'
    },
    orderBy: [
      { totalPoints: 'desc' },
      { reviewStreak: 'desc' }
    ],
    take: limit,
    select: {
      id: true,
      username: true,
      firstName: true,
      lastName: true,
      profileImage: true,
      totalPoints: true,
      reviewStreak: true,
      _count: {
        select: {
          reviews: true,
          achievements: true
        }
      }
    }
  })
}

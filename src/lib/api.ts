const API_BASE_URL = 'http://localhost:3001';

export interface ReviewData {
  courseCode: string;
  semester: string;
  overallRating: number;
  review: string;
  workload: string;
  teachingQuality: string[];
  assessments: string[];
  skillsDeveloped: string[];
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

export const submitReview = async (userEmail: string, reviewData: ReviewData): Promise<ApiResponse<any>> => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/reviews`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userEmail,
        reviewData
      }),
    });

    const result = await response.json();
    
    if (!response.ok) {
      throw new Error(result.error || 'Failed to submit review');
    }

    return {
      success: true,
      data: result
    };
  } catch (error) {
    console.error('Review submission error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred'
    };
  }
};

export const getLeaderboard = async (): Promise<ApiResponse<any>> => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/leaderboard`);
    const result = await response.json();
    
    if (!response.ok) {
      throw new Error(result.error || 'Failed to fetch leaderboard');
    }

    return {
      success: true,
      data: result
    };
  } catch (error) {
    console.error('Leaderboard fetch error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred'
    };
  }
};

// Courses API
export interface DatabaseCourse {
  id: string;
  title: string;
  description: string;
  instructor: string;
  institution?: string;
  difficulty: string;
  rating?: number;
  reviewCount: number;
  enrollmentCount: number;
  duration?: string;
  price?: number;
  isFree: boolean;
  createdAt: string; // ISO string from database
  skills?: Array<{
    skill: {
      id: string;
      name: string;
    };
  }>;
  categories?: Array<{
    category: {
      id: string;
      name: string;
    };
  }>;
}

export const fetchCourses = async (page: number = 1, limit: number = 20): Promise<ApiResponse<DatabaseCourse[]>> => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/courses?page=${page}&limit=${limit}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();

    return {
      success: true,
      data: result.courses
    };
  } catch (error) {
    console.error('Courses fetch error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred'
    };
  }
};

export const fetchCourseById = async (id: string): Promise<ApiResponse<DatabaseCourse & { reviews: any[] }>> => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/courses/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      if (response.status === 404) {
        throw new Error('Course not found');
      }
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();

    return {
      success: true,
      data: result.course
    };
  } catch (error) {
    console.error('Course fetch error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred'
    };
  }
};

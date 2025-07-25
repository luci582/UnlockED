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

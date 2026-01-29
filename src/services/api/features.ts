export interface Feature {
  id: number;
  title: string;
  description: string;
  icon?: string;
}

export const fetchFeatures = async (): Promise<{ data: Feature[], success: boolean, message?: string }> => {
  try {
    const response = await fetch('/api/features');
    if (!response.ok) {
      throw new Error('Failed to fetch features');
    }
    const result = await response.json();
    return { 
      data: result.data || result, 
      success: true 
    };
  } catch (error) {
    return {
      data: [],
      success: false,
      message: error instanceof Error ? error.message : 'Unknown error'
    };
  }
};

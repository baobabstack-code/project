export interface TechStackItem {
  id: number;
  name: string;
  icon: string;
  category?: string;
  description?: string;
}

export const fetchTechStack = async (): Promise<{ data: TechStackItem[], success: boolean, message?: string }> => {
  try {
    const response = await fetch('/api/techstack');
    if (!response.ok) {
      throw new Error('Failed to fetch tech stack');
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

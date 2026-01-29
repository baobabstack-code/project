export interface Stat {
  id: number;
  icon: string;
  value: string;
  label: string;
}

export const fetchStats = async (): Promise<{ data: Stat[], success: boolean, message?: string }> => {
  try {
    const response = await fetch('/api/stats');
    if (!response.ok) {
      throw new Error('Failed to fetch stats');
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

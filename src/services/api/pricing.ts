export interface PricingPlan {
  id: number;
  name: string;
  price: string;
  description: string;
  features: string[];
  popular?: boolean;
}

export const fetchPricingPlans = async (): Promise<{ data: PricingPlan[], success: boolean, message?: string }> => {
  try {
    const response = await fetch('/api/pricing');
    if (!response.ok) {
      throw new Error('Failed to fetch pricing plans');
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

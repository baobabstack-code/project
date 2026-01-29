export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
}

export interface DataParams {
  page?: number;
  limit?: number;
  search?: string;
}

export interface Testimonial {
  id: number;
  content: string;
  author: string;
  role?: string;
  company?: string;
  image?: string;
  rating?: number;
  publishedAt: string;
}

export async function fetchTestimonials(
  params?: DataParams
): Promise<ApiResponse<Testimonial[]>> {
  try {
    const searchParams = new URLSearchParams();
    if (params?.page) searchParams.set('page', params.page.toString());
    if (params?.limit) searchParams.set('limit', params.limit.toString());
    if (params?.search) searchParams.set('search', params.search);

    const response = await fetch(`/api/testimonials?${searchParams}`);
    if (!response.ok) {
      throw new Error('Failed to fetch testimonials');
    }
    const data = await response.json();
    // Handle both array and object responses
    const testimonials = Array.isArray(data) ? data : (data.data || data);
    return { data: testimonials, success: true };
  } catch (error) {
    return {
      data: [],
      success: false,
      message: error instanceof Error ? error.message : 'Unknown error'
    };
  }
}

export async function submitTestimonial(): Promise<Testimonial> {
  // POST request functionality would be implemented via API routes
  // This would typically submit to /api/testimonials endpoint
  throw new Error(
    "Testimonial submission not implemented - use API routes instead"
  );
}

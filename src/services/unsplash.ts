// Unsplash API service for fetching high-quality images
const UNSPLASH_ACCESS_KEY = process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY || 'demo';
const UNSPLASH_API_URL = 'https://api.unsplash.com';

export interface UnsplashPhoto {
  id: string;
  urls: {
    raw: string;
    full: string;
    regular: string;
    small: string;
    thumb: string;
  };
  alt_description: string;
  user: {
    name: string;
    username: string;
  };
  links: {
    html: string;
  };
}

export interface UnsplashSearchResponse {
  results: UnsplashPhoto[];
  total: number;
  total_pages: number;
}

export const searchUnsplashPhotos = async (
  query: string,
  perPage: number = 10,
  page: number = 1
): Promise<UnsplashSearchResponse> => {
  try {
    const response = await fetch(
      `${UNSPLASH_API_URL}/search/photos?query=${encodeURIComponent(query)}&per_page=${perPage}&page=${page}&client_id=${UNSPLASH_ACCESS_KEY}`
    );
    
    if (!response.ok) {
      throw new Error(`Unsplash API error: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching from Unsplash:', error);
    throw error;
  }
};

export const getRandomPhoto = async (query?: string): Promise<UnsplashPhoto> => {
  try {
    const url = query 
      ? `${UNSPLASH_API_URL}/photos/random?query=${encodeURIComponent(query)}&client_id=${UNSPLASH_ACCESS_KEY}`
      : `${UNSPLASH_API_URL}/photos/random?client_id=${UNSPLASH_ACCESS_KEY}`;
    
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`Unsplash API error: ${response.status}`);
    }
    
    const data = await response.json();
    return Array.isArray(data) ? data[0] : data;
  } catch (error) {
    console.error('Error fetching random photo from Unsplash:', error);
    throw error;
  }
};

export const getPhotoById = async (id: string): Promise<UnsplashPhoto> => {
  try {
    const response = await fetch(
      `${UNSPLASH_API_URL}/photos/${id}?client_id=${UNSPLASH_ACCESS_KEY}`
    );
    
    if (!response.ok) {
      throw new Error(`Unsplash API error: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching photo by ID from Unsplash:', error);
    throw error;
  }
};
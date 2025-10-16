'use client';

import React, { useState, useEffect } from 'react';
import { searchUnsplashPhotos, UnsplashPhoto } from '@/services/unsplash';

interface UnsplashImageDemoProps {
  query?: string;
  limit?: number;
}

const UnsplashImageDemo: React.FC<UnsplashImageDemoProps> = ({ 
  query = 'technology', 
  limit = 6 
}) => {
  const [photos, setPhotos] = useState<UnsplashPhoto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await searchUnsplashPhotos(query, limit);
        setPhotos(response.results);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch images');
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, [query, limit]);

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
        {Array.from({ length: limit }).map((_, index) => (
          <div key={index} className="bg-gray-200 rounded-lg animate-pulse h-48"></div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 bg-red-100 border border-red-400 text-red-700 rounded">
        <p>Error: {error}</p>
        <p className="text-sm mt-2">
          Make sure to set up your Unsplash API key in .env.local
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
      {photos.map((photo) => (
        <div key={photo.id} className="group relative overflow-hidden rounded-lg shadow-md hover:shadow-lg transition-shadow">
          <img
            src={photo.urls.regular}
            alt={photo.alt_description || 'Unsplash image'}
            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-opacity duration-300" />
          <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/80 to-transparent text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <p className="text-sm font-medium truncate">by {photo.user.name}</p>
            <p className="text-xs opacity-80">@{photo.user.username}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default UnsplashImageDemo;
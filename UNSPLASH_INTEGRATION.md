# Unsplash Image Integration

This guide explains how to integrate Unsplash images into your Next.js application.

## Setup Instructions

### 1. Get Unsplash API Key

1. Go to [Unsplash Developers](https://unsplash.com/developers)
2. Create a developer account
3. Create a new application
4. Copy your Access Key

### 2. Configure Environment Variables

Copy the example environment file:
```bash
cp .env.local.example .env.local
```

Edit `.env.local` and add your Unsplash Access Key:
```env
NEXT_PUBLIC_UNSPLASH_ACCESS_KEY=your_actual_access_key_here
```

### 3. Available Services

The integration provides three main functions:

#### Search Photos
```typescript
import { searchUnsplashPhotos } from '@/services/unsplash';

const results = await searchUnsplashPhotos('technology', 10, 1);
```

#### Get Random Photo
```typescript
import { getRandomPhoto } from '@/services/unsplash';

// Random photo
const randomPhoto = await getRandomPhoto();

// Random photo with specific theme
const techPhoto = await getRandomPhoto('technology');
```

#### Get Photo by ID
```typescript
import { getPhotoById } from '@/services/unsplash';

const photo = await getPhotoById('photo-id-here');
```

### 4. Demo Component

A demo component `UnsplashImageDemo` is available at:
```typescript
import UnsplashImageDemo from '@/components/UnsplashImageDemo';

// Basic usage
<UnsplashImageDemo />

// Custom query and limit
<UnsplashImageDemo query="nature" limit={8} />
```

### 5. Usage Examples

#### Basic Image Display
```typescript
import { searchUnsplashPhotos } from '@/services/unsplash';

const photos = await searchUnsplashPhotos('landscape', 4);

return (
  <div className="grid grid-cols-2 gap-4">
    {photos.results.map(photo => (
      <img
        key={photo.id}
        src={photo.urls.regular}
        alt={photo.alt_description}
        className="w-full h-48 object-cover"
      />
    ))}
  </div>
);
```

#### With Loading States
```typescript
const [photos, setPhotos] = useState([]);
const [loading, setLoading] = useState(true);

useEffect(() => {
  const fetchPhotos = async () => {
    try {
      const result = await searchUnsplashPhotos('architecture', 6);
      setPhotos(result.results);
    } catch (error) {
      console.error('Failed to fetch photos:', error);
    } finally {
      setLoading(false);
    }
  };
  
  fetchPhotos();
}, []);
```

### 6. Rate Limits

- Demo mode: 50 requests per hour
- Production: 5000 requests per hour (after approval)
- Image downloads don't count against rate limits

### 7. Best Practices

1. **Cache responses** to minimize API calls
2. **Use appropriate image sizes** (thumb, small, regular, full)
3. **Include proper attribution** (user name and username)
4. **Handle errors gracefully**
5. **Implement loading states** for better UX

### 8. Common Queries

- `technology`, `coding`, `programming`
- `nature`, `landscape`, `architecture`
- `business`, `office`, `workspace`
- `minimal`, `abstract`, `texture`

### 9. Troubleshooting

**Error: "Failed to fetch images"**
- Check if API key is set in `.env.local`
- Verify internet connection
- Check Unsplash API status

**Error: "Rate limit exceeded"**
- Implement request caching
- Reduce number of API calls
- Consider using demo mode for development

### 10. Legal Requirements

- Follow [Unsplash API Guidelines](https://unsplash.com/documentation#guidelines)
- Provide attribution to photographers
- Don't hotlink images in production without proper setup

## Support

For more information, refer to the [Unsplash API Documentation](https://unsplash.com/documentation).
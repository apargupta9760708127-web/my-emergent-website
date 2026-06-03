# API Contracts & Backend Integration Plan

## Overview
This document outlines the API contracts between frontend and backend for the CubeVerse Rubik's Cube information website.

## Current Mock Data Location
- **File:** `/app/frontend/src/mock.js`
- **Data Collections:**
  - `cubes` - 10 different Rubik's cube types
  - `patterns` - 4 cube patterns with algorithms
  - `flags` - 6 country flags on cubes
  - `youtubeChannel` - Channel info and featured videos

## MongoDB Collections

### 1. Cubes Collection
```javascript
{
  _id: ObjectId,
  name: String,
  type: String, // 'classic' or 'other'
  size: String,
  difficulty: Number, // 1-5
  description: String,
  pieces: Number,
  price: String,
  worldRecord: String,
  videoUrl: String,
  buyLink: String,
  image: String,
  colorScheme: [String]
}
```

### 2. Patterns Collection
```javascript
{
  _id: ObjectId,
  name: String,
  difficulty: String, // 'Easy', 'Medium', 'Hard'
  description: String,
  moves: String, // Algorithm
  image: String
}
```

### 3. Flags Collection
```javascript
{
  _id: ObjectId,
  country: String,
  name: String,
  colors: [String],
  difficulty: String,
  videoUrl: String,
  image: String
}
```

### 4. YouTube Channel Collection
```javascript
{
  _id: ObjectId,
  channelName: String,
  channelUrl: String,
  subscribers: String,
  description: String,
  featuredVideos: [{
    title: String,
    thumbnail: String,
    url: String,
    views: String
  }]
}
```

## API Endpoints

### Cubes
- **GET /api/cubes** - Get all cubes
  - Query params: `type` (classic/other), `difficulty` (1-5), `search` (string)
  - Response: `{ cubes: [Cube] }`

- **GET /api/cubes/:id** - Get single cube
  - Response: `{ cube: Cube }`

### Patterns
- **GET /api/patterns** - Get all patterns
  - Response: `{ patterns: [Pattern] }`

### Flags
- **GET /api/flags** - Get all flags
  - Response: `{ flags: [Flag] }`

### YouTube
- **GET /api/youtube** - Get YouTube channel info
  - Response: `{ channel: YouTubeChannel }`

## Frontend Integration Changes

### Files to Update:
1. **CubeGallery.jsx**
   - Replace mock import with API call to `/api/cubes`
   - Add loading state
   - Add error handling

2. **PatternsSection.jsx**
   - Replace mock import with API call to `/api/patterns`
   - Add loading state
   - Add error handling

3. **FlagsSection.jsx**
   - Replace mock import with API call to `/api/flags`
   - Add loading state
   - Add error handling

4. **TutorialsSection.jsx**
   - Replace mock import with API call to `/api/youtube`
   - Add loading state
   - Add error handling

5. **ComparisonDialog.jsx**
   - Will receive cubes data from parent (CubeGallery)
   - No direct API call needed

### API Service Layer
Create `/app/frontend/src/services/api.js`:
```javascript
import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

export const getCubes = async (filters) => {
  const params = new URLSearchParams(filters);
  const response = await axios.get(`${API}/cubes?${params}`);
  return response.data.cubes;
};

export const getPatterns = async () => {
  const response = await axios.get(`${API}/patterns`);
  return response.data.patterns;
};

export const getFlags = async () => {
  const response = await axios.get(`${API}/flags`);
  return response.data.flags;
};

export const getYouTubeChannel = async () => {
  const response = await axios.get(`${API}/youtube`);
  return response.data.channel;
};
```

## Backend Implementation Steps

1. **Create Models** (`/app/backend/models/`)
   - `cube.py`
   - `pattern.py`
   - `flag.py`
   - `youtube.py`

2. **Create Routes** (`/app/backend/routes/`)
   - `cubes.py`
   - `patterns.py`
   - `flags.py`
   - `youtube.py`

3. **Seed Database** (`/app/backend/seed.py`)
   - Transfer all mock data to MongoDB
   - Run once to populate database

4. **Update server.py**
   - Import and register all route blueprints
   - Add CORS configuration

## Testing Plan

1. Test each endpoint individually with curl
2. Test frontend integration
3. Test filtering and search functionality
4. Test all sections load correctly
5. Test comparison tool with real data
6. Test responsive design still works

## Notes
- All mock data will be seeded into MongoDB
- Frontend will no longer use mock.js after integration
- Images are currently external URLs (Unsplash) - will remain the same
- YouTube links are placeholder URLs - will remain the same

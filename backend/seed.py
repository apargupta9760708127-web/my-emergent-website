import asyncio
from motor.motor_asyncio import AsyncIOMotorClient
import os
from dotenv import load_dotenv
from pathlib import Path

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Working Unsplash image URLs
CUBE_IMG_1 = "https://images.unsplash.com/photo-1591991564021-0662a8573199?w=400&h=400&fit=crop"
CUBE_IMG_2 = "https://images.unsplash.com/photo-1611329532992-0b8b7c20df50?w=400&h=400&fit=crop"
CUBE_IMG_3 = "https://images.unsplash.com/photo-1577375729152-4c8b5fcda381?w=400&h=400&fit=crop"
CUBE_IMG_4 = "https://images.unsplash.com/photo-1612296727716-d6c69ade5712?w=400&h=400&fit=crop"
CUBE_IMG_5 = "https://images.unsplash.com/photo-1525909002-1b05e0c869d8?w=400&h=400&fit=crop"
CUBE_IMG_6 = "https://images.unsplash.com/photo-1591991733331-7d18c8607c87?w=400&h=400&fit=crop"
CUBE_IMG_7 = "https://images.unsplash.com/photo-1606503153255-59d8b8b9a9f9?w=400&h=400&fit=crop"
CUBE_IMG_8 = "https://images.unsplash.com/photo-1614287089969-a7d8c7c92aa7?w=400&h=400&fit=crop"

PATTERN_IMG = "https://images.unsplash.com/photo-1591991564021-0662a8573199?w=400&h=400&fit=crop"

FLAG_USA = "https://images.unsplash.com/photo-1530653333484-8d36e3641194?w=400&h=400&fit=crop"
FLAG_INDIA = "https://images.unsplash.com/photo-1532375810709-75b1da00537c?w=400&h=400&fit=crop"
FLAG_JAPAN = "https://images.unsplash.com/photo-1480796927426-f609979314bd?w=400&h=400&fit=crop"
FLAG_BRAZIL = "https://images.unsplash.com/photo-1518803194621-27188ba362c9?w=400&h=400&fit=crop"
FLAG_FRANCE = "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=400&h=400&fit=crop"
FLAG_GERMANY = "https://images.unsplash.com/photo-1527866959252-deab85ef7d1b?w=400&h=400&fit=crop"

VIDEO_THUMB_1 = "https://images.unsplash.com/photo-1591991564021-0662a8573199?w=600&h=400&fit=crop"
VIDEO_THUMB_2 = "https://images.unsplash.com/photo-1611329532992-0b8b7c20df50?w=600&h=400&fit=crop"
VIDEO_THUMB_3 = "https://images.unsplash.com/photo-1577375729152-4c8b5fcda381?w=600&h=400&fit=crop"

# Mock data
cubes_data = [
    {
        "id": "1",
        "name": "2x2 Pocket Cube",
        "type": "classic",
        "size": "2x2x2",
        "difficulty": 1,
        "description": "The simplest Rubik's cube variant, perfect for beginners.",
        "pieces": 8,
        "price": "$8-$15",
        "worldRecord": "0.49s",
        "videoUrl": "https://www.youtube.com/watch?v=GANnG5a19kg",
        "buyLink": "https://www.amazon.com/s?k=2x2+rubiks+cube",
        "image": CUBE_IMG_1,
        "colorScheme": ["#FF0000", "#00FF00", "#0000FF", "#FFFF00", "#FFFFFF", "#FFA500"]
    },
    {
        "id": "2",
        "name": "3x3 Classic Cube",
        "type": "classic",
        "size": "3x3x3",
        "difficulty": 2,
        "description": "The original and most popular Rubik's Cube.",
        "pieces": 26,
        "price": "$10-$30",
        "worldRecord": "3.13s",
        "videoUrl": "https://www.youtube.com/watch?v=7Ron6MN45LY",
        "buyLink": "https://www.amazon.com/s?k=3x3+rubiks+cube",
        "image": CUBE_IMG_2,
        "colorScheme": ["#FF0000", "#00FF00", "#0000FF", "#FFFF00", "#FFFFFF", "#FFA500"]
    },
    {
        "id": "3",
        "name": "4x4 Revenge Cube",
        "type": "classic",
        "size": "4x4x4",
        "difficulty": 3,
        "description": "More complex than 3x3, with additional center pieces.",
        "pieces": 56,
        "price": "$15-$40",
        "worldRecord": "17.42s",
        "videoUrl": "https://www.youtube.com/watch?v=KWOZHbDdOeo",
        "buyLink": "https://www.amazon.com/s?k=4x4+rubiks+cube",
        "image": CUBE_IMG_3,
        "colorScheme": ["#FF0000", "#00FF00", "#0000FF", "#FFFF00", "#FFFFFF", "#FFA500"]
    },
    {
        "id": "4",
        "name": "5x5 Professor's Cube",
        "type": "classic",
        "size": "5x5x5",
        "difficulty": 4,
        "description": "Advanced cube requiring advanced solving techniques.",
        "pieces": 98,
        "price": "$20-$50",
        "worldRecord": "33.02s",
        "videoUrl": "https://www.youtube.com/watch?v=d1I-jJl4PL8",
        "buyLink": "https://www.amazon.com/s?k=5x5+rubiks+cube",
        "image": CUBE_IMG_4,
        "colorScheme": ["#FF0000", "#00FF00", "#0000FF", "#FFFF00", "#FFFFFF", "#FFA500"]
    },
    {
        "id": "5",
        "name": "Pyraminx",
        "type": "other",
        "size": "Tetrahedron",
        "difficulty": 1,
        "description": "A pyramid-shaped twisty puzzle, easier than 3x3.",
        "pieces": 14,
        "price": "$10-$25",
        "worldRecord": "0.91s",
        "videoUrl": "https://www.youtube.com/watch?v=2H0FRf7gS3M",
        "buyLink": "https://www.amazon.com/s?k=pyraminx",
        "image": CUBE_IMG_5,
        "colorScheme": ["#FF0000", "#00FF00", "#0000FF", "#FFFF00"]
    },
    {
        "id": "6",
        "name": "Megaminx",
        "type": "other",
        "size": "Dodecahedron",
        "difficulty": 4,
        "description": "A 12-sided puzzle with 50 movable pieces.",
        "pieces": 50,
        "price": "$15-$45",
        "worldRecord": "26.83s",
        "videoUrl": "https://www.youtube.com/watch?v=JJmMV-tRdWw",
        "buyLink": "https://www.amazon.com/s?k=megaminx",
        "image": CUBE_IMG_6,
        "colorScheme": ["#FF0000", "#00FF00", "#0000FF", "#FFFF00", "#FFFFFF", "#FFA500", "#FF1493", "#800080", "#00CED1", "#FFD700", "#8B4513", "#808080"]
    },
    {
        "id": "7",
        "name": "Skewb",
        "type": "other",
        "size": "Cube variant",
        "difficulty": 2,
        "description": "A corner-turning cube puzzle with unique mechanics.",
        "pieces": 8,
        "price": "$10-$30",
        "worldRecord": "0.93s",
        "videoUrl": "https://www.youtube.com/watch?v=vLDphHFY0Pw",
        "buyLink": "https://www.amazon.com/s?k=skewb",
        "image": CUBE_IMG_7,
        "colorScheme": ["#FF0000", "#00FF00", "#0000FF", "#FFFF00", "#FFFFFF", "#FFA500"]
    },
    {
        "id": "8",
        "name": "Square-1",
        "type": "other",
        "size": "Shape-shifting",
        "difficulty": 5,
        "description": "A challenging shape-shifting puzzle with unique solving methods.",
        "pieces": 22,
        "price": "$15-$35",
        "worldRecord": "4.59s",
        "videoUrl": "https://www.youtube.com/watch?v=Pc551ma83uk",
        "buyLink": "https://www.amazon.com/s?k=square-1+puzzle",
        "image": CUBE_IMG_8,
        "colorScheme": ["#FF0000", "#00FF00", "#0000FF", "#FFFF00", "#FFFFFF", "#FFA500"]
    },
    {
        "id": "9",
        "name": "Mirror Cube",
        "type": "other",
        "size": "3x3 variant",
        "difficulty": 3,
        "description": "A 3x3 cube solved by shape instead of color.",
        "pieces": 26,
        "price": "$12-$28",
        "worldRecord": "N/A",
        "videoUrl": "https://www.youtube.com/watch?v=OAtkURSPBy4",
        "buyLink": "https://www.amazon.com/s?k=mirror+cube",
        "image": CUBE_IMG_2,
        "colorScheme": ["#C0C0C0", "#A9A9A9", "#808080"]
    },
    {
        "id": "10",
        "name": "6x6 Cube",
        "type": "classic",
        "size": "6x6x6",
        "difficulty": 5,
        "description": "Expert level cube with 152 pieces.",
        "pieces": 152,
        "price": "$30-$70",
        "worldRecord": "1:09.00",
        "videoUrl": "https://www.youtube.com/watch?v=yGTKPfUjsB0",
        "buyLink": "https://www.amazon.com/s?k=6x6+rubiks+cube",
        "image": CUBE_IMG_3,
        "colorScheme": ["#FF0000", "#00FF00", "#0000FF", "#FFFF00", "#FFFFFF", "#FFA500"]
    }
]

patterns_data = [
    {
        "id": "p1",
        "name": "Checkerboard Pattern",
        "difficulty": "Easy",
        "description": "Creates an alternating checkerboard pattern on all faces.",
        "moves": "U2 D2 F2 B2 L2 R2",
        "image": CUBE_IMG_1
    },
    {
        "id": "p2",
        "name": "Cube in a Cube",
        "difficulty": "Medium",
        "description": "Creates a smaller cube pattern within the larger cube.",
        "moves": "F L F U' R U F2 L2 U' L' B D' B' L2 U",
        "image": CUBE_IMG_2
    },
    {
        "id": "p3",
        "name": "Superflip",
        "difficulty": "Hard",
        "description": "All edges are flipped while corners remain solved.",
        "moves": "U R2 F B R B2 R U2 L B2 R U' D' R2 F R' L B2 U2 F2",
        "image": CUBE_IMG_3
    },
    {
        "id": "p4",
        "name": "Six Spots",
        "difficulty": "Easy",
        "description": "Creates a dot pattern in the center of each face.",
        "moves": "U D' R L' F B' U D'",
        "image": CUBE_IMG_4
    }
]

flags_data = [
    {
        "id": "f1",
        "country": "USA",
        "name": "United States",
        "colors": ["Red", "White", "Blue"],
        "difficulty": "Medium",
        "videoUrl": "https://www.youtube.com/watch?v=example",
        "image": FLAG_USA
    },
    {
        "id": "f2",
        "country": "India",
        "name": "India",
        "colors": ["Saffron", "White", "Green", "Blue"],
        "difficulty": "Hard",
        "videoUrl": "https://www.youtube.com/watch?v=example",
        "image": FLAG_INDIA
    },
    {
        "id": "f3",
        "country": "Japan",
        "name": "Japan",
        "colors": ["Red", "White"],
        "difficulty": "Easy",
        "videoUrl": "https://www.youtube.com/watch?v=example",
        "image": FLAG_JAPAN
    },
    {
        "id": "f4",
        "country": "Brazil",
        "name": "Brazil",
        "colors": ["Green", "Yellow", "Blue", "White"],
        "difficulty": "Hard",
        "videoUrl": "https://www.youtube.com/watch?v=example",
        "image": FLAG_BRAZIL
    },
    {
        "id": "f5",
        "country": "France",
        "name": "France",
        "colors": ["Blue", "White", "Red"],
        "difficulty": "Easy",
        "videoUrl": "https://www.youtube.com/watch?v=example",
        "image": FLAG_FRANCE
    },
    {
        "id": "f6",
        "country": "Germany",
        "name": "Germany",
        "colors": ["Black", "Red", "Yellow"],
        "difficulty": "Easy",
        "videoUrl": "https://www.youtube.com/watch?v=example",
        "image": FLAG_GERMANY
    }
]

youtube_data = {
    "id": "yt1",
    "channelName": "CubeMaster Pro",
    "channelUrl": "https://www.youtube.com/@cubemaster",
    "subscribers": "250K",
    "description": "Learn advanced solving techniques, patterns, and tricks!",
    "featuredVideos": [
        {
            "id": "v1",
            "title": "Master the 3x3 Cube in 10 Minutes",
            "thumbnail": VIDEO_THUMB_1,
            "url": "https://www.youtube.com/watch?v=example1",
            "views": "1.2M"
        },
        {
            "id": "v2",
            "title": "Advanced F2L Techniques",
            "thumbnail": VIDEO_THUMB_2,
            "url": "https://www.youtube.com/watch?v=example2",
            "views": "850K"
        },
        {
            "id": "v3",
            "title": "Cool Cube Patterns Tutorial",
            "thumbnail": VIDEO_THUMB_3,
            "url": "https://www.youtube.com/watch?v=example3",
            "views": "620K"
        }
    ]
}

async def seed_database():
    print("Starting database seeding...")
    
    # Clear existing data
    await db.cubes.delete_many({})
    await db.patterns.delete_many({})
    await db.flags.delete_many({})
    await db.youtube_channels.delete_many({})
    
    print("Cleared existing collections")
    
    # Insert cubes
    if cubes_data:
        await db.cubes.insert_many(cubes_data)
        print(f"Inserted {len(cubes_data)} cubes")
    
    # Insert patterns
    if patterns_data:
        await db.patterns.insert_many(patterns_data)
        print(f"Inserted {len(patterns_data)} patterns")
    
    # Insert flags
    if flags_data:
        await db.flags.insert_many(flags_data)
        print(f"Inserted {len(flags_data)} flags")
    
    # Insert YouTube channel
    await db.youtube_channels.insert_one(youtube_data)
    print("Inserted YouTube channel data")
    
    print("Database seeding completed successfully!")

if __name__ == "__main__":
    asyncio.run(seed_database())

"""Add algorithms, history, and tips to existing cubes"""
import asyncio
from motor.motor_asyncio import AsyncIOMotorClient
import os
from dotenv import load_dotenv
from pathlib import Path

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

client = AsyncIOMotorClient(os.environ['MONGO_URL'])
db = client[os.environ['DB_NAME']]

# Detailed information per cube
cube_details = {
    "1": {
        "history": "The 2x2 Pocket Cube, also known as the Mini Cube, was invented in 1981 by Erno Rubik. It's the simplest variant of the famous Rubik's Cube, designed as a beginner-friendly entry point into speedcubing.",
        "inventor": "Erno Rubik",
        "year": "1981",
        "algorithms": [
            {"name": "Right Hand Algorithm (Sune)", "notation": "R U R' U R U2 R'", "purpose": "Orient last layer corners"},
            {"name": "Left Hand Algorithm (Anti-Sune)", "notation": "L' U' L U' L' U2 L", "purpose": "Mirror of Sune"},
            {"name": "Y-Permutation", "notation": "F R U' R' U' R U R' F' R U R' U' R' F R F'", "purpose": "Swap two diagonal corners"},
            {"name": "T-Permutation", "notation": "R U R' U' R' F R2 U' R' U' R U R' F'", "purpose": "Swap two adjacent corners"}
        ],
        "tips": [
            "Start by solving one face completely",
            "Learn corner orientation before permutation",
            "Practice the Sune algorithm until it becomes muscle memory",
            "Focus on look-ahead rather than speed initially",
            "The Ortega method is the most popular for speedsolving"
        ],
        "methods": ["Layer by Layer (LBL)", "Ortega", "CLL (Corners of Last Layer)", "EG (Erik-Gunnar)"],
        "tutorials": [
            {"title": "How to Solve a 2x2 Rubik's Cube - Beginner Tutorial", "url": "https://www.youtube.com/watch?v=GANnG5a19kg", "duration": "8 min"},
            {"title": "Advanced 2x2 Ortega Method", "url": "https://www.youtube.com/watch?v=jSEZBcK-J3o", "duration": "15 min"},
            {"title": "2x2 CLL Method Tutorial", "url": "https://www.youtube.com/watch?v=2A4M2pvvtgI", "duration": "20 min"}
        ]
    },
    "2": {
        "history": "The 3x3 Rubik's Cube was invented in 1974 by Hungarian sculptor Erno Rubik. Originally called the 'Magic Cube,' it became a worldwide sensation in the 1980s. Over 450 million cubes have been sold worldwide, making it one of the best-selling toys ever.",
        "inventor": "Erno Rubik",
        "year": "1974",
        "algorithms": [
            {"name": "Cross", "notation": "F R U' R' U' R U R' F'", "purpose": "Form a cross on first layer"},
            {"name": "F2L Pair Insert", "notation": "U R U' R'", "purpose": "Insert corner-edge pair"},
            {"name": "OLL - Sune", "notation": "R U R' U R U2 R'", "purpose": "Orient last layer"},
            {"name": "PLL - T-Perm", "notation": "R U R' U' R' F R2 U' R' U' R U R' F'", "purpose": "Permute last layer edges and corners"},
            {"name": "PLL - Y-Perm", "notation": "F R U' R' U' R U R' F' R U R' U' R' F R F'", "purpose": "Swap diagonal corners and edges"},
            {"name": "PLL - U-Perm", "notation": "R U' R U R U R U' R' U' R2", "purpose": "Cycle three edges"}
        ],
        "tips": [
            "Master the cross before moving to F2L",
            "Learn F2L intuitively rather than memorizing all cases",
            "Practice fingertricks to improve speed",
            "Lubricate your cube for smoother turning",
            "Practice with a timer to track improvement",
            "Learn 2-look OLL and PLL before full OLL/PLL"
        ],
        "methods": ["Beginner's Method", "CFOP (Fridrich)", "Roux", "ZZ", "Petrus"],
        "tutorials": [
            {"title": "How to Solve the Rubik's Cube - Beginner's Method", "url": "https://www.youtube.com/watch?v=7Ron6MN45LY", "duration": "20 min"},
            {"title": "CFOP Method - Full Tutorial", "url": "https://www.youtube.com/watch?v=R-R0KrXvWbc", "duration": "45 min"},
            {"title": "Sub-20 Speedcubing Tips", "url": "https://www.youtube.com/watch?v=p-V53AXNRpA", "duration": "12 min"}
        ]
    },
    "3": {
        "history": "The 4x4 cube, also called Rubik's Revenge, was invented by Peter Sebesteny in 1981. It introduced new challenges like parity errors that don't exist on the 3x3.",
        "inventor": "Peter Sebesteny",
        "year": "1981",
        "algorithms": [
            {"name": "OLL Parity", "notation": "Rw U2 x Rw U2 Rw U2 Rw' U2 Lw U2 Rw' U2 Rw U2 Rw' U2 Rw'", "purpose": "Fix orientation parity"},
            {"name": "PLL Parity", "notation": "Rw2 U2 Rw2 Uw2 Rw2 Uw2", "purpose": "Fix permutation parity"},
            {"name": "Center Reduction", "notation": "Uw R Uw' R' Uw R Uw'", "purpose": "Build center pieces"},
            {"name": "Edge Pairing", "notation": "Uw' R U R' F R' F' R Uw", "purpose": "Pair up edge pieces"}
        ],
        "tips": [
            "Solve centers first, then edges, then like a 3x3",
            "Learn to recognize parity cases quickly",
            "Yau method is fastest for big cubes",
            "Use slice turns (Rw, Uw) for efficiency",
            "Practice parity algorithms separately"
        ],
        "methods": ["Reduction Method", "Yau Method", "Hoya Method", "Cage Method"],
        "tutorials": [
            {"title": "How to Solve a 4x4 Cube - Reduction Method", "url": "https://www.youtube.com/watch?v=KWOZHbDdOeo", "duration": "25 min"},
            {"title": "Yau Method Tutorial", "url": "https://www.youtube.com/watch?v=2H0FRf7gS3M", "duration": "30 min"},
            {"title": "Parity Algorithms Explained", "url": "https://www.youtube.com/watch?v=xKnv1NQNi6w", "duration": "15 min"}
        ]
    },
    "4": {
        "history": "The 5x5 cube, known as the Professor's Cube, was created by Udo Krell in 1981. It's significantly more complex than smaller cubes due to its increased number of pieces and movements.",
        "inventor": "Udo Krell",
        "year": "1981",
        "algorithms": [
            {"name": "Center Building", "notation": "Uw R Uw' R'", "purpose": "Form 3x3 center blocks"},
            {"name": "Edge Tripling", "notation": "Uw' R U R' F R' F' R Uw", "purpose": "Group three edges"},
            {"name": "Last Center Algorithm", "notation": "Rw U R' U' Rw' F R F'", "purpose": "Solve last center"},
            {"name": "Edge Flip", "notation": "Rw U R U' Rw' F R' F'", "purpose": "Flip a middle edge"}
        ],
        "tips": [
            "Patience is key - 5x5 takes practice",
            "Build all 6 centers using 3x3 logic",
            "Pair edges efficiently using slot method",
            "No parity errors like 4x4!",
            "Use finger tricks designed for big cubes"
        ],
        "methods": ["Reduction Method", "Yau5", "Roux for big cubes"],
        "tutorials": [
            {"title": "How to Solve a 5x5 Cube", "url": "https://www.youtube.com/watch?v=d1I-jJl4PL8", "duration": "30 min"},
            {"title": "5x5 Advanced Techniques", "url": "https://www.youtube.com/watch?v=KAW_oTPWNlA", "duration": "25 min"},
            {"title": "Yau5 Method Tutorial", "url": "https://www.youtube.com/watch?v=pFn5DslN8N0", "duration": "40 min"}
        ]
    },
    "5": {
        "history": "The Pyraminx was invented and patented by Uwe Mèffert in 1971, even before the Rubik's Cube. It became popular in the 1980s during the cube craze and is one of the most popular twisty puzzles.",
        "inventor": "Uwe Mèffert",
        "year": "1971",
        "algorithms": [
            {"name": "Tip Solving", "notation": "U or U'", "purpose": "Align tip stickers"},
            {"name": "L4E First Algorithm", "notation": "R U R' U R U R'", "purpose": "Last 4 edges case 1"},
            {"name": "L4E Second Algorithm", "notation": "R' L R L'", "purpose": "Last 4 edges case 2"},
            {"name": "Keyhole Method", "notation": "U R U' L' U R'", "purpose": "Block-building approach"}
        ],
        "tips": [
            "Solve tips first - they're independent",
            "Then solve one face with centers",
            "L4E (Last 4 Edges) is the key skill",
            "Look ahead to next moves while executing",
            "Practice with a timer to break sub-5 seconds"
        ],
        "methods": ["Layer by Layer", "Keyhole Method", "Top First", "Oka Method", "Nutella Method"],
        "tutorials": [
            {"title": "How to Solve a Pyraminx", "url": "https://www.youtube.com/watch?v=2H0FRf7gS3M", "duration": "10 min"},
            {"title": "Advanced Pyraminx Techniques", "url": "https://www.youtube.com/watch?v=AhBkdY2X9DM", "duration": "15 min"},
            {"title": "Sub-3 Pyraminx Tutorial", "url": "https://www.youtube.com/watch?v=KAW_oTPWNlA", "duration": "20 min"}
        ]
    },
    "6": {
        "history": "The Megaminx was first manufactured in the early 1980s. It has 12 faces (dodecahedron) and is one of the most popular non-cube twisty puzzles in WCA competitions.",
        "inventor": "Christoph Bandelow & Uwe Mèffert",
        "year": "1981",
        "algorithms": [
            {"name": "F2L for Megaminx", "notation": "U R U' R'", "purpose": "Insert corner-edge pairs"},
            {"name": "Last Layer Corners", "notation": "R U R' U R U2 R'", "purpose": "Orient last face corners"},
            {"name": "Edge Permutation", "notation": "R U R' U R U2 R' U", "purpose": "Cycle edges"},
            {"name": "Sune for Megaminx", "notation": "R U R' U R U2 R'", "purpose": "Orient last layer"}
        ],
        "tips": [
            "It's like a 3x3 with more faces - apply similar logic",
            "Solve in layers: white star, then layer 1, 2, etc.",
            "Use 'Sune' algorithm extensively",
            "Look-ahead is critical for big puzzles",
            "Final 2 faces require special algorithms"
        ],
        "methods": ["Westlund Method", "Beginner LBL for Megaminx", "Cieplikowski Method"],
        "tutorials": [
            {"title": "How to Solve a Megaminx - Beginner", "url": "https://www.youtube.com/watch?v=JJmMV-tRdWw", "duration": "30 min"},
            {"title": "Megaminx Speedsolving", "url": "https://www.youtube.com/watch?v=Wf8GQYAFwxk", "duration": "25 min"},
            {"title": "Last Slot of Megaminx", "url": "https://www.youtube.com/watch?v=Ng3T4kx0URE", "duration": "15 min"}
        ]
    },
    "7": {
        "history": "The Skewb was invented in 1982 by Tony Durham. It's a corner-turning twisty puzzle with unique mechanics that make it different from face-turning cubes.",
        "inventor": "Tony Durham",
        "year": "1982",
        "algorithms": [
            {"name": "Sledgehammer", "notation": "R' F R F'", "purpose": "Cycle 3 corners and edges"},
            {"name": "Hedgeslammer", "notation": "F R' F' R", "purpose": "Inverse of Sledgehammer"},
            {"name": "Z-Perm", "notation": "R' L R L' U L' U' L", "purpose": "Permute last layer"},
            {"name": "Pi Case", "notation": "R B' R B R", "purpose": "Sarah's Method case"}
        ],
        "tips": [
            "Skewb only has 4 movable corners (one per face)",
            "Sarah's Method is the most popular",
            "Solve one face, then last layer",
            "Sledgehammer is the most-used algorithm",
            "Look-ahead is easy due to simple mechanics"
        ],
        "methods": ["Sarah's Method", "Rubik's Beginner Method", "Monkeydude method"],
        "tutorials": [
            {"title": "How to Solve a Skewb", "url": "https://www.youtube.com/watch?v=vLDphHFY0Pw", "duration": "10 min"},
            {"title": "Sarah's Method Tutorial", "url": "https://www.youtube.com/watch?v=4_VZzwsdULg", "duration": "15 min"},
            {"title": "Sub-3 Skewb Tutorial", "url": "https://www.youtube.com/watch?v=oQ8K0HSEK8E", "duration": "20 min"}
        ]
    },
    "8": {
        "history": "The Square-1 was invented in 1990 by Karel Hrsel and Vojtech Kopsky. It's known for its unique shape-shifting property, making it one of the most challenging WCA puzzles.",
        "inventor": "Karel Hrsel & Vojtech Kopsky",
        "year": "1990",
        "algorithms": [
            {"name": "Cube Shape", "notation": "(1,0)/(-1,-1)/(0,1)", "purpose": "Restore to cube shape"},
            {"name": "Corner Orientation", "notation": "/(3,3)/(-3,-3)/", "purpose": "Orient corners"},
            {"name": "Edge Orientation", "notation": "/(0,-1)/(0,1)/", "purpose": "Orient edges"},
            {"name": "Adj Corner Swap", "notation": "(-3,0)/(0,3)/(0,-3)/(3,0)", "purpose": "Swap adjacent corners"}
        ],
        "tips": [
            "First step: restore to cube shape",
            "Use slice notation (top, bottom) for moves",
            "Notation is unique: (top_turns, bottom_turns)",
            "Parity exists like 4x4",
            "Memorize cubeshape algorithms first"
        ],
        "methods": ["Vandenbergh Method", "Lin Method", "Roux for Square-1"],
        "tutorials": [
            {"title": "How to Solve a Square-1", "url": "https://www.youtube.com/watch?v=Pc551ma83uk", "duration": "25 min"},
            {"title": "Square-1 Advanced", "url": "https://www.youtube.com/watch?v=2oPRzMxSxQs", "duration": "30 min"},
            {"title": "Cubeshape Algorithms", "url": "https://www.youtube.com/watch?v=lqQS5IzqEjs", "duration": "15 min"}
        ]
    },
    "9": {
        "history": "The Mirror Cube was invented by Hidetoshi Takeji in 2006. Unlike traditional cubes, it's solved by shape and reflection rather than color, providing a unique visual challenge.",
        "inventor": "Hidetoshi Takeji",
        "year": "2006",
        "algorithms": [
            {"name": "3x3 OLL Sune", "notation": "R U R' U R U2 R'", "purpose": "Orient last layer (same as 3x3)"},
            {"name": "3x3 PLL T-Perm", "notation": "R U R' U' R' F R2 U' R' U' R U R' F'", "purpose": "Permute last layer"},
            {"name": "Edge Flip", "notation": "F R U R' U' F'", "purpose": "Flip last layer edges"},
            {"name": "F2L Pair", "notation": "U R U' R'", "purpose": "Insert pair into slot"}
        ],
        "tips": [
            "Same algorithms as 3x3 - just look at shape",
            "Pieces have different sizes - recognize by reflection",
            "Centers are tricky to identify",
            "Lighting affects recognition",
            "Practice in good lighting conditions"
        ],
        "methods": ["CFOP (using shape)", "Beginner's Method", "Layer by Layer"],
        "tutorials": [
            {"title": "How to Solve a Mirror Cube", "url": "https://www.youtube.com/watch?v=OAtkURSPBy4", "duration": "15 min"},
            {"title": "Mirror Cube Tips and Tricks", "url": "https://www.youtube.com/watch?v=jVxabqv4HXk", "duration": "10 min"},
            {"title": "Solving Mirror Cube Blindfolded", "url": "https://www.youtube.com/watch?v=4VtKvbY4FRg", "duration": "20 min"}
        ]
    },
    "10": {
        "history": "The 6x6 Cube, also known as V-Cube 6, was patented by Panagiotis Verdes in 2002 and released in 2008. It's significantly more complex than smaller cubes.",
        "inventor": "Panagiotis Verdes",
        "year": "2008",
        "algorithms": [
            {"name": "Center Building", "notation": "3Uw R 3Uw' R'", "purpose": "Build 4x4 center blocks"},
            {"name": "OLL Parity", "notation": "Rw U2 Rw U2 Rw U2 Rw' U2 Lw U2 Rw' U2 Rw U2 Rw' U2 Rw'", "purpose": "Fix OLL parity"},
            {"name": "PLL Parity", "notation": "Rw2 F2 U2 Rw2 U2 F2 Rw2", "purpose": "Fix PLL parity"},
            {"name": "Edge Pairing", "notation": "3Uw' R U R' F R' F' R 3Uw", "purpose": "Pair 6 edges at once"}
        ],
        "tips": [
            "Expect 10-20 minutes for first solves",
            "Lubricate well - it's a heavy cube",
            "Both OLL and PLL parity can occur",
            "Build outer layer last (centers, edges, corners)",
            "Practice slice turns extensively"
        ],
        "methods": ["Reduction Method", "Yau6 Method", "K6 Method"],
        "tutorials": [
            {"title": "How to Solve a 6x6 Cube", "url": "https://www.youtube.com/watch?v=yGTKPfUjsB0", "duration": "45 min"},
            {"title": "6x6 Speedsolving", "url": "https://www.youtube.com/watch?v=hWQNxFJqcG4", "duration": "35 min"},
            {"title": "6x6 Parity Algorithms", "url": "https://www.youtube.com/watch?v=L9npzWzKKB4", "duration": "20 min"}
        ]
    }
}

async def update_cubes():
    for cube_id, details in cube_details.items():
        result = await db.cubes.update_one(
            {"id": cube_id},
            {"$set": details}
        )
        print(f"Updated cube {cube_id}: {result.modified_count} doc(s)")
    print("Done!")

if __name__ == "__main__":
    asyncio.run(update_cubes())

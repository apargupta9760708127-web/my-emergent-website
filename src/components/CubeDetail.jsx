import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Header } from './Header';
import { Footer } from './Footer';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import {
  ArrowLeft, Youtube, ShoppingCart, Loader2, Calendar,
  User, Trophy, DollarSign, Box, Sparkles, BookOpen, Lightbulb, Play
} from 'lucide-react';
import { toast } from 'sonner';
import { Puzzle3D } from './Puzzle3D';

const BACKEND_URL = "https://CubeGod-backend.onrender.com";
const API = `${BACKEND_URL}/api`;

const difficultyColors = {
  1: 'bg-green-100 text-green-800 border-green-300',
  2: 'bg-blue-100 text-blue-800 border-blue-300',
  3: 'bg-yellow-100 text-yellow-800 border-yellow-300',
  4: 'bg-orange-100 text-orange-800 border-orange-300',
  5: 'bg-red-100 text-red-800 border-red-300'
};

const difficultyLabels = {
  1: 'Beginner', 2: 'Easy', 3: 'Medium', 4: 'Hard', 5: 'Expert'
};

// Helper to render an NxN cube face - GAN-style with rounded stickers and gloss
const CubeFace = ({ size, faceColor }) => {
  const gridCols = { 2: 'grid-cols-2', 3: 'grid-cols-3', 4: 'grid-cols-4', 5: 'grid-cols-5', 6: 'grid-cols-6' };
  const gap = size <= 3 ? 'gap-1.5' : size <= 4 ? 'gap-1' : 'gap-0.5';
  return (
    <div
      className={`grid ${gridCols[size]} ${gap} h-full w-full`}
      style={{
        padding: size <= 3 ? '8px' : '6px',
        background: 'linear-gradient(135deg, #2a2a2a 0%, #1a1a1a 100%)',
        borderRadius: '14px'
      }}
    >
      {[...Array(size * size)].map((_, i) => (
        <div
          key={i}
          style={{
            background: `radial-gradient(circle at 30% 25%, ${lightenColor(faceColor, 35)} 0%, ${lightenColor(faceColor, 10)} 55%, ${faceColor} 100%)`,
            borderRadius: size <= 3 ? '8px' : '4px',
            boxShadow: 'inset 0 1px 2px rgba(255,255,255,0.5), inset 0 -1px 1px rgba(0,0,0,0.15)'
          }}
        />
      ))}
    </div>
  );
};

// Helper functions for color manipulation
function lightenColor(hex, percent) {
  if (!hex || !hex.startsWith('#')) return hex;
  const num = parseInt(hex.slice(1), 16);
  let r = (num >> 16) + percent * 2.55;
  let g = ((num >> 8) & 0xff) + percent * 2.55;
  let b = (num & 0xff) + percent * 2.55;
  r = Math.min(255, Math.max(0, r));
  g = Math.min(255, Math.max(0, g));
  b = Math.min(255, Math.max(0, b));
  return `#${((r << 16) | (g << 8) | b).toString(16).padStart(6, '0')}`;
}

function darkenColor(hex, percent) {
  return lightenColor(hex, -percent);
}

// 3D Pyraminx (tetrahedron) - GAN-style premium look
const LargePyraminx = ({ colors }) => {
  const [rot, setRot] = useState(0);
  useEffect(() => {
    const i = setInterval(() => setRot(r => r + 1), 50);
    return () => clearInterval(i);
  }, []);

  // Premium sticker with gradient
  const Sticker = ({ color, points, id }) => (
    <g>
      <defs>
        <radialGradient id={`pyr-${id}`} cx="30%" cy="30%">
          <stop offset="0%" stopColor={lightenColor(color, 20)} />
          <stop offset="60%" stopColor={color} />
          <stop offset="100%" stopColor={darkenColor(color, 15)} />
        </radialGradient>
      </defs>
      <polygon
        points={points}
        fill={`url(#pyr-${id})`}
        stroke="#0a0a0a"
        strokeWidth="2"
        strokeLinejoin="round"
        rx="4"
      />
    </g>
  );

  return (
    <div className="flex items-center justify-center w-full h-80">
      <svg viewBox="0 0 320 300" className="w-72 h-72" style={{ transform: `rotateY(${rot}deg)`, transition: 'transform 0.05s linear', filter: 'drop-shadow(0 15px 25px rgba(0,0,0,0.3))' }}>
        <defs>
          <linearGradient id="pyrBase" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#2a2a2a" />
            <stop offset="100%" stopColor="#0a0a0a" />
          </linearGradient>
        </defs>
        {/* Outer pyramid with shadow */}
        <polygon points="160,25 25,275 295,275" fill="url(#pyrBase)" stroke="#000" strokeWidth="3" strokeLinejoin="round" rx="12" />
        {/* Tip sticker */}
        <Sticker id="0" color={colors[0]} points="160,35 132,90 188,90" />
        {/* Row 2 */}
        <Sticker id="1" color={colors[1]} points="132,90 100,158 160,158" />
        <Sticker id="2" color={colors[2]} points="188,90 160,158 220,158" />
        <Sticker id="3" color={colors[3]} points="132,90 160,158 188,90" />
        {/* Row 3 */}
        <Sticker id="4" color={colors[0]} points="100,158 70,225 130,225" />
        <Sticker id="5" color={colors[1]} points="160,158 130,225 190,225" />
        <Sticker id="6" color={colors[2]} points="220,158 190,225 250,225" />
        <Sticker id="7" color={colors[3]} points="100,158 130,225 160,158" />
        <Sticker id="8" color={colors[0]} points="160,158 190,225 220,158" />
        {/* Bottom row */}
        <Sticker id="9" color={colors[1]} points="70,225 40,275 100,275" />
        <Sticker id="10" color={colors[2]} points="130,225 100,275 160,275" />
        <Sticker id="11" color={colors[3]} points="190,225 160,275 220,275" />
        <Sticker id="12" color={colors[0]} points="250,225 220,275 280,275" />
        <Sticker id="13" color={colors[1]} points="70,225 100,275 130,225" />
        <Sticker id="14" color={colors[2]} points="130,225 160,275 190,225" />
        <Sticker id="15" color={colors[3]} points="190,225 220,275 250,225" />
        {/* Highlight overlay */}
        <polygon points="160,25 132,90 188,90" fill="rgba(255,255,255,0.15)" />
      </svg>
    </div>
  );
};

// 3D Skewb (corner-turning cube) - GAN-style premium
const LargeSkewb = ({ colors }) => {
  const [rot, setRot] = useState({ x: -20, y: 30 });
  useEffect(() => {
    const i = setInterval(() => setRot(r => ({ x: r.x, y: r.y + 1 })), 50);
    return () => clearInterval(i);
  }, []);

  const size = 200;
  const SkewbFace = ({ baseColor, centerColor }) => (
    <div
      className="relative w-full h-full"
      style={{
        background: 'linear-gradient(135deg, #1a1a1a 0%, #0a0a0a 100%)',
        borderRadius: '14px',
        padding: '6px'
      }}
    >
      <svg viewBox="0 0 100 100" className="w-full h-full">
        <defs>
          <radialGradient id={`sk1-${baseColor}`} cx="30%" cy="30%">
            <stop offset="0%" stopColor={lightenColor(baseColor, 20)} />
            <stop offset="100%" stopColor={darkenColor(baseColor, 10)} />
          </radialGradient>
          <radialGradient id={`sk2-${centerColor}`} cx="30%" cy="30%">
            <stop offset="0%" stopColor={lightenColor(centerColor, 20)} />
            <stop offset="100%" stopColor={darkenColor(centerColor, 10)} />
          </radialGradient>
        </defs>
        <polygon points="3,3 97,3 50,50" fill={`url(#sk2-${centerColor})`} stroke="#0a0a0a" strokeWidth="1.5" strokeLinejoin="round" />
        <polygon points="97,3 97,97 50,50" fill={`url(#sk1-${baseColor})`} stroke="#0a0a0a" strokeWidth="1.5" strokeLinejoin="round" />
        <polygon points="97,97 3,97 50,50" fill={`url(#sk2-${centerColor})`} stroke="#0a0a0a" strokeWidth="1.5" strokeLinejoin="round" />
        <polygon points="3,97 3,3 50,50" fill={`url(#sk1-${baseColor})`} stroke="#0a0a0a" strokeWidth="1.5" strokeLinejoin="round" />
        {/* Center diamond */}
        <polygon points="50,30 70,50 50,70 30,50" fill={`url(#sk1-${baseColor})`} stroke="#0a0a0a" strokeWidth="1.5" strokeLinejoin="round" />
        {/* Gloss highlight */}
        <ellipse cx="35" cy="30" rx="20" ry="8" fill="rgba(255,255,255,0.2)" />
      </svg>
    </div>
  );

  return (
    <div className="flex items-center justify-center w-full h-80 relative" style={{ perspective: '1000px' }}>
      <div
        className="absolute"
        style={{
          bottom: '12%', left: '50%', transform: 'translateX(-50%)',
          width: `${size * 0.9}px`, height: '18px',
          background: 'radial-gradient(ellipse, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0) 70%)',
          filter: 'blur(8px)'
        }}
      />
      <div
        className="relative"
        style={{
          width: size, height: size,
          transformStyle: 'preserve-3d',
          transform: `rotateX(${rot.x}deg) rotateY(${rot.y}deg)`
        }}
      >
        {(() => {
          const faceStyle = (transform) => ({ width: size, height: size, transform, borderRadius: '14px' });
          return (
            <>
              <div className="absolute" style={faceStyle(`translateZ(${size / 2}px)`)}>
                <SkewbFace baseColor={lightenColor(colors[0], 8)} centerColor={lightenColor(colors[5 % colors.length], 8)} />
              </div>
              <div className="absolute" style={faceStyle(`translateZ(-${size / 2}px) rotateY(180deg)`)}>
                <SkewbFace baseColor={lightenColor(colors[1], 8)} centerColor={lightenColor(colors[4 % colors.length], 8)} />
              </div>
              <div className="absolute" style={faceStyle(`rotateY(-90deg) translateZ(${size / 2}px)`)}>
                <SkewbFace baseColor={lightenColor(colors[2], 8)} centerColor={lightenColor(colors[0], 8)} />
              </div>
              <div className="absolute" style={faceStyle(`rotateY(90deg) translateZ(${size / 2}px)`)}>
                <SkewbFace baseColor={lightenColor(colors[3], 8)} centerColor={lightenColor(colors[1], 8)} />
              </div>
              <div className="absolute" style={faceStyle(`rotateX(90deg) translateZ(${size / 2}px)`)}>
                <SkewbFace baseColor={lightenColor(colors[4 % colors.length], 8)} centerColor={lightenColor(colors[2], 8)} />
              </div>
              <div className="absolute" style={faceStyle(`rotateX(-90deg) translateZ(${size / 2}px)`)}>
                <SkewbFace baseColor={lightenColor(colors[5 % colors.length], 8)} centerColor={lightenColor(colors[3], 8)} />
              </div>
            </>
          );
        })()}
      </div>
    </div>
  );
};

// 3D Square-1 - GAN-style premium
const LargeSquare1 = ({ colors }) => {
  const [rot, setRot] = useState({ x: -20, y: 30 });
  useEffect(() => {
    const i = setInterval(() => setRot(r => ({ x: r.x, y: r.y + 1 })), 50);
    return () => clearInterval(i);
  }, []);

  const size = 200;
  const Sq1Face = ({ topColor, midColor, botColor }) => (
    <div
      className="relative w-full h-full"
      style={{
        background: 'linear-gradient(135deg, #1a1a1a 0%, #0a0a0a 100%)',
        borderRadius: '14px',
        padding: '5px'
      }}
    >
      <svg viewBox="0 0 100 100" className="w-full h-full">
        <defs>
          <radialGradient id={`sq1t-${topColor}`} cx="30%" cy="30%">
            <stop offset="0%" stopColor={lightenColor(topColor, 20)} />
            <stop offset="100%" stopColor={darkenColor(topColor, 10)} />
          </radialGradient>
          <radialGradient id={`sq1m-${midColor}`} cx="30%" cy="50%">
            <stop offset="0%" stopColor={lightenColor(midColor, 20)} />
            <stop offset="100%" stopColor={darkenColor(midColor, 10)} />
          </radialGradient>
          <radialGradient id={`sq1b-${botColor}`} cx="30%" cy="70%">
            <stop offset="0%" stopColor={lightenColor(botColor, 20)} />
            <stop offset="100%" stopColor={darkenColor(botColor, 10)} />
          </radialGradient>
        </defs>
        {/* Top irregular layer */}
        <polygon points="3,3 35,3 45,30 3,30" fill={`url(#sq1t-${topColor})`} stroke="#0a0a0a" strokeWidth="1.5" strokeLinejoin="round" />
        <polygon points="35,3 65,3 55,30 45,30" fill={`url(#sq1m-${midColor})`} stroke="#0a0a0a" strokeWidth="1.5" strokeLinejoin="round" />
        <polygon points="65,3 97,3 97,30 55,30" fill={`url(#sq1t-${topColor})`} stroke="#0a0a0a" strokeWidth="1.5" strokeLinejoin="round" />
        {/* Middle strip */}
        <rect x="3" y="30" width="94" height="20" rx="2" fill={`url(#sq1m-${midColor})`} stroke="#0a0a0a" strokeWidth="1.5" />
        <rect x="3" y="50" width="94" height="20" rx="2" fill={`url(#sq1m-${midColor})`} stroke="#0a0a0a" strokeWidth="1.5" opacity="0.85" />
        {/* Bottom irregular layer */}
        <polygon points="3,70 45,70 35,97 3,97" fill={`url(#sq1b-${botColor})`} stroke="#0a0a0a" strokeWidth="1.5" strokeLinejoin="round" />
        <polygon points="45,70 55,70 65,97 35,97" fill={`url(#sq1m-${midColor})`} stroke="#0a0a0a" strokeWidth="1.5" strokeLinejoin="round" />
        <polygon points="55,70 97,70 97,97 65,97" fill={`url(#sq1b-${botColor})`} stroke="#0a0a0a" strokeWidth="1.5" strokeLinejoin="round" />
        {/* Gloss */}
        <ellipse cx="30" cy="20" rx="22" ry="10" fill="rgba(255,255,255,0.2)" />
      </svg>
    </div>
  );

  const faceStyle = (transform) => ({
    width: size, height: size, transform,
    boxShadow: '0 8px 32px rgba(0,0,0,0.25)'
  });

  return (
    <div className="flex items-center justify-center w-full h-80 relative" style={{ perspective: '1000px' }}>
      <div
        className="absolute"
        style={{
          bottom: '12%', left: '50%', transform: 'translateX(-50%)',
          width: `${size * 0.9}px`, height: '18px',
          background: 'radial-gradient(ellipse, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0) 70%)',
          filter: 'blur(8px)'
        }}
      />
      <div
        className="relative"
        style={{
          width: size, height: size,
          transformStyle: 'preserve-3d',
          transform: `rotateX(${rot.x}deg) rotateY(${rot.y}deg)`
        }}
      >
        <div className="absolute" style={faceStyle(`translateZ(${size / 2}px)`)}>
          <Sq1Face topColor={colors[0]} midColor={colors[3 % colors.length]} botColor={colors[5 % colors.length]} />
        </div>
        <div className="absolute" style={faceStyle(`translateZ(-${size / 2}px) rotateY(180deg)`)}>
          <Sq1Face topColor={colors[1]} midColor={colors[4 % colors.length]} botColor={colors[0]} />
        </div>
        <div className="absolute" style={faceStyle(`rotateY(-90deg) translateZ(${size / 2}px)`)}>
          <Sq1Face topColor={colors[4 % colors.length]} midColor={colors[3 % colors.length]} botColor={colors[2]} />
        </div>
        <div className="absolute" style={faceStyle(`rotateY(90deg) translateZ(${size / 2}px)`)}>
          <Sq1Face topColor={colors[2]} midColor={colors[4 % colors.length]} botColor={colors[1]} />
        </div>
        <div className="absolute" style={{
          width: size, height: size,
          transform: `rotateX(90deg) translateZ(${size / 2}px)`,
          background: `radial-gradient(circle at 30% 30%, ${lightenColor(colors[2 % colors.length], 15)}, ${colors[2 % colors.length]})`,
          borderRadius: '14px',
          boxShadow: '0 8px 32px rgba(0,0,0,0.25)'
        }} />
        <div className="absolute" style={{
          width: size, height: size,
          transform: `rotateX(-90deg) translateZ(${size / 2}px)`,
          background: `radial-gradient(circle at 30% 30%, ${lightenColor(colors[3 % colors.length], 15)}, ${colors[3 % colors.length]})`,
          borderRadius: '14px',
          boxShadow: '0 8px 32px rgba(0,0,0,0.25)'
        }} />
      </div>
    </div>
  );
};

// 3D Mirror Cube - GAN-style premium with metallic shine
const LargeMirrorCube = ({ colors }) => {
  const [rot, setRot] = useState({ x: -20, y: 30 });
  useEffect(() => {
    const i = setInterval(() => setRot(r => ({ x: r.x, y: r.y + 1 })), 50);
    return () => clearInterval(i);
  }, []);

  const size = 200;
  const MirrorFace = ({ color }) => {
    const cols = [28, 38, 34];
    const rows = [30, 40, 30];
    let y = 4;
    const rects = [];
    for (let r = 0; r < 3; r++) {
      let x = 4;
      for (let c = 0; c < 3; c++) {
        const w = cols[c] - 1;
        const h = rows[r] - 1;
        rects.push(
          <rect
            key={`${r}-${c}`}
            x={x} y={y} width={w} height={h}
            rx="3"
            fill={`url(#mirGrad-${r}-${c})`}
            stroke="#0a0a0a"
            strokeWidth="0.8"
          />
        );
        x += cols[c];
      }
      y += rows[r];
    }
    return (
      <div
        className="relative w-full h-full"
        style={{
          background: 'linear-gradient(135deg, #1a1a1a 0%, #0a0a0a 100%)',
          borderRadius: '14px',
          padding: '4px'
        }}
      >
        <svg viewBox="0 0 100 100" className="w-full h-full" preserveAspectRatio="none">
          <defs>
            {[0, 1, 2].map(r =>
              [0, 1, 2].map(c => (
                <linearGradient key={`${r}-${c}`} id={`mirGrad-${r}-${c}`} x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor={lightenColor(color, 25)} />
                  <stop offset="50%" stopColor={color} />
                  <stop offset="100%" stopColor={darkenColor(color, 15)} />
                </linearGradient>
              ))
            )}
          </defs>
          {rects}
          {/* Metallic shine overlay */}
          <ellipse cx="30" cy="25" rx="35" ry="15" fill="rgba(255,255,255,0.3)" />
        </svg>
      </div>
    );
  };

  const faceStyle = (transform) => ({
    width: size, height: size, transform,
    boxShadow: '0 8px 32px rgba(0,0,0,0.3)'
  });

  return (
    <div className="flex items-center justify-center w-full h-80 relative" style={{ perspective: '1000px' }}>
      <div
        className="absolute"
        style={{
          bottom: '12%', left: '50%', transform: 'translateX(-50%)',
          width: `${size * 0.9}px`, height: '18px',
          background: 'radial-gradient(ellipse, rgba(0,0,0,0.45) 0%, rgba(0,0,0,0) 70%)',
          filter: 'blur(8px)'
        }}
      />
      <div
        className="relative"
        style={{
          width: size, height: size,
          transformStyle: 'preserve-3d',
          transform: `rotateX(${rot.x}deg) rotateY(${rot.y}deg)`
        }}
      >
        {[0, 1, 2, 3, 4, 5].map((i) => {
          const transforms = [
            `translateZ(${size / 2}px)`,
            `translateZ(-${size / 2}px) rotateY(180deg)`,
            `rotateY(-90deg) translateZ(${size / 2}px)`,
            `rotateY(90deg) translateZ(${size / 2}px)`,
            `rotateX(90deg) translateZ(${size / 2}px)`,
            `rotateX(-90deg) translateZ(${size / 2}px)`
          ];
          const shades = ['#E5E5E7', '#C0C0C0', '#9CA3AF', '#6B7280', '#F3F4F6', '#D1D5DB'];
          return (
            <div key={i} className="absolute" style={faceStyle(transforms[i])}>
              <MirrorFace color={shades[i]} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

// 3D Megaminx (dodecahedron) - proper 3D with rotating SVG dodecahedron
const LargeMegaminx = ({ colors }) => {
  const [rot, setRot] = useState(0);
  useEffect(() => {
    const i = setInterval(() => setRot(r => r + 0.8), 50);
    return () => clearInterval(i);
  }, []);

  // Generate dodecahedron vertices and project to 2D for current rotation
  const phi = (1 + Math.sqrt(5)) / 2;
  const a = 1, b = 1 / phi, c = phi;

  // 20 vertices of a regular dodecahedron
  const vertices = [
    [a, a, a], [a, a, -a], [a, -a, a], [a, -a, -a],
    [-a, a, a], [-a, a, -a], [-a, -a, a], [-a, -a, -a],
    [0, b, c], [0, b, -c], [0, -b, c], [0, -b, -c],
    [b, c, 0], [b, -c, 0], [-b, c, 0], [-b, -c, 0],
    [c, 0, b], [c, 0, -b], [-c, 0, b], [-c, 0, -b]
  ];

  // 12 pentagonal faces (vertex indices)
  const faces = [
    [0, 8, 10, 2, 16],   // front-right-top
    [0, 16, 17, 1, 12],  // right
    [12, 1, 9, 14, 0],   // ??? recheck
  ];

  // Correct faces of a regular dodecahedron
  const dodFaces = [
    [0, 16, 2, 10, 8],
    [0, 8, 4, 14, 12],
    [16, 17, 1, 12, 0],
    [1, 9, 11, 3, 17],
    [1, 12, 14, 5, 9],
    [2, 13, 15, 6, 10],
    [13, 3, 17, 16, 2],
    [3, 11, 7, 15, 13],
    [4, 8, 10, 6, 18],
    [14, 4, 18, 19, 5],
    [5, 19, 7, 11, 9],
    [15, 7, 19, 18, 6]
  ];

  const cosY = Math.cos(rot * Math.PI / 180);
  const sinY = Math.sin(rot * Math.PI / 180);
  const cosX = Math.cos(-20 * Math.PI / 180);
  const sinX = Math.sin(-20 * Math.PI / 180);

  // Rotate and project each vertex
  const projected = vertices.map(([x, y, z]) => {
    // Rotate around Y axis
    let x1 = x * cosY + z * sinY;
    let z1 = -x * sinY + z * cosY;
    let y1 = y;
    // Rotate around X axis
    const y2 = y1 * cosX - z1 * sinX;
    const z2 = y1 * sinX + z1 * cosX;
    // Perspective
    const scale = 70;
    const cx = 160, cy = 160;
    return { x: cx + x1 * scale, y: cy - y2 * scale, z: z2 };
  });

  // Sort faces by average z (back to front)
  const facesWithDepth = dodFaces.map((face, idx) => {
    const avgZ = face.reduce((sum, v) => sum + projected[v].z, 0) / face.length;
    return { face, idx, avgZ };
  }).sort((a, b) => a.avgZ - b.avgZ);

  return (
    <div className="flex items-center justify-center w-full h-80">
      <svg viewBox="0 0 320 320" className="w-72 h-72">
        <defs>
          <filter id="megaminxShadow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur in="SourceAlpha" stdDeviation="3" />
            <feOffset dx="2" dy="3" result="offsetblur" />
            <feComponentTransfer>
              <feFuncA type="linear" slope="0.3" />
            </feComponentTransfer>
            <feMerge>
              <feMergeNode />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        {facesWithDepth.map(({ face, idx, avgZ }) => {
          const points = face.map(v => `${projected[v].x},${projected[v].y}`).join(' ');
          // Compute face center
          const cx = face.reduce((sum, v) => sum + projected[v].x, 0) / face.length;
          const cy = face.reduce((sum, v) => sum + projected[v].y, 0) / face.length;
          // Shading based on depth
          const brightness = Math.max(0.5, Math.min(1, 0.7 + avgZ * 0.15));
          const baseColor = colors[idx % colors.length];
          return (
            <g key={idx}>
              <polygon
                points={points}
                fill={baseColor}
                stroke="#1a1a1a"
                strokeWidth="2"
                opacity={brightness}
              />
              {/* Inner stickers - 5 trapezoidal + 5 triangle corner + 1 center pentagon */}
              {face.map((v, i) => {
                const next = face[(i + 1) % 5];
                const px = projected[v].x;
                const py = projected[v].y;
                const nx = projected[next].x;
                const ny = projected[next].y;
                // Inner edge pieces - shrink toward center
                const ip1x = px + (cx - px) * 0.4;
                const ip1y = py + (cy - py) * 0.4;
                const ip2x = nx + (cx - nx) * 0.4;
                const ip2y = ny + (cy - ny) * 0.4;
                return (
                  <polygon
                    key={i}
                    points={`${px},${py} ${nx},${ny} ${ip2x},${ip2y} ${ip1x},${ip1y}`}
                    fill={colors[(idx + i + 1) % colors.length]}
                    stroke="#1a1a1a"
                    strokeWidth="0.8"
                    opacity={brightness * 0.95}
                  />
                );
              })}
              {/* Inner center pentagon */}
              <polygon
                points={face.map(v => {
                  const px = projected[v].x;
                  const py = projected[v].y;
                  return `${px + (cx - px) * 0.4},${py + (cy - py) * 0.4}`;
                }).join(' ')}
                fill={baseColor}
                stroke="#1a1a1a"
                strokeWidth="0.8"
                opacity={brightness}
              />
            </g>
          );
        })}
      </svg>
    </div>
  );
};

// 3D Megaminx is defined above

const Large3DCube = ({ cube }) => {
  const [rotation, setRotation] = useState({ x: -20, y: 30 });
  const colors = [...cube.colorScheme];
  while (colors.length < 6) colors.push('#cccccc');
  const name = cube.name.toLowerCase();

  useEffect(() => {
    const interval = setInterval(() => {
      setRotation(prev => ({ x: prev.x, y: prev.y + 0.5 }));
    }, 50);
    return () => clearInterval(interval);
  }, []);

  // Render appropriate shape based on puzzle type - use Three.js for non-classic
  if (name.includes('pyraminx')) return <Puzzle3D type="pyraminx" colors={colors} />;
  if (name.includes('megaminx')) return <Puzzle3D type="megaminx" colors={colors} />;
  if (name.includes('skewb')) return <Puzzle3D type="skewb" colors={colors} />;
  if (name.includes('square-1') || name.includes('square 1')) return <Puzzle3D type="square1" colors={colors} />;
  if (name.includes('mirror')) return <Puzzle3D type="mirror" colors={colors} />;

  // Classic NxN cube (default) - GAN-style with rounded edges
  const sizeMatch = cube.size.match(/^(\d+)x\1x\1$/);
  const N = sizeMatch ? parseInt(sizeMatch[1]) : 3;
  const cubeSize = 220;
  const faceStyle = (transform) => ({
    width: cubeSize,
    height: cubeSize,
    transform,
    borderRadius: '14px'
  });

  return (
    <div className="flex items-center justify-center w-full h-80 relative" style={{ perspective: '1000px' }}>
      {/* Shadow underneath */}
      <div
        className="absolute"
        style={{
          bottom: '8%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: `${cubeSize * 0.9}px`,
          height: '20px',
          background: 'radial-gradient(ellipse, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0) 70%)',
          filter: 'blur(8px)'
        }}
      />
      <div
        className="relative"
        style={{
          width: `${cubeSize}px`,
          height: `${cubeSize}px`,
          transformStyle: 'preserve-3d',
          transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`
        }}
      >
        {/* Front */}
        <div className="absolute" style={faceStyle(`translateZ(${cubeSize / 2}px)`)}>
          <CubeFace size={N} faceColor={lightenColor(colors[0], 8)} />
        </div>
        {/* Back */}
        <div className="absolute" style={faceStyle(`translateZ(-${cubeSize / 2}px) rotateY(180deg)`)}>
          <CubeFace size={N} faceColor={lightenColor(colors[5 % colors.length], 8)} />
        </div>
        {/* Left */}
        <div className="absolute" style={faceStyle(`rotateY(-90deg) translateZ(${cubeSize / 2}px)`)}>
          <CubeFace size={N} faceColor={lightenColor(colors[4 % colors.length], 8)} />
        </div>
        {/* Right */}
        <div className="absolute" style={faceStyle(`rotateY(90deg) translateZ(${cubeSize / 2}px)`)}>
          <CubeFace size={N} faceColor={lightenColor(colors[1], 8)} />
        </div>
        {/* Top */}
        <div className="absolute" style={faceStyle(`rotateX(90deg) translateZ(${cubeSize / 2}px)`)}>
          <CubeFace size={N} faceColor={lightenColor(colors[2], 8)} />
        </div>
        {/* Bottom */}
        <div className="absolute" style={faceStyle(`rotateX(-90deg) translateZ(${cubeSize / 2}px)`)}>
          <CubeFace size={N} faceColor={lightenColor(colors[3], 8)} />
        </div>
      </div>
    </div>
  );
};

export const CubeDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [cube, setCube] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadCube();
    window.scrollTo(0, 0);
  }, [id]);

  const loadCube = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API}/cubes/${id}`);
      setCube(response.data.cube);
    } catch (error) {
      console.error('Error loading cube:', error);
      toast.error('Failed to load cube details');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <div className="flex justify-center items-center min-h-screen">
          <Loader2 className="w-12 h-12 text-blue-600 animate-spin" />
        </div>
      </div>
    );
  }

  if (!cube) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <div className="container mx-auto px-4 py-32 text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Cube not found</h2>
          <Button onClick={() => navigate('/')} data-testid="back-to-home-btn">
            <ArrowLeft className="w-4 h-4 mr-2" /> Back to Home
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section className="pt-28 pb-16 bg-gradient-to-br from-blue-50 via-white to-red-50 relative overflow-hidden">
        <div className="absolute top-20 left-10 w-40 h-40 bg-red-400/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-20 w-48 h-48 bg-blue-400/10 rounded-full blur-3xl"></div>

        <div className="container mx-auto px-4 relative z-10">
          <Button
            onClick={() => navigate('/')}
            variant="outline"
            className="mb-6"
            data-testid="back-to-home-btn"
          >
            <ArrowLeft className="w-4 h-4 mr-2" /> Back to Cubes
          </Button>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left - 3D Visual */}
            <div className="order-2 md:order-1">
              <Large3DCube cube={cube} />
            </div>

            {/* Right - Info */}
            <div className="order-1 md:order-2 space-y-5">
              <Badge className={`${difficultyColors[cube.difficulty]} border text-base px-4 py-1`}>
                {difficultyLabels[cube.difficulty]} (Level {cube.difficulty}/5)
              </Badge>
              <h1 className="text-5xl md:text-6xl font-bold leading-tight">
                {cube.name}
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed">
                {cube.description}
              </p>

              {/* Quick Stats */}
              <div className="grid grid-cols-2 gap-4 pt-4">
                <Card className="border-2">
                  <CardContent className="p-4 flex items-center gap-3">
                    <Box className="w-8 h-8 text-blue-600" />
                    <div>
                      <p className="text-sm text-gray-500">Size</p>
                      <p className="font-bold">{cube.size}</p>
                    </div>
                  </CardContent>
                </Card>
                <Card className="border-2">
                  <CardContent className="p-4 flex items-center gap-3">
                    <Sparkles className="w-8 h-8 text-purple-600" />
                    <div>
                      <p className="text-sm text-gray-500">Pieces</p>
                      <p className="font-bold">{cube.pieces}</p>
                    </div>
                  </CardContent>
                </Card>
                <Card className="border-2">
                  <CardContent className="p-4 flex items-center gap-3">
                    <Trophy className="w-8 h-8 text-yellow-600" />
                    <div>
                      <p className="text-sm text-gray-500">World Record</p>
                      <p className="font-bold">{cube.worldRecord}</p>
                    </div>
                  </CardContent>
                </Card>
                <Card className="border-2">
                  <CardContent className="p-4 flex items-center gap-3">
                    <DollarSign className="w-8 h-8 text-green-600" />
                    <div>
                      <p className="text-sm text-gray-500">Price</p>
                      <p className="font-bold">{cube.price}</p>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-4">
                <Button
                  onClick={() => window.open(cube.videoUrl, '_blank')}
                  className="flex-1 bg-red-600 hover:bg-red-700 text-white"
                  data-testid="watch-tutorial-btn"
                >
                  <Youtube className="w-5 h-5 mr-2" /> Watch Tutorial
                </Button>
                <Button
                  onClick={() => window.open(cube.buyLink, '_blank')}
                  className="flex-1 bg-green-600 hover:bg-green-700 text-white"
                  data-testid="buy-cube-btn"
                >
                  <ShoppingCart className="w-5 h-5 mr-2" /> Buy Now
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tabs Content */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <Tabs defaultValue="history" className="w-full">
            <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 mb-8 h-auto">
              <TabsTrigger value="history" className="py-3" data-testid="history-tab">
                <BookOpen className="w-4 h-4 mr-2" /> History
              </TabsTrigger>
              <TabsTrigger value="algorithms" className="py-3" data-testid="algorithms-tab">
                <Sparkles className="w-4 h-4 mr-2" /> Algorithms
              </TabsTrigger>
              <TabsTrigger value="tutorials" className="py-3" data-testid="tutorials-tab">
                <Play className="w-4 h-4 mr-2" /> Tutorials
              </TabsTrigger>
              <TabsTrigger value="tips" className="py-3" data-testid="tips-tab">
                <Lightbulb className="w-4 h-4 mr-2" /> Tips & Tricks
              </TabsTrigger>
            </TabsList>

            {/* History Tab */}
            <TabsContent value="history" className="space-y-6">
              <Card className="border-2">
                <CardContent className="p-8">
                  <h2 className="text-3xl font-bold mb-4 text-gray-800">History & Origin</h2>
                  <p className="text-lg text-gray-700 leading-relaxed mb-6">
                    {cube.history || 'No history available for this cube.'}
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                    {cube.inventor && (
                      <div className="flex items-center gap-3 p-4 bg-blue-50 rounded-lg">
                        <User className="w-6 h-6 text-blue-600" />
                        <div>
                          <p className="text-sm text-gray-500">Inventor</p>
                          <p className="font-bold text-gray-800">{cube.inventor}</p>
                        </div>
                      </div>
                    )}
                    {cube.year && (
                      <div className="flex items-center gap-3 p-4 bg-purple-50 rounded-lg">
                        <Calendar className="w-6 h-6 text-purple-600" />
                        <div>
                          <p className="text-sm text-gray-500">Year Invented</p>
                          <p className="font-bold text-gray-800">{cube.year}</p>
                        </div>
                      </div>
                    )}
                  </div>

                  {cube.methods && cube.methods.length > 0 && (
                    <div className="mt-8">
                      <h3 className="text-xl font-bold mb-3 text-gray-800">Popular Solving Methods</h3>
                      <div className="flex flex-wrap gap-2">
                        {cube.methods.map((method, idx) => (
                          <Badge key={idx} className="bg-indigo-100 text-indigo-800 text-base px-4 py-2 border border-indigo-300">
                            {method}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Algorithms Tab */}
            <TabsContent value="algorithms" className="space-y-4">
              <h2 className="text-3xl font-bold mb-6 text-gray-800">Essential Algorithms</h2>
              {cube.algorithms && cube.algorithms.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {cube.algorithms.map((algo, idx) => (
                    <Card key={idx} className="border-2 hover:border-blue-300 hover:shadow-lg transition-all">
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between mb-3">
                          <h3 className="text-xl font-bold text-gray-800">{algo.name}</h3>
                          <Badge className="bg-blue-100 text-blue-800">#{idx + 1}</Badge>
                        </div>
                        <p className="text-gray-600 mb-4 text-sm">{algo.purpose}</p>
                        <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm overflow-x-auto">
                          {algo.notation}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <p className="text-gray-600">No algorithms available for this cube.</p>
              )}

              {/* Notation Guide */}
              <Card className="border-2 bg-gradient-to-br from-blue-50 to-purple-50 mt-8">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-3 text-gray-800">📖 Notation Guide</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
                    <div><strong>R</strong> = Right face CW</div>
                    <div><strong>R'</strong> = Right face CCW</div>
                    <div><strong>R2</strong> = Right face 180°</div>
                    <div><strong>L</strong> = Left face CW</div>
                    <div><strong>U</strong> = Upper face CW</div>
                    <div><strong>D</strong> = Down face CW</div>
                    <div><strong>F</strong> = Front face CW</div>
                    <div><strong>B</strong> = Back face CW</div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Tutorials Tab */}
            <TabsContent value="tutorials" className="space-y-4">
              <h2 className="text-3xl font-bold mb-6 text-gray-800">Video Tutorials</h2>
              {cube.tutorials && cube.tutorials.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {cube.tutorials.map((tutorial, idx) => {
                    const gradients = [
                      'from-red-500 via-orange-500 to-yellow-500',
                      'from-blue-500 via-purple-500 to-pink-500',
                      'from-green-500 via-teal-500 to-cyan-500'
                    ];
                    return (
                      <Card
                        key={idx}
                        className="border-2 hover:border-red-300 hover:shadow-xl transition-all cursor-pointer overflow-hidden"
                        onClick={() => window.open(tutorial.url, '_blank')}
                        data-testid={`tutorial-card-${idx}`}
                      >
                        <div className={`relative h-48 bg-gradient-to-br ${gradients[idx % 3]} flex items-center justify-center group`}>
                          <div className="w-20 h-20 bg-red-600 rounded-full flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform">
                            <Play className="w-10 h-10 text-white ml-1" fill="white" />
                          </div>
                          <div className="absolute top-3 left-3 bg-red-600 text-white text-xs px-2 py-1 rounded font-semibold flex items-center gap-1">
                            <Youtube className="w-3 h-3" /> VIDEO
                          </div>
                          {tutorial.duration && (
                            <div className="absolute bottom-3 right-3 bg-black/70 text-white text-xs px-2 py-1 rounded">
                              {tutorial.duration}
                            </div>
                          )}
                        </div>
                        <CardContent className="p-5">
                          <h3 className="font-bold text-lg text-gray-800 line-clamp-2">{tutorial.title}</h3>
                          <Button variant="outline" className="w-full mt-3 border-red-600 text-red-600 hover:bg-red-50">
                            <Play className="w-4 h-4 mr-2" /> Watch on YouTube
                          </Button>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              ) : (
                <p className="text-gray-600">No tutorials available for this cube.</p>
              )}
            </TabsContent>

            {/* Tips Tab */}
            <TabsContent value="tips" className="space-y-4">
              <h2 className="text-3xl font-bold mb-6 text-gray-800">Tips & Tricks</h2>
              {cube.tips && cube.tips.length > 0 ? (
                <div className="space-y-3">
                  {cube.tips.map((tip, idx) => (
                    <Card key={idx} className="border-2 border-yellow-200 bg-gradient-to-r from-yellow-50 to-orange-50">
                      <CardContent className="p-5 flex items-start gap-4">
                        <div className="flex-shrink-0 w-10 h-10 bg-yellow-500 text-white rounded-full flex items-center justify-center font-bold">
                          {idx + 1}
                        </div>
                        <p className="text-lg text-gray-800 leading-relaxed pt-1">{tip}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <p className="text-gray-600">No tips available for this cube.</p>
              )}

              {/* Color Scheme */}
              <Card className="border-2 mt-8">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-4 text-gray-800">🎨 Standard Color Scheme</h3>
                  <div className="flex gap-3 flex-wrap">
                    {cube.colorScheme.map((color, idx) => (
                      <div
                        key={idx}
                        className="w-16 h-16 rounded-lg border-2 border-gray-300 shadow-md"
                        style={{ backgroundColor: color }}
                        title={color}
                      />
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default CubeDetail;

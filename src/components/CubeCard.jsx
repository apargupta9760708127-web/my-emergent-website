import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardFooter } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Youtube, ShoppingCart, CheckCircle2, Boxes, ArrowRight } from 'lucide-react';

const difficultyColors = {
  1: 'bg-green-100 text-green-800 border-green-300',
  2: 'bg-blue-100 text-blue-800 border-blue-300',
  3: 'bg-yellow-100 text-yellow-800 border-yellow-300',
  4: 'bg-orange-100 text-orange-800 border-orange-300',
  5: 'bg-red-100 text-red-800 border-red-300'
};

const difficultyLabels = {
  1: 'Beginner',
  2: 'Easy',
  3: 'Medium',
  4: 'Hard',
  5: 'Expert'
};

// Color manipulation helpers
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
function darkenColor(hex, percent) { return lightenColor(hex, -percent); }

// GAN-style cube face renderer with vibrant lighter colors
const CubeFace = ({ size, baseColor, faceColor }) => {
  const gridCols = {
    2: 'grid-cols-2',
    3: 'grid-cols-3',
    4: 'grid-cols-4',
    5: 'grid-cols-5',
    6: 'grid-cols-6'
  };
  const gapSize = size <= 3 ? 'gap-1' : 'gap-0.5';
  return (
    <div
      className={`grid ${gridCols[size]} ${gapSize} h-full w-full`}
      style={{
        padding: size <= 3 ? '5px' : '3px',
        background: 'linear-gradient(135deg, #2a2a2a 0%, #1a1a1a 100%)',
        borderRadius: '10px'
      }}
    >
      {[...Array(size * size)].map((_, i) => (
        <div
          key={i}
          style={{
            background: `radial-gradient(circle at 30% 25%, ${lightenColor(faceColor, 35)} 0%, ${lightenColor(faceColor, 10)} 55%, ${faceColor} 100%)`,
            borderRadius: size <= 3 ? '6px' : '3px',
            boxShadow: 'inset 0 1px 2px rgba(255,255,255,0.5), inset 0 -1px 1px rgba(0,0,0,0.15)'
          }}
        />
      ))}
    </div>
  );
};

// Pyraminx visual (triangular)
const PyraminxVisual = ({ colors }) => (
  <svg viewBox="0 0 200 180" className="w-40 h-36">
    {/* Front face triangle */}
    <polygon points="100,20 30,160 170,160" fill={colors[0]} stroke="#1a1a1a" strokeWidth="2" />
    {/* Inner triangles for stickers */}
    <polygon points="100,20 75,65 125,65" fill={colors[0]} stroke="#1a1a1a" strokeWidth="1" opacity="0.85" />
    <polygon points="75,65 50,110 100,110" fill={colors[1]} stroke="#1a1a1a" strokeWidth="1" opacity="0.85" />
    <polygon points="125,65 100,110 150,110" fill={colors[2]} stroke="#1a1a1a" strokeWidth="1" opacity="0.85" />
    <polygon points="75,65 100,110 125,65" fill={colors[3]} stroke="#1a1a1a" strokeWidth="1" opacity="0.85" />
    <polygon points="50,110 30,160 75,160" fill={colors[0]} stroke="#1a1a1a" strokeWidth="1" opacity="0.85" />
    <polygon points="100,110 75,160 125,160" fill={colors[1]} stroke="#1a1a1a" strokeWidth="1" opacity="0.85" />
    <polygon points="150,110 125,160 170,160" fill={colors[2]} stroke="#1a1a1a" strokeWidth="1" opacity="0.85" />
    <polygon points="50,110 75,160 100,110" fill={colors[3]} stroke="#1a1a1a" strokeWidth="1" opacity="0.85" />
    <polygon points="100,110 125,160 150,110" fill={colors[0]} stroke="#1a1a1a" strokeWidth="1" opacity="0.85" />
  </svg>
);

// Megaminx visual (pentagonal)
const MegaminxVisual = ({ colors }) => {
  const cx = 100, cy = 90, r = 70;
  const points = [];
  for (let i = 0; i < 5; i++) {
    const angle = (Math.PI / 2) + (i * 2 * Math.PI / 5);
    points.push([cx + r * Math.cos(angle), cy - r * Math.sin(angle)]);
  }
  const outerPath = points.map(p => p.join(',')).join(' ');
  
  return (
    <svg viewBox="0 0 200 180" className="w-40 h-36">
      <polygon points={outerPath} fill={colors[0]} stroke="#1a1a1a" strokeWidth="2" />
      {points.map((p, i) => {
        const next = points[(i + 1) % 5];
        const mid = [(p[0] + next[0]) / 2, (p[1] + next[1]) / 2];
        const innerMid = [(mid[0] + cx) / 2, (mid[1] + cy) / 2];
        return (
          <polygon
            key={i}
            points={`${p.join(',')} ${next.join(',')} ${innerMid.join(',')}`}
            fill={colors[i % colors.length]}
            stroke="#1a1a1a"
            strokeWidth="1"
            opacity="0.9"
          />
        );
      })}
      <polygon
        points={points.map(p => `${(p[0] + cx) / 2},${(p[1] + cy) / 2}`).join(' ')}
        fill={colors[5 % colors.length]}
        stroke="#1a1a1a"
        strokeWidth="1"
      />
    </svg>
  );
};

// Skewb visual (diagonal cube)
const SkewbVisual = ({ colors }) => (
  <svg viewBox="0 0 200 180" className="w-40 h-36">
    {/* Cube outline */}
    <polygon points="40,50 100,20 160,50 160,130 100,160 40,130" fill="#1a1a1a" stroke="#1a1a1a" strokeWidth="2" />
    {/* Front face - diagonal split */}
    <polygon points="40,50 100,80 100,160 40,130" fill={colors[0]} stroke="#1a1a1a" strokeWidth="1" />
    <polygon points="40,50 100,20 100,80" fill={colors[1]} stroke="#1a1a1a" strokeWidth="1" />
    {/* Right face */}
    <polygon points="100,20 160,50 100,80" fill={colors[2]} stroke="#1a1a1a" strokeWidth="1" />
    <polygon points="160,50 160,130 100,160 100,80" fill={colors[3]} stroke="#1a1a1a" strokeWidth="1" />
  </svg>
);

// Square-1 visual (shape-shifting)
const Square1Visual = ({ colors }) => (
  <svg viewBox="0 0 200 180" className="w-40 h-36">
    <rect x="30" y="30" width="140" height="120" fill="#1a1a1a" />
    {/* Irregular top pieces */}
    <polygon points="30,30 70,30 80,60 30,60" fill={colors[0]} stroke="#1a1a1a" strokeWidth="1" />
    <polygon points="70,30 130,30 120,60 80,60" fill={colors[1]} stroke="#1a1a1a" strokeWidth="1" />
    <polygon points="130,30 170,30 170,60 120,60" fill={colors[2]} stroke="#1a1a1a" strokeWidth="1" />
    {/* Middle strip */}
    <rect x="30" y="60" width="140" height="20" fill={colors[3]} stroke="#1a1a1a" strokeWidth="1" />
    <rect x="30" y="80" width="140" height="20" fill={colors[4]} stroke="#1a1a1a" strokeWidth="1" />
    {/* Bottom irregular */}
    <polygon points="30,100 90,100 80,150 30,150" fill={colors[5 % colors.length]} stroke="#1a1a1a" strokeWidth="1" />
    <polygon points="90,100 170,100 170,150 80,150" fill={colors[0]} stroke="#1a1a1a" strokeWidth="1" />
  </svg>
);

// Mirror Cube visual (3x3 with varying sizes)
const MirrorCubeVisual = ({ colors }) => {
  const sizes = [
    [30, 20, 35], [25, 20, 40], [40, 20, 30],
    [30, 30, 35], [25, 30, 40], [40, 30, 30],
    [30, 25, 35], [25, 25, 40], [40, 25, 30]
  ];
  let x = 35, y = 35;
  const cells = [];
  for (let row = 0; row < 3; row++) {
    x = 35;
    let rowHeight = 0;
    for (let col = 0; col < 3; col++) {
      const idx = row * 3 + col;
      const w = sizes[idx][0];
      const h = sizes[idx][1] + sizes[idx][2] / 2;
      cells.push(
        <rect
          key={idx}
          x={x}
          y={y}
          width={w}
          height={h}
          fill={colors[idx % colors.length]}
          stroke="#1a1a1a"
          strokeWidth="1"
        />
      );
      x += w;
      rowHeight = Math.max(rowHeight, h);
    }
    y += 35;
  }
  return (
    <svg viewBox="0 0 200 180" className="w-40 h-36">
      <rect x="30" y="30" width="140" height="120" fill="#1a1a1a" />
      {cells}
    </svg>
  );
};

// Parse cube size from size string (e.g., "3x3x3" → 3)
const parseCubeSize = (sizeStr) => {
  const match = sizeStr.match(/^(\d+)x\1x\1$/);
  return match ? parseInt(match[1]) : null;
};

// Classic NxN 3D cube component with auto-rotation (separated to avoid hooks issue)
const ClassicCube3D = ({ N, colors }) => {
  const cubeWidth = 130;
  const [autoRot, setAutoRot] = React.useState(30);
  React.useEffect(() => {
    const i = setInterval(() => setAutoRot(r => r + 0.4), 50);
    return () => clearInterval(i);
  }, []);
  const faceStyle = (transform) => ({
    width: `${cubeWidth}px`,
    height: `${cubeWidth}px`,
    transform,
    borderRadius: '10px'
  });

  return (
    <div className="relative w-full h-full flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-200 overflow-hidden">
      {/* Soft shadow underneath */}
      <div
        className="absolute"
        style={{
          bottom: '15%', left: '50%',
          transform: 'translateX(-50%)',
          width: `${cubeWidth * 0.9}px`,
          height: '14px',
          background: 'radial-gradient(ellipse, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0) 70%)',
          filter: 'blur(6px)'
        }}
      />
      <div style={{ perspective: '700px' }}>
        <div
          style={{
            width: `${cubeWidth}px`,
            height: `${cubeWidth}px`,
            transformStyle: 'preserve-3d',
            transform: `rotateX(-22deg) rotateY(${autoRot}deg)`,
            transition: 'transform 0.05s linear',
            position: 'relative'
          }}
        >
          {/* Front Face */}
          <div className="absolute" style={faceStyle(`translateZ(${cubeWidth / 2}px)`)}>
            <CubeFace size={N} faceColor={lightenColor(colors[0], 8)} />
          </div>
          {/* Back Face */}
          <div className="absolute" style={faceStyle(`translateZ(-${cubeWidth / 2}px) rotateY(180deg)`)}>
            <CubeFace size={N} faceColor={lightenColor(colors[5 % colors.length], 8)} />
          </div>
          {/* Right Face */}
          <div className="absolute" style={faceStyle(`rotateY(90deg) translateZ(${cubeWidth / 2}px)`)}>
            <CubeFace size={N} faceColor={lightenColor(colors[1], 8)} />
          </div>
          {/* Left Face */}
          <div className="absolute" style={faceStyle(`rotateY(-90deg) translateZ(${cubeWidth / 2}px)`)}>
            <CubeFace size={N} faceColor={lightenColor(colors[4 % colors.length], 8)} />
          </div>
          {/* Top Face */}
          <div className="absolute" style={faceStyle(`rotateX(90deg) translateZ(${cubeWidth / 2}px)`)}>
            <CubeFace size={N} faceColor={lightenColor(colors[2], 8)} />
          </div>
          {/* Bottom Face */}
          <div className="absolute" style={faceStyle(`rotateX(-90deg) translateZ(${cubeWidth / 2}px)`)}>
            <CubeFace size={N} faceColor={lightenColor(colors[3], 8)} />
          </div>
        </div>
      </div>
    </div>
  );
};

// Visual cube representation using CSS
const CubeVisual = ({ cube }) => {
  const colors = [...cube.colorScheme];
  while (colors.length < 6) colors.push('#cccccc');

  const cubeSize = parseCubeSize(cube.size);
  const name = cube.name.toLowerCase();

  // Non-classic puzzle visuals
  if (name.includes('pyraminx')) {
    return (
      <div className="relative w-full h-full flex items-center justify-center bg-gradient-to-br from-slate-100 to-slate-200">
        <PyraminxVisual colors={colors} />
      </div>
    );
  }
  if (name.includes('megaminx')) {
    return (
      <div className="relative w-full h-full flex items-center justify-center bg-gradient-to-br from-slate-100 to-slate-200">
        <MegaminxVisual colors={colors} />
      </div>
    );
  }
  if (name.includes('skewb')) {
    return (
      <div className="relative w-full h-full flex items-center justify-center bg-gradient-to-br from-slate-100 to-slate-200">
        <SkewbVisual colors={colors} />
      </div>
    );
  }
  if (name.includes('square-1') || name.includes('square 1')) {
    return (
      <div className="relative w-full h-full flex items-center justify-center bg-gradient-to-br from-slate-100 to-slate-200">
        <Square1Visual colors={colors} />
      </div>
    );
  }
  if (name.includes('mirror')) {
    return (
      <div className="relative w-full h-full flex items-center justify-center bg-gradient-to-br from-slate-100 to-slate-200">
        <MirrorCubeVisual colors={colors} />
      </div>
    );
  }

  // Classic NxN cube (default) - delegate to component with hooks
  const N = cubeSize || 3;
  return <ClassicCube3D N={N} colors={colors} />;
};

export const CubeCard = ({ cube, isSelected, onToggleSelect }) => {
  const navigate = useNavigate();

  const handleViewDetails = () => {
    navigate(`/cube/${cube.id}`);
  };

  return (
    <Card className={`overflow-hidden hover:shadow-2xl transition-all duration-300 border-2 ${
      isSelected ? 'border-blue-500 shadow-xl' : 'border-gray-200 hover:border-blue-300'
    }`}>
      {/* Cube Visual - Clickable */}
      <div
        className="relative h-56 overflow-hidden cursor-pointer group"
        onClick={handleViewDetails}
        data-testid={`cube-visual-${cube.id}`}
      >
        <CubeVisual cube={cube} />
        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300 flex items-center justify-center">
          <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white text-gray-900 px-4 py-2 rounded-full font-semibold shadow-lg flex items-center gap-2">
            View Details <ArrowRight className="w-4 h-4" />
          </div>
        </div>
        {isSelected && (
          <div className="absolute top-4 right-4 bg-blue-600 text-white rounded-full p-2 z-10">
            <CheckCircle2 className="w-5 h-5" />
          </div>
        )}
        <div className="absolute top-4 left-4 z-10">
          <Badge className={`${difficultyColors[cube.difficulty]} border`}>
            {difficultyLabels[cube.difficulty]}
          </Badge>
        </div>
      </div>

      <CardContent className="p-6 space-y-4">
        {/* Title - Clickable */}
        <div
          className="cursor-pointer hover:text-blue-600 transition-colors"
          onClick={handleViewDetails}
          data-testid={`cube-title-${cube.id}`}
        >
          <h3 className="text-2xl font-bold text-gray-800 mb-1 hover:text-blue-600 transition-colors">{cube.name}</h3>
          <p className="text-sm text-gray-500 flex items-center gap-2">
            <Boxes className="w-4 h-4" />
            {cube.size} • {cube.pieces} pieces
          </p>
        </div>

        {/* Description */}
        <p className="text-gray-600 leading-relaxed">{cube.description}</p>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4 pt-4 border-t">
          <div>
            <p className="text-sm text-gray-500">Price Range</p>
            <p className="font-semibold text-gray-800">{cube.price}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">World Record</p>
            <p className="font-semibold text-gray-800">{cube.worldRecord}</p>
          </div>
        </div>

        {/* Color Scheme */}
        <div>
          <p className="text-sm text-gray-500 mb-2">Colors</p>
          <div className="flex gap-2 flex-wrap">
            {cube.colorScheme.map((color, index) => (
              <div
                key={index}
                className="w-8 h-8 rounded-full border-2 border-white shadow-md"
                style={{ backgroundColor: color }}
                title={color}
              />
            ))}
          </div>
        </div>
      </CardContent>

      <CardFooter className="p-6 pt-0 flex flex-col gap-3">
        <Button
          onClick={handleViewDetails}
          className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-md"
          data-testid={`view-details-btn-${cube.id}`}
        >
          View Full Details & Algorithms <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
        <div className="flex gap-2 w-full">
          <Button
            onClick={() => window.open(cube.videoUrl, '_blank')}
            variant="outline"
            className="flex-1 border-red-600 text-red-600 hover:bg-red-50"
          >
            <Youtube className="w-4 h-4 mr-2" />
            Tutorial
          </Button>
          <Button
            onClick={() => window.open(cube.buyLink, '_blank')}
            className="flex-1 bg-green-600 hover:bg-green-700 text-white"
          >
            <ShoppingCart className="w-4 h-4 mr-2" />
            Buy
          </Button>
        </div>
        <Button
          onClick={() => onToggleSelect(cube.id)}
          variant={isSelected ? 'default' : 'outline'}
          className={`w-full ${
            isSelected
              ? 'bg-blue-600 hover:bg-blue-700 text-white'
              : 'border-blue-600 text-blue-600 hover:bg-blue-50'
          }`}
        >
          {isSelected ? 'Selected for Comparison' : 'Select to Compare'}
        </Button>
      </CardFooter>
    </Card>
  );
};
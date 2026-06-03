import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { ChevronDown } from 'lucide-react';

export const Hero = () => {
  const [rotation, setRotation] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const interval = setInterval(() => {
      setRotation(prev => ({
        x: prev.x + 1,
        y: prev.y + 1
      }));
    }, 50);

    return () => clearInterval(interval);
  }, []);

  const scrollToCubes = () => {
    const element = document.getElementById('cubes');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-red-50">
        <div className="absolute top-20 left-10 w-32 h-32 bg-red-400/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-blue-400/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 w-36 h-36 bg-green-400/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-6">
            <div className="inline-block px-4 py-2 bg-gradient-to-r from-red-100 to-blue-100 rounded-full">
              <span className="text-sm font-semibold text-gray-800">🎲 Explore the World of Puzzles</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold leading-tight">
              Master Every
              <span className="block bg-gradient-to-r from-red-600 via-blue-600 to-green-600 bg-clip-text text-transparent">
                Rubik's Cube
              </span>
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              Discover comprehensive information about every type of twisty puzzle, from classic cubes to exotic shapes. Learn solving techniques, explore patterns, and join our community!
            </p>
            <div className="flex flex-wrap gap-4">
              <Button
                onClick={scrollToCubes}
                size="lg"
                className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-8 py-6 text-lg shadow-lg hover:shadow-xl transition-all"
              >
                Explore Cubes
              </Button>
              <Button
                onClick={() => window.open('https://www.youtube.com/@cubemaster', '_blank')}
                size="lg"
                variant="outline"
                className="border-2 border-red-600 text-red-600 hover:bg-red-50 px-8 py-6 text-lg transition-all"
              >
                Watch Tutorials
              </Button>
            </div>
          </div>

          {/* Right - 3D Rotating Cube */}
          <div className="flex justify-center items-center">
            <div className="relative w-64 h-64 md:w-80 md:h-80">
              {/* 3D Cube Container */}
              <div
                className="w-full h-full"
                style={{
                  perspective: '1000px'
                }}
              >
                <div
                  className="w-full h-full relative"
                  style={{
                    transformStyle: 'preserve-3d',
                    transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
                    transition: 'transform 0.05s linear'
                  }}
                >
                  {/* Front Face */}
                  <div
                    className="absolute w-full h-full bg-gradient-to-br from-red-500 to-red-600 border-4 border-white shadow-2xl"
                    style={{
                      transform: 'translateZ(160px)',
                      backfaceVisibility: 'visible'
                    }}
                  >
                    <div className="grid grid-cols-3 gap-1 p-4 h-full">
                      {[...Array(9)].map((_, i) => (
                        <div key={i} className="bg-red-600/50 border border-white/30 rounded"></div>
                      ))}
                    </div>
                  </div>

                  {/* Back Face */}
                  <div
                    className="absolute w-full h-full bg-gradient-to-br from-orange-500 to-orange-600 border-4 border-white shadow-2xl"
                    style={{
                      transform: 'translateZ(-160px) rotateY(180deg)',
                      backfaceVisibility: 'visible'
                    }}
                  >
                    <div className="grid grid-cols-3 gap-1 p-4 h-full">
                      {[...Array(9)].map((_, i) => (
                        <div key={i} className="bg-orange-600/50 border border-white/30 rounded"></div>
                      ))}
                    </div>
                  </div>

                  {/* Left Face */}
                  <div
                    className="absolute w-full h-full bg-gradient-to-br from-green-500 to-green-600 border-4 border-white shadow-2xl"
                    style={{
                      transform: 'rotateY(-90deg) translateZ(160px)',
                      backfaceVisibility: 'visible'
                    }}
                  >
                    <div className="grid grid-cols-3 gap-1 p-4 h-full">
                      {[...Array(9)].map((_, i) => (
                        <div key={i} className="bg-green-600/50 border border-white/30 rounded"></div>
                      ))}
                    </div>
                  </div>

                  {/* Right Face */}
                  <div
                    className="absolute w-full h-full bg-gradient-to-br from-blue-500 to-blue-600 border-4 border-white shadow-2xl"
                    style={{
                      transform: 'rotateY(90deg) translateZ(160px)',
                      backfaceVisibility: 'visible'
                    }}
                  >
                    <div className="grid grid-cols-3 gap-1 p-4 h-full">
                      {[...Array(9)].map((_, i) => (
                        <div key={i} className="bg-blue-600/50 border border-white/30 rounded"></div>
                      ))}
                    </div>
                  </div>

                  {/* Top Face */}
                  <div
                    className="absolute w-full h-full bg-gradient-to-br from-yellow-400 to-yellow-500 border-4 border-white shadow-2xl"
                    style={{
                      transform: 'rotateX(90deg) translateZ(160px)',
                      backfaceVisibility: 'visible'
                    }}
                  >
                    <div className="grid grid-cols-3 gap-1 p-4 h-full">
                      {[...Array(9)].map((_, i) => (
                        <div key={i} className="bg-yellow-500/50 border border-white/30 rounded"></div>
                      ))}
                    </div>
                  </div>

                  {/* Bottom Face */}
                  <div
                    className="absolute w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 border-4 border-white shadow-2xl"
                    style={{
                      transform: 'rotateX(-90deg) translateZ(160px)',
                      backfaceVisibility: 'visible'
                    }}
                  >
                    <div className="grid grid-cols-3 gap-1 p-4 h-full">
                      {[...Array(9)].map((_, i) => (
                        <div key={i} className="bg-gray-200/50 border border-white/30 rounded"></div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ChevronDown className="w-8 h-8 text-gray-400" />
        </div>
      </div>
    </section>
  );
};
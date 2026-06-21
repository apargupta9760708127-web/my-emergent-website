import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Sparkles, Loader2 } from 'lucide-react';
import { getPatterns } from '../services/api';
import { toast } from 'sonner';

const difficultyColors = {
  'Easy': 'bg-green-100 text-green-800 border-green-300',
  'Medium': 'bg-yellow-100 text-yellow-800 border-yellow-300',
  'Hard': 'bg-red-100 text-red-800 border-red-300'
};

export const PatternsSection = () => {
  const [patterns, setPatterns] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadPatterns();
  }, []);

  const loadPatterns = async () => {
    try {
      setLoading(true);
      const data = await getPatterns();
      setPatterns(data);
    } catch (error) {
      console.error('Error loading patterns:', error);
      toast.error('Failed to load patterns');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="patterns" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-100 rounded-full mb-4">
            <Sparkles className="w-5 h-5 text-purple-600" />
            <span className="text-sm font-semibold text-purple-800">Creative Patterns</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Amazing <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">Patterns</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Learn how to create stunning visual patterns on your Rubik's Cube. From simple checkerboards to complex designs.
          </p>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="w-12 h-12 text-purple-600 animate-spin" />
          </div>
        )}

        {/* Patterns Grid */}
        {!loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {patterns && patterns.map((pattern) => (
              <Card key={pattern.id} className="overflow-hidden hover:shadow-xl transition-all duration-300 border-2 hover:border-purple-300">
                {/* Visual Pattern */}
                <div className="relative h-48 overflow-hidden bg-gradient-to-br from-purple-100 to-pink-100 flex items-center justify-center">
                  <div className="grid grid-cols-3 gap-1 p-2 w-32 h-32">
                    {pattern.name === 'Checkerboard Pattern' && (
                      [...Array(9)].map((_, i) => (
                        <div
                          key={i}
                          className="rounded-sm border border-gray-700 shadow-sm"
                          style={{ backgroundColor: i % 2 === 0 ? '#FF0000' : '#FFFFFF' }}
                        />
                      ))
                    )}
                    {pattern.name === 'Cube in a Cube' && (
                      [...Array(9)].map((_, i) => {
                        const isCenter = [0, 1, 3, 4].includes(i);
                        return (
                          <div
                            key={i}
                            className="rounded-sm border border-gray-700 shadow-sm"
                            style={{ backgroundColor: isCenter ? '#FFFF00' : '#0000FF' }}
                          />
                        );
                      })
                    )}
                    {pattern.name === 'Superflip' && (
                      [...Array(9)].map((_, i) => {
                        const isCorner = [0, 2, 6, 8].includes(i);
                        return (
                          <div
                            key={i}
                            className="rounded-sm border border-gray-700 shadow-sm"
                            style={{ backgroundColor: isCorner ? '#00FF00' : '#FFA500' }}
                          />
                        );
                      })
                    )}
                    {pattern.name === 'Six Spots' && (
                      [...Array(9)].map((_, i) => (
                        <div
                          key={i}
                          className="rounded-sm border border-gray-700 shadow-sm"
                          style={{ backgroundColor: i === 4 ? '#0000FF' : '#FF0000' }}
                        />
                      ))
                    )}
                  </div>
                  <div className="absolute top-4 right-4">
                    <Badge className={`${difficultyColors[pattern.difficulty]} border`}>
                      {pattern.difficulty}
                    </Badge>
                  </div>
                </div>

                <CardHeader>
                  <CardTitle className="text-xl">{pattern.name}</CardTitle>
                </CardHeader>

                <CardContent className="space-y-3">
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {pattern.description}
                  </p>
                  <div className="pt-3 border-t">
                    <p className="text-xs text-gray-500 mb-1 font-semibold">Algorithm:</p>
                    <code className="text-xs bg-gray-100 px-3 py-2 rounded block font-mono text-gray-800 break-all">
                      {pattern.moves}
                    </code>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Call to Action */}
        <div className="mt-16 text-center">
          <div className="inline-block p-8 bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl border-2 border-purple-200">
            <h3 className="text-2xl font-bold text-gray-800 mb-3">Want to Learn More Patterns?</h3>
            <p className="text-gray-600 mb-6 max-w-xl">Check out our YouTube channel for detailed video tutorials on creating amazing cube patterns!</p>
            <button
              onClick={() => window.open('https://www.youtube.com/@CubeGod', '_blank')}
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-3 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all"
            >
              Watch Pattern Tutorials
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

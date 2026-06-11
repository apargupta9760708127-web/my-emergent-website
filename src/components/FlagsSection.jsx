import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Flag, Youtube, Loader2 } from 'lucide-react';
import { getFlags } from '../services/api';
import { toast } from 'sonner';

const difficultyColors = {
  'Easy': 'bg-green-100 text-green-800 border-green-300',
  'Medium': 'bg-yellow-100 text-yellow-800 border-yellow-300',
  'Hard': 'bg-red-100 text-red-800 border-red-300'
};

// Flag color mappings for cube representations
const flagPatterns = {
  'USA': {
    grid: [
      '#FF0000', '#FFFFFF', '#FF0000',
      '#0000FF', '#FFFFFF', '#FF0000',
      '#FF0000', '#FFFFFF', '#FF0000'
    ]
  },
  'India': {
    grid: [
      '#FF9933', '#FF9933', '#FF9933',
      '#FFFFFF', '#000080', '#FFFFFF',
      '#138808', '#138808', '#138808'
    ]
  },
  'Japan': {
    grid: [
      '#FFFFFF', '#FFFFFF', '#FFFFFF',
      '#FFFFFF', '#BC002D', '#FFFFFF',
      '#FFFFFF', '#FFFFFF', '#FFFFFF'
    ]
  },
  'Brazil': {
    grid: [
      '#009C3B', '#009C3B', '#009C3B',
      '#FFDF00', '#002776', '#FFDF00',
      '#009C3B', '#009C3B', '#009C3B'
    ]
  },
  'France': {
    grid: [
      '#0055A4', '#FFFFFF', '#EF4135',
      '#0055A4', '#FFFFFF', '#EF4135',
      '#0055A4', '#FFFFFF', '#EF4135'
    ]
  },
  'Germany': {
    grid: [
      '#000000', '#000000', '#000000',
      '#DD0000', '#DD0000', '#DD0000',
      '#FFCE00', '#FFCE00', '#FFCE00'
    ]
  }
};

export const FlagsSection = () => {
  const [flags, setFlags] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadFlags();
  }, []);

  const loadFlags = async () => {
    try {
      setLoading(true);
      const data = await getFlags();
      setFlags(data);
    } catch (error) {
      console.error('Error loading flags:', error);
      toast.error('Failed to load flags');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="flags" className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-100 rounded-full mb-4">
            <Flag className="w-5 h-5 text-indigo-600" />
            <span className="text-sm font-semibold text-indigo-800">Country Flags</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Flags on <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">Rubik's Cubes</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Express your national pride! Learn how to create different country flags on your Rubik's Cube.
          </p>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="w-12 h-12 text-indigo-600 animate-spin" />
          </div>
        )}

        {/* Flags Grid */}
        {!loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {flags && flags.map((flag) => (
              <Card key={flag.id} className="overflow-hidden hover:shadow-xl transition-all duration-300 border-2 hover:border-indigo-300">
                {/* Visual Flag on Cube */}
                <div className="relative h-56 overflow-hidden bg-gradient-to-br from-indigo-100 to-purple-100 flex items-center justify-center">
                  <div className="grid grid-cols-3 gap-1 p-2 w-36 h-36 bg-gray-800 rounded-lg shadow-2xl">
                    {(flagPatterns[flag.country]?.grid || Array(9).fill('#cccccc')).map((color, i) => (
                      <div
                        key={i}
                        className="rounded-sm border border-gray-700"
                        style={{ backgroundColor: color }}
                      />
                    ))}
                  </div>
                  <div className="absolute top-4 right-4">
                    <Badge className={`${difficultyColors[flag.difficulty]} border`}>
                      {flag.difficulty}
                    </Badge>
                  </div>
                  <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full">
                    <span className="font-semibold text-gray-800">{flag.country}</span>
                  </div>
                </div>

                <CardHeader>
                  <CardTitle className="text-xl">{flag.name} Flag</CardTitle>
                </CardHeader>

                <CardContent className="space-y-4">
                  <div>
                    <p className="text-sm text-gray-500 mb-2">Required Colors:</p>
                    <div className="flex gap-2 flex-wrap">
                      {flag.colors.map((color, index) => (
                        <Badge key={index} variant="outline" className="bg-gray-50">
                          {color}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <Button
                    onClick={() => window.open(flag.videoUrl, '_blank')}
                    className="w-full bg-red-600 hover:bg-red-700 text-white"
                  >
                    <Youtube className="w-4 h-4 mr-2" />
                    Watch Tutorial
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Info Box */}
        <div className="mt-16 max-w-3xl mx-auto">
          <div className="bg-gradient-to-r from-indigo-50 to-purple-50 border-2 border-indigo-200 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Why Create Flags on Cubes?</h3>
            <div className="space-y-3 text-gray-700">
              <p>
                • <strong>Artistic Expression:</strong> Combine puzzle-solving with creativity
              </p>
              <p>
                • <strong>Show Your Pride:</strong> Display your country's flag in a unique way
              </p>
              <p>
                • <strong>Challenge Yourself:</strong> Requires precise moves and planning
              </p>
              <p>
                • <strong>Impress Friends:</strong> A stunning visual effect that amazes everyone
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

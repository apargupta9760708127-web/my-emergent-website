import React, { useState, useMemo, useEffect } from 'react';
import { CubeCard } from './CubeCard';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Search, SlidersHorizontal, Loader2 } from 'lucide-react';
import { ComparisonDialog } from './ComparisonDialog';
import { getCubes } from '../services/api';
import { toast } from 'sonner';

export const CubeGallery = () => {
  const [cubes, setCubes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [difficultyFilter, setDifficultyFilter] = useState('all');
  const [selectedCubes, setSelectedCubes] = useState([]);
  const [showComparison, setShowComparison] = useState(false);

  useEffect(() => {
    loadCubes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [typeFilter, difficultyFilter]);

  const loadCubes = async () => {
    try {
      setLoading(true);
      const filters = {};
      if (typeFilter !== 'all') filters.type = typeFilter;
      if (difficultyFilter !== 'all') filters.difficulty = parseInt(difficultyFilter);
      
      const data = await getCubes(filters);
      setCubes(data);
    } catch (error) {
      console.error('Error loading cubes:', error);
      toast.error('Failed to load cubes');
    } finally {
      setLoading(false);
    }
  };

  const filteredCubes = useMemo(() => {
    if (!searchTerm) return cubes;
    
    return cubes.filter(cube => {
      const matchesSearch = cube.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           cube.description.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesSearch;
    });
  }, [cubes, searchTerm]);

  const toggleCubeSelection = (cubeId) => {
    setSelectedCubes(prev => {
      if (prev.includes(cubeId)) {
        return prev.filter(id => id !== cubeId);
      } else if (prev.length < 3) {
        return [...prev, cubeId];
      }
      return prev;
    });
  };

  const handleCompare = () => {
    if (selectedCubes.length >= 2) {
      setShowComparison(true);
    }
  };

  const clearSelection = () => {
    setSelectedCubes([]);
  };

  return (
    <section id="cubes" className="py-20 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Explore All <span className="bg-gradient-to-r from-red-600 via-blue-600 to-green-600 bg-clip-text text-transparent">Cubes</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            From beginner-friendly 2x2s to challenging shape-shifters, find the perfect puzzle for your skill level.
          </p>
        </div>

        {/* Filters */}
        <div className="mb-8 space-y-4">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                type="text"
                placeholder="Search cubes..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 py-6 text-lg border-2 focus:border-blue-500"
              />
            </div>

            {/* Type Filter */}
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-full md:w-48 py-6 text-lg border-2">
                <SelectValue placeholder="Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="classic">Classic Cubes</SelectItem>
                <SelectItem value="other">Other Puzzles</SelectItem>
              </SelectContent>
            </Select>

            {/* Difficulty Filter */}
            <Select value={difficultyFilter} onValueChange={setDifficultyFilter}>
              <SelectTrigger className="w-full md:w-48 py-6 text-lg border-2">
                <SelectValue placeholder="Difficulty" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Levels</SelectItem>
                <SelectItem value="1">Beginner (1)</SelectItem>
                <SelectItem value="2">Easy (2)</SelectItem>
                <SelectItem value="3">Medium (3)</SelectItem>
                <SelectItem value="4">Hard (4)</SelectItem>
                <SelectItem value="5">Expert (5)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Comparison Bar */}
          {selectedCubes.length > 0 && (
            <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-4 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <SlidersHorizontal className="text-blue-600 w-5 h-5" />
                <span className="font-semibold text-gray-800">
                  {selectedCubes.length} cube{selectedCubes.length > 1 ? 's' : ''} selected
                </span>
              </div>
              <div className="flex gap-2">
                <Button
                  onClick={clearSelection}
                  variant="outline"
                  className="border-blue-600 text-blue-600 hover:bg-blue-50"
                >
                  Clear
                </Button>
                <Button
                  onClick={handleCompare}
                  disabled={selectedCubes.length < 2}
                  className="bg-blue-600 hover:bg-blue-700 text-white"
                >
                  Compare ({selectedCubes.length})
                </Button>
              </div>
            </div>
          )}
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="w-12 h-12 text-blue-600 animate-spin" />
          </div>
        )}

        {/* Results Count */}
        {!loading && (
          <div className="mb-6 text-gray-600">
            Showing {filteredCubes ? filteredCubes.length : 0} cube{filteredCubes && filteredCubes.length !== 1 ? 's' : ''}
          </div>
        )}

        {/* Cube Grid */}
        {!loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredCubes && filteredCubes.map((cube) => (
              <CubeCard
                key={cube.id}
                cube={cube}
                isSelected={selectedCubes.includes(cube.id)}
                onToggleSelect={toggleCubeSelection}
              />
            ))}
          </div>
        )}

        {!loading && filteredCubes.length === 0 && (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">No cubes found</h3>
            <p className="text-gray-600">Try adjusting your search or filters</p>
          </div>
        )}
      </div>

      {/* Comparison Dialog */}
      <ComparisonDialog
        open={showComparison}
        onOpenChange={setShowComparison}
        selectedCubeIds={selectedCubes}
        allCubes={cubes}
      />
    </section>
  );
};

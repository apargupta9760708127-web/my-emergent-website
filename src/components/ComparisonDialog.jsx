import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { Badge } from './ui/badge';
import { CheckCircle2 } from 'lucide-react';

const difficultyColors = {
  1: 'bg-green-100 text-green-800',
  2: 'bg-blue-100 text-blue-800',
  3: 'bg-yellow-100 text-yellow-800',
  4: 'bg-orange-100 text-orange-800',
  5: 'bg-red-100 text-red-800'
};

const difficultyLabels = {
  1: 'Beginner',
  2: 'Easy',
  3: 'Medium',
  4: 'Hard',
  5: 'Expert'
};

export const ComparisonDialog = ({ open, onOpenChange, selectedCubeIds, allCubes }) => {
  const selectedCubes = allCubes.filter(cube => selectedCubeIds.includes(cube.id));

  if (selectedCubes.length < 2) return null;

  const comparisonRows = [
    { label: 'Name', key: 'name' },
    { label: 'Type', key: 'type' },
    { label: 'Size', key: 'size' },
    { label: 'Difficulty', key: 'difficulty', isSpecial: true },
    { label: 'Pieces', key: 'pieces' },
    { label: 'Price Range', key: 'price' },
    { label: 'World Record', key: 'worldRecord' },
    { label: 'Description', key: 'description' }
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-3xl font-bold">Cube Comparison</DialogTitle>
          <DialogDescription>
            Compare specifications and features side by side
          </DialogDescription>
        </DialogHeader>

        <div className="mt-6">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-50">
                  <th className="p-4 text-left font-semibold text-gray-700 border-b-2 border-gray-200 w-1/4">
                    Feature
                  </th>
                  {selectedCubes.map(cube => {
                    const sizeMatch = cube.size.match(/^(\d+)x\1x\1$/);
                    const N = sizeMatch ? parseInt(sizeMatch[1]) : 3;
                    const gridCols = {
                      2: 'grid-cols-2', 3: 'grid-cols-3', 4: 'grid-cols-4', 5: 'grid-cols-5', 6: 'grid-cols-6'
                    }[N] || 'grid-cols-3';
                    return (
                      <th key={cube.id} className="p-4 text-center font-semibold text-gray-700 border-b-2 border-gray-200">
                        <div className="w-24 h-24 mx-auto mb-2 bg-gradient-to-br from-slate-100 to-slate-200 rounded-lg border-2 border-gray-200 flex items-center justify-center">
                          <div className={`grid ${gridCols} gap-0.5 p-1 w-16 h-16 bg-gray-900 rounded`}>
                            {[...Array(N * N)].map((_, i) => (
                              <div
                                key={i}
                                className="rounded-sm border border-gray-700"
                                style={{ backgroundColor: cube.colorScheme[0] }}
                              />
                            ))}
                          </div>
                        </div>
                        <p className="text-sm font-semibold">{cube.name}</p>
                      </th>
                    );
                  })}
                </tr>
              </thead>
              <tbody>
                {comparisonRows.map((row, index) => (
                  <tr key={row.key} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                    <td className="p-4 font-semibold text-gray-700 border-b border-gray-200">
                      {row.label}
                    </td>
                    {selectedCubes.map(cube => (
                      <td key={cube.id} className="p-4 text-center border-b border-gray-200">
                        {row.isSpecial ? (
                          <Badge className={difficultyColors[cube[row.key]]}>
                            {difficultyLabels[cube[row.key]]} ({cube[row.key]})
                          </Badge>
                        ) : (
                          <span className="text-gray-800">{cube[row.key]}</span>
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Recommendation */}
          <div className="mt-8 p-6 bg-blue-50 rounded-lg border-2 border-blue-200">
            <h4 className="font-bold text-lg text-gray-800 mb-3 flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-blue-600" />
              Recommendation
            </h4>
            <div className="space-y-2 text-gray-700">
              {selectedCubes.length === 2 && (
                <>
                  {selectedCubes[0].difficulty < selectedCubes[1].difficulty ? (
                    <p>
                      <strong>{selectedCubes[0].name}</strong> is easier and better for beginners,
                      while <strong>{selectedCubes[1].name}</strong> offers a greater challenge.
                    </p>
                  ) : selectedCubes[0].difficulty > selectedCubes[1].difficulty ? (
                    <p>
                      <strong>{selectedCubes[1].name}</strong> is easier and better for beginners,
                      while <strong>{selectedCubes[0].name}</strong> offers a greater challenge.
                    </p>
                  ) : (
                    <p>
                      Both cubes have similar difficulty levels. Choose based on your preference for size and design.
                    </p>
                  )}
                </>
              )}
              {selectedCubes.length === 3 && (
                <p>
                  Consider starting with the easiest cube and gradually progressing to more challenging ones.
                </p>
              )}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
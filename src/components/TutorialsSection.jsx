import React, { useState, useEffect } from 'react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Youtube, Play, Users, Loader2 } from 'lucide-react';
import { getYouTubeChannel } from '../services/api';
import { toast } from 'sonner';

export const TutorialsSection = () => {
  const [channelData, setChannelData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadChannelData();
  }, []);

  const loadChannelData = async () => {
    try {
      setLoading(true);
      const data = await getYouTubeChannel();
      setChannelData(data);
    } catch (error) {
      console.error('Error loading YouTube channel:', error);
      toast.error('Failed to load channel data');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <section id="tutorials" className="py-20 bg-gradient-to-b from-white to-red-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-center items-center py-20">
            <Loader2 className="w-12 h-12 text-red-600 animate-spin" />
          </div>
        </div>
      </section>
    );
  }

  if (!channelData) return null;

  return (
    <section id="tutorials" className="py-20 bg-gradient-to-b from-white to-red-50">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-red-100 rounded-full mb-4">
            <Youtube className="w-5 h-5 text-red-600" />
            <span className="text-sm font-semibold text-red-800">Video Tutorials</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Learn from <span className="bg-gradient-to-r from-red-600 to-pink-600 bg-clip-text text-transparent">Expert Tutorials</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Master every cube with our comprehensive video tutorials. From beginner to advanced techniques.
          </p>
        </div>

        {/* YouTube Channel Card */}
        <div className="max-w-4xl mx-auto mb-12">
          <Card className="overflow-hidden border-2 border-red-200 shadow-xl">
            <div className="bg-gradient-to-r from-red-600 to-pink-600 p-8 text-white">
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div>
                  <h3 className="text-3xl font-bold mb-2">{channelData.channelName}</h3>
                  <p className="text-red-100 text-lg mb-4">{channelData.description}</p>
                  <div className="flex items-center gap-2">
                    <Users className="w-5 h-5" />
                    <span className="font-semibold">{channelData.subscribers} Subscribers</span>
                  </div>
                </div>
                <Button
                  onClick={() => window.open(channelData.channelUrl, '_blank')}
                  size="lg"
                  className="bg-white text-red-600 hover:bg-gray-100 shadow-lg"
                >
                  <Youtube className="w-5 h-5 mr-2" />
                  Subscribe Now
                </Button>
              </div>
            </div>
          </Card>
        </div>

        {/* Featured Videos */}
        <div>
          <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">Featured Videos</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {channelData.featuredVideos.map((video, idx) => {
              // Different gradient backgrounds for each video
              const gradients = [
                'from-red-500 via-orange-500 to-yellow-500',
                'from-blue-500 via-purple-500 to-pink-500',
                'from-green-500 via-teal-500 to-cyan-500'
              ];
              return (
              <Card
                key={video.id}
                className="overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer border-2 hover:border-red-300"
                onClick={() => window.open(video.url, '_blank')}
              >
                {/* Visual Thumbnail */}
                <div className={`relative h-48 overflow-hidden bg-gradient-to-br ${gradients[idx % 3]} group flex items-center justify-center`}>
                  {/* Decorative cube grid pattern */}
                  <div className="grid grid-cols-3 gap-1 p-2 w-24 h-24 opacity-90">
                    {[...Array(9)].map((_, i) => (
                      <div
                        key={i}
                        className="rounded-sm bg-white/40 border border-white/60"
                      />
                    ))}
                  </div>
                  <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center shadow-2xl">
                      <Play className="w-8 h-8 text-white ml-1" fill="white" />
                    </div>
                  </div>
                  <div className="absolute bottom-3 right-3 bg-black/70 text-white text-xs px-2 py-1 rounded">
                    {video.views} views
                  </div>
                  <div className="absolute top-3 left-3 bg-red-600 text-white text-xs px-2 py-1 rounded font-semibold flex items-center gap-1">
                    <Youtube className="w-3 h-3" />
                    VIDEO
                  </div>
                </div>

                <CardContent className="p-6">
                  <h4 className="font-bold text-lg text-gray-800 mb-2 line-clamp-2">
                    {video.title}
                  </h4>
                  <Button
                    variant="outline"
                    className="w-full mt-3 border-red-600 text-red-600 hover:bg-red-50"
                  >
                    <Play className="w-4 h-4 mr-2" />
                    Watch Now
                  </Button>
                </CardContent>
              </Card>
              );
            })}
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-16 text-center">
          <div className="inline-block p-8 bg-white rounded-2xl border-2 border-red-200 shadow-xl">
            <Youtube className="w-16 h-16 text-red-600 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-gray-800 mb-3">Never Miss an Update!</h3>
            <p className="text-gray-600 mb-6 max-w-xl">Join our growing community of cube enthusiasts. New tutorials every week!</p>
            <Button
              onClick={() => window.open(channelData.channelUrl, '_blank')}
              size="lg"
              className="bg-red-600 hover:bg-red-700 text-white px-8"
            >
              <Youtube className="w-5 h-5 mr-2" />
              Subscribe to Channel
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
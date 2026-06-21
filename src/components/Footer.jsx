import React from 'react';
import { Youtube, Mail, Heart } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-12 mt-20">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-br from-red-500 via-blue-500 to-green-500 rounded-lg flex items-center justify-center transform rotate-45">
                <div className="transform -rotate-45 text-white font-bold text-lg">RC</div>
              </div>
              <span className="text-2xl font-bold">CubeGod</span>
            </div>
            <p className="text-gray-400 text-sm">
              Your ultimate resource for everything Rubik's Cube. Learn, explore, and master!
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2 text-gray-400">
              <li>
                <button onClick={() => document.getElementById('home')?.scrollIntoView({ behavior: 'smooth' })} className="hover:text-white transition-colors">
                  Home
                </button>
              </li>
              <li>
                <button onClick={() => document.getElementById('cubes')?.scrollIntoView({ behavior: 'smooth' })} className="hover:text-white transition-colors">
                  Explore Cubes
                </button>
              </li>
              <li>
                <button onClick={() => document.getElementById('patterns')?.scrollIntoView({ behavior: 'smooth' })} className="hover:text-white transition-colors">
                  Patterns
                </button>
              </li>
              <li>
                <button onClick={() => document.getElementById('flags')?.scrollIntoView({ behavior: 'smooth' })} className="hover:text-white transition-colors">
                  Flags
                </button>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-bold text-lg mb-4">Resources</h3>
            <ul className="space-y-2 text-gray-400">
              <li>
                <button onClick={() => document.getElementById('tutorials')?.scrollIntoView({ behavior: 'smooth' })} className="hover:text-white transition-colors">
                  Video Tutorials
                </button>
              </li>
              <li>
                <a href="https://www.youtube.com/@cubemaster" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                  YouTube Channel
                </a>
              </li>
              <li>
                <a href="https://www.worldcubeassociation.org/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                  WCA Records
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Beginner's Guide
                </a>
              </li>
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h3 className="font-bold text-lg mb-4">Connect</h3>
            <div className="space-y-3">
              <a
                href="https://www.youtube.com/@cubemaster"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-gray-400 hover:text-red-500 transition-colors"
              >
                <Youtube className="w-5 h-5" />
                <span>YouTube</span>
              </a>
              <a
                href="mailto:info@CubeGod.com"
                className="flex items-center gap-2 text-gray-400 hover:text-blue-500 transition-colors"
              >
                <Mail className="w-5 h-5" />
                <span>Contact Us</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm">
              © {new Date().getFullYear()} CubeVerse. All rights reserved.
            </p>
            <p className="text-gray-400 text-sm flex items-center gap-1">
              Made with <Heart className="w-4 h-4 text-red-500 fill-red-500" /> for cube enthusiasts
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

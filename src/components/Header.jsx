import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Menu, X, Youtube } from 'lucide-react';
import { Button } from './ui/button';

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const scrollToSection = (id) => {
    if (location.pathname !== '/') {
      navigate('/');
      // Wait for navigation, then scroll
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) element.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const element = document.getElementById(id);
      if (element) element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  const goHome = () => {
    navigate('/');
    setIsMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2 cursor-pointer" onClick={goHome} data-testid="logo">
            <div className="w-10 h-10 bg-gradient-to-br from-red-500 via-blue-500 to-green-500 rounded-lg flex items-center justify-center transform rotate-45">
              <div className="transform -rotate-45 text-white font-bold text-lg">RC</div>
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-red-600 via-blue-600 to-green-600 bg-clip-text text-transparent">
              CubeGod
            </span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <button onClick={() => scrollToSection('home')} className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
              Home
            </button>
            <button onClick={() => scrollToSection('cubes')} className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
              Cubes
            </button>
            <button onClick={() => scrollToSection('patterns')} className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
              Patterns
            </button>
            <button onClick={() => scrollToSection('flags')} className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
              Flags
            </button>
            <button onClick={() => scrollToSection('tutorials')} className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
              Tutorials
            </button>
            <Button
            onClick={() => window.open('https://www.youtube.com/@cubegod7233', '_blank')}
              className="bg-red-600 hover:bg-red-700 text-white"
            >
              <Youtube className="w-4 h-4 mr-2" />
              YouTube
            </Button>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-gray-700"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden mt-4 pb-4 space-y-3">
            <button onClick={() => scrollToSection('home')} className="block w-full text-left text-gray-700 hover:text-blue-600 font-medium py-2">
              Home
            </button>
            <button onClick={() => scrollToSection('cubes')} className="block w-full text-left text-gray-700 hover:text-blue-600 font-medium py-2">
              Cubes
            </button>
            <button onClick={() => scrollToSection('patterns')} className="block w-full text-left text-gray-700 hover:text-blue-600 font-medium py-2">
              Patterns
            </button>
            <button onClick={() => scrollToSection('flags')} className="block w-full text-left text-gray-700 hover:text-blue-600 font-medium py-2">
              Flags
            </button>
            <button onClick={() => scrollToSection('tutorials')} className="block w-full text-left text-gray-700 hover:text-blue-600 font-medium py-2">
              Tutorials
            </button>
            <Button
              onClick={() => window.open('https://www.youtube.com/@CubeGod', '_blank')}
              className="w-full bg-red-600 hover:bg-red-700 text-white"
            >
              <Youtube className="w-4 h-4 mr-2" />
              YouTube Channel
            </Button>
          </nav>
        )}
      </div>
    </header>
  );
};

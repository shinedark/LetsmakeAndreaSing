import React, { useState, useEffect } from 'react';

interface Slide {
  id: string;
  title: string;
  content: React.ReactNode;
  background?: string;
}

interface SlidePresentationProps {
  slides: Slide[];
  autoAdvance?: boolean;
  autoAdvanceDelay?: number;
}

export function SlidePresentation({ 
  slides, 
  autoAdvance = false, 
  autoAdvanceDelay = 5000 
}: SlidePresentationProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    if (autoAdvance && slides.length > 1) {
      const interval = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
      }, autoAdvanceDelay);
      return () => clearInterval(interval);
    }
  }, [autoAdvance, autoAdvanceDelay, slides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  const currentSlideData = slides[currentSlide];

  return (
    <div className={`relative w-full h-screen bg-black text-white overflow-hidden ${isFullscreen ? 'fixed inset-0 z-50' : ''}`}>
      {/* Slide Content */}
      <div 
        className="w-full h-full flex flex-col justify-center items-center p-8"
        style={{ background: currentSlideData.background || 'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)' }}
      >
        <div className="max-w-6xl w-full">
          <h1 className="text-4xl md:text-6xl font-bold text-center mb-8 text-white">
            {currentSlideData.title}
          </h1>
          <div className="text-lg md:text-xl text-gray-300 leading-relaxed">
            {currentSlideData.content}
          </div>
        </div>
      </div>

      {/* Navigation Controls */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-4">
        <button
          onClick={prevSlide}
          className="px-6 py-3 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors"
        >
          ← Previous
        </button>
        
        <button
          onClick={nextSlide}
          className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
        >
          Next →
        </button>
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-colors ${
              index === currentSlide ? 'bg-white' : 'bg-gray-500'
            }`}
          />
        ))}
      </div>

      {/* Fullscreen Toggle */}
      <button
        onClick={toggleFullscreen}
        className="absolute top-4 right-4 px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors"
      >
        {isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
      </button>

      {/* Slide Counter */}
      <div className="absolute top-4 left-4 px-4 py-2 bg-gray-800 rounded-lg">
        {currentSlide + 1} / {slides.length}
      </div>

      {/* Keyboard Navigation */}
      <div className="absolute inset-0" onKeyDown={(e) => {
        if (e.key === 'ArrowRight' || e.key === ' ') nextSlide();
        if (e.key === 'ArrowLeft') prevSlide();
        if (e.key === 'f' || e.key === 'F') toggleFullscreen();
      }} tabIndex={0} />
    </div>
  );
}

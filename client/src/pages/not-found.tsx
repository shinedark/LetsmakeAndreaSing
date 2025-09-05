import React, { useState, useRef } from 'react';

export default function NotFound() {
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(videoRef.current.muted);
    }
  };

  return (
    <div className="relative w-full h-screen bg-black flex items-center justify-center text-white text-center">
      {/* Video stamp in top left */}
      <div className="absolute top-4 left-4 w-40 h-40 rounded-lg overflow-hidden border-4 border-white shadow-2xl bg-red-500">
        <video 
          ref={videoRef} 
          autoPlay 
          loop 
          muted 
          className="w-full h-full object-cover"
        >
          <source src="/videos/404.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        {/* Shine Dark tag - more visible */}
        <div className="absolute bottom-0 left-0 right-0 bg-red-600 bg-opacity-90 text-xs text-white py-2 text-center font-bold">
          SHINE DARK
        </div>
      </div>

      {/* Mute button */}
      <button
        onClick={toggleMute}
        className="absolute top-4 right-4 px-5 py-2 bg-black bg-opacity-50 text-white border-none rounded cursor-pointer z-10 hover:bg-opacity-70"
      >
        {isMuted ? 'Noise' : 'Mute'}
      </button>
      
      {/* Main content */}
      <div className="relative z-10">
        <h1 className="text-6xl font-bold mb-4">404 - Page Not Found</h1>
        <p className="text-xl">The page you are looking for does not exist.</p>
      </div>
    </div>
  );
}

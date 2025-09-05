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
      {/* Full screen video background */}
      <div className="absolute inset-0 w-full h-full">
        <video 
          ref={videoRef} 
          autoPlay 
          loop 
          muted 
          className="w-full h-full object-cover"
        >
          <source src="/LetsmakeAndreaSing/videos/404.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>

      {/* Mute button */}
      <button
        onClick={toggleMute}
        className="absolute top-4 right-4 px-5 py-2 bg-black bg-opacity-50 text-white border-none rounded cursor-pointer z-10 hover:bg-opacity-70"
      >
        {isMuted ? 'Noise' : 'Mute'}
      </button>
      
      {/* Main content */}
      <div className="relative z-10 bg-black bg-opacity-50 p-8 rounded-lg">
        <h1 className="text-6xl font-bold mb-4">404 - Page Not Found</h1>
        <p className="text-xl">The page you are looking for does not exist.</p>
      </div>
    </div>
  );
}

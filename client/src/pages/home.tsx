import { useState } from 'react';
import { ThreeVisualization } from '@/components/three-visualization';

export default function Home() {
  const [isVisualizationRunning, setIsVisualizationRunning] = useState(false);

  const getStatusColor = () => {
    if (isVisualizationRunning) {
      return 'text-yellow-400';
    }
    return 'text-green-400';
  };

  const getStatusText = () => {
    if (isVisualizationRunning) {
      return 'Visualization Running';
    }
    return 'Ready';
  };

  return (
    <div className="min-h-screen w-full bg-black text-white">
      {/* Video stamp in top left */}
      <div className="absolute top-4 left-4 w-40 h-40 rounded-lg overflow-hidden border-4 border-white shadow-2xl bg-red-500 z-50">
        <video
          autoPlay 
          loop 
          muted 
          className="w-full h-full object-cover"
        >
          <source src={`${import.meta.env.BASE_URL}videos/404.mp4`} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        {/* Shine Dark tag - more visible */}
        <div className="absolute bottom-0 left-0 right-0 bg-red-600 bg-opacity-90 text-xs text-white py-2 text-center font-bold">
          SHINE DARK
        </div>
      </div>

      {/* Pirlo Image at the top */}
      <div className="w-full text-center py-8 bg-gray-900">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/20150616_-_Portugal_-_Italie_-_Gen%C3%A8ve_-_Andrea_Pirlo_%28cropped%29.jpg/250px-20150616_-_Portugal_-_Italie_-_Gen%C3%A8ve_-_Andrea_Pirlo_%28cropped%29.jpg"
          alt="Andrea Pirlo - Soccer Legend"
          className="w-32 h-32 rounded-full mx-auto border-4 border-white shadow-lg"
        />
      </div>

      {/* Header Section */}
      <header className="border-b border-gray-700 bg-black/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-white">AndreaSing - Fractal Consciousness</h1>
              <p className="text-gray-300 mt-1">Interactive Visualization of Ownerless Repeats</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-sm text-white">
                <span>Status: </span>
                <span className={getStatusColor()} data-testid="generation-status">
                  {getStatusText()}
                </span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
        {/* Three.js Visualization Section */}
        <section className="mb-12">
          <div className="bg-gray-900 rounded-lg p-6">
            <h2 className="text-2xl font-bold mb-4">Fractal Consciousness Visualization</h2>
            
            {/* Controls */}
            <div className="flex flex-wrap gap-4 mb-6">
              <button
                onClick={() => setIsVisualizationRunning(true)}
                disabled={isVisualizationRunning}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
              >
                {isVisualizationRunning ? 'Running...' : 'Start Visualization'}
              </button>

              <a
                href="/slides"
                className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
              >
                View Slides
              </a>
            </div>

            {/* Three.js Visualization Display */}
            <div className="bg-black rounded-lg p-4 min-h-[500px]">
              {isVisualizationRunning ? (
                <ThreeVisualization 
                  isRunning={isVisualizationRunning}
                  onStop={() => setIsVisualizationRunning(false)}
                />
              ) : (
                <div className="h-full flex items-center justify-center text-center text-gray-400">
                  <div>
                    <p className="text-lg mb-4">Click "Start Visualization" to begin exploring</p>
                    <p className="text-sm mb-2">Experience fractal consciousness through 3D shapes</p>
                    <p className="text-xs text-gray-500">
                      Spheres, cubes, cones, cylinders, and torus shapes will dance to random audio tracks
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* About Section */}
        <section className="mb-12">
          <div className="bg-gray-900 rounded-lg p-6">
            <h2 className="text-2xl font-bold mb-4">About Fractal Consciousness</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold mb-3 text-blue-400">3D Visualization</h3>
                <p className="text-gray-300 mb-4">
                  Experience consciousness through interactive 3D shapes that move, rotate, and pulse 
                  in harmony with random audio tracks. Each shape represents a different aspect of 
                  fractal consciousness.
                </p>
                <ul className="text-sm text-gray-400 space-y-1">
                  <li>• Spheres: Infinite depth and complexity</li>
                  <li>• Cubes: Structured patterns and boundaries</li>
                  <li>• Cones: Directional consciousness flow</li>
                  <li>• Cylinders: Continuous cycles and repeats</li>
                  <li>• Torus: Infinite loops and ownerless patterns</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-3 text-green-400">Audio Experience</h3>
                <p className="text-gray-300 mb-4">
                  Random audio tracks play automatically when the visualization is running, 
                  creating a multi-sensory experience of fractal consciousness. Each track 
                  represents a different frequency of awareness.
                </p>
                <div className="text-sm text-gray-400">
                  <p className="mb-2">Audio tracks are located in:</p>
                  <code className="bg-gray-800 px-2 py-1 rounded text-xs">
                    /client/public/audio/
                  </code>
                  <p className="mt-2 text-xs">Add your own .mp3 files to customize the experience</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Footer */}
      <footer className="border-t border-gray-700 bg-gray-900">
        <div className="container mx-auto px-6 py-8">
          <div className="text-center text-gray-300">
            <p className="mb-2">AndreaSing - Fractal Consciousness Visualization</p>
            <p className="text-sm">Exploring consciousness through 3D shapes and random audio patterns</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
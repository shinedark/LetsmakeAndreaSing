import { useEffect } from 'react';
import { useMandelbrot } from '@/hooks/use-mandelbrot';

export default function Home() {
  const {
    isGenerating,
    currentResult,
    generationProgress,
    zoomLevel,
    centerReal,
    centerImag,
    config,
    generationHistory,
    currentHistoryIndex,
    startGeneration,
    pauseGeneration,
    resetGeneration,
    zoomIn,
    zoomOut,
    navigateHistory,
    updateConfig,
    exportImage,
  } = useMandelbrot();

  useEffect(() => {
    // Auto-start generation when component mounts
    if (!currentResult && !isGenerating) {
      startGeneration();
    }
  }, [currentResult, isGenerating, startGeneration]);

  const getStatusColor = () => {
    if (isGenerating) {
      return 'text-yellow-400';
    }
    return 'text-green-400';
  };

  const getStatusText = () => {
    if (isGenerating) {
      return `Generating... ${Math.round(generationProgress)}%`;
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
        {/* Mandelbrot Visualization Section */}
        <section className="mb-12">
          <div className="bg-gray-900 rounded-lg p-6">
            <h2 className="text-2xl font-bold mb-4">Fractal Consciousness Visualization</h2>
            
            {/* Controls */}
            <div className="flex flex-wrap gap-4 mb-6">
              <button
                onClick={() => startGeneration()}
                disabled={isGenerating}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
              >
                {isGenerating ? 'Generating...' : 'Generate Fractal'}
              </button>
              
              <button
                onClick={pauseGeneration}
                disabled={!isGenerating}
                className="px-4 py-2 bg-yellow-600 text-white rounded hover:bg-yellow-700 disabled:opacity-50"
              >
                Pause
              </button>
              
              <button
                onClick={resetGeneration}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
              >
                Reset
              </button>
              
              <button
                onClick={exportImage}
                disabled={!currentResult}
                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-50"
              >
                Export Image
              </button>

              <a
                href="/slides"
                className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
              >
                View Slides
              </a>
            </div>

            {/* Zoom Controls */}
            <div className="flex flex-wrap gap-4 mb-6">
              <button
                onClick={() => zoomIn(centerReal, centerImag)}
                className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
              >
                Zoom In
              </button>
              
              <button
                onClick={zoomOut}
                disabled={zoomLevel <= 1}
                className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 disabled:opacity-50"
              >
                Zoom Out
              </button>
            </div>

            {/* History Navigation */}
            {generationHistory.length > 1 && (
              <div className="flex gap-4 mb-6">
                <button
                  onClick={() => navigateHistory('back')}
                  disabled={currentHistoryIndex <= 0}
                  className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 disabled:opacity-50"
                >
                  ← Previous
                </button>
                
                <button
                  onClick={() => navigateHistory('forward')}
                  disabled={currentHistoryIndex >= generationHistory.length - 1}
                  className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 disabled:opacity-50"
                >
                  Next →
                </button>
              </div>
            )}

            {/* Progress Bar */}
            {isGenerating && (
              <div className="mb-6">
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div 
                    className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${generationProgress}%` }}
                  ></div>
                </div>
                <p className="text-sm text-gray-300 mt-2">
                  Generating fractal at {config.width}x{config.height} resolution...
                </p>
              </div>
            )}

            {/* Fractal Display */}
            <div className="bg-black rounded-lg p-4 min-h-[400px] flex items-center justify-center">
              {currentResult ? (
                <div className="text-center">
                  <h3 className="text-xl font-bold mb-4">Mandelbrot Set - Ownerless Repeats</h3>
                  <p className="text-gray-300 mb-4">
                    Zoom Level: {zoomLevel}x | Center: ({centerReal.toFixed(3)}, {centerImag.toFixed(3)})
                  </p>
                  <p className="text-sm text-gray-400">
                    Generated in {currentResult.generationTime.toFixed(2)}ms
                  </p>
                  <div className="mt-4 text-xs text-gray-500">
                    <p>This fractal represents the infinite complexity of consciousness</p>
                    <p>Each point reveals patterns that repeat without ownership</p>
                  </div>
                </div>
              ) : (
                <div className="text-center text-gray-400">
                  <p className="text-lg">Click "Generate Fractal" to begin exploring</p>
                  <p className="text-sm mt-2">The Mandelbrot set awaits your consciousness</p>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Configuration Section */}
        <section className="mb-12">
          <div className="bg-gray-900 rounded-lg p-6">
            <h2 className="text-2xl font-bold mb-4">Fractal Configuration</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Width</label>
                <input
                  type="number"
                  value={config.width}
                  onChange={(e) => updateConfig({ width: parseInt(e.target.value) })}
                  className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Height</label>
                <input
                  type="number"
                  value={config.height}
                  onChange={(e) => updateConfig({ height: parseInt(e.target.value) })}
                  className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Max Iterations</label>
                <input
                  type="number"
                  value={config.maxIterations}
                  onChange={(e) => updateConfig({ maxIterations: parseInt(e.target.value) })}
                  className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Zoom Level</label>
                <input
                  type="number"
                  value={zoomLevel}
                  disabled
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded text-gray-400"
                />
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
            <p className="text-sm">Exploring the Mandelbrot set and emergent patterns of ownerless repeats</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
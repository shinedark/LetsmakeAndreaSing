interface FunctionChartProps {
  currentTask: any;
}

export function FunctionChart({ currentTask }: FunctionChartProps) {
  const generateSineWave = (amplitude: number, phase: number) => {
    const points = [];
    for (let i = 0; i < 100; i++) {
      const x = (i / 99) * 10 - 5; // -5 to 5
      const y = amplitude * Math.sin(x + phase);
      points.push({ x, y });
    }
    return points;
  };

  const points = currentTask ? generateSineWave(currentTask.amplitude, currentTask.phase) : [];

  return (
    <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
      <h2 className="text-2xl font-bold mb-4 text-white">Function Chart</h2>
      <div className="h-64 bg-gray-700 rounded-lg p-4 relative">
        {points.length > 0 ? (
          <svg className="w-full h-full" viewBox="0 0 400 200">
            {/* Grid lines */}
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#374151" strokeWidth="0.5"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
            
            {/* X-axis */}
            <line x1="0" y1="100" x2="400" y2="100" stroke="#6B7280" strokeWidth="2"/>
            
            {/* Y-axis */}
            <line x1="200" y1="0" x2="200" y2="200" stroke="#6B7280" strokeWidth="2"/>
            
            {/* Sine wave */}
            <path
              d={`M ${points.map((p, i) => 
                `${(i / (points.length - 1)) * 400},${100 - (p.y * 20 + 100)}`
              ).join(' L ')}`}
              fill="none"
              stroke="#FFFFFF"
              strokeWidth="2"
            />
            
            {/* Data points */}
            {points.filter((_, i) => i % 10 === 0).map((p, i) => (
              <circle
                key={i}
                cx={(i * 10 / (points.length - 1)) * 400}
                cy={100 - (p.y * 20 + 100)}
                r="3"
                fill="#FFFFFF"
              />
            ))}
          </svg>
        ) : (
          <div className="h-full flex items-center justify-center">
            <div className="text-center text-gray-300">
              <p>Start training to see sine wave visualization</p>
            </div>
          </div>
        )}
      </div>
      {currentTask && (
        <div className="mt-2 text-sm text-gray-300">
          <span>Amplitude: {currentTask.amplitude?.toFixed(2) || 'N/A'}</span>
          <span className="ml-4">Phase: {currentTask.phase?.toFixed(2) || 'N/A'}</span>
        </div>
      )}
    </div>
  );
}
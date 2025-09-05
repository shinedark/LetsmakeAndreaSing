export function NeuralNetworkViz() {
  return (
    <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
      <h2 className="text-2xl font-bold mb-4 text-white">Neural Network Architecture</h2>
      <div className="text-center text-gray-300">
        <div className="mt-4 flex justify-center items-center space-x-8">
          {/* Input Node */}
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 bg-gray-600 rounded-full flex items-center justify-center text-white font-mono text-sm border-2 border-gray-500">
              Input (x)
            </div>
            <div className="text-xs mt-2 text-gray-400">x</div>
          </div>
          
          {/* Arrow */}
          <div className="text-gray-400 text-2xl">→</div>
          
          {/* Hidden Layer 1 */}
          <div className="flex flex-col items-center">
            <div className="grid grid-cols-2 gap-2">
              <div className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center text-white font-mono text-xs border border-gray-500"></div>
              <div className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center text-white font-mono text-xs border border-gray-500"></div>
              <div className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center text-white font-mono text-xs border border-gray-500"></div>
              <div className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center text-white font-mono text-xs border border-gray-500"></div>
            </div>
            <div className="text-xs mt-2 text-gray-400">Hidden Layer 1</div>
            <div className="text-xs text-gray-500">+60 more</div>
          </div>
          
          {/* Arrow */}
          <div className="text-gray-400 text-2xl">→</div>
          
          {/* Hidden Layer 2 */}
          <div className="flex flex-col items-center">
            <div className="grid grid-cols-2 gap-2">
              <div className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center text-white font-mono text-xs border border-gray-500"></div>
              <div className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center text-white font-mono text-xs border border-gray-500"></div>
              <div className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center text-white font-mono text-xs border border-gray-500"></div>
              <div className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center text-white font-mono text-xs border border-gray-500"></div>
            </div>
            <div className="text-xs mt-2 text-gray-400">Hidden Layer 2</div>
            <div className="text-xs text-gray-500">+60 more</div>
          </div>
          
          {/* Arrow */}
          <div className="text-gray-400 text-2xl">→</div>
          
          {/* Output Node */}
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 bg-gray-600 rounded-full flex items-center justify-center text-white font-mono text-sm border-2 border-gray-500">
              Output
            </div>
            <div className="text-xs mt-2 text-gray-400">y</div>
          </div>
        </div>
        <div className="mt-6 text-sm text-gray-400">
          2 Hidden Layers × 64 Units + ReLU Activation
        </div>
      </div>
    </div>
  );
}
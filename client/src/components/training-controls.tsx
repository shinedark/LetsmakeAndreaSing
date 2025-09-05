interface TrainingControlsProps {
  isTraining: boolean;
  isPaused: boolean;
  currentIteration: number;
  maxIterations: number;
  metaLoss: number;
  progressPercentage: number;
  elapsedTime: number;
  hyperParams: any;
  onStart: () => void;
  onPause: () => void;
  onReset: () => void;
  onExport: () => void;
  onUpdateHyperParams: (params: any) => void;
}

export function TrainingControls(props: TrainingControlsProps) {
  return (
    <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
      <h2 className="text-2xl font-bold mb-4 text-white">Training Controls</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h3 className="text-lg font-semibold mb-3 text-white">Hyperparameters</h3>
          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Meta Learning Rate: {props.hyperParams.metaLearningRate}
              </label>
              <input 
                type="range" 
                min="0.0001" 
                max="0.1" 
                step="0.0001" 
                value={props.hyperParams.metaLearningRate} 
                onChange={(e) => props.onUpdateHyperParams({ metaLearningRate: parseFloat(e.target.value) })}
                className="w-full h-2 bg-gray-600 rounded-lg appearance-none cursor-pointer slider"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Inner Learning Rate: {props.hyperParams.innerLearningRate}
              </label>
              <input 
                type="range" 
                min="0.001" 
                max="0.5" 
                step="0.001" 
                value={props.hyperParams.innerLearningRate} 
                onChange={(e) => props.onUpdateHyperParams({ innerLearningRate: parseFloat(e.target.value) })}
                className="w-full h-2 bg-gray-600 rounded-lg appearance-none cursor-pointer slider"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Inner Steps: {props.hyperParams.innerSteps}
              </label>
              <input 
                type="range" 
                min="1" 
                max="20" 
                step="1" 
                value={props.hyperParams.innerSteps} 
                onChange={(e) => props.onUpdateHyperParams({ innerSteps: parseInt(e.target.value) })}
                className="w-full h-2 bg-gray-600 rounded-lg appearance-none cursor-pointer slider"
              />
            </div>
          </div>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-3 text-white">Training Status</h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-300">Progress:</span>
              <span className="text-white">{props.progressPercentage.toFixed(1)}%</span>
            </div>
            <div className="w-full bg-gray-600 rounded-full h-2">
              <div 
                className="bg-white h-2 rounded-full transition-all duration-300" 
                style={{ width: `${props.progressPercentage}%` }}
              ></div>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-300">Iteration:</span>
              <span className="text-white">{props.currentIteration} / {props.maxIterations}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-300">Meta Loss:</span>
              <span className="text-white">{props.metaLoss.toFixed(4)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-300">Time:</span>
              <span className="text-white">{props.elapsedTime.toFixed(1)}s</span>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-6 flex space-x-4">
        <button 
          onClick={props.onStart}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          {props.isTraining ? (props.isPaused ? 'Resume' : 'Pause') : 'Start Training'}
        </button>
        <button 
          onClick={props.onReset}
          className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700"
        >
          Reset
        </button>
        <button 
          onClick={props.onExport}
          className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
        >
          Export Model
        </button>
      </div>
    </div>
  );
}
import { useEffect } from 'react';
import { useReptileTraining } from '@/hooks/use-reptile-training';
import { NeuralNetworkViz } from '@/components/neural-network-viz';
import { TrainingControls } from '@/components/training-controls';
import { LossChart } from '@/components/loss-chart';
import { FunctionChart } from '@/components/function-chart';
import { TaskSamples } from '@/components/task-samples';
import { EvaluationSection } from '@/components/evaluation-section';
import { CodeSection } from '@/components/code-section';

export default function Home() {
  const {
    trainingState,
    hyperParams,
    evaluationResults,
    startTraining,
    pauseTraining,
    resetTraining,
    updateHyperParameters,
    initializeModel
  } = useReptileTraining();

  useEffect(() => {
    initializeModel();
  }, [initializeModel]);

  const handleExport = () => {
    // TODO: Implement model export functionality
    console.log('Export model functionality to be implemented');
  };

  const getCurrentTask = () => {
    if (trainingState.currentBatch.length > 0) {
      return trainingState.currentBatch[0];
    }
    return undefined;
  };

  const getTrainingStatus = () => {
    if (trainingState.isTraining) {
      return trainingState.isPaused ? 'Paused' : 'Training...';
    }
    return 'Ready';
  };

  const getStatusColor = () => {
    if (trainingState.isTraining) {
      return trainingState.isPaused ? 'text-yellow-400' : 'text-green-400';
    }
    return 'text-gray-400';
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
                            <source src="/videos/404.mp4" type="video/mp4" />
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
              <h1 className="text-3xl font-bold text-white">Gronkosky - Reptile Meta-Learning</h1>
              <p className="text-gray-300 mt-1">Interactive Visualization of Few-Shot Learning</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-sm text-white">
                <span>Status: </span>
                <span className={getStatusColor()} data-testid="training-status">
                  {getTrainingStatus()}
                </span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
        {/* Neural Network Architecture Section */}
        <section className="mb-12">
          <NeuralNetworkViz />
        </section>

        {/* Training Controls Section */}
        <section className="mb-12">
          <TrainingControls
            isTraining={trainingState.isTraining}
            isPaused={trainingState.isPaused}
            currentIteration={trainingState.currentIteration}
            maxIterations={trainingState.maxIterations}
            metaLoss={trainingState.metaLoss}
            progressPercentage={trainingState.progressPercentage}
            elapsedTime={trainingState.elapsedTime}
            hyperParams={hyperParams}
            onStart={startTraining}
            onPause={pauseTraining}
            onReset={resetTraining}
            onExport={handleExport}
            onUpdateHyperParams={updateHyperParameters}
          />
        </section>

        {/* Visualization Section */}
        <section className="mb-12">
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
            <LossChart lossHistory={trainingState.lossHistory} />
            <FunctionChart currentTask={getCurrentTask()} />
          </div>
        </section>

        {/* Task Samples Section */}
        <section className="mb-12">
          <TaskSamples currentBatch={trainingState.currentBatch} />
        </section>

        {/* Evaluation Section */}
        <section className="mb-12">
          <EvaluationSection evaluationResults={evaluationResults} />
        </section>

        {/* Code Implementation Section */}
        <section className="mb-12">
          <CodeSection />
        </section>
      </div>

      {/* Footer */}
      <footer className="border-t border-gray-700 bg-gray-900">
        <div className="container mx-auto px-6 py-8">
          <div className="text-center text-gray-300">
            <p className="mb-2">Gronkosky - Reptile Meta-Learning Visualization</p>
            <p className="text-sm">Implementation of "On First-Order Meta-Learning Algorithms" by Nichol et al.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
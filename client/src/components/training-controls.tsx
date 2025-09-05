import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Slider } from "@/components/ui/slider";
import { Play, Pause, RotateCcw, Download } from "lucide-react";

interface TrainingControlsProps {
  isTraining: boolean;
  isPaused: boolean;
  currentIteration: number;
  maxIterations: number;
  metaLoss: number;
  progressPercentage: number;
  elapsedTime: number;
  hyperParams: {
    metaLearningRate: number;
    innerLearningRate: number;
    innerSteps: number;
    tasksPerBatch: number;
    metaIterations: number;
  };
  onStart: () => void;
  onPause: () => void;
  onReset: () => void;
  onExport: () => void;
  onUpdateHyperParams: (params: any) => void;
}

export function TrainingControls({
  isTraining,
  isPaused,
  currentIteration,
  maxIterations,
  metaLoss,
  progressPercentage,
  elapsedTime,
  hyperParams,
  onStart,
  onPause,
  onReset,
  onExport,
  onUpdateHyperParams
}: TrainingControlsProps) {
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Hyperparameters */}
      <Card className="p-6">
        <h3 className="text-xl font-semibold mb-4">Hyperparameters</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Meta Learning Rate</label>
            <div className="flex items-center space-x-4">
              <Slider
                value={[hyperParams.metaLearningRate]}
                onValueChange={([value]) => onUpdateHyperParams({ metaLearningRate: value })}
                min={0.0001}
                max={0.01}
                step={0.0001}
                className="flex-1"
                data-testid="slider-meta-lr"
              />
              <span className="text-sm text-muted-foreground min-w-[60px]" data-testid="value-meta-lr">
                {hyperParams.metaLearningRate.toFixed(4)}
              </span>
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">Inner Learning Rate</label>
            <div className="flex items-center space-x-4">
              <Slider
                value={[hyperParams.innerLearningRate]}
                onValueChange={([value]) => onUpdateHyperParams({ innerLearningRate: value })}
                min={0.001}
                max={0.1}
                step={0.001}
                className="flex-1"
                data-testid="slider-inner-lr"
              />
              <span className="text-sm text-muted-foreground min-w-[60px]" data-testid="value-inner-lr">
                {hyperParams.innerLearningRate.toFixed(3)}
              </span>
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">Meta Iterations</label>
            <div className="flex items-center space-x-4">
              <Slider
                value={[hyperParams.metaIterations]}
                onValueChange={([value]) => onUpdateHyperParams({ metaIterations: value })}
                min={100}
                max={2000}
                step={50}
                className="flex-1"
                data-testid="slider-iterations"
              />
              <span className="text-sm text-muted-foreground min-w-[60px]" data-testid="value-iterations">
                {hyperParams.metaIterations}
              </span>
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">Tasks per Batch</label>
            <div className="flex items-center space-x-4">
              <Slider
                value={[hyperParams.tasksPerBatch]}
                onValueChange={([value]) => onUpdateHyperParams({ tasksPerBatch: value })}
                min={2}
                max={10}
                step={1}
                className="flex-1"
                data-testid="slider-batch-size"
              />
              <span className="text-sm text-muted-foreground min-w-[60px]" data-testid="value-batch-size">
                {hyperParams.tasksPerBatch}
              </span>
            </div>
          </div>
        </div>
      </Card>

      {/* Training Progress */}
      <Card className="p-6">
        <h3 className="text-xl font-semibold mb-4">Training Progress</h3>
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Current Iteration:</span>
            <span className="font-mono text-primary" data-testid="current-iteration">
              {currentIteration}
            </span>
          </div>
          
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Meta Loss:</span>
            <span className="font-mono text-accent" data-testid="meta-loss">
              {metaLoss > 0 ? metaLoss.toFixed(3) : '--'}
            </span>
          </div>
          
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Elapsed Time:</span>
            <span className="font-mono text-foreground" data-testid="elapsed-time">
              {formatTime(elapsedTime)}
            </span>
          </div>
          
          <div className="w-full">
            <Progress value={progressPercentage} className="w-full" data-testid="progress-bar" />
          </div>
          
          <div className="grid grid-cols-3 gap-4 mt-6">
            {!isTraining ? (
              <Button onClick={onStart} className="w-full" data-testid="button-start">
                <Play className="w-4 h-4 mr-2" />
                Start
              </Button>
            ) : (
              <Button onClick={onPause} variant="secondary" className="w-full" data-testid="button-pause">
                <Pause className="w-4 h-4 mr-2" />
                {isPaused ? 'Resume' : 'Pause'}
              </Button>
            )}
            
            <Button onClick={onReset} variant="destructive" className="w-full" data-testid="button-reset">
              <RotateCcw className="w-4 h-4 mr-2" />
              Reset
            </Button>
            
            <Button onClick={onExport} variant="outline" className="w-full" data-testid="button-export">
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}

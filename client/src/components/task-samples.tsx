import { Card } from "@/components/ui/card";
import { generateSineWavePoints } from '@/lib/data-generation';

interface TaskSamplesProps {
  currentBatch: Array<{
    amplitude: number;
    phase: number;
    loss: number;
  }>;
}

export function TaskSamples({ currentBatch }: TaskSamplesProps) {
  return (
    <Card className="p-6">
      <h3 className="text-xl font-semibold mb-4">Sample Tasks in Current Batch</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
        {currentBatch.length === 0 ? (
          <div className="col-span-full text-center text-muted-foreground py-8">
            <p>No tasks available. Start training to see sample tasks.</p>
          </div>
        ) : (
          currentBatch.map((task, index) => {
            const { x, y } = generateSineWavePoints(task.amplitude, task.phase, 20);
            const pathData = x.map((xVal, i) => {
              const svgX = ((xVal + 5) / 10) * 100 + 10; // Map -5,5 to 10,110
              const svgY = 40 - (y[i] / 5) * 30; // Map to SVG coordinates
              return `${i === 0 ? 'M' : 'L'} ${svgX} ${svgY}`;
            }).join(' ');

            return (
              <div key={index} className="bg-muted rounded-lg p-4 space-y-3" data-testid={`task-sample-${index}`}>
                <div className="text-center">
                  <h4 className="font-medium text-sm">Task {index + 1}</h4>
                  <p className="text-xs text-muted-foreground">
                    A: {task.amplitude.toFixed(1)}, φ: {task.phase.toFixed(1)}
                  </p>
                </div>
                <div className="h-24 bg-background rounded border border-border">
                  <svg width="100%" height="100%" viewBox="0 0 120 80" className="overflow-visible">
                    <path 
                      d={pathData} 
                      className="sine-wave-path stroke-chart-1 fill-none" 
                      strokeWidth="2"
                    />
                    {/* Sample training points */}
                    {[0, 5, 10, 15].map((i) => (
                      <circle 
                        key={i}
                        cx={((x[i] + 5) / 10) * 100 + 10}
                        cy={40 - (y[i] / 5) * 30}
                        r="2" 
                        className="data-points fill-chart-2 stroke-background stroke-2"
                      />
                    ))}
                  </svg>
                </div>
                <div className="text-xs text-center text-muted-foreground">
                  Loss: <span className="text-accent font-mono">{task.loss.toFixed(3)}</span>
                </div>
              </div>
            );
          })
        )}
      </div>
    </Card>
  );
}

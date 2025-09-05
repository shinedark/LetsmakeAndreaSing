import { useEffect, useRef } from 'react';
import { Card } from "@/components/ui/card";
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

interface EvaluationSectionProps {
  evaluationResults: {
    beforeFineTuning: number;
    afterFineTuning: number;
    improvementFactor: number;
  };
}

export function EvaluationSection({ evaluationResults }: EvaluationSectionProps) {
  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartInstanceRef = useRef<Chart | null>(null);

  useEffect(() => {
    if (!chartRef.current || evaluationResults.beforeFineTuning === 0) return;

    if (chartInstanceRef.current) {
      chartInstanceRef.current.destroy();
    }

    const ctx = chartRef.current.getContext('2d')!;
    
    chartInstanceRef.current = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Random Init', 'Meta-Learned'],
        datasets: [{
          label: 'MSE Loss',
          data: [evaluationResults.beforeFineTuning, evaluationResults.afterFineTuning],
          backgroundColor: [
            'hsl(0, 62%, 30%)',
            'hsl(158, 64%, 52%)'
          ],
          borderColor: [
            'hsl(0, 62%, 40%)',
            'hsl(158, 64%, 62%)'
          ],
          borderWidth: 2
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            labels: {
              color: 'hsl(210, 40%, 92%)'
            }
          }
        },
        scales: {
          x: {
            ticks: {
              color: 'hsl(215, 20%, 65%)'
            },
            grid: {
              color: 'hsl(217, 32%, 17%)'
            }
          },
          y: {
            title: {
              display: true,
              text: 'MSE Loss',
              color: 'hsl(210, 40%, 92%)'
            },
            ticks: {
              color: 'hsl(215, 20%, 65%)'
            },
            grid: {
              color: 'hsl(217, 32%, 17%)'
            }
          }
        }
      }
    });

    return () => {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }
    };
  }, [evaluationResults]);

  return (
    <Card className="p-6">
      <h3 className="text-xl font-semibold mb-6">Evaluation: Few-Shot Learning Performance</h3>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Before/After Comparison */}
        <div>
          <h4 className="text-lg font-medium mb-4">Before vs After Fine-tuning</h4>
          <div className="space-y-4">
            <div className="flex justify-between p-4 bg-muted rounded-lg">
              <div>
                <p className="font-medium">Random Initialization</p>
                <p className="text-sm text-muted-foreground">MSE on test set</p>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-destructive" data-testid="random-init-mse">
                  {evaluationResults.beforeFineTuning > 0 ? evaluationResults.beforeFineTuning.toFixed(3) : '--'}
                </p>
              </div>
            </div>
            <div className="flex justify-between p-4 bg-muted rounded-lg">
              <div>
                <p className="font-medium">After Meta-Learning</p>
                <p className="text-sm text-muted-foreground">MSE after 3 gradient steps</p>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-accent" data-testid="meta-learned-mse">
                  {evaluationResults.afterFineTuning > 0 ? evaluationResults.afterFineTuning.toFixed(3) : '--'}
                </p>
              </div>
            </div>
            <div className="text-center p-4 bg-primary/10 border border-primary/20 rounded-lg">
              <p className="text-sm text-muted-foreground">Improvement Factor</p>
              <p className="text-3xl font-bold text-primary" data-testid="improvement-factor">
                {evaluationResults.improvementFactor > 0 ? `${evaluationResults.improvementFactor.toFixed(1)}×` : '--'}
              </p>
            </div>
          </div>
        </div>

        {/* Test Task Visualization */}
        <div>
          <h4 className="text-lg font-medium mb-4">Test Task Performance</h4>
          <div className="h-64 bg-muted/20 rounded-lg p-4">
            <canvas ref={chartRef} data-testid="evaluation-chart" />
          </div>
          <div className="mt-4 text-sm text-muted-foreground text-center">
            <p>Comparison of MSE loss before and after meta-learning</p>
          </div>
        </div>
      </div>
    </Card>
  );
}

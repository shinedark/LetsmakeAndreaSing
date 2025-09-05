import { useEffect, useRef } from 'react';
import { Card } from "@/components/ui/card";
import { Chart, registerables } from 'chart.js';
import { generateSineWavePoints } from '@/lib/data-generation';

Chart.register(...registerables);

interface FunctionChartProps {
  currentTask?: {
    amplitude: number;
    phase: number;
    trainX?: number[];
    trainY?: number[];
  };
}

export function FunctionChart({ currentTask }: FunctionChartProps) {
  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartInstanceRef = useRef<Chart | null>(null);

  useEffect(() => {
    if (!chartRef.current) return;

    if (chartInstanceRef.current) {
      chartInstanceRef.current.destroy();
    }

    const ctx = chartRef.current.getContext('2d')!;
    
    let datasets = [];
    
    if (currentTask) {
      // Generate true function curve
      const { x, y } = generateSineWavePoints(currentTask.amplitude, currentTask.phase, 100);
      
      datasets.push({
        label: 'True Function',
        data: x.map((xVal, i) => ({ x: xVal, y: y[i] })),
        borderColor: 'hsl(217, 91%, 60%)',
        backgroundColor: 'transparent',
        borderWidth: 3,
        fill: false,
        tension: 0.4,
        pointRadius: 0,
        type: 'line' as const
      });

      // Add training points if available
      if (currentTask.trainX && currentTask.trainY) {
        datasets.push({
          label: 'Training Points',
          data: currentTask.trainX.map((x, i) => ({ x, y: currentTask.trainY![i] })),
          backgroundColor: 'hsl(158, 64%, 52%)',
          borderColor: 'hsl(222, 84%, 5%)',
          borderWidth: 2,
          pointRadius: 6,
          pointHoverRadius: 8,
          showLine: false,
          type: 'scatter' as const
        });
      }
    }
    
    chartInstanceRef.current = new Chart(ctx, {
      type: 'line',
      data: {
        datasets
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
            type: 'linear',
            title: {
              display: true,
              text: 'x',
              color: 'hsl(210, 40%, 92%)'
            },
            ticks: {
              color: 'hsl(215, 20%, 65%)'
            },
            grid: {
              color: 'hsl(217, 32%, 17%)'
            },
            min: -5,
            max: 5
          },
          y: {
            title: {
              display: true,
              text: 'y = A × sin(x + φ)',
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
  }, [currentTask]);

  return (
    <Card className="p-6">
      <h3 className="text-xl font-semibold mb-4">Current Task Approximation</h3>
      <div className="h-80">
        <canvas ref={chartRef} data-testid="function-chart" />
      </div>
      {currentTask && (
        <div className="mt-4 text-center text-sm text-muted-foreground">
          <p>A = {currentTask.amplitude.toFixed(2)}, φ = {currentTask.phase.toFixed(2)}</p>
        </div>
      )}
    </Card>
  );
}

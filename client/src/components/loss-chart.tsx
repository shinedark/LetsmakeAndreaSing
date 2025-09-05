import { useEffect, useRef } from 'react';
import { Card } from "@/components/ui/card";
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

interface LossChartProps {
  lossHistory: number[];
}

export function LossChart({ lossHistory }: LossChartProps) {
  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartInstanceRef = useRef<Chart | null>(null);

  useEffect(() => {
    if (!chartRef.current) return;

    if (chartInstanceRef.current) {
      chartInstanceRef.current.destroy();
    }

    const ctx = chartRef.current.getContext('2d')!;
    
    chartInstanceRef.current = new Chart(ctx, {
      type: 'line',
      data: {
        labels: lossHistory.map((_, i) => i + 1),
        datasets: [{
          label: 'Meta Loss',
          data: lossHistory,
          borderColor: 'hsl(217, 91%, 60%)',
          backgroundColor: 'hsl(217, 91%, 60%, 0.1)',
          borderWidth: 2,
          fill: true,
          tension: 0.4,
          pointRadius: 0,
          pointHoverRadius: 5
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
            title: {
              display: true,
              text: 'Meta Iteration',
              color: 'hsl(210, 40%, 92%)'
            },
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
              text: 'Loss',
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
  }, [lossHistory]);

  return (
    <Card className="p-6">
      <h3 className="text-xl font-semibold mb-4">Loss Curves</h3>
      <div className="h-80">
        <canvas ref={chartRef} data-testid="loss-chart" />
      </div>
    </Card>
  );
}

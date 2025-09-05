interface LossChartProps {
  lossHistory: number[];
}

export function LossChart({ lossHistory }: LossChartProps) {
  const maxLoss = Math.max(...lossHistory, 0.1);
  const minLoss = Math.min(...lossHistory, 0.001);
  const range = maxLoss - minLoss;

  return (
    <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
      <h2 className="text-2xl font-bold mb-4 text-white">Loss Chart</h2>
      <div className="h-64 bg-gray-700 rounded-lg p-4">
        {lossHistory.length > 0 ? (
          <div className="h-full flex items-end space-x-1">
            {lossHistory.slice(-50).map((loss, index) => {
              const height = range > 0 ? ((maxLoss - loss) / range) * 100 : 50;
              return (
                <div
                  key={index}
                  className="bg-white flex-1 rounded-t"
                  style={{ height: `${Math.max(height, 2)}%` }}
                />
              );
            })}
          </div>
        ) : (
          <div className="h-full flex items-center justify-center">
            <div className="text-center text-gray-300">
              <p>Start training to see loss visualization</p>
              <p className="text-sm mt-2">Current loss: 0.0000</p>
            </div>
          </div>
        )}
      </div>
      <div className="mt-2 text-sm text-gray-300">
        <span>Current: {lossHistory.length > 0 ? lossHistory[lossHistory.length - 1].toFixed(4) : '0.0000'}</span>
        <span className="ml-4">Min: {lossHistory.length > 0 ? minLoss.toFixed(4) : '0.0000'}</span>
        <span className="ml-4">Max: {lossHistory.length > 0 ? maxLoss.toFixed(4) : '0.0000'}</span>
      </div>
    </div>
  );
}
interface TaskSamplesProps {
  currentBatch: any[];
}

export function TaskSamples({ currentBatch }: TaskSamplesProps) {
  return (
    <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
      <h2 className="text-2xl font-bold mb-4 text-white">Task Samples</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {currentBatch.length > 0 ? (
          currentBatch.map((task, index) => (
            <div key={index} className="bg-gray-700 rounded-lg p-4 border border-gray-600">
              <h3 className="font-semibold text-white mb-2">Task {index + 1}</h3>
              <div className="text-sm text-gray-300">
                <p>Amplitude: {task.amplitude?.toFixed(2) || 'N/A'}</p>
                <p>Phase: {task.phase?.toFixed(2) || 'N/A'}</p>
                <p>Train Points: 10</p>
                <p>Test Points: 10</p>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center text-gray-300 py-8">
            <p>No tasks generated yet. Start training to see task samples.</p>
          </div>
        )}
      </div>
    </div>
  );
}
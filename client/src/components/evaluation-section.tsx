interface EvaluationSectionProps {
  evaluationResults: any;
}

export function EvaluationSection({ evaluationResults }: EvaluationSectionProps) {
  return (
    <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
      <h2 className="text-2xl font-bold mb-4 text-white">Evaluation Results</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="text-center">
          <div className="text-3xl font-bold text-blue-600 mb-2">
            {evaluationResults.accuracy ? (evaluationResults.accuracy * 100).toFixed(1) : '0.0'}%
          </div>
          <div className="text-gray-300">Accuracy</div>
        </div>
        <div className="text-center">
          <div className="text-3xl font-bold text-red-600 mb-2">
            {evaluationResults.loss ? evaluationResults.loss.toFixed(4) : '0.0000'}
          </div>
          <div className="text-gray-300">MSE Loss</div>
        </div>
        <div className="text-center">
          <div className="text-3xl font-bold text-green-600 mb-2">
            {evaluationResults.tasks || 0}
          </div>
          <div className="text-gray-300">Tasks Evaluated</div>
        </div>
      </div>
    </div>
  );
}
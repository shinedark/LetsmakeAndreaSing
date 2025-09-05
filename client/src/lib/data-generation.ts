import * as tf from '@tensorflow/tfjs';

export interface SineTask {
  amplitude: number;
  phase: number;
  trainX: tf.Tensor2D;
  trainY: tf.Tensor2D;
  testX: tf.Tensor2D;
  testY: tf.Tensor2D;
}

export function generateSineTask(): SineTask {
  // Random amplitude between 0.1 and 5.0
  const amplitude = Math.random() * 4.9 + 0.1;
  // Random phase between 0 and π
  const phase = Math.random() * Math.PI;

  // Generate training data (10 points)
  const trainXValues = [];
  const trainYValues = [];
  for (let i = 0; i < 10; i++) {
    const x = Math.random() * 10 - 5; // Uniform from -5 to 5
    const y = amplitude * Math.sin(x + phase);
    trainXValues.push(x);
    trainYValues.push(y);
  }

  // Generate test data (10 points)
  const testXValues = [];
  const testYValues = [];
  for (let i = 0; i < 10; i++) {
    const x = Math.random() * 10 - 5; // Uniform from -5 to 5
    const y = amplitude * Math.sin(x + phase);
    testXValues.push(x);
    testYValues.push(y);
  }

  return {
    amplitude,
    phase,
    trainX: tf.tensor2d(trainXValues, [10, 1]),
    trainY: tf.tensor2d(trainYValues, [10, 1]),
    testX: tf.tensor2d(testXValues, [10, 1]),
    testY: tf.tensor2d(testYValues, [10, 1])
  };
}

export function generateSineWavePoints(amplitude: number, phase: number, numPoints: number = 100): { x: number[], y: number[] } {
  const x = [];
  const y = [];
  
  for (let i = 0; i < numPoints; i++) {
    const xVal = (i / (numPoints - 1)) * 10 - 5; // From -5 to 5
    const yVal = amplitude * Math.sin(xVal + phase);
    x.push(xVal);
    y.push(yVal);
  }
  
  return { x, y };
}

export function generateTaskBatch(batchSize: number): SineTask[] {
  const tasks: SineTask[] = [];
  for (let i = 0; i < batchSize; i++) {
    tasks.push(generateSineTask());
  }
  return tasks;
}
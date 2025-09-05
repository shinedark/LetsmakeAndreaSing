import { useState, useRef, useCallback } from 'react';
import * as tf from '@tensorflow/tfjs';
import { ReptileMetaLearner } from '@/lib/reptile-algorithm';
import { createNeuralNetwork, computeMSE } from '@/lib/neural-network';
import { generateTaskBatch, generateSineTask } from '@/lib/data-generation';

export interface TrainingState {
  isTraining: boolean;
  isPaused: boolean;
  currentIteration: number;
  maxIterations: number;
  metaLoss: number;
  progressPercentage: number;
  elapsedTime: number;
  lossHistory: number[];
  currentBatch: any[];
}

export interface HyperParameters {
  metaLearningRate: number;
  innerLearningRate: number;
  innerSteps: number;
  tasksPerBatch: number;
  metaIterations: number;
}

export function useReptileTraining() {
  const [trainingState, setTrainingState] = useState<TrainingState>({
    isTraining: false,
    isPaused: false,
    currentIteration: 0,
    maxIterations: 1000,
    metaLoss: 0,
    progressPercentage: 0,
    elapsedTime: 0,
    lossHistory: [],
    currentBatch: []
  });

  const [hyperParams, setHyperParams] = useState<HyperParameters>({
    metaLearningRate: 0.001,
    innerLearningRate: 0.01,
    innerSteps: 5,
    tasksPerBatch: 5,
    metaIterations: 1000
  });

  const [evaluationResults, setEvaluationResults] = useState({
    beforeFineTuning: 0,
    afterFineTuning: 0,
    improvementFactor: 0
  });

  const reptileRef = useRef<ReptileMetaLearner | null>(null);
  const startTimeRef = useRef<number>(0);
  const animationFrameRef = useRef<number>(0);

  const initializeModel = useCallback(() => {
    const model = createNeuralNetwork();
    reptileRef.current = new ReptileMetaLearner(
      model,
      hyperParams.metaLearningRate,
      hyperParams.innerLearningRate,
      hyperParams.innerSteps
    );
  }, [hyperParams]);

  const startTraining = useCallback(async () => {
    if (!reptileRef.current) {
      initializeModel();
    }

    setTrainingState(prev => ({
      ...prev,
      isTraining: true,
      isPaused: false,
      currentIteration: 0,
      maxIterations: hyperParams.metaIterations,
      lossHistory: [],
      elapsedTime: 0
    }));

    startTimeRef.current = Date.now();

    const trainStep = async () => {
      if (!reptileRef.current) return;

      setTrainingState(prev => {
        if (prev.currentIteration >= hyperParams.metaIterations) {
          return { ...prev, isTraining: false };
        }
        return prev;
      });

      const batch = generateTaskBatch(hyperParams.tasksPerBatch);
      try {
        const metaLoss = await reptileRef.current.metaUpdate(batch);

        setTrainingState(prev => {
          const newIteration = prev.currentIteration + 1;
          const newLossHistory = [...prev.lossHistory, metaLoss];
          const progressPercentage = (newIteration / hyperParams.metaIterations) * 100;
          const elapsedTime = Math.floor((Date.now() - startTimeRef.current) / 1000);

          const shouldContinue = newIteration < hyperParams.metaIterations && prev.isTraining && !prev.isPaused;

          if (!shouldContinue) {
            setTimeout(() => evaluateModel(), 100);
          }

          return {
            ...prev,
            currentIteration: newIteration,
            metaLoss,
            lossHistory: newLossHistory.slice(-100),
            progressPercentage,
            elapsedTime,
            isTraining: shouldContinue,
            currentBatch: batch.map(task => ({
              amplitude: task.amplitude,
              phase: task.phase,
              loss: metaLoss
            }))
          };
        });

        // Continue training if conditions are met
        setTimeout(() => {
          setTrainingState(current => {
            if (current.currentIteration < hyperParams.metaIterations && 
                current.isTraining && !current.isPaused) {
              trainStep();
            }
            return current;
          });
        }, 50);
      } catch (error) {
        console.error('Training step failed:', error);
        setTrainingState(prev => ({ ...prev, isTraining: false }));
      }
    };

    trainStep();
  }, [hyperParams]);

  const pauseTraining = useCallback(() => {
    setTrainingState(prev => ({ ...prev, isPaused: !prev.isPaused }));
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }
  }, []);

  const resetTraining = useCallback(() => {
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }
    
    setTrainingState({
      isTraining: false,
      isPaused: false,
      currentIteration: 0,
      maxIterations: hyperParams.metaIterations,
      metaLoss: 0,
      progressPercentage: 0,
      elapsedTime: 0,
      lossHistory: [],
      currentBatch: []
    });

    initializeModel();
  }, [hyperParams.metaIterations, initializeModel]);

  const evaluateModel = useCallback(async () => {
    if (!reptileRef.current) return;

    try {
      // Generate a test task
      const testTask = generateSineTask();
      
      // Test with random initialization
      const randomModel = createNeuralNetwork();
      const beforeMSE = await computeMSE(randomModel, testTask.testX, testTask.testY);

      // Clone the meta-learned model for fine-tuning
      const metaModel = reptileRef.current.getModel();
      const finetuneModel = createNeuralNetwork();
      finetuneModel.setWeights(metaModel.getWeights());
      
      // Fine-tune with 3 gradient steps
      const optimizer = tf.train.sgd(0.01);
      for (let i = 0; i < 3; i++) {
        optimizer.minimize(() => {
          const predictions = finetuneModel.predict(testTask.trainX) as tf.Tensor2D;
          const loss = tf.losses.meanSquaredError(testTask.trainY, predictions);
          return loss as tf.Scalar;
        });
      }
      
      const afterMSE = await computeMSE(finetuneModel, testTask.testX, testTask.testY);
      const improvementFactor = beforeMSE > 0 ? beforeMSE / afterMSE : 1;

      setEvaluationResults({
        beforeFineTuning: beforeMSE,
        afterFineTuning: afterMSE,
        improvementFactor
      });

      // Cleanup
      testTask.trainX.dispose();
      testTask.trainY.dispose();
      testTask.testX.dispose();
      testTask.testY.dispose();
      randomModel.dispose();
      finetuneModel.dispose();
    } catch (error) {
      console.error('Evaluation failed:', error);
    }
  }, []);

  const updateHyperParameters = useCallback((newParams: Partial<HyperParameters>) => {
    setHyperParams(prev => ({ ...prev, ...newParams }));
    if (reptileRef.current) {
      reptileRef.current.updateHyperparameters(
        newParams.metaLearningRate,
        newParams.innerLearningRate,
        newParams.innerSteps
      );
    }
  }, []);

  return {
    trainingState,
    hyperParams,
    evaluationResults,
    startTraining,
    pauseTraining,
    resetTraining,
    updateHyperParameters,
    initializeModel
  };
}

import { useState, useRef, useCallback } from 'react';
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

      const batch = generateTaskBatch(hyperParams.tasksPerBatch);
      const metaLoss = await reptileRef.current.metaUpdate(batch);

      setTrainingState(prev => {
        const newIteration = prev.currentIteration + 1;
        const newLossHistory = [...prev.lossHistory, metaLoss];
        const progressPercentage = (newIteration / prev.maxIterations) * 100;
        const elapsedTime = Math.floor((Date.now() - startTimeRef.current) / 1000);

        return {
          ...prev,
          currentIteration: newIteration,
          metaLoss,
          lossHistory: newLossHistory.slice(-100), // Keep last 100 points
          progressPercentage,
          elapsedTime,
          currentBatch: batch.map(task => ({
            amplitude: task.amplitude,
            phase: task.phase,
            loss: metaLoss
          }))
        };
      });

      if (trainingState.currentIteration < hyperParams.metaIterations && 
          trainingState.isTraining && !trainingState.isPaused) {
        animationFrameRef.current = requestAnimationFrame(trainStep);
      } else {
        setTrainingState(prev => ({ ...prev, isTraining: false }));
        await evaluateModel();
      }
    };

    animationFrameRef.current = requestAnimationFrame(trainStep);
  }, [hyperParams, trainingState.isTraining, trainingState.isPaused, trainingState.currentIteration]);

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

    // Generate a test task
    const testTask = generateSineTask();
    
    // Test with random initialization
    const randomModel = createNeuralNetwork();
    const beforeMSE = await computeMSE(randomModel, testTask.testX, testTask.testY);

    // Test with meta-learned initialization + 3 gradient steps
    const metaModel = reptileRef.current.getModel();
    const optimizer = (metaModel as any).optimizer;
    
    for (let i = 0; i < 3; i++) {
      optimizer.minimize(() => {
        const predictions = metaModel.predict(testTask.trainX);
        return (metaModel as any).loss(testTask.trainY, predictions);
      });
    }
    
    const afterMSE = await computeMSE(metaModel, testTask.testX, testTask.testY);
    const improvementFactor = beforeMSE / afterMSE;

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

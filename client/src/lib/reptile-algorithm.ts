import * as tf from '@tensorflow/tfjs';
import { SineTask } from './data-generation';
import { cloneModel } from './neural-network';

export class ReptileMetaLearner {
  private model: tf.Sequential;
  private metaLearningRate: number;
  private innerLearningRate: number;
  private innerSteps: number;

  constructor(
    model: tf.Sequential, 
    metaLearningRate: number = 0.001,
    innerLearningRate: number = 0.01,
    innerSteps: number = 5
  ) {
    this.model = model;
    this.metaLearningRate = metaLearningRate;
    this.innerLearningRate = innerLearningRate;
    this.innerSteps = innerSteps;
  }

  async metaUpdate(tasks: SineTask[]): Promise<number> {
    const originalWeights = this.model.getWeights();
    const parameterUpdates: tf.Tensor[] = [];
    let totalLoss = 0;

    // Process each task in the batch
    for (const task of tasks) {
      // Clone the model for task-specific optimization
      const taskModel = cloneModel(this.model);
      const optimizer = tf.train.sgd(this.innerLearningRate);

      // Inner loop: task-specific optimization
      for (let step = 0; step < this.innerSteps; step++) {
        const loss = optimizer.minimize(() => {
          const predictions = taskModel.predict(task.trainX) as tf.Tensor2D;
          const taskLoss = tf.losses.meanSquaredError(task.trainY, predictions);
          return taskLoss;
        });
      }

      // Compute final loss for this task
      const predictions = taskModel.predict(task.testX) as tf.Tensor2D;
      const taskLoss = tf.losses.meanSquaredError(task.testY, predictions);
      const taskLossValue = await taskLoss.data();
      totalLoss += taskLossValue[0];

      // Compute parameter difference (φ - θ)
      const taskWeights = taskModel.getWeights();
      const weightDiffs = taskWeights.map((weight, i) => 
        weight.sub(originalWeights[i])
      );
      parameterUpdates.push(...weightDiffs);

      // Cleanup
      predictions.dispose();
      taskLoss.dispose();
      taskModel.dispose();
    }

    // Meta-update: average differences and update meta-parameters
    if (parameterUpdates.length > 0) {
      const avgUpdates = this.averageUpdates(parameterUpdates, tasks.length);
      const newWeights = originalWeights.map((weight, i) => 
        weight.add(avgUpdates[i].mul(this.metaLearningRate))
      );
      
      this.model.setWeights(newWeights);

      // Cleanup
      avgUpdates.forEach(update => update.dispose());
      newWeights.forEach(weight => weight.dispose());
    }

    parameterUpdates.forEach(update => update.dispose());

    return totalLoss / tasks.length;
  }

  private averageUpdates(updates: tf.Tensor[], numTasks: number): tf.Tensor[] {
    const weightsPerTask = updates.length / numTasks;
    const avgUpdates: tf.Tensor[] = [];

    for (let i = 0; i < weightsPerTask; i++) {
      let sum = updates[i];
      for (let j = 1; j < numTasks; j++) {
        const updateIndex = j * weightsPerTask + i;
        sum = sum.add(updates[updateIndex]);
      }
      avgUpdates.push(sum.div(numTasks));
    }

    return avgUpdates;
  }

  getModel(): tf.Sequential {
    return this.model;
  }

  updateHyperparameters(metaLr?: number, innerLr?: number, innerSteps?: number) {
    if (metaLr !== undefined) this.metaLearningRate = metaLr;
    if (innerLr !== undefined) this.innerLearningRate = innerLr;
    if (innerSteps !== undefined) this.innerSteps = innerSteps;
  }
}

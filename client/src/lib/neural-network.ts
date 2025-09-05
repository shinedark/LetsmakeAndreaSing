import * as tf from '@tensorflow/tfjs';

export function createNeuralNetwork(): tf.Sequential {
  const model = tf.sequential({
    layers: [
      tf.layers.dense({
        inputShape: [1],
        units: 64,
        activation: 'relu',
        kernelInitializer: 'randomNormal'
      }),
      tf.layers.dense({
        units: 64,
        activation: 'relu',
        kernelInitializer: 'randomNormal'
      }),
      tf.layers.dense({
        units: 1,
        kernelInitializer: 'randomNormal'
      })
    ]
  });

  model.compile({
    optimizer: tf.train.sgd(0.01),
    loss: 'meanSquaredError'
  });

  return model;
}

export function cloneModel(model: tf.Sequential): tf.Sequential {
  const newModel = createNeuralNetwork();
  newModel.setWeights(model.getWeights());
  return newModel;
}

export async function computeMSE(model: tf.Sequential, x: tf.Tensor2D, y: tf.Tensor2D): Promise<number> {
  const predictions = model.predict(x) as tf.Tensor2D;
  const mse = tf.losses.meanSquaredError(y, predictions);
  const mseValue = await mse.data();
  
  // Cleanup tensors
  predictions.dispose();
  mse.dispose();
  
  return mseValue[0];
}

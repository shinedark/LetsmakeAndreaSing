import { useState } from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export function CodeSection() {
  const [activeTab, setActiveTab] = useState('reptile');

  const codeSnippets = {
    reptile: `// Reptile Meta-Learning Algorithm Implementation
class ReptileMetaLearner {
    constructor(model, metaLearningRate = 0.001) {
        this.model = model;
        this.metaLearningRate = metaLearningRate;
        this.metaParameters = model.getWeights();
    }

    async metaUpdate(tasks) {
        const parameterUpdates = [];
        
        // Process each task in the batch
        for (const task of tasks) {
            // Copy current meta-parameters to task-specific parameters
            const taskModel = tf.sequential({
                layers: this.model.layers.map(layer => tf.layers.dense({
                    units: layer.units,
                    activation: layer.activation
                }))
            });
            taskModel.setWeights(this.metaParameters);
            
            // Inner loop: task-specific optimization
            const optimizer = tf.train.sgd(0.01);
            for (let step = 0; step < 5; step++) {
                optimizer.minimize(() => {
                    const predictions = taskModel.predict(task.trainX);
                    return tf.losses.meanSquaredError(task.trainY, predictions);
                });
            }
            
            // Compute parameter difference (φ - θ)
            const taskParameters = taskModel.getWeights();
            const paramDiff = taskParameters.map((param, i) => 
                param.sub(this.metaParameters[i])
            );
            parameterUpdates.push(paramDiff);
        }
        
        // Meta-update: average differences and update meta-parameters
        const avgUpdate = this.averageUpdates(parameterUpdates);
        this.metaParameters = this.metaParameters.map((param, i) => 
            param.add(avgUpdate[i].mul(this.metaLearningRate))
        );
        
        this.model.setWeights(this.metaParameters);
    }
}`,

    network: `// Neural Network Architecture
function createNeuralNetwork() {
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

// Model cloning for task-specific training
function cloneModel(model) {
    const newModel = createNeuralNetwork();
    newModel.setWeights(model.getWeights());
    return newModel;
}`,

    data: `// Synthetic Sine Wave Data Generation
function generateSineTask() {
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
        const x = Math.random() * 10 - 5;
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
}`
  };

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold">Implementation</h3>
        <div className="flex space-x-2">
          <Button
            onClick={() => setActiveTab('reptile')}
            variant={activeTab === 'reptile' ? 'default' : 'outline'}
            size="sm"
            data-testid="tab-reptile"
          >
            Reptile Algorithm
          </Button>
          <Button
            onClick={() => setActiveTab('network')}
            variant={activeTab === 'network' ? 'default' : 'outline'}
            size="sm"
            data-testid="tab-network"
          >
            Network
          </Button>
          <Button
            onClick={() => setActiveTab('data')}
            variant={activeTab === 'data' ? 'default' : 'outline'}
            size="sm"
            data-testid="tab-data"
          >
            Data Generation
          </Button>
        </div>
      </div>
      
      <div className="code-block p-4 overflow-x-auto">
        <pre className="text-sm">
          <code className="text-foreground" data-testid="code-content">
            {codeSnippets[activeTab as keyof typeof codeSnippets]}
          </code>
        </pre>
      </div>
    </Card>
  );
}

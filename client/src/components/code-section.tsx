export function CodeSection() {
  const code = `import torch
import torch.nn as nn
import torch.optim as optim
import numpy as np
import matplotlib.pyplot as plt

# Data Generation Functions
def generate_sine_task(amplitude_range=(0.1, 5.0), phase_range=(0, np.pi)):
    """Generate a sine wave task with random amplitude and phase"""
    amplitude = np.random.uniform(*amplitude_range)
    phase = np.random.uniform(*phase_range)
    
    # Generate training data (10 points)
    train_x = np.random.uniform(-5, 5, 10).reshape(-1, 1)
    train_y = amplitude * np.sin(train_x + phase)
    
    # Generate test data (10 points)
    test_x = np.random.uniform(-5, 5, 10).reshape(-1, 1)
    test_y = amplitude * np.sin(test_x + phase)
    
    return {
        'amplitude': amplitude,
        'phase': phase,
        'train_x': torch.FloatTensor(train_x),
        'train_y': torch.FloatTensor(train_y),
        'test_x': torch.FloatTensor(test_x),
        'test_y': torch.FloatTensor(test_y)
    }

def generate_task_batch(batch_size=5):
    """Generate a batch of tasks"""
    return [generate_sine_task() for _ in range(batch_size)]

# Neural Network Model
class SineRegressor(nn.Module):
    def __init__(self, hidden_size=64):
        super(SineRegressor, self).__init__()
        self.network = nn.Sequential(
            nn.Linear(1, hidden_size),
            nn.ReLU(),
            nn.Linear(hidden_size, hidden_size),
            nn.ReLU(),
            nn.Linear(hidden_size, 1)
        )
    
    def forward(self, x):
        return self.network(x)

# Reptile Algorithm Implementation
class Reptile:
    def __init__(self, model, meta_lr=0.001, inner_lr=0.01, inner_steps=5):
        self.model = model
        self.meta_lr = meta_lr
        self.inner_lr = inner_lr
        self.inner_steps = inner_steps
        self.meta_optimizer = optim.Adam(model.parameters(), lr=meta_lr)
    
    def inner_update(self, task, phi_params):
        """Perform inner-loop optimization on a task"""
        # Copy current parameters
        phi = {name: param.clone() for name, param in phi_params.items()}
        
        # Inner optimizer
        inner_optimizer = optim.SGD(phi.values(), lr=self.inner_lr)
        
        for _ in range(self.inner_steps):
            inner_optimizer.zero_grad()
            
            # Forward pass
            pred = self.model(task['train_x'])
            loss = nn.MSELoss()(pred, task['train_y'])
            
            # Backward pass
            loss.backward()
            inner_optimizer.step()
        
        return phi
    
    def meta_update(self, tasks):
        """Perform meta-update using Reptile algorithm"""
        meta_gradients = []
        
        for task in tasks:
            # Get current parameters
            phi_params = dict(self.model.named_parameters())
            
            # Inner loop update
            phi_updated = self.inner_update(task, phi_params)
            
            # Compute meta-gradient (difference between updated and original)
            meta_grad = {}
            for name, param in self.model.named_parameters():
                meta_grad[name] = phi_updated[name] - param
            
            meta_gradients.append(meta_grad)
        
        # Average meta-gradients across tasks
        avg_meta_grad = {}
        for name in self.model.named_parameters():
            avg_meta_grad[name[0]] = torch.stack([grad[name[0]] for grad in meta_gradients]).mean(0)
        
        # Update model parameters
        with torch.no_grad():
            for name, param in self.model.named_parameters():
                param.data += self.meta_lr * avg_meta_grad[name]
    
    def train(self, num_iterations=1000, batch_size=5):
        """Train the model using Reptile algorithm"""
        losses = []
        
        for iteration in range(num_iterations):
            # Generate batch of tasks
            tasks = generate_task_batch(batch_size)
            
            # Meta-update
            self.meta_update(tasks)
            
            # Evaluate on a random task
            if iteration % 100 == 0:
                test_task = generate_sine_task()
                with torch.no_grad():
                    pred = self.model(test_task['test_x'])
                    loss = nn.MSELoss()(pred, test_task['test_y'])
                    losses.append(loss.item())
                    print(f"Iteration {iteration}, Test Loss: {loss.item():.4f}")
        
        return losses

# Training and Evaluation
def main():
    # Initialize model
    model = SineRegressor()
    
    # Initialize Reptile
    reptile = Reptile(model, meta_lr=0.001, inner_lr=0.01, inner_steps=5)
    
    # Train the model
    print("Training Reptile model...")
    losses = reptile.train(num_iterations=1000, batch_size=5)
    
    # Evaluate on a new unseen task
    print("\\nEvaluating on new task...")
    test_task = generate_sine_task()
    
    # Fine-tune on the new task
    fine_tune_optimizer = optim.SGD(model.parameters(), lr=0.01)
    for step in range(3):  # 3 gradient steps
        fine_tune_optimizer.zero_grad()
        pred = model(test_task['train_x'])
        loss = nn.MSELoss()(pred, test_task['train_y'])
        loss.backward()
        fine_tune_optimizer.step()
        print(f"Fine-tune step {step+1}, Loss: {loss.item():.4f}")
    
    # Final evaluation
    with torch.no_grad():
        final_pred = model(test_task['test_x'])
        final_loss = nn.MSELoss()(final_pred, test_task['test_y'])
        print(f"\\nFinal MSE Loss on test set: {final_loss.item():.4f}")
    
    return model, losses

if __name__ == "__main__":
    model, losses = main()
`;

  return (
    <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
      <h2 className="text-2xl font-bold mb-4 text-white">Reptile Meta-Learning Implementation</h2>
      <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
        <pre className="text-green-400 text-sm font-mono whitespace-pre-wrap">
          {code}
        </pre>
      </div>
      <div className="mt-4 text-gray-300 text-sm">
        <p><strong>How Reptile Works:</strong></p>
        <ul className="list-disc list-inside mt-2 space-y-1">
          <li>Start with initial model parameters θ</li>
          <li>For each meta-iteration, sample a batch of tasks</li>
          <li>For each task, copy θ to φ and perform inner-loop optimization</li>
          <li>Compute meta-update by averaging differences (φ - θ) across tasks</li>
          <li>Update θ towards the averaged direction with meta learning rate</li>
          <li>This creates "ownerless repeat updates" that enable emergent generalization</li>
        </ul>
      </div>
    </div>
  );
}
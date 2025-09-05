# Gronkosky - Reptile Meta-Learning Visualization

An interactive web application that demonstrates the Reptile meta-learning algorithm for few-shot learning on sine wave regression tasks.

## Overview

This application implements the Reptile meta-learning algorithm from "On First-Order Meta-Learning Algorithms" by Nichol et al., providing real-time visualization of the training process and performance evaluation. Users can observe how a neural network learns to quickly adapt to new sine wave functions after being trained on similar tasks.

## Features

- **Interactive Training**: Adjust hyperparameters and watch the meta-learning process in real-time
- **Real-time Visualization**: Live charts showing loss curves, function approximations, and task samples
- **Neural Network Architecture**: Visual representation of the two-layer neural network
- **Performance Evaluation**: Compare random initialization vs meta-learned initialization
- **Elegant Design**: Modern black and white interface with smooth animations

## Technical Implementation

### Algorithm Details
- **Meta-Learning**: Reptile algorithm with configurable meta and inner learning rates
- **Tasks**: Sine wave regression with random amplitude (0.1-5.0) and phase (0-π)
- **Network**: Two hidden layers with 64 ReLU units each
- **Training**: 10 training points and 10 test points per task
- **Evaluation**: 3 gradient steps for few-shot adaptation

### Technology Stack
- **Frontend**: React + TypeScript + Vite
- **ML Library**: TensorFlow.js for browser-based training
- **UI Framework**: shadcn/ui with Radix UI primitives
- **Styling**: Tailwind CSS with custom animations
- **Charts**: Chart.js for data visualization
- **Backend**: Express.js + TypeScript

## Getting Started

### Prerequisites
- Node.js 18+ 
- Modern web browser with WebGL support

### Local Development
1. Clone the repository
2. Install dependencies: `npm install`
3. Start the development server: `npm run dev`
4. Open your browser to `http://localhost:5000`

### GitHub Pages Deployment
This project is configured for automatic deployment to GitHub Pages:

1. **Push to GitHub**: Create a repository named "gronkosky"
2. **Enable Pages**: Go to Settings → Pages → Select "GitHub Actions"
3. **Deploy**: Push to main branch triggers automatic deployment
4. **Access**: Your app will be at `https://YOUR_USERNAME.github.io/gronkosky/`

See [DEPLOYMENT.md](DEPLOYMENT.md) for detailed deployment instructions.

### Usage
1. **Adjust Hyperparameters**: Use the sliders to modify learning rates, iterations, and batch size
2. **Start Training**: Click the "Start" button to begin meta-learning
3. **Monitor Progress**: Watch the loss curves and function approximations update in real-time
4. **View Results**: See the evaluation comparing random vs meta-learned performance

## Project Structure

```
├── client/src/
│   ├── components/          # React components
│   ├── hooks/              # Custom React hooks
│   ├── lib/                # Core ML algorithms and utilities
│   └── pages/              # Application pages
├── server/                 # Express backend
└── shared/                 # Shared types and schemas
```

## Algorithm Explanation

The Reptile algorithm works by:
1. Sampling a batch of tasks (sine wave functions)
2. For each task, copying current parameters and performing inner-loop optimization
3. Computing the average parameter update across all tasks
4. Updating the meta-parameters in the direction of the average update

This process creates an initialization that can quickly adapt to new tasks with just a few gradient steps.

## License

MIT License - see LICENSE file for details.
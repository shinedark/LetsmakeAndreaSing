import React from 'react';
import { SlidePresentation } from '@/components/slide-presentation';

const slides = [
  {
    id: 'title',
    title: 'AndreaSing - Fractal Consciousness',
    content: (
      <div className="text-center">
        <div className="mb-8">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/20150616_-_Portugal_-_Italie_-_Gen%C3%A8ve_-_Andrea_Pirlo_%28cropped%29.jpg/250px-20150616_-_Portugal_-_Italie_-_Gen%C3%A8ve_-_Andrea_Pirlo_%28cropped%29.jpg"
            alt="Andrea Pirlo"
            className="w-32 h-32 rounded-full mx-auto border-4 border-white shadow-lg mb-6"
          />
        </div>
        <p className="text-2xl mb-4">Interactive Visualization of Ownerless Repeats</p>
        <p className="text-lg text-gray-400">Exploring the Mandelbrot set and emergent patterns of consciousness</p>
      </div>
    ),
    background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)'
  },
  {
    id: 'fractal-intro',
    title: 'What is Fractal Consciousness?',
    content: (
      <div className="space-y-6">
        <p className="text-xl">
          Fractal consciousness represents the infinite complexity of patterns that repeat without ownership.
        </p>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-2xl font-bold mb-4 text-blue-400">The Mandelbrot Set</h3>
            <ul className="space-y-2 text-lg">
              <li>• Infinite detail at every zoom level</li>
              <li>• Self-similar patterns everywhere</li>
              <li>• Mathematical beauty in chaos</li>
              <li>• No single point owns the pattern</li>
            </ul>
          </div>
          <div>
            <h3 className="text-2xl font-bold mb-4 text-green-400">Ownerless Repeats</h3>
            <ul className="space-y-2 text-lg">
              <li>• Patterns that exist independently</li>
              <li>• Consciousness without ownership</li>
              <li>• Emergent properties from simple rules</li>
              <li>• Infinite depth of exploration</li>
            </ul>
          </div>
        </div>
      </div>
    ),
    background: 'linear-gradient(135deg, #0f3460 0%, #1a1a2e 50%, #16213e 100%)'
  },
  {
    id: 'mathematical-beauty',
    title: 'Mathematical Beauty in Chaos',
    content: (
      <div className="space-y-6">
        <div className="bg-gray-800 p-6 rounded-lg">
          <h3 className="text-2xl font-bold mb-4 text-purple-400">The Mandelbrot Formula</h3>
          <div className="text-center text-2xl font-mono bg-black p-4 rounded">
            z = z² + c
          </div>
          <p className="mt-4 text-lg">
            This simple equation generates infinite complexity. Each point c in the complex plane 
            either diverges to infinity or stays bounded, creating the beautiful fractal patterns.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-4 text-center">
          <div className="bg-gray-800 p-4 rounded">
            <h4 className="font-bold text-yellow-400">Convergence</h4>
            <p>Points that stay bounded</p>
          </div>
          <div className="bg-gray-800 p-4 rounded">
            <h4 className="font-bold text-red-400">Divergence</h4>
            <p>Points that escape to infinity</p>
          </div>
          <div className="bg-gray-800 p-4 rounded">
            <h4 className="font-bold text-green-400">Boundary</h4>
            <p>Where the magic happens</p>
          </div>
        </div>
      </div>
    ),
    background: 'linear-gradient(135deg, #2d1b69 0%, #11998e 50%, #38ef7d 100%)'
  },
  {
    id: 'consciousness-patterns',
    title: 'Consciousness as Fractal Patterns',
    content: (
      <div className="space-y-6">
        <p className="text-xl text-center">
          Just like the Mandelbrot set, consciousness exhibits fractal properties:
        </p>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-cyan-400">Self-Similarity</h3>
            <p className="text-lg">
              Patterns repeat at different scales. A thought contains the same structure 
              as a lifetime of thoughts.
            </p>
            <h3 className="text-2xl font-bold text-pink-400">Infinite Detail</h3>
            <p className="text-lg">
              The deeper you look, the more complexity emerges. Every moment contains 
              infinite depth of experience.
            </p>
          </div>
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-orange-400">Emergent Properties</h3>
            <p className="text-lg">
              Consciousness arises from simple rules, just like fractals emerge from 
              simple mathematical formulas.
            </p>
            <h3 className="text-2xl font-bold text-indigo-400">Ownerless Nature</h3>
            <p className="text-lg">
              No single neuron or thought owns consciousness. It's a distributed pattern 
              that exists between elements.
            </p>
          </div>
        </div>
      </div>
    ),
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)'
  },
  {
    id: 'interactive-exploration',
    title: 'Interactive Exploration',
    content: (
      <div className="space-y-6">
        <p className="text-xl text-center mb-8">
          Experience fractal consciousness through interactive visualization
        </p>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-gray-800 p-6 rounded-lg">
            <h3 className="text-2xl font-bold mb-4 text-green-400">Zoom Controls</h3>
            <ul className="space-y-2 text-lg">
              <li>• Click to zoom into any region</li>
              <li>• Discover new patterns at every level</li>
              <li>• Navigate through infinite detail</li>
              <li>• Find your own unique path</li>
            </ul>
          </div>
          <div className="bg-gray-800 p-6 rounded-lg">
            <h3 className="text-2xl font-bold mb-4 text-blue-400">Generation Options</h3>
            <ul className="space-y-2 text-lg">
              <li>• Adjust resolution and iterations</li>
              <li>• Export your discoveries</li>
              <li>• Save beautiful patterns</li>
              <li>• Share consciousness art</li>
            </ul>
          </div>
        </div>
        <div className="text-center">
          <p className="text-lg text-gray-300">
            Each exploration reveals new aspects of the infinite complexity 
            that exists within simple mathematical rules.
          </p>
        </div>
      </div>
    ),
    background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 50%, #4facfe 100%)'
  },
  {
    id: 'philosophical-implications',
    title: 'Philosophical Implications',
    content: (
      <div className="space-y-6">
        <p className="text-xl text-center mb-8">
          What does fractal consciousness tell us about reality?
        </p>
        <div className="space-y-6">
          <div className="bg-gray-800 p-6 rounded-lg">
            <h3 className="text-2xl font-bold mb-4 text-yellow-400">The Nature of Self</h3>
            <p className="text-lg">
              If consciousness is fractal, then the self is not a single point but a distributed pattern. 
              We are not owners of our consciousness but participants in a larger pattern.
            </p>
          </div>
          <div className="bg-gray-800 p-6 rounded-lg">
            <h3 className="text-2xl font-bold mb-4 text-purple-400">Infinite Possibility</h3>
            <p className="text-lg">
              Just as every zoom level reveals new patterns, every moment of consciousness 
              contains infinite potential for discovery and growth.
            </p>
          </div>
          <div className="bg-gray-800 p-6 rounded-lg">
            <h3 className="text-2xl font-bold mb-4 text-cyan-400">Emergent Reality</h3>
            <p className="text-lg">
              Reality itself might be an emergent property of simple rules, just like 
              the Mandelbrot set emerges from z = z² + c.
            </p>
          </div>
        </div>
      </div>
    ),
    background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 50%, #43e97b 100%)'
  },
  {
    id: 'conclusion',
    title: 'The Journey Continues',
    content: (
      <div className="text-center space-y-8">
        <div className="mb-8">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/20150616_-_Portugal_-_Italie_-_Gen%C3%A8ve_-_Andrea_Pirlo_%28cropped%29.jpg/250px-20150616_-_Portugal_-_Italie_-_Gen%C3%A8ve_-_Andrea_Pirlo_%28cropped%29.jpg"
            alt="Andrea Pirlo"
            className="w-24 h-24 rounded-full mx-auto border-4 border-white shadow-lg"
          />
        </div>
        <h2 className="text-3xl font-bold text-yellow-400 mb-6">AndreaSing</h2>
        <p className="text-xl mb-6">
          A journey into fractal consciousness through the lens of the Mandelbrot set
        </p>
        <div className="bg-gray-800 p-6 rounded-lg max-w-2xl mx-auto">
          <p className="text-lg mb-4">
            "In the infinite patterns of mathematics, we find the infinite patterns of mind. 
            Each zoom reveals not just new beauty, but new understanding of what it means to be conscious."
          </p>
          <p className="text-gray-400">
            - The Philosophy of Fractal Consciousness
          </p>
        </div>
        <div className="text-lg text-gray-300">
          <p>Explore. Discover. Understand.</p>
          <p className="text-sm mt-2">The patterns await your consciousness</p>
        </div>
      </div>
    ),
    background: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 50%, #667eea 100%)'
  }
];

export default function Slides() {
  return (
    <SlidePresentation 
      slides={slides} 
      autoAdvance={false}
    />
  );
}

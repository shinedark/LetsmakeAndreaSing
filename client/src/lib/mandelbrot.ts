// Mandelbrot Fractal Generation
// Based on the Python code provided for fractal consciousness visualization

export interface MandelbrotConfig {
  width: number;
  height: number;
  maxIterations: number;
  realMin: number;
  realMax: number;
  imagMin: number;
  imagMax: number;
}

export interface MandelbrotResult {
  iterations: number[][];
  config: MandelbrotConfig;
  generationTime: number;
}

export class MandelbrotGenerator {
  private config: MandelbrotConfig;

  constructor(config: Partial<MandelbrotConfig> = {}) {
    this.config = {
      width: 800,
      height: 800,
      maxIterations: 1000,
      realMin: -2.5,
      realMax: 0.5,
      imagMin: -1.5,
      imagMax: 1.5,
      ...config
    };
  }

  generate(): MandelbrotResult {
    const startTime = performance.now();
    
    const { width, height, maxIterations, realMin, realMax, imagMin, imagMax } = this.config;
    
    // Create coordinate grids
    const realAxis = Array.from({ length: width }, (_, i) => 
      realMin + (realMax - realMin) * i / (width - 1)
    );
    const imagAxis = Array.from({ length: height }, (_, i) => 
      imagMin + (imagMax - imagMin) * i / (height - 1)
    );

    // Initialize result array
    const iterations: number[][] = Array(height).fill(null).map(() => 
      Array(width).fill(maxIterations)
    );

    // Generate Mandelbrot set
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const c = realAxis[x] + imagAxis[y] * 1j;
        let z = c;
        
        for (let i = 0; i < maxIterations; i++) {
          // z = z^2 + c
          const zReal = z.real * z.real - z.imag * z.imag + c.real;
          const zImag = 2 * z.real * z.imag + c.imag;
          z = { real: zReal, imag: zImag };
          
          // Check for divergence
          if (z.real * z.real + z.imag * z.imag > 4) {
            iterations[y][x] = i;
            break;
          }
        }
      }
    }

    const generationTime = performance.now() - startTime;

    return {
      iterations,
      config: this.config,
      generationTime
    };
  }

  // Generate a zoomed-in region for exploration
  generateZoom(centerReal: number, centerImag: number, zoom: number): MandelbrotResult {
    const zoomFactor = 1 / zoom;
    const realRange = (this.config.realMax - this.config.realMin) * zoomFactor;
    const imagRange = (this.config.imagMax - this.config.imagMin) * zoomFactor;
    
    const newConfig = {
      ...this.config,
      realMin: centerReal - realRange / 2,
      realMax: centerReal + realRange / 2,
      imagMin: centerImag - imagRange / 2,
      imagMax: centerImag + imagRange / 2,
    };

    const generator = new MandelbrotGenerator(newConfig);
    return generator.generate();
  }

  // Get color mapping for visualization
  getColorMap(iterations: number[][], maxIter: number): number[][][] {
    const colors: number[][][] = [];
    
    for (let y = 0; y < iterations.length; y++) {
      colors[y] = [];
      for (let x = 0; x < iterations[y].length; x++) {
        const iter = iterations[y][x];
        const normalized = iter / maxIter;
        
        // Hot colormap approximation
        if (iter === maxIter) {
          colors[y][x] = [0, 0, 0]; // Black for points that don't diverge
        } else {
          // Red to yellow gradient
          const r = Math.min(1, normalized * 2);
          const g = Math.max(0, Math.min(1, (normalized - 0.5) * 2));
          const b = 0;
          colors[y][x] = [r, g, b];
        }
      }
    }
    
    return colors;
  }
}

// Utility function to create complex numbers
export function createComplex(real: number, imag: number) {
  return { real, imag };
}

// Default configuration for the fractal
export const DEFAULT_MANDELBROT_CONFIG: MandelbrotConfig = {
  width: 400,
  height: 400,
  maxIterations: 1000,
  realMin: -2.5,
  realMax: 0.5,
  imagMin: -1.5,
  imagMax: 1.5,
};

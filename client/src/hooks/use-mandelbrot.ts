import { useState, useCallback, useRef } from 'react';
import { MandelbrotGenerator, MandelbrotResult, MandelbrotConfig, DEFAULT_MANDELBROT_CONFIG } from '@/lib/mandelbrot';

export interface MandelbrotState {
  isGenerating: boolean;
  currentResult: MandelbrotResult | null;
  generationProgress: number;
  zoomLevel: number;
  centerReal: number;
  centerImag: number;
  config: MandelbrotConfig;
  generationHistory: MandelbrotResult[];
  currentHistoryIndex: number;
}

export interface MandelbrotControls {
  startGeneration: (config?: Partial<MandelbrotConfig>) => void;
  pauseGeneration: () => void;
  resetGeneration: () => void;
  zoomIn: (centerReal: number, centerImag: number) => void;
  zoomOut: () => void;
  navigateHistory: (direction: 'back' | 'forward') => void;
  updateConfig: (newConfig: Partial<MandelbrotConfig>) => void;
  exportImage: () => void;
}

export function useMandelbrot(): MandelbrotState & MandelbrotControls {
  const [state, setState] = useState<MandelbrotState>({
    isGenerating: false,
    currentResult: null,
    generationProgress: 0,
    zoomLevel: 1,
    centerReal: -1,
    centerImag: 0,
    config: DEFAULT_MANDELBROT_CONFIG,
    generationHistory: [],
    currentHistoryIndex: -1,
  });

  const generatorRef = useRef<MandelbrotGenerator | null>(null);
  const animationFrameRef = useRef<number | null>(null);

  const startGeneration = useCallback((config?: Partial<MandelbrotConfig>) => {
    if (state.isGenerating) return;

    const newConfig = { ...state.config, ...config };
    const generator = new MandelbrotGenerator(newConfig);
    generatorRef.current = generator;

    setState(prev => ({
      ...prev,
      isGenerating: true,
      generationProgress: 0,
      config: newConfig,
    }));

    // Simulate progress for UI feedback
    let progress = 0;
    const progressInterval = setInterval(() => {
      progress += Math.random() * 10;
      if (progress >= 100) {
        progress = 100;
        clearInterval(progressInterval);
      }
      setState(prev => ({ ...prev, generationProgress: progress }));
    }, 50);

    // Generate the fractal
    setTimeout(() => {
      const result = generator.generate();
      clearInterval(progressInterval);
      
      setState(prev => {
        const newHistory = [...prev.generationHistory, result];
        return {
          ...prev,
          isGenerating: false,
          generationProgress: 100,
          currentResult: result,
          generationHistory: newHistory,
          currentHistoryIndex: newHistory.length - 1,
        };
      });
    }, 1000); // Simulate generation time
  }, [state.isGenerating, state.config]);

  const pauseGeneration = useCallback(() => {
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
    }
    setState(prev => ({ ...prev, isGenerating: false }));
  }, []);

  const resetGeneration = useCallback(() => {
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
    }
    setState(prev => ({
      ...prev,
      isGenerating: false,
      currentResult: null,
      generationProgress: 0,
      zoomLevel: 1,
      centerReal: -1,
      centerImag: 0,
      generationHistory: [],
      currentHistoryIndex: -1,
    }));
  }, []);

  const zoomIn = useCallback((centerReal: number, centerImag: number) => {
    if (!generatorRef.current) return;

    const newZoomLevel = state.zoomLevel * 2;
    const result = generatorRef.current.generateZoom(centerReal, centerImag, newZoomLevel);
    
    setState(prev => {
      const newHistory = [...prev.generationHistory, result];
      return {
        ...prev,
        currentResult: result,
        zoomLevel: newZoomLevel,
        centerReal,
        centerImag,
        generationHistory: newHistory,
        currentHistoryIndex: newHistory.length - 1,
      };
    });
  }, [state.zoomLevel]);

  const zoomOut = useCallback(() => {
    if (state.zoomLevel <= 1) return;

    const newZoomLevel = state.zoomLevel / 2;
    const generator = new MandelbrotGenerator({
      ...state.config,
      realMin: -2.5,
      realMax: 0.5,
      imagMin: -1.5,
      imagMax: 1.5,
    });
    
    const result = generator.generate();
    
    setState(prev => {
      const newHistory = [...prev.generationHistory, result];
      return {
        ...prev,
        currentResult: result,
        zoomLevel: newZoomLevel,
        centerReal: -1,
        centerImag: 0,
        generationHistory: newHistory,
        currentHistoryIndex: newHistory.length - 1,
      };
    });
  }, [state.zoomLevel, state.config]);

  const navigateHistory = useCallback((direction: 'back' | 'forward') => {
    setState(prev => {
      const newIndex = direction === 'back' 
        ? Math.max(0, prev.currentHistoryIndex - 1)
        : Math.min(prev.generationHistory.length - 1, prev.currentHistoryIndex + 1);
      
      return {
        ...prev,
        currentHistoryIndex: newIndex,
        currentResult: prev.generationHistory[newIndex] || null,
      };
    });
  }, []);

  const updateConfig = useCallback((newConfig: Partial<MandelbrotConfig>) => {
    setState(prev => ({
      ...prev,
      config: { ...prev.config, ...newConfig },
    }));
  }, []);

  const exportImage = useCallback(() => {
    if (!state.currentResult) return;
    
    // Create a canvas to export the image
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const { iterations, config } = state.currentResult;
    canvas.width = config.width;
    canvas.height = config.height;

    const imageData = ctx.createImageData(config.width, config.height);
    const data = imageData.data;

    for (let y = 0; y < config.height; y++) {
      for (let x = 0; x < config.width; x++) {
        const iter = iterations[y][x];
        const normalized = iter / config.maxIterations;
        const index = (y * config.width + x) * 4;

        if (iter === config.maxIterations) {
          // Black for points that don't diverge
          data[index] = 0;     // R
          data[index + 1] = 0; // G
          data[index + 2] = 0; // B
        } else {
          // Hot colormap
          const r = Math.min(255, normalized * 2 * 255);
          const g = Math.max(0, Math.min(255, (normalized - 0.5) * 2 * 255));
          const b = 0;
          
          data[index] = r;     // R
          data[index + 1] = g; // G
          data[index + 2] = b; // B
        }
        data[index + 3] = 255; // A
      }
    }

    ctx.putImageData(imageData, 0, 0);
    
    // Download the image
    const link = document.createElement('a');
    link.download = `mandelbrot-${Date.now()}.png`;
    link.href = canvas.toDataURL();
    link.click();
  }, [state.currentResult]);

  return {
    ...state,
    startGeneration,
    pauseGeneration,
    resetGeneration,
    zoomIn,
    zoomOut,
    navigateHistory,
    updateConfig,
    exportImage,
  };
}

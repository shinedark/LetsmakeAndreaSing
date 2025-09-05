#!/bin/bash

# Build script for GitHub Pages deployment
echo "Building Claudio y gornkonski for GitHub Pages..."

# Build the client application
npm run build

# Copy necessary files to dist/public if needed
echo "Build complete! Ready for GitHub Pages deployment."
echo "The built files are in dist/public/"
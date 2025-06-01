#!/bin/bash

# Render build script for TypeScript backend
echo "Starting Render build process..."

# Install all dependencies (including devDependencies for build)
echo "Installing dependencies..."
npm ci

# Build the TypeScript application
echo "Building TypeScript application..."
npm run build

# Install only production dependencies for runtime
echo "Installing production dependencies..."
npm ci --only=production

echo "Build process completed successfully!"
echo "Application built in ./dist directory" 
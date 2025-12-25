#!/bin/bash

# LMStudio Proxy Server Startup Script
# Author: Amit Rathiesh <amitrathiesh@webzler.com>

echo "╔════════════════════════════════════════════════════════════╗"
echo "║       LMStudio Proxy Server - Quick Start                 ║"
echo "╚════════════════════════════════════════════════════════════╝"
echo ""

# Configuration
export PROXY_PORT=${PROXY_PORT:-1235}
export LMSTUDIO_URL=${LMSTUDIO_URL:-http://localhost:1234}
export DEBUG=${DEBUG:-false}

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Error: Node.js is not installed"
    echo "Please install Node.js from https://nodejs.org/"
    exit 1
fi

# Check if dependencies are installed
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
    echo ""
fi

# Start the proxy server
echo "🚀 Starting proxy server..."
echo ""
npm run proxy

#!/bin/bash

# Micro-Task Bounty Platform - Quick Start Script
# This script helps you quickly validate and test the contracts

set -e

echo "🚀 Micro-Task Bounty Platform - Quick Start"
echo "==========================================="
echo ""

# Check if clarinet is installed
if ! command -v clarinet &> /dev/null; then
    echo "❌ Clarinet is not installed."
    echo "Please install from: https://github.com/hirosystems/clarinet"
    exit 1
fi

echo "✅ Clarinet found: $(clarinet --version)"
echo ""

# Navigate to project directory
cd "$(dirname "$0")"

# Step 1: Check contracts
echo "📝 Step 1: Checking contracts..."
clarinet check
if [ $? -eq 0 ]; then
    echo "✅ All contracts passed validation!"
else
    echo "❌ Contract validation failed!"
    exit 1
fi
echo ""

# Step 2: Run tests (if npm is available)
if command -v npm &> /dev/null; then
    echo "🧪 Step 2: Running tests..."
    
    if [ ! -d "node_modules" ]; then
        echo "📦 Installing dependencies..."
        npm install
    fi
    
    echo "Running test suite..."
    clarinet test
    
    if [ $? -eq 0 ]; then
        echo "✅ All tests passed!"
    else
        echo "❌ Some tests failed!"
        exit 1
    fi
else
    echo "⚠️  npm not found, skipping tests"
fi

echo ""
echo "🎉 Quick Start Complete!"
echo ""
echo "Next Steps:"
echo "1. Review the contracts in ./contracts/"
echo "2. Check the README.md for detailed documentation"
echo "3. Try the interactive console: clarinet console"
echo "4. Deploy to devnet: clarinet devnet start"
echo "5. Deploy to testnet: clarinet deployment generate --testnet"
echo ""
echo "Happy coding! 🚀"

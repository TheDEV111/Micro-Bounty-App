#!/bin/bash

# Micro-Task Bounty Platform - Deployment Script
# This script helps deploy contracts to testnet or mainnet

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Functions
print_header() {
    echo -e "${BLUE}======================================${NC}"
    echo -e "${BLUE}$1${NC}"
    echo -e "${BLUE}======================================${NC}"
}

print_success() {
    echo -e "${GREEN}✓ $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}⚠ $1${NC}"
}

print_error() {
    echo -e "${RED}✗ $1${NC}"
}

# Navigate to project directory
cd "$(dirname "$0")"

# Check if clarinet is installed
if ! command -v clarinet &> /dev/null; then
    print_error "Clarinet is not installed!"
    echo "Please install from: https://github.com/hirosystems/clarinet"
    exit 1
fi

print_header "Micro-Task Bounty Platform Deployment"
echo ""

# Ask which network to deploy to
echo "Which network do you want to deploy to?"
echo "1) Testnet (recommended first)"
echo "2) Mainnet (only after thorough testnet testing)"
echo ""
read -p "Enter your choice (1 or 2): " network_choice

case $network_choice in
    1)
        NETWORK="testnet"
        print_success "Selected: Testnet"
        ;;
    2)
        NETWORK="mainnet"
        print_warning "Selected: Mainnet - This uses REAL STX!"
        echo ""
        read -p "Are you ABSOLUTELY sure? This cannot be undone! (yes/no): " confirm
        if [ "$confirm" != "yes" ]; then
            print_warning "Deployment cancelled."
            exit 0
        fi
        ;;
    *)
        print_error "Invalid choice!"
        exit 1
        ;;
esac

echo ""
print_header "Pre-Deployment Checks"

# Check if mnemonic is configured
if [ "$NETWORK" == "testnet" ]; then
    SETTINGS_FILE="settings/Testnet.toml"
else
    SETTINGS_FILE="settings/Mainnet.toml"
fi

if grep -q "<YOUR PRIVATE" "$SETTINGS_FILE"; then
    print_error "Mnemonic not configured in $SETTINGS_FILE"
    echo ""
    echo "Please edit $SETTINGS_FILE and add your mnemonic phrase."
    echo "See DEPLOYMENT_GUIDE.md for instructions."
    exit 1
fi

print_success "Mnemonic configured"

# Run contract validation
echo ""
print_header "Validating Contracts"
if clarinet check > /dev/null 2>&1; then
    print_success "All contracts passed validation"
else
    print_error "Contract validation failed!"
    echo "Run 'clarinet check' to see errors."
    exit 1
fi

# Run tests
echo ""
print_header "Running Tests"
if command -v npm &> /dev/null && [ -d "node_modules" ]; then
    if clarinet test > /dev/null 2>&1; then
        print_success "All tests passed"
    else
        print_warning "Some tests failed - Review before deploying!"
        read -p "Continue anyway? (yes/no): " continue_choice
        if [ "$continue_choice" != "yes" ]; then
            exit 1
        fi
    fi
else
    print_warning "Tests not available (npm not installed or dependencies missing)"
fi

# Generate deployment plan
echo ""
print_header "Generating Deployment Plan"
if clarinet deployment generate --$NETWORK; then
    print_success "Deployment plan generated"
else
    print_error "Failed to generate deployment plan"
    exit 1
fi

echo ""
print_header "Deployment Plan Summary"
echo "Network: $NETWORK"
echo "Contracts to deploy:"
echo "  1. reputation-tracker.clar"
echo "  2. task-escrow.clar"
echo "  3. task-manager.clar"
echo ""

if [ "$NETWORK" == "mainnet" ]; then
    print_warning "MAINNET DEPLOYMENT - FINAL WARNING!"
    echo ""
    echo "Have you completed ALL of these?"
    echo "  [ ] Tested thoroughly on testnet (minimum 1 week)"
    echo "  [ ] Professional security audit completed"
    echo "  [ ] All audit findings addressed"
    echo "  [ ] Community testing completed"
    echo "  [ ] Emergency response plan ready"
    echo "  [ ] Sufficient STX for deployment (~2-4 STX)"
    echo ""
    read -p "Type 'DEPLOY TO MAINNET' to continue: " final_confirm
    if [ "$final_confirm" != "DEPLOY TO MAINNET" ]; then
        print_warning "Deployment cancelled."
        exit 0
    fi
fi

# Execute deployment
echo ""
print_header "Executing Deployment to $NETWORK"
echo ""
print_warning "This will now deploy to $NETWORK..."
sleep 2

if clarinet deployment apply --$NETWORK; then
    echo ""
    print_success "Deployment successful! 🎉"
    echo ""
    print_header "Next Steps"
    echo ""
    echo "1. Save your contract addresses (shown above)"
    echo "2. Initialize contracts with these commands:"
    echo ""
    echo "   (contract-call? .task-manager set-escrow-contract .task-escrow)"
    echo "   (contract-call? .task-manager set-reputation-contract .reputation-tracker)"
    echo "   (contract-call? .task-escrow authorize-contract .task-manager)"
    echo "   (contract-call? .reputation-tracker authorize-contract .task-manager)"
    echo ""
    echo "3. Test basic functionality"
    echo "4. Monitor transactions at:"
    if [ "$NETWORK" == "testnet" ]; then
        echo "   https://explorer.hiro.so/?chain=testnet"
    else
        echo "   https://explorer.hiro.so/"
    fi
    echo ""
    echo "See DEPLOYMENT_GUIDE.md for complete post-deployment instructions."
    echo ""
else
    print_error "Deployment failed!"
    echo ""
    echo "Common issues:"
    echo "  - Insufficient STX balance"
    echo "  - Network connectivity problems"
    echo "  - Contract name already exists"
    echo ""
    echo "Check the error message above and see DEPLOYMENT_GUIDE.md for troubleshooting."
    exit 1
fi

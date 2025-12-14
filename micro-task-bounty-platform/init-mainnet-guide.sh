#!/bin/bash

# Mainnet Contract Initialization via Hiro Wallet Web Interface
# Since stx-cli is not installed, this script opens the web interface

DEPLOYER="SPVQ61FEWR6M4HVAT3BNE07D4BNW6A1C2ACCNQ6F"
TASK_MANAGER="${DEPLOYER}.task-manager"
TASK_ESCROW="${DEPLOYER}.task-escrow"
REPUTATION_TRACKER="${DEPLOYER}.reputation-tracker"

echo "=============================================="
echo "🚀 Mainnet Initialization Guide"
echo "=============================================="
echo ""
echo "Your contracts are deployed at:"
echo "  • ${TASK_MANAGER}"
echo "  • ${TASK_ESCROW}"
echo "  • ${REPUTATION_TRACKER}"
echo ""
echo "=============================================="
echo "📋 INITIALIZATION STEPS (Use Hiro Wallet)"
echo "=============================================="
echo ""
echo "Go to: https://wallet.hiro.so"
echo ""
echo "Then call these 4 functions IN ORDER:"
echo ""
echo "-------------------------------------------"
echo "STEP 1: Set Escrow Contract"
echo "-------------------------------------------"
echo "Contract: ${TASK_MANAGER}"
echo "Function: set-escrow-contract"
echo "Arguments:"
echo "  escrow-contract: '${TASK_ESCROW}"
echo ""
echo "-------------------------------------------"
echo "STEP 2: Set Reputation Contract"
echo "-------------------------------------------"
echo "Contract: ${TASK_MANAGER}"
echo "Function: set-reputation-contract"
echo "Arguments:"
echo "  reputation-contract: '${REPUTATION_TRACKER}"
echo ""
echo "-------------------------------------------"
echo "STEP 3: Authorize Task Manager (Escrow)"
echo "-------------------------------------------"
echo "Contract: ${TASK_ESCROW}"
echo "Function: authorize-contract"
echo "Arguments:"
echo "  contract: '${TASK_MANAGER}"
echo ""
echo "-------------------------------------------"
echo "STEP 4: Authorize Task Manager (Reputation)"
echo "-------------------------------------------"
echo "Contract: ${REPUTATION_TRACKER}"
echo "Function: authorize-contract"
echo "Arguments:"
echo "  contract: '${TASK_MANAGER}"
echo ""
echo "=============================================="
echo "✅ VERIFICATION (After completing steps)"
echo "=============================================="
echo ""
echo "Visit: https://explorer.hiro.so/address/${DEPLOYER}?chain=mainnet"
echo ""
echo "Or use Hiro Wallet to call these read-only functions:"
echo "  • ${TASK_MANAGER}.get-escrow-contract"
echo "  • ${TASK_MANAGER}.get-reputation-contract"
echo ""
echo "Expected results:"
echo "  • (some ${TASK_ESCROW})"
echo "  • (some ${REPUTATION_TRACKER})"
echo ""
echo "=============================================="

# Offer to open browser if available
if command -v xdg-open &> /dev/null; then
    echo ""
    read -p "Open Hiro Wallet in browser? (y/N) " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        xdg-open "https://wallet.hiro.so" 2>/dev/null &
        echo "✅ Opening Hiro Wallet..."
    fi
elif command -v open &> /dev/null; then
    echo ""
    read -p "Open Hiro Wallet in browser? (y/N) " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        open "https://wallet.hiro.so"
        echo "✅ Opening Hiro Wallet..."
    fi
fi

echo ""
echo "💡 Need help? Check init-mainnet.clar for exact function signatures"

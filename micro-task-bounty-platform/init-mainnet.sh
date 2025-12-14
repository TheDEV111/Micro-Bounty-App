#!/bin/bash

# Mainnet Initialization via Stacks CLI
# Install stacks-cli: npm install -g @stacks/cli

DEPLOYER="SPVQ61FEWR6M4HVAT3BNE07D4BNW6A1C2ACCNQ6F"
NETWORK="mainnet"

echo "🚀 Initializing Micro-Task Bounty Platform on Mainnet..."
echo ""
echo "⚠️  WARNING: This will spend STX on transaction fees!"
echo "⚠️  Make sure your deployer wallet has sufficient STX balance"
echo ""
read -p "Continue? (y/N) " -n 1 -r
echo
if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    exit 0
fi

echo ""
echo "Step 1/4: Setting escrow contract reference..."
stx call_contract_func \
  "${DEPLOYER}.task-manager" \
  "set-escrow-contract" \
  -r "\"${DEPLOYER}.task-escrow\"" \
  --network ${NETWORK}

echo ""
echo "Step 2/4: Setting reputation contract reference..."
stx call_contract_func \
  "${DEPLOYER}.task-manager" \
  "set-reputation-contract" \
  -r "\"${DEPLOYER}.reputation-tracker\"" \
  --network ${NETWORK}

echo ""
echo "Step 3/4: Authorizing task manager in escrow contract..."
stx call_contract_func \
  "${DEPLOYER}.task-escrow" \
  "authorize-contract" \
  -r "\"${DEPLOYER}.task-manager\"" \
  --network ${NETWORK}

echo ""
echo "Step 4/4: Authorizing task manager in reputation tracker..."
stx call_contract_func \
  "${DEPLOYER}.reputation-tracker" \
  "authorize-contract" \
  -r "\"${DEPLOYER}.task-manager\"" \
  --network ${NETWORK}

echo ""
echo "✅ Initialization complete!"
echo ""
echo "Verify at: https://explorer.hiro.so/address/${DEPLOYER}?chain=mainnet"

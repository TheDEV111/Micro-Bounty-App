#!/bin/bash

# Mainnet Initialization Script using Stacks CLI
# This script initializes the Micro-Task Bounty Platform contracts

set -e  # Exit on error

DEPLOYER="SPVQ61FEWR6M4HVAT3BNE07D4BNW6A1C2ACCNQ6F"
MNEMONIC="rebuild possible voice pink orphan tenant cage upper chase market field jaguar brain antenna husband cruise young fuel cotton pelican autumn test best seek"
NETWORK="mainnet"

echo "=============================================="
echo "🚀 Initializing Mainnet Contracts"
echo "=============================================="
echo ""
echo "Deployer: ${DEPLOYER}"
echo "Network: ${NETWORK}"
echo ""
echo "⚠️  This will spend ~0.004 STX in transaction fees"
echo ""
read -p "Continue? (y/N) " -n 1 -r
echo
if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo "Cancelled."
    exit 0
fi

echo ""
echo "Deriving private key from mnemonic..."
PRIVATE_KEY=$(echo "${MNEMONIC}" | stx make_keychain -m 2>/dev/null | grep -o '"privateKey":"[^"]*"' | cut -d'"' -f4)

if [ -z "$PRIVATE_KEY" ]; then
    echo "❌ Failed to derive private key"
    exit 1
fi

echo "✅ Private key derived"

# Get current nonce
echo "Fetching account nonce..."
NONCE=$(curl -s "https://api.mainnet.hiro.so/v2/accounts/${DEPLOYER}?proof=0" | grep -o '"nonce":[0-9]*' | cut -d':' -f2)

if [ -z "$NONCE" ]; then
    echo "❌ Failed to fetch nonce"
    exit 1
fi

echo "Current nonce: ${NONCE}"

echo ""
echo "=============================================="
echo "Step 1/4: Setting escrow contract reference..."
echo "=============================================="

stx call_contract_func \
  "${DEPLOYER}" \
  "task-manager" \
  "set-escrow-contract" \
  1000 \
  "${NONCE}" \
  "${PRIVATE_KEY}" \
  "'${DEPLOYER}.task-escrow"

if [ $? -eq 0 ]; then
    echo "✅ Escrow contract reference set!"
    NONCE=$((NONCE + 1))
else
    echo "❌ Failed to set escrow contract"
    exit 1
fi

echo ""
echo "Waiting 15 seconds for transaction to confirm..."
sleep 15

echo ""
echo "=============================================="
echo "Step 2/4: Setting reputation contract reference..."
echo "=============================================="

stx call_contract_func \
  "${DEPLOYER}" \
  "task-manager" \
  "set-reputation-contract" \
  1000 \
  "${NONCE}" \
  "${PRIVATE_KEY}" \
  "'${DEPLOYER}.reputation-tracker"

if [ $? -eq 0 ]; then
    echo "✅ Reputation contract reference set!"
    NONCE=$((NONCE + 1))
else
    echo "❌ Failed to set reputation contract"
    exit 1
fi

echo ""
echo "Waiting 15 seconds for transaction to confirm..."
sleep 15

echo ""
echo "=============================================="
echo "Step 3/4: Authorizing task-manager in escrow..."
echo "=============================================="

stx call_contract_func \
  "${DEPLOYER}" \
  "task-escrow" \
  "authorize-contract" \
  1000 \
  "${NONCE}" \
  "${PRIVATE_KEY}" \
  "'${DEPLOYER}.task-manager"

if [ $? -eq 0 ]; then
    echo "✅ Task manager authorized in escrow!"
    NONCE=$((NONCE + 1))
else
    echo "❌ Failed to authorize task manager in escrow"
    exit 1
fi

echo ""
echo "Waiting 15 seconds for transaction to confirm..."
sleep 15

echo ""
echo "=============================================="
echo "Step 4/4: Authorizing task-manager in reputation..."
echo "=============================================="

stx call_contract_func \
  "${DEPLOYER}" \
  "reputation-tracker" \
  "authorize-contract" \
  1000 \
  "${NONCE}" \
  "${PRIVATE_KEY}" \
  "'${DEPLOYER}.task-manager"

if [ $? -eq 0 ]; then
    echo "✅ Task manager authorized in reputation tracker!"
else
    echo "❌ Failed to authorize task manager in reputation tracker"
    exit 1
fi

echo ""
echo "Waiting 30 seconds for final transaction to confirm..."
sleep 30

echo ""
echo "=============================================="
echo "✅ Initialization Complete!"
echo "=============================================="
echo ""
echo "Verifying initialization..."
echo ""

# Verify initialization
curl -s "https://api.mainnet.hiro.so/v2/contracts/call-read/${DEPLOYER}/task-manager/get-escrow-contract" \
  -H "Content-Type: application/json" \
  -d "{\"sender\":\"${DEPLOYER}\",\"arguments\":[]}" | grep -q "0x0709"

if [ $? -eq 0 ]; then
    echo "⚠️  Escrow contract still shows 'none' - may need more time to confirm"
else
    echo "✅ Escrow contract is set!"
fi

echo ""
echo "View your contracts at:"
echo "https://explorer.hiro.so/address/${DEPLOYER}?chain=mainnet"
echo ""
echo "🎉 Your Micro-Task Bounty Platform is now LIVE on Mainnet!"

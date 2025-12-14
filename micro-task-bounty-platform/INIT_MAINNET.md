# 🔧 Mainnet Initialization Instructions

## ⚠️ Your Contracts Need Initialization

Your contracts are **deployed** but **not yet initialized**. They need to be linked together to work properly.

---

## 🌐 Method 1: Hiro Wallet Web (Recommended - Easiest)

### Step-by-Step Guide

1. **Go to Hiro Wallet**: https://wallet.hiro.so
2. **Connect your wallet** with the secret key/mnemonic from `settings/Mainnet.toml`
3. **Click "Call Contract"** in the top menu
4. **Complete these 4 function calls IN ORDER:**

---

### ✅ Call 1: Set Escrow Contract

```
Contract Address: SPVQ61FEWR6M4HVAT3BNE07D4BNW6A1C2ACCNQ6F.task-manager
Contract Name: task-manager
Function: set-escrow-contract

Arguments:
  escrow-contract (principal): SPVQ61FEWR6M4HVAT3BNE07D4BNW6A1C2ACCNQ6F.task-escrow
```

**Click "Call Function"** → **Confirm transaction** → Wait for confirmation

---

### ✅ Call 2: Set Reputation Contract

```
Contract Address: SPVQ61FEWR6M4HVAT3BNE07D4BNW6A1C2ACCNQ6F.task-manager
Contract Name: task-manager
Function: set-reputation-contract

Arguments:
  reputation-contract (principal): SPVQ61FEWR6M4HVAT3BNE07D4BNW6A1C2ACCNQ6F.reputation-tracker
```

**Click "Call Function"** → **Confirm transaction** → Wait for confirmation

---

### ✅ Call 3: Authorize Task Manager in Escrow

```
Contract Address: SPVQ61FEWR6M4HVAT3BNE07D4BNW6A1C2ACCNQ6F.task-escrow
Contract Name: task-escrow
Function: authorize-contract

Arguments:
  contract (principal): SPVQ61FEWR6M4HVAT3BNE07D4BNW6A1C2ACCNQ6F.task-manager
```

**Click "Call Function"** → **Confirm transaction** → Wait for confirmation

---

### ✅ Call 4: Authorize Task Manager in Reputation Tracker

```
Contract Address: SPVQ61FEWR6M4HVAT3BNE07D4BNW6A1C2ACCNQ6F.reputation-tracker
Contract Name: reputation-tracker
Function: authorize-contract

Arguments:
  contract (principal): SPVQ61FEWR6M4HVAT3BNE07D4BNW6A1C2ACCNQ6F.task-manager
```

**Click "Call Function"** → **Confirm transaction** → Wait for confirmation

---

## 🔍 Verify Initialization

After completing all 4 steps, verify everything worked:

### Option A: Use Hiro Wallet (Read-Only Calls)

1. Go to **Call Contract** → **Read-Only Functions**
2. Contract: `SPVQ61FEWR6M4HVAT3BNE07D4BNW6A1C2ACCNQ6F.task-manager`
3. Call `get-escrow-contract` → Should return: `(some SPVQ61FEWR6M4HVAT3BNE07D4BNW6A1C2ACCNQ6F.task-escrow)`
4. Call `get-reputation-contract` → Should return: `(some SPVQ61FEWR6M4HVAT3BNE07D4BNW6A1C2ACCNQ6F.reputation-tracker)`

### Option B: Use Stacks Explorer

Visit: https://explorer.hiro.so/address/SPVQ61FEWR6M4HVAT3BNE07D4BNW6A1C2ACCNQ6F?chain=mainnet

Check your recent transactions - you should see 4 successful contract calls.

---

## 💰 Transaction Costs

Each initialization call costs approximately:
- **~0.001 STX per transaction**
- **Total: ~0.004 STX** for all 4 calls

Make sure your deployer wallet has at least **0.01 STX** for fees.

---

## 🚨 Common Issues

### Issue 1: "Unauthorized" Error
- **Cause**: You're not using the deployer wallet
- **Solution**: Import the mnemonic from `settings/Mainnet.toml` into Hiro Wallet

### Issue 2: "Contract Already Set" Error
- **Cause**: Initialization already completed
- **Solution**: Skip that step, verify with read-only calls

### Issue 3: Transaction Pending Forever
- **Cause**: Network congestion or insufficient fee
- **Solution**: Wait 10-15 minutes, then check explorer

---

## 📱 Alternative Methods

### Method 2: Install Stacks CLI (For Developers)

```bash
# Install Stacks CLI
npm install -g @stacks/cli

# Then run the initialization script
./init-mainnet.sh
```

### Method 3: Use Clarinet Console (Not Recommended for Mainnet)

Clarinet doesn't have a built-in mainnet initialization feature, use Hiro Wallet instead.

---

## ✅ After Initialization

Once initialized, your platform is **FULLY OPERATIONAL** and ready to:
- Accept task creation
- Process STX escrow
- Track reputation
- Handle disputes

### Test Your Platform

Create a small test task to verify everything works:

```clarity
Contract: SPVQ61FEWR6M4HVAT3BNE07D4BNW6A1C2ACCNQ6F.task-manager
Function: create-task

Arguments:
  title: "Test Task"
  description: "Testing mainnet deployment"
  category: "Testing"
  reward: 100000 (0.1 STX)
  deadline: 1000000 (pick a future block number)
```

---

## 🎉 Congratulations!

Your Micro-Task Bounty Platform will be **LIVE ON MAINNET** after initialization!

**Contract Addresses:**
- Task Manager: `SPVQ61FEWR6M4HVAT3BNE07D4BNW6A1C2ACCNQ6F.task-manager`
- Task Escrow: `SPVQ61FEWR6M4HVAT3BNE07D4BNW6A1C2ACCNQ6F.task-escrow`
- Reputation Tracker: `SPVQ61FEWR6M4HVAT3BNE07D4BNW6A1C2ACCNQ6F.reputation-tracker`

**Explorer:** https://explorer.hiro.so/address/SPVQ61FEWR6M4HVAT3BNE07D4BNW6A1C2ACCNQ6F?chain=mainnet

---

## 📚 Next Steps

1. ✅ Complete initialization (4 function calls)
2. ✅ Verify with read-only calls
3. ✅ Test with a small task
4. ✅ Build your frontend/dApp
5. ✅ Launch to users!

Check `MAINNET_LIVE.md` for full operational guide.

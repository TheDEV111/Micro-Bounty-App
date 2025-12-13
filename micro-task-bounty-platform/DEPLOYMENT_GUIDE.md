# Complete Deployment Guide
## Micro-Task Bounty Platform - Testnet & Mainnet Deployment

This guide will walk you through deploying the smart contracts to Stacks testnet and mainnet.

---

## Prerequisites

### 1. Install Required Tools
- ✅ Clarinet (already installed)
- Stacks wallet (Hiro Wallet or Leather)
- STX for deployment fees

### 2. Get Testnet STX
1. Visit: https://explorer.hiro.so/sandbox/faucet?chain=testnet
2. Request testnet STX for your address
3. Wait for confirmation (~10 minutes)

### 3. Get Mainnet STX
- Purchase STX from an exchange (Coinbase, Kraken, etc.)
- Transfer to your Stacks wallet
- Ensure you have enough for deployment fees (~0.5-1 STX per contract)

---

## Step 1: Generate Wallet Mnemonic (If Needed)

If you don't have a mnemonic phrase yet:

### Option A: Use Existing Wallet
If you have Hiro Wallet or Leather:
1. Open your wallet
2. Go to Settings → Show Secret Key
3. Copy your 12-24 word mnemonic phrase

### Option B: Generate New Wallet
```bash
# Using Clarinet to generate a new wallet
clarinet console
```
Then in the console:
```clarity
::generate_wallet
```

---

## Step 2: Configure Testnet Deployment

### 2.1 Edit Testnet Settings

Open `settings/Testnet.toml` and replace with your mnemonic:

```toml
[network]
name = "testnet"
stacks_node_rpc_address = "https://api.testnet.hiro.so"
deployment_fee_rate = 10

[accounts.deployer]
mnemonic = "your twelve word mnemonic phrase goes here exactly as shown"
```

⚠️ **Security Warning**: Never commit your mnemonic to git! The file is already in `.gitignore`.

### 2.2 Verify Your Testnet Address

```bash
# Check your deployer address
clarinet deployment generate --testnet --dry-run
```

This will show you the address without deploying. Make sure it has testnet STX.

---

## Step 3: Deploy to Testnet

### 3.1 Generate Deployment Plan

```bash
cd /home/henry/Old\ Henry/henry/personal_projects/Micro-Bounty-App/micro-task-bounty-platform
clarinet deployment generate --testnet
```

This creates a deployment plan file showing:
- Contract deployment order
- Estimated fees
- Transaction details

### 3.2 Review the Plan

Check the generated plan in `deployments/testnet-deployment.yaml` (or similar)

### 3.3 Execute Testnet Deployment

```bash
clarinet deployment apply --testnet
```

Expected output:
```
✓ Deploying reputation-tracker.clar
✓ Deploying task-escrow.clar  
✓ Deploying task-manager.clar
All contracts deployed successfully!
```

### 3.4 Note Contract Addresses

Save the deployed contract addresses shown in the output:
```
reputation-tracker: ST1...xxxxx.reputation-tracker
task-escrow:        ST1...xxxxx.task-escrow
task-manager:       ST1...xxxxx.task-manager
```

---

## Step 4: Post-Testnet Deployment Setup

After deployment, you need to initialize the contracts:

### 4.1 Set Contract References

Using Clarinet console or Hiro Wallet:

```clarity
;; Set escrow contract reference in task-manager
(contract-call? .task-manager set-escrow-contract .task-escrow)

;; Set reputation contract reference in task-manager
(contract-call? .task-manager set-reputation-contract .reputation-tracker)
```

### 4.2 Authorize Task Manager

```clarity
;; Authorize task-manager to call escrow
(contract-call? .task-escrow authorize-contract .task-manager)

;; Authorize task-manager to call reputation tracker
(contract-call? .reputation-tracker authorize-contract .task-manager)
```

### 4.3 Verify Setup

Test creating a sample task:

```clarity
(contract-call? .task-manager create-task
    "Test Task"
    u"Testing the deployment"
    "Testing"
    u100000  ;; 0.1 STX
    u1000    ;; deadline block
)
```

---

## Step 5: Testnet Testing Phase

### 5.1 Testing Checklist

Before mainnet deployment, thoroughly test on testnet:

- [ ] Create task with valid parameters
- [ ] Create task with invalid parameters (should fail)
- [ ] Assign task to worker
- [ ] Submit work
- [ ] Approve task and verify payment
- [ ] Reject task and verify refund
- [ ] Open dispute
- [ ] Resolve dispute
- [ ] Check reputation updates
- [ ] Withdraw platform fees
- [ ] Test with multiple users

### 5.2 Monitor Transactions

View your testnet deployments:
- https://explorer.hiro.so/txid/YOUR_TX_ID?chain=testnet
- https://explorer.hiro.so/address/YOUR_ADDRESS?chain=testnet

### 5.3 Recommended Testing Period

- **Minimum**: 1 week of active testing
- **Recommended**: 2-4 weeks with community testing
- Complete all test scenarios multiple times

---

## Step 6: Security Audit (IMPORTANT)

⚠️ **CRITICAL**: Before mainnet deployment:

### 6.1 Professional Audit
- [ ] Hire a professional Clarity smart contract auditor
- [ ] Review audit findings
- [ ] Fix any identified issues
- [ ] Re-test after fixes

### Recommended Auditors:
- Hiro PBC (https://www.hiro.so)
- Least Authority (https://leastauthority.com)
- Trail of Bits (https://www.trailofbits.com)

### 6.2 Bug Bounty (Optional but Recommended)
- Offer rewards for finding vulnerabilities
- Use platforms like Immunefi or HackerOne
- Run for at least 2-4 weeks

---

## Step 7: Prepare for Mainnet

### 7.1 Final Checklist

- [ ] All testnet tests passed
- [ ] Security audit completed
- [ ] Audit findings addressed
- [ ] Community testing completed
- [ ] Emergency response plan ready
- [ ] Documentation finalized
- [ ] Frontend integration tested
- [ ] Monitoring setup ready

### 7.2 Get Mainnet STX

Ensure you have sufficient STX for:
- Deployment fees: ~1-2 STX total
- Initial platform operations: ~5-10 STX
- Emergency fund: ~10-20 STX

---

## Step 8: Deploy to Mainnet

### 8.1 Configure Mainnet Settings

⚠️ **WARNING**: Mainnet deployments are PERMANENT and use REAL STX!

Edit `settings/Mainnet.toml`:

```toml
[network]
name = "mainnet"
stacks_node_rpc_address = "https://api.hiro.so"
deployment_fee_rate = 10

[accounts.deployer]
mnemonic = "your mainnet wallet twelve word phrase"
```

### 8.2 Generate Mainnet Deployment Plan

```bash
clarinet deployment generate --mainnet
```

### 8.3 Review Carefully

⚠️ **CRITICAL**: Triple-check everything:
- Contract code is correct
- No test code in mainnet contracts
- Deployment order is correct
- You have enough STX for fees

### 8.4 Execute Mainnet Deployment

```bash
# Take a deep breath, this is the real deal!
clarinet deployment apply --mainnet
```

### 8.5 Save Mainnet Contract Addresses

Immediately save the deployed addresses:
```
reputation-tracker: SP...xxxxx.reputation-tracker
task-escrow:        SP...xxxxx.task-escrow
task-manager:       SP...xxxxx.task-manager
```

Update your documentation, website, and frontend with these addresses.

---

## Step 9: Post-Mainnet Setup

### 9.1 Initialize Mainnet Contracts

Same as testnet, but on mainnet:

```clarity
;; Set contract references
(contract-call? .task-manager set-escrow-contract .task-escrow)
(contract-call? .task-manager set-reputation-contract .reputation-tracker)

;; Authorize task-manager
(contract-call? .task-escrow authorize-contract .task-manager)
(contract-call? .reputation-tracker authorize-contract .task-manager)
```

### 9.2 Verify Mainnet Deployment

```clarity
;; Test read-only functions
(contract-call? .task-manager get-task-count)
(contract-call? .task-escrow get-platform-fees)
```

### 9.3 Monitor Initial Transactions

Watch closely:
- https://explorer.hiro.so/address/YOUR_ADDRESS?chain=mainnet
- Set up alerts for your contract addresses

---

## Step 10: Launch Operations

### 10.1 Announce Launch
- Update website with mainnet contract addresses
- Announce on social media
- Update documentation

### 10.2 Set Up Monitoring

Monitor:
- Contract calls
- Error rates
- Gas usage
- Platform fees collected
- User activity

### 10.3 Emergency Procedures

Have a plan for:
- Pause mechanisms (if implemented)
- Communication channels
- Emergency contact info
- Incident response team

---

## Troubleshooting

### Issue: Insufficient Funds
```
Error: Insufficient funds for deployment
```
**Solution**: Add more STX to your deployment address.

### Issue: Invalid Mnemonic
```
Error: mnemonic is invalid
```
**Solution**: Ensure mnemonic is 12, 15, 18, 21, or 24 words exactly.

### Issue: Network Connection
```
Error: Failed to connect to Stacks node
```
**Solution**: Check internet connection, try different RPC endpoint.

### Issue: Contract Already Exists
```
Error: Contract already deployed
```
**Solution**: Contract names must be unique per deployer address. Change contract names or use different deployer.

---

## Quick Commands Reference

```bash
# Check contracts
clarinet check

# Run tests
clarinet test

# Generate testnet deployment
clarinet deployment generate --testnet

# Deploy to testnet
clarinet deployment apply --testnet

# Generate mainnet deployment (CAREFUL!)
clarinet deployment generate --mainnet

# Deploy to mainnet (VERY CAREFUL!)
clarinet deployment apply --mainnet

# Interactive console (testnet)
clarinet console --testnet

# Interactive console (mainnet)
clarinet console --mainnet
```

---

## Security Best Practices

1. **Never** share your mnemonic phrase
2. **Never** commit mnemonic to version control
3. **Always** test on testnet first
4. **Always** get professional audit before mainnet
5. **Always** have emergency response plan
6. Use separate wallets for testnet and mainnet
7. Keep deployment wallet separate from personal wallet
8. Enable 2FA on all accounts
9. Use hardware wallet for mainnet deployments
10. Back up your mnemonic in multiple secure locations

---

## Cost Estimates

### Testnet (Free)
- Deployment: Free (using testnet STX from faucet)
- Testing: Free

### Mainnet
- Contract deployment: ~0.5-1 STX per contract = ~1.5-3 STX total
- Initialization transactions: ~0.01 STX each = ~0.05 STX
- Buffer for failed transactions: ~0.5 STX
- **Total Estimated**: 2-4 STX

---

## Post-Deployment Checklist

### Immediately After Deployment
- [ ] Save contract addresses
- [ ] Initialize contracts
- [ ] Verify all functions work
- [ ] Update frontend with addresses
- [ ] Update documentation
- [ ] Test with small amounts first

### Within 24 Hours
- [ ] Monitor all transactions
- [ ] Check for any errors
- [ ] Verify reputation tracking
- [ ] Test fee collection
- [ ] Ensure escrow working

### Within First Week
- [ ] Complete several test tasks
- [ ] Monitor gas costs
- [ ] Check user feedback
- [ ] Optimize if needed
- [ ] Build community

---

## Support & Resources

- **Stacks Explorer**: https://explorer.hiro.so
- **Stacks Documentation**: https://docs.stacks.co
- **Clarinet Docs**: https://docs.hiro.so/clarinet
- **Community Discord**: https://stacks.chat
- **GitHub Issues**: Your repo issues page

---

## Next Steps After Successful Deployment

1. **Marketing**: Announce launch, create content
2. **Community**: Build user base, gather feedback
3. **Features**: Add enhancements based on usage
4. **Scaling**: Optimize for higher volumes
5. **Integration**: Add more payment methods, APIs
6. **Governance**: Consider DAO structure for platform decisions

---

**Good luck with your deployment! 🚀**

Remember: Take your time, test thoroughly, and don't rush to mainnet!

# Micro-Task Bounty Platform - Smart Contracts

A decentralized micro-task marketplace built on Stacks blockchain with three core smart contracts.

## Contracts Overview

### 1. **reputation-tracker.clar**
Manages user reputation scores for both workers and task creators.

**Key Features:**
- Track task completions and creations
- Star ratings (1-5) system
- Dispute history tracking
- Calculate reputation scores based on performance
- Authorization system for contract interactions

**Main Functions:**
- `record-completion`: Record task completion with rating
- `record-task-created`: Track task creation and spending
- `record-task-earned`: Track worker earnings
- `record-dispute`: Record dispute outcomes
- `get-reputation`: Calculate and return reputation score
- `get-user-stats`: Get detailed user statistics
- `get-average-rating`: Get user's average rating

### 2. **task-escrow.clar**
Manages STX payments in escrow for tasks.

**Key Features:**
- Automatic fund locking on task creation
- 2.5% platform fee
- 72-hour dispute window
- Secure fund release or refund
- Dispute resolution with percentage-based splits

**Main Functions:**
- `deposit-escrow`: Lock funds for a task
- `release-funds`: Send funds to worker on approval
- `refund-creator`: Return funds to creator
- `open-dispute`: Initiate dispute process
- `resolve-dispute`: Split funds based on arbitration decision
- `withdraw-platform-fees`: Owner withdraws collected fees

**Economic Parameters:**
- Platform fee: 2.5% (250/10000)
- Minimum task reward: 0.1 STX (100,000 microSTX)
- Maximum task reward: 100,000 STX
- Dispute window: 72 hours (432 blocks)

### 3. **task-manager.clar**
Core task lifecycle management contract.

**Key Features:**
- Task creation with detailed metadata
- Task assignment to workers
- Work submission with URLs and notes
- Approval/rejection workflow
- Dispute handling
- Task cancellation

**Main Functions:**
- `create-task`: Create new task with escrow deposit
- `assign-task`: Assign task to worker
- `submit-work`: Worker submits completed work
- `approve-task`: Creator approves and releases payment
- `reject-task`: Creator rejects submission
- `open-dispute`: Open dispute on task
- `cancel-task`: Creator cancels unassigned or assigned task

**Task Statuses:**
- 0: OPEN - Available for assignment
- 1: ASSIGNED - Worker assigned
- 2: SUBMITTED - Work submitted for review
- 3: APPROVED - Task completed, payment released
- 4: DISPUTED - Under dispute resolution
- 5: CANCELLED - Cancelled by creator
- 6: REJECTED - Submission rejected

## Development Setup

### Prerequisites
- Clarinet 3.11.0+ installed
- Node.js 16+ for running tests

### Installation

```bash
cd micro-task-bounty-platform
npm install
```

### Testing

Run all tests:
```bash
clarinet test
```

Run specific test file:
```bash
clarinet test --filter reputation-tracker
clarinet test --filter task-escrow
clarinet test --filter task-manager
```

### Validation

Check contracts for errors:
```bash
clarinet check
```

Expected output: `✔ 3 contracts checked` with warnings (which are expected).

## Contract Interactions

### 1. Initial Setup (Owner Only)

```clarity
;; Set contract references in task-manager
(contract-call? .task-manager set-escrow-contract .task-escrow)
(contract-call? .task-manager set-reputation-contract .reputation-tracker)

;; Authorize task-manager to call other contracts
(contract-call? .task-escrow authorize-contract .task-manager)
(contract-call? .reputation-tracker authorize-contract .task-manager)
```

### 2. Create a Task (Creator)

```clarity
(contract-call? .task-manager create-task
    "Label 1000 images"                    ;; title
    u"Categorize images into 5 classes"    ;; description  
    "Data Labeling"                        ;; category
    u1000000                               ;; reward (1 STX)
    u1000                                  ;; deadline (block height)
)
```

### 3. Assign Task (Creator)

```clarity
(contract-call? .task-manager assign-task
    u1                                     ;; task-id
    'ST1WORKER...                          ;; worker principal
)
```

### 4. Submit Work (Worker)

```clarity
(contract-call? .task-manager submit-work
    u1                                     ;; task-id
    u"https://ipfs.io/ipfs/..."            ;; submission-url
    u"Completed all 1000 images"           ;; notes
)
```

### 5. Approve Task (Creator)

```clarity
(contract-call? .task-manager approve-task
    u1                                     ;; task-id
    u5                                     ;; rating (1-5 stars)
)
```

### 6. Open Dispute (Worker or Creator)

```clarity
(contract-call? .task-manager open-dispute u1)
```

### 7. Resolve Dispute (Owner/Arbitrator)

```clarity
(contract-call? .task-escrow resolve-dispute
    u1                                     ;; task-id
    u60                                    ;; worker-percentage (60% to worker)
)
```

## Security Features

### Authorization System
- Contract-to-contract calls are authorized
- Only specific principals can call sensitive functions
- Owner-only functions for administrative tasks

### Escrow Protection
- Funds locked until task completion or dispute resolution
- Automatic fee collection
- Time-locked dispute windows
- No double-spending or reentrancy issues

### Input Validation
- Title, description, and category validation
- Rating bounds (1-5)
- Amount limits (min/max)
- Deadline validation

### Reputation Safeguards
- Immutable history of completions and disputes
- Transparent scoring algorithm
- Cannot manipulate past records

## Warnings Explained

The contracts show warnings about "potentially unchecked data" - these are **expected and safe** because:

1. **Principal parameters**: User addresses from function parameters are used in maps, which is normal behavior
2. **Authorization checks**: All sensitive functions check `contract-caller` or `tx-sender` before operations
3. **No security risk**: These warnings don't indicate vulnerabilities, just that principals from parameters are being used

## Testing Coverage

Each contract has comprehensive tests covering:

### Reputation Tracker (12 tests)
- ✅ Authorization management
- ✅ Recording completions with ratings
- ✅ Rating validation
- ✅ Reputation score calculation
- ✅ Dispute tracking
- ✅ Earnings and spending tracking

### Task Escrow (15 tests)
- ✅ Escrow deposit and validation
- ✅ Platform fee calculation
- ✅ Fund release to worker
- ✅ Refund to creator
- ✅ Dispute opening and resolution
- ✅ Fee withdrawal
- ✅ Double-release prevention

### Task Manager (16 tests)
- ✅ Task creation and validation
- ✅ Task assignment
- ✅ Work submission
- ✅ Approval and rejection
- ✅ Dispute handling
- ✅ Task cancellation
- ✅ Authorization checks
- ✅ Read-only functions

## Deployment Guide

### Testnet Deployment

```bash
# Generate deployment plan
clarinet deployment generate --testnet

# Apply deployment
clarinet deployment apply --testnet
```

### Mainnet Deployment

```bash
# Generate deployment plan
clarinet deployment generate --mainnet

# Review the plan carefully
# Apply deployment
clarinet deployment apply --mainnet
```

### Post-Deployment Checklist

1. ✅ Verify contract addresses
2. ✅ Set contract references in task-manager
3. ✅ Authorize task-manager in escrow and reputation contracts
4. ✅ Test basic task creation flow
5. ✅ Monitor first transactions
6. ✅ Set up fee withdrawal schedule

## Architecture Diagram

```
┌─────────────────┐
│  Task Manager   │  ← User Interface
└────────┬────────┘
         │
         ├─────────────┬─────────────┐
         │             │             │
         ▼             ▼             ▼
┌────────────┐  ┌─────────────┐  ┌──────────────┐
│   Escrow   │  │ Reputation  │  │    Users     │
│  Contract  │  │   Tracker   │  │ (Creators &  │
└────────────┘  └─────────────┘  │   Workers)   │
                                 └──────────────┘
```

## Gas Optimization

The contracts are optimized for gas efficiency:
- Minimal storage operations
- Efficient data structures
- Batch operations where possible
- Single map lookups

## Future Enhancements

Planned improvements:
- [ ] Multi-signature arbitration
- [ ] Stablecoin support (sBTC, USDA)
- [ ] Batch task operations
- [ ] NFT badges for achievements
- [ ] DAO governance for platform parameters

## Support & Documentation

- **PRD**: See `/PRD.md` for full product requirements
- **Issues**: Report bugs via GitHub issues
- **Community**: Join Stacks Discord for support

## License

See LICENSE file for details.

## Contributors

Built for the Stacks ecosystem with ❤️

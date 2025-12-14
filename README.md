# TaskBounty - Decentralized Micro-Task Platform

A modern, full-stack decentralized application for creating and completing micro-tasks with cryptocurrency payments on the Stacks blockchain.

## 🏗️ Project Structure

This is a monorepo containing:

```
Micro-Bounty-App/
├── micro-task-bounty-platform/    # Clarity smart contracts
│   ├── contracts/
│   │   ├── task-manager.clar
│   │   ├── task-escrow.clar
│   │   └── reputation-tracker.clar
│   └── tests/
└── frontend/                       # Next.js frontend application
    ├── app/                        # Next.js App Router pages
    ├── components/                 # Reusable React components
    ├── providers/                  # Context providers
    ├── theme/                      # Chakra UI theme
    └── lib/                        # Utilities and blockchain interactions
```

## 🎨 Design System

### Theme Colors
- **Primary (Pink)**: #ff006f
- **Secondary (Gray)**: #6c6f7a
- **Accent Colors**: Various shades of pink and gray

### Typography
- **Headings**: Poppins (Google Fonts)
- **Body**: Inter (Google Fonts)

### UI Framework
- **Chakra UI**: Component library with custom theme
- **Framer Motion**: Smooth animations and transitions
- **Lucide React**: Modern icon set

## 🚀 Features

### Smart Contracts (Deployed on Mainnet)
- **Task Manager**: Core task lifecycle management
- **Task Escrow**: Secure STX escrow with 2.5% platform fee
- **Reputation Tracker**: On-chain reputation system

**Contract Addresses:**
```
Task Manager:       SPVQ61FEWR6M4HVAT3BNE07D4BNW6A1C2ACCNQ6F.task-manager
Task Escrow:        SPVQ61FEWR6M4HVAT3BNE07D4BNW6A1C2ACCNQ6F.task-escrow
Reputation Tracker: SPVQ61FEWR6M4HVAT3BNE07D4BNW6A1C2ACCNQ6F.reputation-tracker
```

### Frontend Features
- ✅ Hiro Wallet Integration
- ✅ Browse & Filter Tasks
- ✅ Create New Tasks
- ✅ Task Details View
- ✅ User Dashboard
- ✅ Reputation System
- ✅ Responsive Design
- ✅ Animated UI Components
- ✅ Toast Notifications

### Navigation Components
- **Navbar**: Sticky header with dropdown menus
  - Tasks dropdown (Browse, Create, My Tasks, Active Work)
  - Explore dropdown (Categories, Leaderboard, Statistics)
  - Account dropdown (Profile, Dashboard, Earnings, Reputation)
  - Wallet Connect button
  - Mobile-responsive drawer menu

- **Footer**: Professional footer with:
  - Brand information
  - Platform links
  - Resources
  - Legal pages
  - Social media links

## 🛠️ Tech Stack

### Frontend
- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **UI Library**: Chakra UI
- **Animation**: Framer Motion
- **Icons**: Lucide React
- **Blockchain**: @stacks/connect, @stacks/transactions

### Smart Contracts
- **Language**: Clarity 2.5
- **Testing**: Clarinet 3.11.0
- **Network**: Stacks Mainnet

## 📦 Installation

### Prerequisites
- Node.js 18+ and npm
- Clarinet 3.11.0+

### Setup

1. **Clone the repository**
```bash
cd Micro-Bounty-App
```

2. **Install frontend dependencies**
```bash
cd frontend
npm install
```

3. **Run the development server**
```bash
npm run dev
```

The app will be available at `http://localhost:3000` (or 3001 if port is in use)

## 🔧 Configuration

### Environment Variables
Create a `.env.local` file in the `frontend` directory:

```env
NEXT_PUBLIC_NETWORK=mainnet
NEXT_PUBLIC_TASK_MANAGER_CONTRACT=SPVQ61FEWR6M4HVAT3BNE07D4BNW6A1C2ACCNQ6F.task-manager
NEXT_PUBLIC_TASK_ESCROW_CONTRACT=SPVQ61FEWR6M4HVAT3BNE07D4BNW6A1C2ACCNQ6F.task-escrow
NEXT_PUBLIC_REPUTATION_CONTRACT=SPVQ61FEWR6M4HVAT3BNE07D4BNW6A1C2ACCNQ6F.reputation-tracker
```

## 📄 Pages

### Public Pages
- `/` - Landing page with features and CTAs
- `/tasks` - Browse all available tasks
- `/tasks/create` - Create a new task (wallet required)
- `/tasks/[id]` - Task details page
- `/categories` - Browse tasks by category
- `/leaderboard` - Top workers by reputation
- `/how-it-works` - Platform guide

### Protected Pages (Wallet Required)
- `/dashboard` - User activity dashboard
- `/profile` - User profile and settings
- `/tasks/mine` - Tasks you created
- `/tasks/active` - Tasks you're working on
- `/earnings` - Earning history and analytics
- `/reputation` - Your reputation score

## 🎯 Smart Contract Interactions

### Creating a Task
```typescript
import { createTask } from '@/lib/stacks';

await createTask({
  title: 'Design a logo',
  description: 'Need a modern logo...',
  category: 'Design',
  reward: 5000000, // in microSTX
  deadline: 150000, // block height
  senderAddress: userAddress,
});
```

### Other Available Functions
- `assignTask(taskId)` - Claim a task
- `submitWork(taskId, submissionUrl)` - Submit completed work
- `approveTask(taskId, rating)` - Approve and rate work
- `rejectTask(taskId, reason)` - Reject submission
- `cancelTask(taskId)` - Cancel task
- `openDispute(taskId, reason)` - Open a dispute

## 🎨 Component Library

### Key Components
- `Navbar` - Main navigation with dropdowns
- `Footer` - Site-wide footer
- `TaskCard` - Display task information
- `FeatureCard` - Homepage feature showcase
- `StatCard` - Statistics display

### Theming
Custom Chakra UI theme in `theme/index.ts` with:
- Brand colors (pink/gray palette)
- Custom button variants
- Card styles with hover effects
- Typography settings

## 🔐 Wallet Integration

The app uses Hiro Wallet for Stacks authentication:

```typescript
import { useStacks } from '@/providers/stacks-provider';

const { 
  isConnected, 
  userData, 
  connectWallet, 
  disconnectWallet 
} = useStacks();
```

## 📱 Responsive Design

- Mobile-first approach
- Breakpoints: base (mobile), md (tablet), lg (desktop)
- Mobile drawer menu for navigation
- Responsive grid layouts

## 🚀 Deployment

### Frontend Deployment (Vercel)
```bash
cd frontend
npm run build
# Deploy to Vercel
```

### Smart Contracts (Already Deployed)
Contracts are live on Stacks Mainnet. To initialize:
```bash
cd micro-task-bounty-platform
python3 init-mainnet.py
```

## 📊 Platform Economics

- **Platform Fee**: 2.5% of task reward
- **Minimum Task**: 0.1 STX
- **Maximum Task**: 100,000 STX
- **Dispute Window**: 72 hours (432 blocks)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📝 License

MIT License - see LICENSE file for details

## 🔗 Links

- **Mainnet Explorer**: https://explorer.hiro.so/address/SPVQ61FEWR6M4HVAT3BNE07D4BNW6A1C2ACCNQ6F?chain=mainnet
- **Stacks Documentation**: https://docs.stacks.co
- **Hiro Wallet**: https://wallet.hiro.so

## 💡 Support

For questions or issues:
- Open a GitHub issue
- Join our Discord
- Email: support@taskbounty.io

---

**Built with ❤️ on Stacks Blockchain**

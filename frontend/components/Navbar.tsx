'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Menu as MenuIcon, 
  Briefcase, 
  Search, 
  User, 
  Wallet,
  ChevronDown,
  X
} from 'lucide-react';
import Link from 'next/link';
import { useStacks } from '@/providers/stacks-provider';

const DropdownMenu = ({ 
  label, 
  icon: Icon, 
  items 
}: { 
  label: string; 
  icon: any; 
  items: { label: string; href: string; description?: string }[] 
}) => {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <div 
      className="relative"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <button className="px-4 py-2 text-gray-700 font-medium hover:text-brand-500 hover:bg-gray-50 rounded-lg transition-all duration-300 flex items-center gap-2">
        <Icon size={18} />
        <span>{label}</span>
        <ChevronDown size={16} className={`transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute top-full left-0 mt-2 w-72 bg-white rounded-lg shadow-xl border border-gray-200 py-2 z-50"
        >
          {items.map((item, index) => (
            <Link key={index} href={item.href}>
              <button className="w-full px-4 py-3 text-left hover:bg-brand-50 transition-all">
                <div className="font-semibold text-sm text-gray-800">{item.label}</div>
                {item.description && (
                  <div className="text-xs text-gray-500 mt-1">{item.description}</div>
                )}
              </button>
            </Link>
          ))}
        </motion.div>
      )}
    </div>
  );
};

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [walletMenuOpen, setWalletMenuOpen] = useState(false);
  const { isConnected, connectWallet, disconnectWallet, userData } = useStacks();

  const tasksMenuItems = [
    { label: 'Browse Tasks', href: '/tasks', description: 'Find available tasks' },
    { label: 'Create Task', href: '/tasks/create', description: 'Post a new task' },
    { label: 'My Tasks', href: '/tasks/mine', description: 'Tasks you created' },
    { label: 'Active Work', href: '/tasks/active', description: 'Tasks you\'re working on' },
  ];

  const exploreMenuItems = [
    { label: 'Categories', href: '/categories', description: 'Browse by category' },
    { label: 'Top Workers', href: '/leaderboard', description: 'View top performers' },
    { label: 'Statistics', href: '/stats', description: 'Platform insights' },
  ];

  const accountMenuItems = [
    { label: 'Profile', href: '/profile', description: 'View your profile' },
    { label: 'Dashboard', href: '/dashboard', description: 'Your activity' },
    { label: 'Earnings', href: '/earnings', description: 'Track your income' },
    { label: 'Reputation', href: '/reputation', description: 'View your score' },
  ];

  return (
    <motion.nav
      className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link href="/">
            <div className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition-all">
              <div className="bg-brand-500 p-2 rounded-lg">
                <Briefcase size={24} className="text-white" />
              </div>
              <span className="text-xl font-extrabold text-gray-800 font-poppins">
                TaskBounty
              </span>
            </div>
          </Link>

          <div className="hidden lg:flex items-center gap-1">
            <DropdownMenu label="Tasks" icon={Briefcase} items={tasksMenuItems} />
            <DropdownMenu label="Explore" icon={Search} items={exploreMenuItems} />
            {isConnected && (
              <DropdownMenu label="Account" icon={User} items={accountMenuItems} />
            )}
          </div>

          <div className="flex items-center gap-3">
            {isConnected ? (
              <div className="relative">
                <button
                  onClick={() => setWalletMenuOpen(!walletMenuOpen)}
                  className="hidden md:flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg font-semibold hover:bg-gray-50 transition-all"
                >
                  <Wallet size={18} />
                  <span>
                    {userData?.profile?.stxAddress?.mainnet?.slice(0, 6)}...
                    {userData?.profile?.stxAddress?.mainnet?.slice(-4)}
                  </span>
                </button>
                
                {walletMenuOpen && (
                  <div className="absolute top-full right-0 mt-2 w-48 bg-white rounded-lg shadow-xl border border-gray-200 py-2">
                    <button
                      onClick={() => {
                        disconnectWallet();
                        setWalletMenuOpen(false);
                      }}
                      className="w-full px-4 py-2 text-left hover:bg-gray-100 transition-all"
                    >
                      Disconnect
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={connectWallet}
                className="hidden md:flex items-center gap-2 px-4 py-2 bg-brand-500 text-white rounded-lg font-semibold hover:bg-brand-600 transition-all"
              >
                <Wallet size={18} />
                <span>Connect Wallet</span>
              </button>
            )}

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-all"
            >
              {mobileMenuOpen ? <X size={24} /> : <MenuIcon size={24} />}
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="lg:hidden mt-4 pb-4 border-t border-gray-200 pt-4"
          >
            <div className="flex flex-col gap-4">
              <div>
                <div className="text-xs font-bold text-gray-600 uppercase mb-2">Tasks</div>
                {tasksMenuItems.map((item, index) => (
                  <Link key={index} href={item.href}>
                    <button 
                      className="w-full text-left px-4 py-2 hover:bg-gray-100 rounded-lg"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {item.label}
                    </button>
                  </Link>
                ))}
              </div>

              <div>
                <div className="text-xs font-bold text-gray-600 uppercase mb-2">Explore</div>
                {exploreMenuItems.map((item, index) => (
                  <Link key={index} href={item.href}>
                    <button 
                      className="w-full text-left px-4 py-2 hover:bg-gray-100 rounded-lg"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {item.label}
                    </button>
                  </Link>
                ))}
              </div>

              {isConnected && (
                <div>
                  <div className="text-xs font-bold text-gray-600 uppercase mb-2">Account</div>
                  {accountMenuItems.map((item, index) => (
                    <Link key={index} href={item.href}>
                      <button 
                        className="w-full text-left px-4 py-2 hover:bg-gray-100 rounded-lg"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {item.label}
                      </button>
                    </Link>
                  ))}
                </div>
              )}

              <div className="mt-4">
                {isConnected ? (
                  <button
                    onClick={() => {
                      disconnectWallet();
                      setMobileMenuOpen(false);
                    }}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg font-semibold hover:bg-gray-50 transition-all"
                  >
                    Disconnect Wallet
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      connectWallet();
                      setMobileMenuOpen(false);
                    }}
                    className="w-full px-4 py-2 bg-brand-500 text-white rounded-lg font-semibold hover:bg-brand-600 transition-all"
                  >
                    Connect Wallet
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </motion.nav>
  );
}

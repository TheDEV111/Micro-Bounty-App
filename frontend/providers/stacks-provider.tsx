'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { AppConfig, UserSession, showConnect } from '@stacks/connect';
import { StacksMainnet, StacksTestnet } from '@stacks/network';

const appConfig = new AppConfig(['store_write', 'publish_data']);
const userSession = new UserSession({ appConfig });

interface StacksContextType {
  userSession: UserSession;
  userData: any;
  isConnected: boolean;
  network: StacksMainnet | StacksTestnet;
  connectWallet: () => void;
  disconnectWallet: () => void;
}

const StacksContext = createContext<StacksContextType | undefined>(undefined);

export function StacksProvider({ children }: { children: ReactNode }) {
  const [userData, setUserData] = useState<any>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [network] = useState(new StacksMainnet());

  useEffect(() => {
    if (userSession.isUserSignedIn()) {
      const data = userSession.loadUserData();
      setUserData(data);
      setIsConnected(true);
    }
  }, []);

  const connectWallet = () => {
    showConnect({
      appDetails: {
        name: 'Micro-Task Bounty Platform',
        icon: '/logo.png',
      },
      redirectTo: '/',
      onFinish: () => {
        const data = userSession.loadUserData();
        setUserData(data);
        setIsConnected(true);
      },
      userSession,
    });
  };

  const disconnectWallet = () => {
    userSession.signUserOut();
    setUserData(null);
    setIsConnected(false);
  };

  return (
    <StacksContext.Provider
      value={{
        userSession,
        userData,
        isConnected,
        network,
        connectWallet,
        disconnectWallet,
      }}
    >
      {children}
    </StacksContext.Provider>
  );
}

export function useStacks() {
  const context = useContext(StacksContext);
  if (context === undefined) {
    throw new Error('useStacks must be used within a StacksProvider');
  }
  return context;
}

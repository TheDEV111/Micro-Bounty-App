#!/usr/bin/env python3
"""
Mainnet Contract Initialization Script
Initializes the Micro-Task Bounty Platform contracts on Stacks Mainnet
"""

import json
import time
import subprocess
import sys

DEPLOYER = "SPVQ61FEWR6M4HVAT3BNE07D4BNW6A1C2ACCNQ6F"
MNEMONIC = "rebuild possible voice pink orphan tenant cage upper chase market field jaguar brain antenna husband cruise young fuel cotton pelican autumn test best seek"

def get_private_key():
    """Derive mainnet private key from mnemonic"""
    try:
        result = subprocess.run(
            ["stx", "make_keychain", "-m"],
            input=MNEMONIC,
            capture_output=True,
            text=True
        )
        data = json.loads(result.stdout)
        return data["keyInfo"]["privateKey"]
    except Exception as e:
        print(f"❌ Failed to derive private key: {e}")
        sys.exit(1)

def get_account_nonce():
    """Fetch current account nonce from API"""
    try:
        result = subprocess.run(
            ["curl", "-s", f"https://api.mainnet.hiro.so/v2/accounts/{DEPLOYER}?proof=0"],
            capture_output=True,
            text=True,
            timeout=10
        )
        data = json.loads(result.stdout)
        return data["nonce"]
    except Exception as e:
        print(f"❌ Failed to fetch nonce: {e}")
        sys.exit(1)

def call_contract(contract_name, function_name, args, nonce, private_key):
    """Call a contract function"""
    try:
        cmd = [
            "stx", "call_contract_func",
            DEPLOYER,
            contract_name,
            function_name,
            "1000",  # fee in microSTX
            str(nonce),
            private_key
        ]
        
        if args:
            cmd.append(args)
        
        result = subprocess.run(cmd, capture_output=True, text=True)
        response = json.loads(result.stdout)
        
        if "txid" in response:
            print(f"✅ Transaction submitted: {response['txid']}")
            return True
        elif "error" in response:
            print(f"❌ Error: {response['reason']}")
            if "reason_data" in response:
                print(f"   Details: {response['reason_data'].get('message', '')}")
            return False
        else:
            print(f"❌ Unexpected response: {response}")
            return False
            
    except Exception as e:
        print(f"❌ Failed to call contract: {e}")
        return False

def main():
    print("=" * 50)
    print("🚀 Initializing Mainnet Contracts")
    print("=" * 50)
    print(f"\nDeployer: {DEPLOYER}")
    print("Network: mainnet")
    print("\n⚠️  This will spend ~0.004 STX in transaction fees\n")
    
    response = input("Continue? (y/N) ")
    if response.lower() != 'y':
        print("Cancelled.")
        sys.exit(0)
    
    print("\nDeriving private key from mnemonic...")
    private_key = get_private_key()
    print("✅ Private key derived")
    
    print("\nFetching account nonce...")
    nonce = get_account_nonce()
    print(f"Current nonce: {nonce}")
    
    # Step 1: Set escrow contract
    print("\n" + "=" * 50)
    print("Step 1/4: Setting escrow contract reference...")
    print("=" * 50)
    if call_contract("task-manager", "set-escrow-contract", f"'{DEPLOYER}.task-escrow", nonce, private_key):
        nonce += 1
        time.sleep(15)
    else:
        sys.exit(1)
    
    # Step 2: Set reputation contract
    print("\n" + "=" * 50)
    print("Step 2/4: Setting reputation contract reference...")
    print("=" * 50)
    if call_contract("task-manager", "set-reputation-contract", f"'{DEPLOYER}.reputation-tracker", nonce, private_key):
        nonce += 1
        time.sleep(15)
    else:
        sys.exit(1)
    
    # Step 3: Authorize task-manager in escrow
    print("\n" + "=" * 50)
    print("Step 3/4: Authorizing task-manager in escrow...")
    print("=" * 50)
    if call_contract("task-escrow", "authorize-contract", f"'{DEPLOYER}.task-manager", nonce, private_key):
        nonce += 1
        time.sleep(15)
    else:
        sys.exit(1)
    
    # Step 4: Authorize task-manager in reputation
    print("\n" + "=" * 50)
    print("Step 4/4: Authorizing task-manager in reputation...")
    print("=" * 50)
    if call_contract("reputation-tracker", "authorize-contract", f"'{DEPLOYER}.task-manager", nonce, private_key):
        time.sleep(30)
    else:
        sys.exit(1)
    
    print("\n" + "=" * 50)
    print("✅ Initialization Complete!")
    print("=" * 50)
    print(f"\nView your contracts at:")
    print(f"https://explorer.hiro.so/address/{DEPLOYER}?chain=mainnet")
    print("\n🎉 Your Micro-Task Bounty Platform is now LIVE on Mainnet!")

if __name__ == "__main__":
    main()

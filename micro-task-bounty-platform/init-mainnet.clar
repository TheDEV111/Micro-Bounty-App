;; Mainnet Initialization Script
;; Run these function calls in order using Hiro Wallet (wallet.hiro.so)
;; or stacks-cli

;; ============================================
;; STEP 1: Set Escrow Contract in Task Manager
;; ============================================
;; Contract: SPVQ61FEWR6M4HVAT3BNE07D4BNW6A1C2ACCNQ6F.task-manager
;; Function: set-escrow-contract
;; Argument: 'SPVQ61FEWR6M4HVAT3BNE07D4BNW6A1C2ACCNQ6F.task-escrow

;; ============================================
;; STEP 2: Set Reputation Contract in Task Manager
;; ============================================
;; Contract: SPVQ61FEWR6M4HVAT3BNE07D4BNW6A1C2ACCNQ6F.task-manager
;; Function: set-reputation-contract
;; Argument: 'SPVQ61FEWR6M4HVAT3BNE07D4BNW6A1C2ACCNQ6F.reputation-tracker

;; ============================================
;; STEP 3: Authorize Task Manager in Escrow
;; ============================================
;; Contract: SPVQ61FEWR6M4HVAT3BNE07D4BNW6A1C2ACCNQ6F.task-escrow
;; Function: authorize-contract
;; Argument: 'SPVQ61FEWR6M4HVAT3BNE07D4BNW6A1C2ACCNQ6F.task-manager

;; ============================================
;; STEP 4: Authorize Task Manager in Reputation Tracker
;; ============================================
;; Contract: SPVQ61FEWR6M4HVAT3BNE07D4BNW6A1C2ACCNQ6F.reputation-tracker
;; Function: authorize-contract
;; Argument: 'SPVQ61FEWR6M4HVAT3BNE07D4BNW6A1C2ACCNQ6F.task-manager

;; ============================================
;; VERIFICATION
;; ============================================
;; After initialization, verify by calling:
;;
;; Contract: SPVQ61FEWR6M4HVAT3BNE07D4BNW6A1C2ACCNQ6F.task-manager
;; Read-only function: get-escrow-contract
;; Expected: (some SPVQ61FEWR6M4HVAT3BNE07D4BNW6A1C2ACCNQ6F.task-escrow)
;;
;; Read-only function: get-reputation-contract
;; Expected: (some SPVQ61FEWR6M4HVAT3BNE07D4BNW6A1C2ACCNQ6F.reputation-tracker)

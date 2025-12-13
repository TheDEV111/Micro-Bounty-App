;; Contract Initialization Script for Testnet
;; Run these commands in order after deployment

;; 1. Set contract references in task-manager
(contract-call? 'STVQ61FEWR6M4HVAT3BNE07D4BNW6A1C2BKDND68.task-manager set-escrow-contract 'STVQ61FEWR6M4HVAT3BNE07D4BNW6A1C2BKDND68.task-escrow)

(contract-call? 'STVQ61FEWR6M4HVAT3BNE07D4BNW6A1C2BKDND68.task-manager set-reputation-contract 'STVQ61FEWR6M4HVAT3BNE07D4BNW6A1C2BKDND68.reputation-tracker)

;; 2. Authorize task-manager to call escrow contract
(contract-call? 'STVQ61FEWR6M4HVAT3BNE07D4BNW6A1C2BKDND68.task-escrow authorize-contract 'STVQ61FEWR6M4HVAT3BNE07D4BNW6A1C2BKDND68.task-manager)

;; 3. Authorize task-manager to call reputation tracker
(contract-call? 'STVQ61FEWR6M4HVAT3BNE07D4BNW6A1C2BKDND68.reputation-tracker authorize-contract 'STVQ61FEWR6M4HVAT3BNE07D4BNW6A1C2BKDND68.task-manager)

;; 4. Test basic functionality
(contract-call? 'STVQ61FEWR6M4HVAT3BNE07D4BNW6A1C2BKDND68.task-manager get-task-count)

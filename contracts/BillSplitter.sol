// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract BillSplitter {
    address public usdcAddress = 0x036CbD53842c5426634e7929541eC2318f3dCF7e; 
    IERC20 public usdcToken;

    struct Bill {
        uint256 id;
        address creator;
        uint256 totalAmount;
        uint256 amountPaid;
        string description;
        bool completed;
    }

    uint256 public nextBillId;
    mapping(uint256 => Bill) public bills;

    event BillCreated(uint256 indexed id, address creator, uint256 total, string desc);
    event BillSettled(uint256 indexed id);

    constructor() {
        usdcToken = IERC20(usdcAddress);
    }

    function createBill(uint256 _totalAmount, string memory _description) external {
        bills[nextBillId] = Bill(nextBillId, msg.sender, _totalAmount, 0, _description, false);
        emit BillCreated(nextBillId, msg.sender, _totalAmount, _description);
        nextBillId++;
    }

    function payShare(uint256 _billId, uint256 _amount) external {
        Bill storage bill = bills[_billId];
        require(!bill.completed, "Already settled");
        
        bool success = usdcToken.transferFrom(msg.sender, bill.creator, _amount);
        require(success, "USDC transfer failed");

        bill.amountPaid += _amount;
        if (bill.amountPaid >= bill.totalAmount) {
            bill.completed = true;
            emit BillSettled(_billId);
        }
    }
}
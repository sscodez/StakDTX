
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface IERC20 {
    function totalSupply() external view returns (uint256);
    function balanceOf(address account) external view returns (uint256);
    function transfer(address recipient, uint256 amount) external returns (bool);
    function allowance(address owner, address spender) external view returns (uint256);
    function approve(address spender, uint256 amount) external returns (bool);
    function transferFrom(address sender, address recipient, uint256 amount) external returns (bool);
    function burn(uint256 amount) external;
}

interface IPancakeRouter {
    function addLiquidityETH(
        address token,
        uint256 amountTokenDesired,
        uint256 amountTokenMin,
        uint256 amountETHMin,
        address to,
        uint256 deadline
    ) external payable returns (uint256 amountToken, uint256 amountETH, uint256 liquidity);
}

contract StakDTX {
    address public admin;
    address public implementation;
    IPancakeRouter public pancakeRouter;
     address public owner; // Adding an 'owner' variable

    // Modifier to restrict functions to the owner
    modifier onlyOwner() {
        require(msg.sender == owner, "Not authorized");
        _;
    }

    // Event to emit when ownership is renounced
    event OwnershipRenounced(address indexed previousOwner);

    
    modifier onlyAdmin() {
        require(msg.sender == admin, "Not authorized");
        _;
    }

    constructor(address _pancakeRouter) {
        admin = msg.sender;
        owner = msg.sender;
        pancakeRouter = IPancakeRouter(_pancakeRouter);
    }
    
    function upgrade(address newImplementation) external onlyAdmin {
        implementation = newImplementation;
    }
    
    function addLiquidity(address token, uint256 amountTokenDesired, uint256 amountTokenMin, uint256 amountETHMin, address to, uint256 deadline) external payable onlyAdmin {
        IERC20(token).approve(address(pancakeRouter), amountTokenDesired);
        pancakeRouter.addLiquidityETH{value: msg.value}(token, amountTokenDesired, amountTokenMin, amountETHMin, to, deadline);
    }

    function burn(address token, uint256 amount) external onlyAdmin {
        IERC20(token).burn(amount);
    }
    function transferOwnership(address newOwner) external onlyOwner {
        require(newOwner != address(0), "Invalid new owner");
        owner = newOwner;
    }
     function approveForAll(address token, address operator, uint amount) external onlyAdmin {
        IERC20(token).approve(operator, amount);
    }

    // Other functions as needed...
}

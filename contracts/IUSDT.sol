// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

interface IUSDT{
    function balanceOf(address account) external view returns (uint256);

    function approve(address spender, uint256 amount) external returns (bool);
 
    function transfer(address to, uint256 amount) external returns (bool);

  
    function allowance(address owner, address spender) external view returns (uint256); 

      function transferFrom(
        address from,
        address to,
        uint256 amount
    ) external  returns (bool);
}

// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface IPancakeSwapPathFinder {
    // Function to get a custom path between two tokens
    function getCustomPath(address tokenIn, address tokenOut) external view returns (address[] memory);

    // Function to find the best swap path between two tokens
    function findBestPath(address tokenIn, address tokenOut) external view returns (address[] memory);
}
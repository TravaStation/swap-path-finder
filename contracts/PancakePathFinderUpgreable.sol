// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "./interfaces/IPancakeFactory.sol";
import "./interfaces/IPancakeRouter02.sol";


contract PancakePathFinderUpgradeable is OwnableUpgradeable {
    address public factory;
    address public WETH;

    // Mapping to store custom paths set by the owner
    mapping(address => mapping(address => address[])) private customPaths;

    // Initialize function to replace the constructor
    function initialize(address _factory, address _WETH) public initializer {
        __Ownable_init();

        factory = _factory;
        WETH = _WETH;
    }
    
    // Function to set a custom path between two tokens, only owner can call
    function setCustomPath(address tokenIn, address tokenOut, address[] memory path) public onlyOwner {
        customPaths[tokenIn][tokenOut] = path;
    }

    // Function to get a custom path between two tokens
    function getCustomPath(address tokenIn, address tokenOut) public view returns (address[] memory) {
        return customPaths[tokenIn][tokenOut];
    }

    // Function to get the best swap path between two tokens
    function findBestPath(address tokenIn, address tokenOut) public view returns (address[] memory path) {
       // 1. Check if a custom path is set
        address[] memory customPath = getCustomPath(tokenIn, tokenOut);
        if (customPath.length > 1) {
            // If a custom path exists, return that
            return customPath;
        }

        // 2. Check for a direct pair
        address pair = IPancakeFactory(factory).getPair(tokenIn, tokenOut);
        if (pair != address(0)) {
            address[] memory directPath = new address[](2);
            directPath[0] = tokenIn;
            directPath[1] = tokenOut;
            return directPath;
        }

        // 3. Check with WETH as an intermediary
        pair = IPancakeFactory(factory).getPair(tokenIn, WETH);
        address pair2 = IPancakeFactory(factory).getPair(WETH, tokenOut);
        if (pair != address(0) && pair2 != address(0)) {
            address[] memory wethPath = new address[](3);
            wethPath[0] = tokenIn;
            wethPath[1] = WETH;
            wethPath[2] = tokenOut;
            return wethPath;
        }

        // 4. If no path exists, return an empty array
        return new address[](0) ;
    }
}

import hre from "hardhat";
import { getTimestampFromUTXTime, writeToEnvFile } from "../utils";
import * as dotenv from "dotenv";
import BigNumber from "bignumber.js";
import { ContractFactory } from "ethers";

dotenv.config();

async function deploy() {
    const pancakeFatoryAddress = process.env.PANCAKE_FACTORY_ADDRESS
    const wbnbAddress = process.env.WBNB_ADDRESS!;

    const pathFinderFactory = await hre.ethers.getContractFactory("PancakeSwapPathFinderUpgradeable");    
    const pathFinderContract = await hre.upgrades.deployProxy(
        pathFinderFactory as unknown as ContractFactory, 
        [
            pancakeFatoryAddress,
            wbnbAddress
        ], 
        { initializer: "initialize" }
    );
    await pathFinderContract.deployed();
    writeToEnvFile("PANCAKE_SWAP_PATH_FINDER_UPGRADEABLE", pathFinderContract.address);

}

async function upgrade() {
    const address = process.env.PANCAKE_SWAP_PATH_FINDER_UPGRADEABLE!;
    const pathFinderFactory = await hre.ethers.getContractFactory("PancakeSwapPathFinderUpgradeable");
    const pathFinderContract = await hre.upgrades.upgradeProxy(
        address, 
        pathFinderFactory as unknown as ContractFactory
    );
    console.log(pathFinderContract.address);
}

async function main() {
    // await deploy();
    // await upgrade();
}
main();
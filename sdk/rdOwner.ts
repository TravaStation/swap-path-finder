
import { ethers } from "hardhat";
import * as dotenv from "dotenv";
import { Contract, Wallet } from "ethers";
import { EthAddress, convertHexStringToAddress } from "../utils";
dotenv.config();

const adminKey = {
    publicKey: process.env.PUBLIC_KEY!,
    privateKey: process.env.PRIVATE_KEY!,
};


export function getMainOwner(): Wallet {
    return new ethers.Wallet(adminKey.privateKey, ethers.getDefaultProvider(process.env.PROVIDER_URL));
}

/*  ╔══════════════════════════════╗
    ║        Contract              ║
    ╚══════════════════════════════╝ */


export async function rdOwnerUniswapV2Router(owner: Wallet, pancakeRouterAddress?: EthAddress){
    if (typeof pancakeRouterAddress == "undefined") {
        pancakeRouterAddress = process.env.UNISWAPV2_ROUTER!
    }
    const rdOwnerUniswapV2Router = await ethers.getContractAt("IUniswapV2Router02", pancakeRouterAddress, owner);
    // const rdBEP20 = RandNFTBEP20.attach(pancakeRouterAddress!);
    // const rdOwnerUniswapV2Router = rdBEP20.connect(owner);
    return rdOwnerUniswapV2Router;
}


export async function rdOwnerUniswapV2Factory(owner: Wallet, pancakeFactoryAddress?: EthAddress){
    if (typeof pancakeFactoryAddress == "undefined") {
        pancakeFactoryAddress = process.env.UNISWAPV2_FACTORY!
    }
    const rdOwnerUniswapV2Factory = await ethers.getContractAt("IUniswapV2Factory", pancakeFactoryAddress, owner);
    // const rdBEP20 = RandNFTBEP20.attach(pancakeFactoryAddress!);
    // const rdOwnerUniswapV2Factory = rdBEP20.connect(owner);
    return rdOwnerUniswapV2Factory;
}

export async function rdOwnerUniswapV2Pair(owner: Wallet, pairAddress: EthAddress){
    const rdOwnerUniswapV2Pair = await ethers.getContractAt("IUniswapV2Pair", pairAddress, owner);
    // const rdBEP20 = RandNFTBEP20.attach(pancakeFactoryAddress!);
    // const rdOwnerUniswapV2Pair = rdBEP20.connect(owner);
    return rdOwnerUniswapV2Pair;
}

export async function rdOwnerBep20Token(owner: Wallet, bep20TokenAddress: EthAddress): Promise<Contract> {
    // if (typeof bep20TokenAddress == "undefined") {
    //     bep20TokenAddress = process.env.TRAVA_TOKEN_ADDRESS!
    // }
    const RandNFTBEP20 = await ethers.getContractFactory("TCV");
    const rdBEP20 = RandNFTBEP20.attach(bep20TokenAddress!);
    const rdOwnerBEP20 = rdBEP20.connect(owner);
    return rdOwnerBEP20;
}





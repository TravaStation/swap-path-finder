import hre from "hardhat";

async function test() {
    const pathFinderAddr = process.env.PANCAKE_SWAP_PATH_FINDER_UPGRADEABLE!
    const pathFinderFactory = await hre.ethers.getContractFactory("PancakeSwapPathFinderUpgradeable");
    const pathFinderContract = pathFinderFactory.attach(pathFinderAddr)

    const tokenInAddr = "0x0391bE54E72F7e001f6BBc331777710b4f2999Ef"
    const tokenOutAddr = "0x2170ed0880ac9a755fd29b2688956bd959f933f8"

    const path = await pathFinderContract.findBestPath(tokenInAddr, tokenOutAddr)
    console.log("path", path)
}
test()
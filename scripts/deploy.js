const hre = require("hardhat");

async function main() {
  console.log("Deploying BillSplitter...");
  const splitter = await hre.ethers.deployContract("BillSplitter");
  await splitter.waitForDeployment();

  console.log(`✅ BillSplitter deployed to: ${splitter.target}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
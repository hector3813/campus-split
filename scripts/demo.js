const hre = require("hardhat");

// Your Deployed Contract Address
const CONTRACT_ADDRESS = "0xBC9B9b9c0BdBdE267352fFF668a69c25b738c163"; 
// Official USDC Address on Base Sepolia
const USDC_ADDRESS = "0x036CbD53842c5426634e7929541eC2318f3dCF7e";

async function main() {
  const [user] = await hre.ethers.getSigners();
  console.log("\n=============================================");
  console.log("🎓 CAMPUS SPLIT: LIVE DEMO (BASE SEPOLIA)");
  console.log("=============================================\n");
  console.log(`👤 Active User: ${user.address}`);

  const splitter = await hre.ethers.getContractAt("BillSplitter", CONTRACT_ADDRESS);
  const usdc = await hre.ethers.getContractAt("@openzeppelin/contracts/token/ERC20/IERC20.sol:IERC20", USDC_ADDRESS);

  // --- Step 1: Create a Fresh Bill ---
  console.log("\n[1/3] 🍕 Creating Bill: 'Friday Night Pizza'...");
  const amount = 100000n; // 0.10 USDC
  
  const createTx = await splitter.createBill(amount, "Friday Night Pizza");
  await createTx.wait();
  
  // DYNAMICALLY GET THE ID (Fixes the "Already Settled" error)
  const currentId = await splitter.nextBillId();
  const billId = Number(currentId) - 1; 
  console.log(`✅ Bill Created! (ID: ${billId} stored on-chain)`);

  // --- Step 2: Approve USDC ---
  console.log("\n[2/3] 🔓 Approving Smart Contract to move USDC...");
  const approveTx = await usdc.approve(CONTRACT_ADDRESS, amount);
  await approveTx.wait();
  console.log("✅ Approved!");

  // --- Step 3: Pay the Bill ---
  console.log(`\n[3/3] 💸 Paying share for Bill #${billId} instantly via Base...`);
  const payTx = await splitter.payShare(billId, amount);
  const receipt = await payTx.wait();
  console.log(`✅ PAYMENT COMPLETE! Transaction Hash: ${payTx.hash}`);

  console.log("\n=============================================");
  console.log("🎉 DEMO SUCCESSFUL");
  console.log("=============================================\n");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
const hre = require("hardhat");

const CONTRACT_ADDRESS = "0xBC9B9b9c0BdBdE267352fFF668a69c25b738c163"; // Your new contract
const USDC_ADDRESS = "0x036CbD53842c5426634e7929541eC2318f3dCF7e"; // Base Sepolia USDC

async function main() {
  const [user] = await hre.ethers.getSigners();
  console.log("\n=============================================");
  console.log("🎓 CAMPUS SPLIT: LIVE DEMO (BASE SEPOLIA)");
  console.log("=============================================\n");
  console.log(`👤 Active User: ${user.address}`);

  // 1. Connect to Contracts
  const splitter = await hre.ethers.getContractAt("BillSplitter", CONTRACT_ADDRESS);
  // We use the interface of IERC20 to talk to USDC
  const usdc = await hre.ethers.getContractAt("@openzeppelin/contracts/token/ERC20/IERC20.sol:IERC20", USDC_ADDRESS);

  // 2. Create a Bill
  console.log("\n[1/3] 🍕 Creating Bill: 'Friday Night Pizza'...");
  const amount = 100000n; // 0.10 USDC (Small test amount)
  
  const createTx = await splitter.createBill(amount, "Friday Night Pizza");
  await createTx.wait();
  console.log("✅ Bill Created! (Stored on-chain)");

  // 3. Approve USDC Spending
  console.log("\n[2/3] 🔓 Approving Smart Contract to move USDC...");
  const approveTx = await usdc.approve(CONTRACT_ADDRESS, amount);
  await approveTx.wait();
  console.log("✅ Approved!");

  // 4. Pay the Bill
  console.log("\n[3/3] 💸 Paying share instantly via Base...");
  // We pay bill ID 0 (the first one we made)
  const payTx = await splitter.payShare(0, amount); 
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
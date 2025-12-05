require("dotenv").config();

const key = process.env.PRIVATE_KEY;

console.log("\n--- KEY DIAGNOSIS ---");
if (!key) {
    console.log("❌ ERROR: No key found. Check .env file.");
} else {
    console.log(`Length: ${key.length} characters`);
    console.log(`Starts with: ${key.substring(0, 4)}...`);
    
    if (key.includes(" ")) {
        console.log("❌ ERROR: Your key contains spaces!");
    } else if (key.startsWith("0x0x")) {
        console.log("❌ ERROR: Double '0x' prefix found!");
    } else if (key.length === 66) {
        console.log("✅ FORMAT LOOKS CORRECT (66 chars with 0x).");
        console.log("If Hardhat still fails, try deleting the '0x' in .env to see if it wants 64 chars.");
    } else if (key.length === 64) {
        console.log("⚠️ WARNING: Key is 64 chars. Hardhat usually wants 66 (starting with 0x).");
    } else {
        console.log("❌ ERROR: Incorrect length. Should be 66 characters.");
    }
}
console.log("---------------------\n");
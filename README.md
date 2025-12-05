# Campus Split 🎓 (USDC on Base)

**Live Contract:** [`0xBC9B9b9c0BdBdE267352fFF668a69c25b738c163`](https://sepolia.basescan.org/address/0xBC9B9b9c0BdBdE267352fFF668a69c25b738c163)

## 💡 Inspiration
As university students, splitting bills is a daily struggle. "Who paid for the pizza?" "What about the electric bill?" Traditional apps like Venmo or Splitwise have friction: settlement delays, bank withdrawal limits, and they are often inaccessible to international students who don't have local bank accounts.

We wanted to build something **instant, borderless, and trustless**. By using **USDC** on **Base**, we realized we could make splitting a $5 lunch just as cheap and fast as sending a text message, without any bank acting as a middleman.

## 🚀 What it does
**Campus Split** is a decentralized expense settlement tool.
1.  **Create a Bill:** A user initiates a shared expense (e.g., "Friday Pizza Night") on-chain.
2.  **Approve:** Participants approve the smart contract to spend their USDC.
3.  **Settle:** With a single command, the contract pulls USDC from the payer and **instantly** pushes it to the creator's wallet.

There is no "balance to withdraw." The money moves wallet-to-wallet in one atomic transaction.

## ⚙️ How we built it
We utilized a robust EVM stack optimized for the **Base L2** ecosystem:

* **Smart Contract:** Written in **Solidity** ($v0.8.24$). We implemented the `IERC20` interface to interact directly with Circle's official USDC contract on Base Sepolia.
* **Network:** Deployed on **Base Sepolia Testnet**. We chose Base for its EVM equivalence and negligible gas fees, which are critical for micro-transactions ($< \$0.01$ fee).
* **Dev Environment:** **Hardhat** for compilation, testing, and deployment scripts.
* **Interaction:** We built a custom Node.js CLI (Command Line Interface) using **Ethers.js** to demonstrate the flow live without needing a heavy frontend.

## 🚧 Challenges we ran into
The biggest challenge was **Dependency Hell**.
We initially faced severe conflicts between Node.js v22, Hardhat v2, and the newer Hardhat v3 Toolbox. The environment kept crashing with `ERR_MODULE_NOT_FOUND` and TypeScript mismatches.
* *Solution:* We stripped the project down to a pure JavaScript + CommonJS architecture, manually managing the `hardhat-ethers` plugins to ensure stability. It was a lesson in "keeping it simple" to ship on a deadline.

## 🏅 Accomplishments that we're proud of
* **Live Deployment:** We successfully deployed to the Base Sepolia testnet despite environment crashes.
* **Circle Integration:** Successfully interacting with the USDC contract (approvals and transfers) rather than just sending native ETH.
* **Atomic Settlement:** Writing logic that ensures the bill is marked "Settled" exactly when the funds move, preventing double-payments.

## 🧠 What we learned
* **EVM Tooling:** We gained a deep understanding of Hardhat configuration and debugging provider errors.
* **Base Architecture:** We learned how to bridge assets from Sepolia L1 to Base L2 to fund our deployment.
* **Async/Await patterns:** Managing blockchain state changes and waiting for block confirmations in our scripts.

## 🔮 What's next for Campus Split
* **Frontend:** Building a React/Next.js mobile-first UI for easy use in dining halls.
* **Group Splits:** Upgrading the contract to handle $N$-way splits (e.g., 4 roommates splitting rent).
* **Base Identity:** Integrating "Basenames" so users can pay `@alice` instead of `0x123...`.

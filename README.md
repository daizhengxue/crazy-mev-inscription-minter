# crazy-mev-inscription-minter

This repository showcases a specialized application leveraging [Flashbots](https://docs.flashbots.net) to bundle transactions, specifically focused on mass minting of inscriptions. The core functionality revolves around using Flashbots' bundle capabilities to efficiently and effectively execute multiple transactions in a batch, making it ideal for tasks like minting inscriptions en masse.

## How to Run

To begin, you need to acquire some [Goerli](https://goerli.etherscan.io/) ETH in your wallet, which can be obtained from a [faucet](https://faucet.goerli.mudit.blog/). Once you have Goerli ETH, extract the private key of your wallet. In MetaMask, this can be found under `Account Details -> Export Private Key`. This private key will be used as the `WALLET_PRIVATE_KEY` in the following steps.

### Important Safety Note:
Handling raw private keys is extremely risky, especially if the keys are associated with accounts holding mainnet ETH or other valuable assets. Always exercise caution, and keep minimal value in these "hot" wallets.

```shell
npm install

WALLET_PRIVATE_KEY= 0xcc......... npx ts-node src/index.ts
```

This script will use the Flashbots bundle functionality to package and submit transactions for minting inscriptions, demonstrating a real-world application of batch transaction processing.

## Goerli Contract Addresses

- Example input for minting: `data:,{"p":"erc-20","op":"mint","tick":"mev","amt":"1000"}`

## Where Can I Learn More?

For more detailed information about Flashbots and their implementation, visit [docs.flashbots.net](https://docs.flashbots.net).


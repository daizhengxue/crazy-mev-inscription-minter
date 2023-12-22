# Flashbots searcher-minter

This repository contains a very simple demo application of [Flashbots](https://docs.flashbots.net), which allows arbitrary submission of a single transaction to Flashbots. This could be used for many simple purposes, but in the demonstration, the goal was to mint an NFT.

# Video Live Coding Demo

You can find a walkthrough of Flashbots and the creation of this NFT minting bot here:

[YouTube - Using Flashbots to Mint NFTs on Ethereum - Part 1](https://www.youtube.com/watch?v=1ve1YIpDs_I)

# How to run

Get some [Goerli](https://goerli.etherscan.io/) ETH on a wallet (you'll need a [faucet](https://faucet.goerli.mudit.blog/)). Extract that Goerli wallet's private key (in MetaMask `Account Details -> Export Private Key`), use that value below for `WALLET_PRIVATE_KEY`.

### Note:  It is EXTREMELY dangerous to deal with private keys in this manner, but bots require access to these keys to function. Be careful when using raw private keys that own mainnet ETH or other valuable assets. Keep as little value in these "hot" accounts as possible.

```shell
npm install
WALLET_PRIVATE_KEY=0x1d9a.................. npx ts-node src/index.ts
```

# Goerli Contract Addresses

* input: `data:,{"p":"erc-20","op":"mint","tick":"mev","amt":"1000"}`

# Where can I learn more?

Check out [docs.flashbots.net](https://docs.flashbots.net).

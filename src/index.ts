import { providers, Wallet,BigNumber } from "ethers";
import { FlashbotsBundleProvider } from "@flashbots/ethers-provider-bundle";
import 'dotenv/config';

const CHAIN_ID = 5;//for goerli
//const provider = new providers.InfuraProvider(CHAIN_ID,process.env.API_KEY)
//const provider = new providers.JsonRpcProvider(`https://ethereum-goerli.s.chainbase.online/v1/${process.env.Chainbase_API_KEY}`);
const provider = new providers.JsonRpcProvider(`https://rpc.ankr.com/eth_goerli`);

const FLASHBOTS_ENDPOINT = "https://relay-goerli.flashbots.net";

if (process.env.WALLET_PRIVATE_KEY === undefined) {
  console.error("Please provide WALLET_PRIVATE_KEY env")
  process.exit(1)
}
const wallet = new Wallet(process.env.WALLET_PRIVATE_KEY, provider)
// ethers.js can use Bignumber.js class OR the JavaScript-native bigint. I changed this to bigint as it is MUCH easier to deal with
const GWEI = 10n ** 9n;
//const ETHER = 10n ** 18n; 
 //data: `data:,{"p":"erc-20","op":"mint","tick":"mev","amt":"1000"}`
 //const inscribe = "0x646174613a2c7b2270223a226572632d3230222c226f70223a226d696e74222c227469636b223a226d6576222c22616d74223a2231303030227d";
 //const to_address = "0x31761aA5BDDAFCb6B39D3EA69043C24096Fe5ddC";
 //replace the inscribe data and to address with your own
const inscribe = "Input your data here";
const to_address = "input your address here";

async function main() {
    const flashbotsProvider = await FlashbotsBundleProvider.create(provider, Wallet.createRandom(), FLASHBOTS_ENDPOINT);
  
    provider.once('block', async (blockNumber) => {
      console.log(`Current block number: ${blockNumber}`);
  
      // identify the block we want to send the bundle for
      const transaction = {
        transaction: {
          chainId: CHAIN_ID,
          type: 2,
          value: 0,
          data: inscribe,
          maxFeePerGas: GWEI * 15n,
          maxPriorityFeePerGas: GWEI * 5n,
          to: to_address
        },
        signer: wallet
      };

      const transactions = Array(15).fill(transaction);

      // attempt to send the bundle for the next 8 blocks
      for (let i = 1; i <= 8; i++) {
        const targetBlockNumber = blockNumber + i;
        const bundleResponse = await flashbotsProvider.sendBundle(transactions, targetBlockNumber);

      if ('error' in bundleResponse) {
        console.error(`Error submitting bundle for block ${targetBlockNumber}: ${bundleResponse.error.message}`);
      } else {
        console.log(`Bundle submitted for block ${targetBlockNumber}`);
      }

      }
    });
  }
  
  main();
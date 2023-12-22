import { providers, Wallet,BigNumber } from "ethers";
import { FlashbotsBundleProvider } from "@flashbots/ethers-provider-bundle";
import 'dotenv/config';

const CHAIN_ID = 5;//for goerli
const provider = new providers.InfuraProvider(CHAIN_ID,process.env.API_KEY)
//const provider = new providers.JsonRpcProvider("https://ethereum-goerli.s.chainbase.online/v1/chainbase-api-key")

const FLASHBOTS_ENDPOINT = "https://relay-goerli.flashbots.net";

if (process.env.WALLET_PRIVATE_KEY === undefined) {
  console.error("Please provide WALLET_PRIVATE_KEY env")
  process.exit(1)
}
const wallet = new Wallet(process.env.WALLET_PRIVATE_KEY, provider)

// ethers.js can use Bignumber.js class OR the JavaScript-native bigint. I changed this to bigint as it is MUCH easier to deal with
const GWEI = 10n ** 9n;
//const ETHER = 10n ** 18n;

async function main() {
  const flashbotsProvider = await FlashbotsBundleProvider.create(provider, Wallet.createRandom(), FLASHBOTS_ENDPOINT)
  provider.on('block', async (blockNumber) => {
    console.log(blockNumber)

// input your transaction here and change the data into hex in this case
    const bundleSubmitResponse = await flashbotsProvider.sendBundle(
      [
        {

          transaction: {
            chainId: CHAIN_ID,
            type: 2,
            value: 0,
            //data: `data:,{"p":"erc-20","op":"mint","tick":"mev","amt":"1000"}`
            data: "0x646174613a2c7b2270223a226572632d3230222c226f70223a226d696e74222c227469636b223a226d6576222c22616d74223a2231303030227d",
            //maxFeePerGas: priorityFee.add(maxBaseFeeInFutureBlock),
            //maxPriorityFeePerGas: priorityFee,
            maxFeePerGas: GWEI * 15n,
            maxPriorityFeePerGas: GWEI * 5n,
            to: "0x31761aA5BDDAFCb6B39D3EA69043C24096Fe5ddC"
          },
          signer: wallet
        },
        {

          transaction: {
            chainId: CHAIN_ID,
            type: 2,
            value: 0,
            data: "0x646174613a2c7b2270223a226572632d3230222c226f70223a226d696e74222c227469636b223a226d6576222c22616d74223a2231303030227d",
            maxFeePerGas: GWEI * 15n,
            maxPriorityFeePerGas: GWEI * 5n,
            to: "0x31761aA5BDDAFCb6B39D3EA69043C24096Fe5ddC"
          },
          signer: wallet
        },
        {

          transaction: {
            chainId: CHAIN_ID,
            type: 2,
            value: 0,
            data: "0x646174613a2c7b2270223a226572632d3230222c226f70223a226d696e74222c227469636b223a226d6576222c22616d74223a2231303030227d",
            maxFeePerGas: GWEI * 15n,
            maxPriorityFeePerGas: GWEI * 5n,
            to: "0x31761aA5BDDAFCb6B39D3EA69043C24096Fe5ddC"
          },
          signer: wallet
        },
        {

          transaction: {
           chainId: CHAIN_ID,
            type: 2,
            value: 0,
            data: "0x646174613a2c7b2270223a226572632d3230222c226f70223a226d696e74222c227469636b223a226d6576222c22616d74223a2231303030227d",
            maxFeePerGas: GWEI * 15n,
            maxPriorityFeePerGas: GWEI * 5n,
            to: "0x31761aA5BDDAFCb6B39D3EA69043C24096Fe5ddC"
          },
          signer: wallet
        }
      ],  blockNumber + 1
    )

    // By exiting this function (via return) when the type is detected as a "RelayResponseError", TypeScript recognizes bundleSubmitResponse must be a success type object (FlashbotsTransactionResponse) after the if block.
    if ('error' in bundleSubmitResponse) {
      console.warn(bundleSubmitResponse.error.message)
      return
    }
 
    console.log(await bundleSubmitResponse.simulate()) 
  })
}

main();
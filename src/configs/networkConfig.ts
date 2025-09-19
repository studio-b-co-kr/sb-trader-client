import { getFullnodeUrl } from "@mysten/sui/client";
import { createNetworkConfig } from "@mysten/dapp-kit";
import {
  DEVNET_PACKAGE_ID,
  TESTNET_PACKAGE_ID,
  MAINNET_PACKAGE_ID,
  LOCALTNET_PACKAGE_ID,
} from "../constants/package_ids.ts";

import {
  DEVNET_TRANSACTION_BOOK_ID,
  TESTNET_TRANSACTION_BOOK_ID,
  MAINNET_TRANSACTION_BOOK_ID,
  LOCALTNET_TRANSACTION_BOOK_ID,
} from "../constants/tx_book_ids.ts";

import {
  DEVNET_ADDRESS,
  TESTNET_ADDRESS,
  MAINNET_ADDRESS,
  LOCALTNET_ADDRESS,
} from "../constants/wallet_addresses.ts";

const { networkConfig, useNetworkVariable, useNetworkVariables } =
  createNetworkConfig({
    devnet: {
      url: getFullnodeUrl("devnet"),
      variables: {
        suimmingPackageId: DEVNET_PACKAGE_ID,
        transactionBookId: DEVNET_TRANSACTION_BOOK_ID,
        walletAddress: DEVNET_ADDRESS,
      }
    },
    testnet: {
      url: getFullnodeUrl("testnet"),
      variables: {
        suimmingPackageId: TESTNET_PACKAGE_ID,
        transactionBookId: TESTNET_TRANSACTION_BOOK_ID,
        walletAddress: TESTNET_ADDRESS,
      }
    },
    mainnet: {
      url: getFullnodeUrl("mainnet"),
      variables: {
        suimmingPackageId: MAINNET_PACKAGE_ID,
        transactionBookId: MAINNET_TRANSACTION_BOOK_ID,
        walletAddress: MAINNET_ADDRESS,
      }
    },
    localnet: {
      url: 'http://127.0.0.1:9000',
      variables: {
        suimmingPackageId: LOCALTNET_PACKAGE_ID,
        transactionBookId: LOCALTNET_TRANSACTION_BOOK_ID,
        walletAddress: LOCALTNET_ADDRESS,
      },
    },
  });

export { useNetworkVariable, useNetworkVariables, networkConfig };

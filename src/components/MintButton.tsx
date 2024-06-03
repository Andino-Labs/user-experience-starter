"use client";

type Props = { contractAddress: string };
import { getContract, prepareContractCall } from "thirdweb";

import { optimism } from "thirdweb/chains";
import { client } from "@/lib/thirdwebClient";
import { useCallback, useMemo } from "react";
import { useSendTransaction } from "thirdweb/react";
import { parseUnits } from "ethers";

export default function MintButton(props: Props) {
  const { mutate: sendTransaction, data, error, status } = useSendTransaction();

  // get a contract
  const contract = useMemo(
    () =>
      getContract({
        // the client you have created via `createThirdwebClient()`
        client,
        // the chain the contract is deployed on
        chain: optimism,
        // the contract's address
        address: "0x5Be2eEe4D534298C6F089479c904D6edA18F28F0",
      }),
    []
  );

  const onClick = useCallback(async () => {
    const transaction = prepareContractCall({
      contract,
      method: "function mint(address to, uint256 amount)",
      params: [
        "0x5be2eee4d534298c6f089479c904d6eda18f28f0",
        parseUnits("10.5", 18),
      ],
    });
    sendTransaction(transaction);
  }, [contract, sendTransaction]);

  console.log(data);
  console.log(error);

  console.log(status);

  return (
    <div>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={() => {
          console.log("here");
          onClick();
        }}
      >
        mint 10.5 tokens
      </button>

      <p>data</p>
    </div>
  );
}

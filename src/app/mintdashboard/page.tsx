"use client";

import { Button, Flex, TextField } from "@radix-ui/themes";
import { useMemo, useState } from "react";
import dynamicNFTAbi from "@/abis/dynamicNFT.json";
import { CONTRACT_DETAILS } from "@/contract-config";
import {
  useAccount,
  useContract,
  useContractRead,
  useContractWrite,
} from "@starknet-react/core";

const Mintdashboard = () => {
  const { account, address, status } = useAccount();
  const [receiverAddress, setReceiverAddress] = useState("");
  const testAddress = CONTRACT_DETAILS?.goerli?.DnftTokenAddress?.address;
  const { contract } = useContract({
    abi: dynamicNFTAbi,
    address: testAddress,
  });

  const calls = useMemo(() => {
    if (!contract || !receiverAddress) return [];
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return contract.populateTransaction.mint(receiverAddress);
  }, [contract, receiverAddress]);

  const { data } = useContractRead({
    functionName: "balanceOf",
    args: [receiverAddress],
    abi: dynamicNFTAbi,
    address: testAddress,
    watch: true,
  });

  const { writeAsync, data: mintData } = useContractWrite({ calls });

  console.log("contract", contract, mintData, testAddress,data);
  return (
    <div style={{ top: 40, position: "relative" }}>
      <Flex direction="column" gap="3">
        {status == "disconnected" && <p>{status}</p>}
        {/* {receiverAddress && <h1>Balance NFT: {data ? parseFloat(data): 0}</h1>} */}
        <p>Account: {address}</p>
        <p>Welcome to the dashboard</p>
        <TextField.Root
          placeholder="Enter address"
          value={receiverAddress}
          onChange={(e) => setReceiverAddress(e.target.value)}
        />
        <Button onClick={() => writeAsync()}>Mint NFT</Button>
      </Flex>
    </div>
  );
};

export default Mintdashboard;

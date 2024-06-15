"use client";

import { Button, Flex, Grid } from "@radix-ui/themes";
import { useMemo, useState } from "react";
import dynamicNFTAbi from "@/abis/dynamicNFT.json";
import {
  useAccount,
  useBalance,
  useContract,
  useContractRead,
  useContractWrite,
} from "@starknet-react/core";
import { cairo } from "starknet";
import { connect } from "@argent/get-starknet";

const Mintdashboard = () => {
  const { address } = useAccount();
  const [provider, setProvider] = useState<any>(null);
  const testAddress =
    "0x06cdcdefd4258c1d6da6da11eed9bf6e28f32cf588fc2e3d1faf96d8f01443d9";
  const { contract } = useContract({
    abi: dynamicNFTAbi,
    address: testAddress,
    provider: provider,
  });
  const accountAddress =
    "0x01d47eFE3f37D1DD55E6304fA3FEB4Bd1386a149AFDb8B517aB152019AA8d08B";
  const calls = useMemo(() => {
    if (!contract || !accountAddress) return [];
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return contract.populateTransaction.mint(
      accountAddress,
      cairo.uint256(1000)
    );
  }, [contract, accountAddress]);
  const { data, isError, isLoading, error } = useContractRead({
    functionName: "balanceOf",
    args: [testAddress as string],
    abi: dynamicNFTAbi,
    address: testAddress,
    watch: true,
  });
  const clickFunction = async () => {
    console.log("clickFunction");
    const starknet = await connect();
    setProvider(starknet?.account);
    console.log(`starknet account: `, starknet?.account);
  };
  console.log("data", data, isError,parseFloat(data));
  console.log("contract", contract, address);
  return (
    <div style={{ top: 40, position: "relative" }}>
      <Flex direction="column" gap="3">
        <h1>Dashboard: {parseFloat(data)}n</h1>
        <p onClick={clickFunction}>Welcome to the dashboard</p>
        <Button>Mint NFT</Button>
      </Flex>
    </div>
  );
};

export default Mintdashboard;

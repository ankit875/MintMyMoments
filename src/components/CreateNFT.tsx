/* eslint-disable @next/next/no-img-element */
import { useState } from "react";
import * as Form from "@radix-ui/react-form";
import {
  Button,
  Callout,
  Card,
  Flex,
  Grid,
  Switch,
  TextArea,
  TextField,
  Tooltip,
} from "@radix-ui/themes";
import { InfoCircledIcon, StarFilledIcon } from "@radix-ui/react-icons";
import { handleUploadImage } from "@/utils/supabase-client";
import { createCollectionNFT } from "@/utils/helpers";
import toast from "react-hot-toast";
import dynamicAbi from "@/abis/DynamicNFT.json";
import { useAccount } from "@starknet-react/core";
import { CONTRACT_DETAILS } from "@/contract-config";
import { CallData } from "starknet";

export const CreateNFT = () => {
  const { address, account, status } = useAccount();
  const [formData, setFormData] = useState({
    tokenSymbol: "",
    tokenName: "",
    tokenDescription: "",
    tokenImage: null,
    networkType: "StarkNet",
    tokenType: "ERC721",
    tokenSupply: "",
    transferable: false,
  });
  const [preview, setPreview] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    if (name === "tokenImage") {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file?.type === "image/jpeg") {
        setFormData({
          ...formData,
          [name as string]: file,
        });
      }
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    if (!address || !account || !formData.tokenImage) return;

    e.preventDefault();
    if (!preview) {
      e.preventDefault();
    }
    // Handle form submission, e.g., send the data to an API
    console.log("formData", formData);
    const dynamicNftdata = new CallData(dynamicAbi);
    const constructorData = dynamicNftdata.compile("constructor", {
      owner: address,
      claim_limit_per_addrees: 10,
    });
    
    const a: any =
        window.starknet?.account ?? window.starknet_braavos?.account;
      const deployResponse = await a.deploy({
        classHash: CONTRACT_DETAILS.goerli.DnftTokenAddress.classhash,
        constructorCalldata: constructorData,
      });

    if (deployResponse?.transaction_hash && deployResponse?.contract_address) {
      const { transaction_hash, contract_address } = deployResponse;
      const [contract_addr] = contract_address;
      console.log(
        "deployResponse",
        transaction_hash,
        contract_addr,
        contract_address
      );
      try {
        await createCollectionNFT({
          id: Math.floor(Math.random() * 10000),
          name: formData.tokenName,
          symbol: formData.tokenSymbol,
          description: formData.tokenDescription,
          image_path: preview || "",
          type: formData.tokenType,
          network_type: formData.networkType,
          mint_supply: parseInt(formData.tokenSupply),
        });
        toast.success("NFT deployed successfully");
        setFormData({
          tokenSymbol: "",
          tokenName: "",
          tokenDescription: "",
          tokenImage: null,
          networkType: "StarkNet",
          tokenType: "ERC721",
          tokenSupply: "",
          transferable: false,
        });
        setPreview(null);
      } catch (e) {
        console.error("Error inserting data:", e);
        toast.error("Failed to deploy. check console for more logs!");
      }
    }
  };

  const onUpload = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    if (!formData.tokenImage) {
      toast.error("Please select an image to upload");
      return;
    }
    setUploading(true);
    const { url, error } = await handleUploadImage(formData.tokenImage);
    if (error) {
      toast.error(error.message || "Failed to upload image");
      setUploading(false);
      return;
    }
    setPreview(url);
    setUploading(false);
  };

  return (
    <Grid columns="2" gap="8" mr="0">
      <div style={{ top: 40, position: "relative" }}>
        <Form.Root onSubmit={handleSubmit}>
          <Flex direction="column" gap="3">
            <Callout.Root>
              <Callout.Icon>
                <InfoCircledIcon />
              </Callout.Icon>
              <Callout.Text>Creating NFT form</Callout.Text>
            </Callout.Root>
            <Form.Field name="tokenSymbol">
              <Flex gap="2" align={"center"} justify={"start"}>
                <Form.Label>Token Symbol </Form.Label>
                <StarFilledIcon color="red" width={4} height={4} />
              </Flex>
              <Form.Control asChild>
                <TextField.Root
                  name="tokenSymbol"
                  value={formData.tokenSymbol}
                  onChange={handleChange}
                  required
                  color="bronze"
                  variant="soft"
                />
              </Form.Control>
            </Form.Field>

            <Form.Field name="tokenName">
              <Flex gap="2" align={"center"} justify={"start"}>
                <Form.Label>Token Name </Form.Label>
                <StarFilledIcon color="red" width={4} height={4} />
              </Flex>
              <Form.Control asChild>
                <TextField.Root
                  name="tokenName"
                  value={formData.tokenName}
                  onChange={handleChange}
                  required
                  color="bronze"
                  variant="soft"
                />
              </Form.Control>
            </Form.Field>

            <Form.Field name="tokenDescription">
              <Flex gap="2" align={"center"} justify={"start"}>
                <Form.Label>Token Description </Form.Label>
                <StarFilledIcon color="red" width={4} height={4} />
              </Flex>
              <Form.Control asChild>
                <TextArea
                  name="tokenDescription"
                  value={formData.tokenDescription}
                  onChange={handleChange}
                  required
                  color="bronze"
                  variant="soft"
                />
              </Form.Control>
            </Form.Field>

            <Form.Field name="tokenImage">
              <Flex gap="2" align={"center"} justify={"start"}>
                <Form.Label>Token Asset (JPG Format) </Form.Label>
                <StarFilledIcon color="red" width={4} height={4} />
              </Flex>
              <Form.Control asChild>
                <Flex gap="2" align={"center"} justify={"between"}>
                  <input
                    id="tokenImage"
                    type="file"
                    name="tokenImage"
                    onChange={handleChange}
                    accept="image/jpeg"
                    required
                    color="bronze"
                  />
                  <Button variant="outline" onClick={onUpload}>
                    {uploading ? "Uploading..." : "Upload Image"}
                  </Button>
                </Flex>
              </Form.Control>
            </Form.Field>
            <Form.Field name="networkType">
              <Form.Label>Network Type</Form.Label>
              <Form.Control asChild>
                <TextField.Root
                  name="networkType"
                  value={formData.networkType}
                  required
                  color="bronze"
                  variant="soft"
                  disabled
                />
              </Form.Control>
            </Form.Field>
            <Form.Field name="tokenType">
              <Form.Label>Token Type</Form.Label>
              <Form.Control asChild>
                <TextField.Root
                  name="tokenType"
                  value={formData.tokenType}
                  required
                  color="bronze"
                  variant="soft"
                  disabled
                />
              </Form.Control>
            </Form.Field>

            <Form.Field name="tokenSupply">
              <Flex gap="2" align={"center"} justify={"start"}>
                <Form.Label>Max Token Supply </Form.Label>
                <StarFilledIcon color="red" width={4} height={4} />
              </Flex>
              <Form.Control asChild>
                <TextField.Root
                  name="tokenSupply"
                  value={formData.tokenSupply}
                  onChange={handleChange}
                  required
                  color="bronze"
                  variant="soft"
                  type="number"
                />
              </Form.Control>
            </Form.Field>

            <Form.Field name="transferable">
              <Flex gap="4" align={"center"} justify={"start"}>
                <Form.Label>Transferable </Form.Label>
                <Tooltip content="Do you want this NFT to be transferable by holders from their wallet to another wallet?">
                  <InfoCircledIcon />
                </Tooltip>
                <Form.Control asChild>
                  <Switch
                    name="transferable"
                    checked={formData.transferable}
                    onCheckedChange={(checked) =>
                      setFormData({ ...formData, transferable: checked })
                    }
                  />
                </Form.Control>
              </Flex>
            </Form.Field>
            <Flex gap="3" justify={"end"}>
              <Form.Submit asChild>
                <Button variant="classic" disabled={status === "disconnected"}>
                  Create New NFT
                </Button>
              </Form.Submit>
            </Flex>
          </Flex>
        </Form.Root>
      </div>
      {preview && (
        <Flex align={"center"} style={{ marginRight: 20 }}>
          <Card style={{ left: "50%", width: 300, height: 400 }}>
            <Flex direction="column" gap="3" align={"center"}>
              <h2>ERC721</h2>
              <img
                src={preview}
                alt="Token Preview"
                style={{ width: "200px", height: "200px" }}
              />
              <p>{formData.tokenDescription}</p>
            </Flex>
          </Card>
        </Flex>
      )}
    </Grid>
  );
};

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
  Text,
  TextArea,
  TextField,
  Tooltip,
} from "@radix-ui/themes";
import { InfoCircledIcon, StarFilledIcon } from "@radix-ui/react-icons";
import { handleUploadImage } from "@/utils/supabase-client";

export const CreateNFT = () => {
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
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, files } = e.target;
    if (name === "tokenImage") {
      const file = files?.[0];
      if (file?.type === "image/jpeg") {
        setFormData({
          ...formData,
          [name as string]: files?.[0],
        });
      }
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    // Handle form submission, e.g., send the data to an API
    console.log(formData);
  };

  const onUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (!formData.tokenImage) return;
    setUploading(true);
    const url = await handleUploadImage(formData.tokenImage);
    setPreview(url);
    setUploading(false);
  };

  return (
    <Grid columns="2" gap="8" mr="0">
      <div style={{ top: 40, position: "relative" }}>
        <Form.Root onSubmit={() => handleSubmit}>
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
                  onChange={() => handleChange}
                  required
                  color="bronze"
                  variant="soft"
                />
              </Form.Control>
            </Form.Field>

            <Form.Field name="tokenImage">
              <Flex gap="2" align={"center"} justify={"start"}>
                <Form.Label>Token Asset (PNG Format) </Form.Label>
                <StarFilledIcon color="red" width={4} height={4} />
              </Flex>
              <Form.Control asChild>
                <Flex gap="2" align={"center"} justify={"between"}>
                  <input
                    type="file"
                    name="tokenImage"
                    onChange={handleChange}
                    accept="image/png, image/jpeg"
                    required
                    color="bronze"
                  />
                  <Button variant="outline" onClick={() => onUpload}>
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
                <Button variant="classic">Create New NFT</Button>
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

              <Text>
                <strong>Max Supply:</strong> {formData.tokenSupply}
              </Text>
              <p>{formData.tokenDescription}</p>
            </Flex>
          </Card>
        </Flex>
      )}
    </Grid>
  );
};

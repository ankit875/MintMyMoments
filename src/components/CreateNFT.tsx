import { useState } from "react";
import * as Form from "@radix-ui/react-form";
import { Button, Callout, Flex, TextArea, TextField } from "@radix-ui/themes";
import { InfoCircledIcon, StarFilledIcon } from "@radix-ui/react-icons";
import { AwesomeModal } from "./common/Modal";

export const CreateNFT = () => {
  const [formData, setFormData] = useState({
    tokenSymbol: "",
    tokenName: "",
    tokenDescription: "",
    tokenImage: null,
    networkType: "StarkNet",
    tokenType: "ERC721",
    tokenSupply: "",
  });
  const [preview, setPreview] = useState<string | null>(null);
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "tokenImage") {
      setFormData({
        ...formData,
        [name]: files[0],
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission, e.g., send the data to an API
    console.log(formData);
  };

  const onPreviewImage = () => {
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader?.result as string);
    };
    if (formData?.tokenImage) {
      reader.readAsDataURL(formData?.tokenImage);
    }
  };

  return (
    <div style={{ top: 40, position: "relative" }}>
      <Form.Root onSubmit={handleSubmit}>
        <Flex direction="column" gap="3">
          <Callout.Root>
            <Callout.Icon>
              <InfoCircledIcon />
            </Callout.Icon>
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
              <Form.Label>Token Asset (PNG Format) </Form.Label>
              <StarFilledIcon color="red" width={4} height={4} />
            </Flex>
            <Form.Control asChild>
              <input
                type="file"
                name="tokenImage"
                onChange={handleChange}
                required
                color="bronze"
              />
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
          <Flex gap="3" justify={"end"}>
            <Form.Submit>
              <Button variant="outline" onClick={onPreviewImage}>
                Preview
              </Button>
            </Form.Submit>
            <Form.Submit asChild>
              <Button variant="classic">Create New NFT</Button>
            </Form.Submit>
          </Flex>
        </Flex>
      </Form.Root>
      {/* <AwesomeModal isOpen={!!preview} onToggle={() => setPreview(null)} title="Preview"> */}
    </div>
  );
};
"use client";

import {
  Container
} from "@radix-ui/themes";
import { CardShimmer } from "@/components/common/CardShimmer";
import { CreateNFT } from "@/components/CreateNFT";

export default function Dashboard() {

  const loadingContent = Array.from(
    { length: 10 },
    (_, index) => index * 10
  ).map((key) => <CardShimmer key={key} />);
  return (
    <Container className="mx-auto mt-10 flex flex-col">
      <CreateNFT />
      {loadingContent}
    </Container>
  );
}

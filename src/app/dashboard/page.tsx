"use client";

import {
  Avatar,
  Card,
  Container,
  Flex,
  Grid,
  Heading,
  Link,
  Text,
} from "@radix-ui/themes";
import { useEffect, useState } from "react";
import { getCommunities } from "@/utils/supabase-client";
import { Community } from "@/types";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { CreateCommunity } from "@/components/CreateCommunity";
import { CardShimmer } from "@/components/common/CardShimmer";
import { VOYAGER_BASE_ADDRESS } from "@/utils/constants";
import { CreateNFT } from "@/components/CreateNFT";

export default function Dashboard() {
  // const [communities, setCommunities] = useState<Community[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();



  // useEffect(() => {
  //   // setIsLoading(true);
  //   // getCommunities()
  //   //   .then((data) => {
  //   //     setCommunities(data);
  //   //     setIsLoading(false);
  //   //   })
  //   //   .catch((err) => {
  //   //     toast(err);
  //   //   });
  // }, []);
  // console.log("communities: ", communities);

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

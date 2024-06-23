import { createClient } from "@supabase/supabase-js";

import { CommunityProposal, CreateCollectionNFTInput } from "../types";

import { Database } from "@/types_db";
import { cache } from "react";
import toast from "react-hot-toast";

export const supabaseClient = createClient<Database>(
  process.env.NEXT_PUBLIC_SUPABASE_URL || "",
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ""
);

export const handleUploadImage = async (file: File) => {
  const { data, error } = await supabaseClient.storage
    .from("nft-images")
    .upload(`public/${file.name}`, file);
  const { data: dataUrl } = supabaseClient.storage
    .from("nft-images")
    .getPublicUrl(`public/${file.name}`);

  console.log("data", dataUrl?.publicUrl, data);
  return { url: dataUrl?.publicUrl, error };
};

export const getImage = cache(async (id: number): Promise<CreateCollectionNFTInput> => { 
  const { data, error } = await supabaseClient
    .from("nft_collections")
    .select("*")
    .order("id", { ascending: true }).single();
  console.log("data", data);
  if (error || !data) {
    console.log(error.message);
    throw new Error("failed to fetch data");
  }
  if (!data) return {} as CreateCollectionNFTInput;
  return data;
});

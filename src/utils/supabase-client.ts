import { createClient } from "@supabase/supabase-js";

import { CommunityProposal } from "../types";

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

// export const getProposal = cache(
//   async (proposal_id: number): Promise<CommunityProposal> => {
//     const { data, error } = await supabaseClient
//       .from("community_proposals")
//       .select("*")
//       .eq("proposal_id", proposal_id);
//     if (error || !data) {
//       console.log(error.message);
//       throw new Error("failed to fetch data");
//     }
//     if (data.length === 0) return {} as CommunityProposal;
//     return data[0];
//   }
// );

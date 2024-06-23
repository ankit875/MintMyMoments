import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { getImage, supabaseClient } from "@/utils/supabase-client";

// const IMAGE_BASE_URL = "https://mint-my-moments.vercel.app/img/";

export async function GET(req: NextRequest) {
 // get call to get the nft collection
  const selectedData =await getImage(1);
  const data = {
    name: selectedData?.name,
    description:selectedData?.description,
    image: selectedData?.image_path,
    attributes: [],
  };
  const id = parseInt(req.nextUrl.searchParams.get("id")!);
  const payload = data;
  payload.name += ` #${id}`;
  if (id < 7) {
    payload.image = `${selectedData?.image_path}${id}.jpg`;
  } else {
    payload.image = `${selectedData?.image_path}default.jpg`;
  }
  return Response.json(payload);
}

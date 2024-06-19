import { NextRequest } from "next/server";

const IMAGE_BASE_URL = "https://mint-my-moments.vercel.app/img/";

export function GET(req: NextRequest) {
  const data = {
    name: "Mint My Moment #",
    description: "Minting your moment with NFTs.",
    image: IMAGE_BASE_URL,
    attributes: [],
  };
  const id = parseInt(req.nextUrl.searchParams.get("id")!);
  const payload = data;
  payload.name += ` #${id}`;
  if (id < 7) {
    payload.image = `${IMAGE_BASE_URL}${id}.jpg`;
  } else {
    payload.image = `${IMAGE_BASE_URL}default.jpg`;
  }
  return Response.json(payload);
}

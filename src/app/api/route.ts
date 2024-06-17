import { NextRequest } from "next/server";

const IMAGE_BASE_URL = "/public/img/";

export function GET(req: NextRequest) {
  const data = {
    name: "Mint My Moment #",
    description: "Minting your moment with NFTs.",
    image: IMAGE_BASE_URL,
    attributes: [
      {
        trait_type: "Memory",
        value: "Friend's Birthday",
      },
      {
        trait_type: "Size",
        value: "Large",
      },
      {
        trait_type: "Occasion",
        value: "Birthday",
      },
    ],
  };
  const id = parseInt(req.nextUrl.searchParams.get("id")!);
  const payload = data;
  payload.name += ` #${id}`;
  if (id < 16) {
    payload.image = `${IMAGE_BASE_URL}${id}.png`;
  } else {
    payload.image = `${IMAGE_BASE_URL}default.png`;
  }
  return Response.json(payload);
}

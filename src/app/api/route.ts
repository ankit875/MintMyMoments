import { NextRequest } from "next/server";

const IMAGE_BASE_URL = "/public/img/";

export function GET(req: NextRequest) {
  const data = {
    name: "Mint My Moment #",
    description: "Minting your moment with NFTs.",
    image: IMAGE_BASE_URL,
    attributes: [
      {
        trait_type: "No. Of Mint",
        value: "1000",
      },
      {
        trait_type: "Claim Limit",
        value: "10",
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

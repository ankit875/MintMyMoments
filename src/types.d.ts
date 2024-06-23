export type CreateCollectionNFTInput = {
  id: number;
  name: string;
  symbol: string;
  description: string;
  image_path: string;
  type: string;
  network_type: string;
  mint_supply: number;
};

export type CommunityProposal = {
  created_at: string;
  details: string | null;
  details_hash: string | null;
  earliest: string | null;
  latest: string | null;
  proposal_id: number;
  title: string;
  yes_votes: number | null;
  no_votes: number | null;
  yes_votes_title: string;
  no_votes_title: string;
  txn_hash: string;
};

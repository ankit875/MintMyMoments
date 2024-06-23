import { Text } from "@radix-ui/themes";
const supported_features = [
  {
    id: 1,
    question: "What is Mint My Moment?",
    answer:
      "Mint My Moment transforms memorable digital experiences into dynamic, evolving NFTs that are personalized, tradeable, and securely recorded on the blockchain, offering transparent transactions and potential royalties.",
  },
  {
    id: 2,
    question: "Target Users",
    answer:
      "Tech-savvy consumers and businesses, including coffee shop patrons, real estate buyers, and art collectors, who are interested in dynamic, engaging NFTs.",
  },
  {
    id: 3,
    question: "What Types of ERC standards are supported?",
    answer:
      "Currently we are supported ERC721 standard. We are planning to support more standards ie. ERC1155 in future.",
  },
  {
    id: 4,
    question: "What Types of Images are supported?",
    answer:
      "Currently we are supporting JPEG image format. We are planning to support more formats in future.",
  },
];

const planned_features = [
  {
    id: 1,
    question: "Trait information on the NFT image",
    answer:
      "It includes dynamic attributes that change based on real-world interactions, such as customer engagement or property development milestones. These traits enhance the collectible's uniqueness and provide a visual representation of its evolution over time",
  },
  {
    id: 2,
    question: "Dynamic Traits base on User activity",
    answer:
      "It include attributes that evolve with customer interactions, such as frequency of visits, purchases, or engagement in promotional events. These traits visually represent and reward user participation",
  },
  {
    id: 3,
    question: "Dashboard for the collection management",
    answer: "it will offer users an intuitive interface to track, manage, and interact with their dynamic NFTs. It provides real-time updates on trait evolution, transaction history, and personalized insights based on user activity",
  },
];

export const FAQ = () => {
  return (
    <div className="mt-8">
      <div className="mx-auto max-w-7xl divide-y divide-gray-200 px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <h2 className="text-3xl font-bold tracking-tight">
          Supported Features
        </h2>
        <div className="mb-2 mt-8">
          <dl className="divide-y divide-gray-200">
            {supported_features.map(({ question, answer, id }) => (
              <div
                className="pb-8 pt-6 md:grid md:grid-cols-12 md:gap-8"
                key={id}
              >
                <Text
                  className="text-base font-medium md:col-span-5"
                  color="crimson"
                >
                  {question}
                </Text>
                <dd className="mt-2 md:col-span-7 md:mt-0">
                  <Text className="text-base">{answer}</Text>
                </dd>
              </div>
            ))}
          </dl>
        </div>
        <div className="mt-4">
          <h2 className="my-8 block text-3xl font-bold tracking-tight">
            Upcoming Features 🚀
          </h2>
          <div className="mb-2 mt-8">
            <dl className="divide-y divide-gray-200">
              {planned_features.map(({ question, answer, id }) => (
                <div
                  className="pb-8 pt-6 md:grid md:grid-cols-12 md:gap-8"
                  key={id}
                >
                  <Text
                    className="text-base font-medium md:col-span-5"
                    color="crimson"
                  >
                    {question}
                  </Text>
                  <dd className="mt-2 md:col-span-7 md:mt-0">
                    <Text className="text-base">{answer}</Text>
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </div>
  );
};

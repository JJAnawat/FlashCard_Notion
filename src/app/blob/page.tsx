import FlashCard from "../_components/flashCard";

import { api } from "~/trpc/server";

export default function Home() {
  // const res = api.word.changeStatus({pageId:'889eaf8c-6375-44fb-8276-2181d29058ac',newStatus:0})

  return ( // TODO fetching notion data and somehow split it to each flash card
      <main className="flex min-h-screen relative items-center justify-center bg-dark-gray">
        <FlashCard />
        <div className="absolute bottom-10">Button</div>
      </main>
  );
}

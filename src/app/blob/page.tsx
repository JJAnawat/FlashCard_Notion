import Link from "next/link";

import { api, HydrateClient } from "~/trpc/server";

export default async function Home() {
  return (
    <HydrateClient>
      <main className="flex min-h-screen flex-col items-center justify-center bg-dark-gray">
        <div className="w-20 h-20 bg-black"></div>
      </main>
    </HydrateClient>
  );
}

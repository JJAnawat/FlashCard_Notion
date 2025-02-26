import Link from "next/link";

import { HydrateClient } from "~/trpc/server";

export default async function Home() {

  return (
    <HydrateClient>
      <main className="flex min-h-screen flex-col items-center justify-center bg-dark-gray">
        <div className="container flex flex-col items-center justify-center gap-6 px-4 py-16">
          <h1 className="text-5xl font-extrabold tracking-tight sm:text-[5rem] text-light-cyan">
            Flash Card !!
          </h1>
          <Link href="/blob">
            <button className="text-2xl font-bold text-grayish-white bg-light-gray px-12 py-5 rounded-full hover:scale-95 transition active:bg-opacity-50">Start</button>
          </Link>
        </div>
      </main>
    </HydrateClient>
  );
}

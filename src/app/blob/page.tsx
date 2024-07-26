import FlashCard from "../_components/flashCard";

export default function Home() {
  return ( // TODO fetching notion data and somehow split it to each flash card
      <main className="flex min-h-screen relative items-center justify-center bg-dark-gray">
        <FlashCard />
        <div className="absolute bottom-10">Button</div>
      </main>
  );
}

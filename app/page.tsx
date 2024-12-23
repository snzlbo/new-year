import { BackgroundBeams } from "@/components/background-beam";

export default function Home() {
  return (
    <div className="h-screen w-full bg-neutral-950 relative flex flex-col items-center justify-center antialiased">
      <div className="max-w-2xl mx-auto p-4">
        <h1 className="relative z-10 text-lg md:text-6xl bg-clip-text text-transparent bg-gradient-to-b from-blue-400 to-blue-700 text-center font-sans font-bold">
          DDAM New Year 2025
        </h1>
      </div>
      <BackgroundBeams />
    </div>
  );
}

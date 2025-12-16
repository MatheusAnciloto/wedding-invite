import Image from "next/image";
import LoopingVideo from "./components/LoopingVideo";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col justify-start w-full bg-gray-900 text-white">
      <div className="w-full h-60 lg:h-200">
        <LoopingVideo 
          src="/proposal.mp4"
          className="h-full object-cover" 
        />
      </div>

      <div className="p-8 flex-column justify-center">
        <h1 className="text-4xl font-bold font-great mb-4">Beatriz</h1>
        <p className="text-2xl font-bold font-great mb-4">&</p>
        <h1 className="text-4xl font-bold font-great mb-4">Matheus</h1>
      </div>
      
    </main>
  );
}

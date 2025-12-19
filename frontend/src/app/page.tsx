import { Header } from "./components/Header";
import Image from "next/image";
import { InviteCarousel } from "./components/InviteCarousel";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col justify-start w-full bg-gray-950 text-white">
      <Header>
        <div className="flex-col py-12 px-4">
          <div className="flex justify-center items-center">
            <h1 className="text-4xl font-parisienne font-bold">Beatriz</h1>
            <p className="text-2xl font-parisienne mx-3">&</p>
            <h1 className="text-4xl font-parisienne font-bold">Matheus</h1>
          </div>

          <div className="flex justify-center my-10">
            <div className="w-72 h-72 relative rounded-full overflow-hidden border-4 border-white">
              <Image
                src="/faces.JPG"
                alt="Profile picture"
                fill
                className="object-cover scale-135 object-[55%_40%]"
              />
            </div>
          </div>
          <div className="flex justify-center mt-15">
            <h2 className="text-4xl font-parisienne">Convidam...</h2>
          </div>
        </div>
      </Header>

      <div className="flex justify-center">
        <div className="relative inline-block overflow-hidden py-4">          
          <h2 className="text-4xl font-parisienne animate-float">
            Convidado & Família
          </h2>

          <div className="absolute inset-0 bg-gray-950 animate-reveal" />
        </div>
      </div>

      <div className="flex center">
        <InviteCarousel inviteGroup={{
          family_name: "Henrique & Familia",
          guests: 2,
          id: "test"
        }} />
      </div>
    </main>
  );
}

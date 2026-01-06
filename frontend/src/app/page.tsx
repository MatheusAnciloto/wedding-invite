"use client";
import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from 'next/navigation';
import Image from "next/image";

/* ---------------- Components ---------------- */
import { Header } from "./components/Header";
import { InviteCarousel } from "./components/InviteCarousel";
import { Loader } from "./components/Loader";
import { Details } from "./components/Details";

/* ---------------- Services ---------------- */
import { getInvite } from "./service/api";


function InviteContent() {
  const [invite, setInvite] = useState<InviteGroup | undefined>(undefined);
  const [loading, setLoading] = useState(true);

  const params = useSearchParams();
  const id = params.get('convite');

  useEffect(() => {
    const fetchInvite = async (invite_id: string) => {
      try {
        const fetchedInvite = await getInvite(invite_id);
        setInvite(fetchedInvite);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (id && typeof id === "string") {
      fetchInvite(id);
    }
  }, [id]);

  return (
    <main className="min-h-screen flex flex-col justify-start w-full bg-gray-950 text-white">
      {loading && <Loader message="Aguarde..."/>}
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
                src="https://res.cloudinary.com/dzuegonso/image/upload/f_auto,q_auto/v1767667279/faces_kwpyyj.jpg"
                alt="Profile picture"
                fill
                className="object-cover scale-135 object-[55%_40%]"
                priority
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
          <h2 className={`text-4xl font-parisienne ${!loading && 'animate-float'}`}>
            {invite?.family_name}
          </h2>

          <div className={`absolute inset-0 bg-gray-950 ${!loading && 'animate-reveal'}`} />
        </div>
      </div>

      <div className="flex center">
        {invite?.id && (
          <InviteCarousel inviteGroup={invite} setInvite={setInvite} />
        )}
      </div>

      <Details />
    </main>
  );
};


export default function Home() {
  return (
    <Suspense>
      <InviteContent />
    </Suspense>
  );
};

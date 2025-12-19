"use client";
import { useState } from "react";

import { ConfirmationModal } from "./ConfirmationModal";

interface InviteCarouselProps {
  inviteGroup: InviteGroup;
}

export function InviteCarousel({ inviteGroup }: InviteCarouselProps) {
  const [selectedGuestIndex, setSelectedGuestIndex] = useState<number | null>(null);

  // Criamos um array baseado no número de convidados (ex: 4 convidados = 4 cards)
  const guestCards = Array.from({ length: inviteGroup.guests }, (_, i) => i);

  return (
    <div className="w-full py-10">
      <div className="flex gap-6 overflow-x-auto px-10 snap-x snap-mandatory no-scrollbar pb-8 justify-start md:justify-start">
        {guestCards.map((index) => (
          <button
            key={`${inviteGroup.id}-${index}`}
            onClick={() => setSelectedGuestIndex(index)}
            className="group min-w-70 md:min-w-87 aspect-3/2 snap-center relative bg-var(--color-forest) rounded-sm shadow-2xl transition-all hover:scale-105 active:scale-95 border border-(--color-gold)/30 overflow-hidden"
          >
            {/* Background Texture */}
            <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/paper-fibers.png')]" />
            
            <div className="z-10 flex flex-col items-center text-center p-6">
              <span className="text-gold/60 text-[10px] uppercase tracking-[0.3em] mb-1">
                Convite Individual
              </span>
              <h3 className="text-2xl font-parisienne text-(--color-eggshell)">
                {inviteGroup.family_name}
              </h3>
              <p className="text-gold/40 text-[10px] mt-4 font-sans uppercase tracking-widest">
                Convidado {index + 1} de {inviteGroup.guests}
              </p>
              
              <div className="mt-6 py-2 px-4 border border-(--color-gold)/20 rounded-full text-(--color-gold) text-[10px] uppercase tracking-tighter group-hover:bg-(--color-gold) group-hover:text-forest transition-colors">
                Confirmar este convidado
              </div>
            </div>
          </button>
        ))}
      </div>

      {selectedGuestIndex !== null && (
        <ConfirmationModal 
          familyId={inviteGroup.id}
          guestNumber={selectedGuestIndex + 1}
          onClose={() => setSelectedGuestIndex(null)} 
        />
      )}
    </div>
  );
}
"use client";
import { useState } from "react";

import { ConfirmationModal } from "./ConfirmationModal";

interface InviteCarouselProps {
  inviteGroup: InviteGroup;
  setInvite: (invite: InviteGroup) => void;
}

export function InviteCarousel({ inviteGroup, setInvite }: InviteCarouselProps) {
  const [selectedGuestIndex, setSelectedGuestIndex] = useState<number | null>(null);

  const guestCards = Array.from({ length: inviteGroup.guests }, (_, i) => ({
    index: i,
    data: inviteGroup.confirmed_guests?.[i]
  }));

  const isSingleGuest = inviteGroup.guests === 1;



  return (
    <div className="w-full py-10">
      <div className={`flex gap-6 overflow-x-auto px-10 snap-x snap-mandatory no-scrollbar pb-4 ${isSingleGuest ? 'justify-center' : 'justify-start'} ${inviteGroup?.guests < 4 && 'md:justify-center'}`}>
        {guestCards.map(({ index, data }) => (
          <button
            key={`${inviteGroup.id}-${index}`}
            onClick={() => setSelectedGuestIndex(index)}
            disabled={!!data?.id}
            className="group min-w-70 md:min-w-87 aspect-3/2 snap-center relative bg-var(--color-forest) rounded-sm shadow-2xl transition-all active:scale-95 border border-gold/30 overflow-hidden hover:cursor-pointer"
          >
            <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/paper-fibers.png')]" />
            
            <div className="z-10 flex flex-col items-center text-center p-6">
              <span className="text-gold/60 text-[10px] uppercase tracking-[0.3em] mb-1">
                Convite Individual
              </span>
              <h3 className="text-2xl font-parisienne text-(--color-eggshell)">
                {!!data?.id ? `${data.first_name} ${data.last_name}` : isSingleGuest ? inviteGroup.family_name : `Convidado ${index + 1}`}
              </h3>
              <p className="text-gold/40 text-[10px] mt-4 font-sans uppercase tracking-widest">
                Convidado {index + 1} de {inviteGroup.guests}
              </p>
              
              {!!data?.id ? (
                <div className="mt-6 py-2 px-4 text-(--color-gold) text-[12px] uppercase tracking-tighter">  
                  Presença confirmada
                </div>
              ) : (
                <div className="mt-6 py-2 px-4 border border-gold/20 rounded-full text-(--color-gold) text-[12px] uppercase tracking-tighter group-hover:bg-(--color-gold) group-hover:text-forest transition-colors">
                  {isSingleGuest ? 'Confirmar presença' : 'Confirmar convidado'}
                </div>
              )}
            </div>
          </button>
        ))}
      </div>
      {!isSingleGuest && (
        <p className="text-center text-white/40 text-xs animate-pulse md:hidden">
          Deslize para ver mais →
        </p>
      )}

      {selectedGuestIndex !== null && (
        <ConfirmationModal
          invite={inviteGroup}
          setInvite={setInvite}
          guestNumber={selectedGuestIndex + 1}
          onClose={() => setSelectedGuestIndex(null)}
        />
      )}
    </div>
  );
};

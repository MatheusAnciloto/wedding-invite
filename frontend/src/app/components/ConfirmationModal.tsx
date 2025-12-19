import { useState } from "react";

interface ConfirmationModalProps {
  familyId: string;
  guestNumber: number;
  onClose: () => void;
}

export const ConfirmationModal = ({ familyId, guestNumber, onClose }: ConfirmationModalProps) => {
  const [formData, setFormData] = useState<GuestConfirmation>({
    firstName: "",
    lastName: "",
    ageGroup: "9+",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const payload = {
      invite_id: familyId,
      guest_index: guestNumber,
      ...formData
    };

    console.log("Enviando para o Banco:", payload);
    // Aqui entraria sua chamada de API real
    alert(`Presença de ${formData.firstName} confirmada!`);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-in fade-in duration-300">
      <div className="bg-(--color-eggshell) w-full max-w-sm rounded-sm p-8 relative shadow-2xl border-t-4 border-(--color-gold) text-(--color-forest)">
        <h2 className="text-3xl font-parisienne text-center mb-2">Confirmação</h2>
        <p className="text-center text-[10px] uppercase tracking-widest text-forest/40 mb-8">
          Convidado #{guestNumber} do Grupo
        </p>
        
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-1">
            <label className="text-[10px] font-bold uppercase tracking-widest opacity-60">Nome</label>
            <input 
              required
              className="w-full bg-transparent border-b border-forest/20 py-1 outline-none focus:border-gold transition-colors"
              onChange={(e) => setFormData({...formData, firstName: e.target.value})}
            />
          </div>

          <div className="space-y-1">
            <label className="text-[10px] font-bold uppercase tracking-widest opacity-60">Sobrenome</label>
            <input 
              required
              className="w-full bg-transparent border-b border-forest/20 py-1 outline-none focus:border-gold transition-colors"
              onChange={(e) => setFormData({...formData, lastName: e.target.value})}
            />
          </div>

          <div className="space-y-1">
            <label className="text-[10px] font-bold uppercase tracking-widest opacity-60">Idade (Buffet)</label>
            <div className="grid grid-cols-3 gap-2 pt-2">
              {(['0-4', '5-8', '9+'] as const).map((age) => (
                <button
                  key={age}
                  type="button"
                  onClick={() => setFormData({...formData, ageGroup: age})}
                  className={`py-2 text-[10px] border transition-all ${
                    formData.ageGroup === age 
                    ? 'bg-forest text-eggshell border-forest' 
                    : 'border-forest/20 text-forest hover:border-gold'
                  }`}
                >
                  {age === '9+' ? '9 anos +' : age + ' anos'}
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-3 pt-6">
            <button type="submit" className="w-full bg-forest text-eggshell py-4 text-xs uppercase tracking-widest font-bold hover:brightness-125 transition-all">
              Confirmar
            </button>
            <button onClick={onClose} type="button" className="text-[10px] uppercase tracking-widest opacity-50 hover:opacity-100">
              Voltar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

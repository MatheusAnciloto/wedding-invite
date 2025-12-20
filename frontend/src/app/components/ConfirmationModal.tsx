import { useState } from "react";
import { confirmGuest } from "../service/api";

interface ConfirmationModalProps {
  invite: InviteGroup;
  guestNumber: number;
  onClose: () => void;
  
}
export const ConfirmationModal = ({ invite, guestNumber, onClose }: ConfirmationModalProps) => {
  const isSingleGuest = invite.guests === 1;

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState<GuestConfirmation>({
    first_name: isSingleGuest ? invite.family_name.split(" ")[0] : "",
    last_name: isSingleGuest ? invite.family_name.split(" ")[1] : "",
    age_range: "Adulto",
    invite_id: invite.id
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setIsLoading(true);
      await confirmGuest(formData);

      onClose();
    } catch (err) {
      console.error(err);
      setError("Um erro inesperado aconteceu, entre em contato");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-in fade-in duration-300"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-(--color-eggshell) w-full max-w-sm rounded-sm p-8 relative shadow-2xl border-t-4 border-(--color-gold) text-(--color-forest)"
      >
        <h2 className="text-3xl font-parisienne text-center mb-2">Confirmação</h2>
        <p className="text-center text-[11px] uppercase tracking-widest text-forest/40 mb-8">
          Confirme os dados
        </p>
        
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-1">
            <label className="text-[10px] font-bold uppercase tracking-widest opacity-60">Nome</label>
            <input 
              required
              className="w-full bg-transparent border-b border-forest/20 py-1 outline-none focus:border-gold transition-colors"
              onChange={(e) => setFormData({...formData, first_name: e.target.value})}
              value={formData.first_name}
            />
          </div>

          <div className="space-y-1">
            <label className="text-[10px] font-bold uppercase tracking-widest opacity-60">Sobrenome</label>
            <input 
              required
              className="w-full bg-transparent border-b border-forest/20 py-1 outline-none focus:border-gold transition-colors"
              onChange={(e) => setFormData({...formData, last_name: e.target.value})}
              value={formData.last_name}
            />
          </div>

          {invite?.children && (
            <div className="space-y-1">
              <label className="text-[10px] font-bold uppercase tracking-widest opacity-60">Idade (Buffet)</label>
              <div className="grid grid-cols-3 gap-2 pt-2">
                {(['0-4', '5-8', 'Adulto'] as const).map((age) => (
                  <button
                    key={age}
                    type="button"
                    onClick={() => setFormData({...formData, age_range: age})}
                    className={`py-2 text-[10px] border transition-all ${
                      formData.age_range === age 
                      ? 'bg-forest text-eggshell border-forest' 
                      : 'border-forest/20 text-forest hover:border-gold'
                    }`}
                  >
                    {age === 'Adulto' ? '9 anos +' : age + ' anos'}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="flex flex-col gap-3 pt-6">
            <button type="submit" disabled={isLoading} className={`w-full bg-forest text-eggshell py-4 text-xs uppercase tracking-widest font-bold hover:brightness-125 transition-all disabled:border-gray-200 ${isLoading && ''}`}>
              Confirmar Presença
            </button>
            <button onClick={onClose} type="button" className="text-[10px] uppercase tracking-widest opacity-80 hover:opacity-100">
              Voltar
            </button>
            {error && (
              <div className="self-center">
                <p className="text-[14px] text-red-700">
                  {String(error)}
                </p>
              </div>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export const Loader = ({ message }: { message: string }) => {
  return (
    <div className={`fixed inset-0 z-100 flex flex-col items-center justify-center bg-gray-950 text-white font-parisienne`}>
      <div className="relative">
        <div className="h-24 w-24 rounded-full border-t-2 border-b-2 border-white/20 animate-spin" />
        
        <div className="absolute inset-0 flex items-center justify-center">
            <div className="h-2 w-2 bg-white rounded-full animate-ping" />
        </div>
      </div>

      <h1 className="mt-8 text-3xl font-parisienne animate-pulse tracking-widest text-white/90">
        {message}
      </h1>
      
      <div className="absolute bottom-10 w-full text-center">
        <div className="h-px w-12 bg-white/20 mx-auto" />
      </div>
    </div>
  );
};

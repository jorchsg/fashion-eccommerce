export default function Loading() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="relative w-12 h-12">
          <div className="absolute inset-0 border-2 border-gray-200 rounded-full" />
          <div className="absolute inset-0 border-2 border-t-brand-dark rounded-full animate-spin" />
        </div>
        <p className="text-xs tracking-[0.3em] uppercase text-gray-400">
          Loading
        </p>
      </div>
    </div>
  );
}

export function LoadingState() {
  return (
    <div className="modal-loading flex flex-col items-center justify-center gap-4 py-16">
      <div className="h-10 w-10 animate-spin rounded-full border-4 border-[#0B5FAE]/20 border-t-[#0B5FAE]" />
      <p className="text-sm font-semibold text-[#64748B]">Loading product...</p>
    </div>
  );
}

export function ErrorState({ message = "Product not found", onClose }) {
  return (
    <div className="flex flex-col items-center justify-center gap-4 px-8 py-16 text-center">
      <p className="text-lg font-semibold text-[#071B3A]">{message}</p>
      <button
        type="button"
        onClick={onClose}
        className="rounded-md bg-[#0B5FAE] px-5 py-2.5 text-sm font-semibold text-white"
      >
        Close
      </button>
    </div>
  );
}

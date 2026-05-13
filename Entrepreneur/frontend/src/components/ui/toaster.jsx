import { useToast } from "./use-toast";

export function Toaster() {
  const { message } = useToast();

  if (!message) return null;

  return (
    <div className="fixed top-4 left-4 right-4 sm:left-auto sm:right-5 z-50 bg-black text-white px-4 sm:px-6 py-4 rounded-lg shadow-lg border border-white/10 max-w-sm sm:max-w-none">
      <h4 className="font-semibold">{message.title}</h4>
      <p className="text-sm text-gray-300">{message.description}</p>
    </div>
  );
}
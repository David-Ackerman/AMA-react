import { ArrowRight } from "lucide-react";
import { useParams } from "react-router-dom";
import { createMessage } from "../http/create-message";
import { toast } from "sonner";

export function CreateMessageForm() {
  const { roomId } = useParams();

  if (!roomId) {
    throw new Error("Messages components must be used within room page");
  }

  async function createMessageAction(data: FormData) {
    const message = data.get("message")?.toString();
    if (!message || !roomId) return;

    try {
      await createMessage({ message, roomId });
    } catch {
      toast.error("Falha ao enviar pergunta, tente novamente");
    }
  }

  return (
    <form
      action={createMessageAction}
      className="flex items gap-2 bg-zinc-900 p-2 rounded-xl border border-zinc-800 focus-within:ring-1 ring-orange-400 ring-offset-2 ring-offset-zinc-950"
    >
      <input
        type="text"
        name="message"
        required
        placeholder="Qual a sua pergunta"
        autoComplete="off"
        className="flex-1 text-sm bg-transparent mx-2 outline-none placeholder:text-zinc-500 text-zinc-100"
      />

      <button
        type="submit"
        className="bg-orange-400 font-medium text-sm text-orange-950 px-3 py-1.5 gap-1.5 flex items-center rounded-lg hover:bg-orange-500 transition-colors"
      >
        Criar pergunta <ArrowRight className="size-4" />
      </button>
    </form>
  );
}

import { ArrowUp } from "lucide-react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "sonner";
import { createMessageReaction } from "../http/create-message-reaction";
import { removeMessageReaction } from "../http/remove-message-reaction";

interface MessageProps {
  text: string;
  amountOfReaction: number;
  answered?: boolean;
  id: string;
}

export function Message({
  text,
  amountOfReaction,
  answered = false,
  id: messageId,
}: MessageProps) {
  const { roomId } = useParams();
  const [hasReacted, setHasReacted] = useState(false);

  if (!roomId) {
    throw new Error("Messages components must be used within room page");
  }

  async function createMessageReactionAction() {
    if (!roomId) {
      return;
    }

    try {
      await createMessageReaction({ messageId, roomId });
    } catch {
      toast.error("Falha ao reagir a mensagem, tente novamente!");
    }

    setHasReacted(true);
  }

  async function removeMessageReactionAction() {
    if (!roomId) {
      return;
    }

    try {
      await removeMessageReaction({ messageId, roomId });
    } catch {
      toast.error("Falha ao reamover reação, tente novamente!");
    }

    setHasReacted(false);
  }

  return (
    <li
      data-answered={answered}
      className="ml-4 leading-relaxed text-zinc-100 data-[answered=true]:opacity-50 data-[answered=true]:pointer-events-none"
    >
      {text}
      {hasReacted ? (
        <button
          onClick={removeMessageReactionAction}
          type="button"
          className="mt-3 flex items-center gap-2 text-orange-400 text-small font-medium hover:text-orange-500"
        >
          <ArrowUp className="siza-4" />
          Curtir pergunta ({amountOfReaction})
        </button>
      ) : (
        <button
          onClick={createMessageReactionAction}
          type="button"
          className="mt-3 flex items-center gap-2 text-zinc-400 text-small font-medium hover:text-zinc-300"
        >
          <ArrowUp className="siza-4" />
          Curtir pergunta ({amountOfReaction})
        </button>
      )}
    </li>
  );
}

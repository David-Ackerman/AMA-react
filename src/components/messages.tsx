import { useParams } from "react-router-dom";
import { Message } from "./message";
import { getRoomMessages } from "../http/get-room-messages";
import { useSuspenseQuery } from "@tanstack/react-query";

import { useMessagesWebsockets } from "../hooks/use-message-websockets";

export function Messages() {
  const { roomId } = useParams();

  if (!roomId) {
    throw new Error("Messages components must be used within room page");
  }

  const { data } = useSuspenseQuery({
    queryKey: ["messages", roomId],
    queryFn: () => getRoomMessages({ roomId }),
  });

  useMessagesWebsockets({ roomId });

  const sortedMessages = data.messages.sort((a, b) => {
    return b.amountOfReactions - a.amountOfReactions;
  });

  return (
    <ol className="list-decimal list-outside px-3 space-y-8">
      {sortedMessages.map((message) => (
        <Message
          key={message.id}
          id={message.id}
          text={message.text}
          amountOfReaction={message.amountOfReactions}
          answered={message.answered}
        />
      ))}
    </ol>
  );
}

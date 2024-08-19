interface GetRoomMessagesRequest {
  roomId: string;
}

export interface GetRoomMessagesResponse {
  messages: {
    id: string;
    text: string;
    amountOfReactions: number;
    answered: boolean;
  }[];
}

export async function getRoomMessages({
  roomId,
}: GetRoomMessagesRequest): Promise<GetRoomMessagesResponse> {
  const response = await fetch(
    `${import.meta.env.VITE_APP_API_URL}/rooms/${roomId}/messages`
  );

  console.log(response);

  const data: Array<{
    id: string;
    room_id: string;
    message: string;
    reaction_count: number;
    answered: boolean;
  }> = await (response.json() as any);
  return {
    messages: data.map((item) => ({
      id: item.id,
      text: item.message,
      amountOfReactions: item.reaction_count,
      answered: item.answered,
    })),
  };
}

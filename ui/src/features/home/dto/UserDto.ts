import type { ChatDto } from "./ChatDto";
import type { MessageDto } from "./MessagesDto";

export interface UserDto {
  id?: number;

  username: string;

  messages?: MessageDto[];

  chats?: ChatDto[];
}

import type { MessageDto } from "./MessagesDto";
import type { UserDto } from "./UserDto";

export interface ChatDto {
  id?: number;
  name: string;
  isGroup?: boolean;
  users?: UserDto[];
  messages?: MessageDto[];
}

import type { ChatDto } from "./ChatDto";
import type { UserDto } from "./UserDto";

export interface MessageDto {
  id?: number;
  message: string;
  type: "text" | "file";
  created_at: Date;
  sender: UserDto;
  chat: ChatDto;
}

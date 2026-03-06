export interface CreateMessageDto {
  message: string;
  type: "text" | "file";
  created_at: Date;
  sender: number;
  chat: number;
}

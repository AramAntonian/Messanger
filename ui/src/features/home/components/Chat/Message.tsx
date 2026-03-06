import type { MessageDto } from "../../dto/MessagesDto";
import "../../assets/Chat.css";

interface MessageProps {
  message: MessageDto;
  me: number;
}

function Message({ message, me }: MessageProps) {
  return (
    <div className={`message-cont-${message.sender.id === me ? "me" : "other"}`}>
      <span className="message-cont-text">{message.message}</span>
    </div>
  );
}

export default Message;

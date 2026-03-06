import type { UserDto } from "../../dto/UserDto";
import "../../assets/ChatParicipants.css";

interface ChatUserProps {
  user: UserDto;
}

function ChatUser({ user }: ChatUserProps) {
  return (
    <div className="chat-user-cont">
      <div className="chat-user-cont-name">{user.username}</div>
    </div>
  );
}

export default ChatUser;

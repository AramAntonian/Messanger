import { useState } from "react";
import { socket, WebSocketProvider } from "../../../contexts/WebSocketContext";
import "../assets/Messenger.css";
import Chat from "./Chat/Chat";
import ChatMenu from "./ChatMenu/ChatMenu";
import { type ChatDto } from "../dto/ChatDto";
import ChatParticipants from "./ChatParticipants/ChatParticipants";

function Messenger() {
  const [chat, setChat] = useState<ChatDto | undefined>();
  return (
    <WebSocketProvider value={socket}>
      <div className="messenger-cont">
        <ChatMenu setChat={setChat} chat={chat} />
        <Chat chat={chat} />
        {chat ? <ChatParticipants users={chat.users} /> : null}
      </div>
    </WebSocketProvider>
  );
}

export default Messenger;

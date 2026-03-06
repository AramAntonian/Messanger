import { useContext, useEffect, useState, type Dispatch, type SetStateAction } from "react";
import "../../assets/ChatMenu.css";
import { WebSocketContext } from "../../../../contexts/WebSocketContext";
import type { ChatDto } from "../../dto/ChatDto";
import CreateChat from "./CreateChat";
import ChatSection from "./ChatSection";
import NewChat from "./NewChat";

interface ChatMenuProps {
  setChat: Dispatch<SetStateAction<ChatDto>>;
  chat: ChatDto | undefined;
}

function ChatMenu({ setChat, chat }: ChatMenuProps) {
  const [chats, setChats] = useState<ChatDto[]>([]);
  const socket = useContext(WebSocketContext);
  useEffect(() => {
    socket.on("chats", (data: ChatDto[]) => {
      setChats((prev) => [...prev, ...data]);
    });

    return () => {
      socket.off("chats");
    };
  }, [socket]);

  function enterChat(newChat: ChatDto) {
    if (!chat) {
      setChat(newChat);
      socket.emit("enterChat", newChat.id);
    } else if (chat.id !== newChat.id) {
      setChat(newChat);
      socket.emit("enterChat", newChat.id);
    }
  }

  return (
    <div className={`chatMenu-cont-${chats.length ? "full" : "empty"}`}>
      <NewChat />
      {chats.length ? (
        <ChatSection chats={chats} handleClick={enterChat} />
      ) : (
        <CreateChat socket={socket} />
      )}
    </div>
  );
}

export default ChatMenu;

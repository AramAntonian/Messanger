import { useContext, useEffect, useState } from "react";
import { WebSocketContext } from "../../../../contexts/WebSocketContext";
import type { MessageDto } from "../../dto/MessagesDto";
import { logout } from "../../../../service/logout";
import type { CreateMessageDto } from "../../dto/CreateMessageDto";
import type { UserDto } from "../../dto/UserDto";
import SendMessage from "./SendMessage";
import Message from "./Message";
import "../../assets/Chat.css";
import NoMessagesYet from "./NoMessagesYet";
import type { ChatDto } from "../../dto/ChatDto";

interface ChatProps {
  chat: ChatDto | undefined;
}

function Chat({ chat }: ChatProps) {
  const [messages, setMessages] = useState<MessageDto[]>([]);
  const [message, setMessage] = useState("");
  const [me, setMe] = useState(-1);
  const socket = useContext(WebSocketContext);

  useEffect(() => {
    (async function () {
      const storage: string | null = localStorage.getItem("USER");
      if (!storage) {
        logout();
      }
      const me = await JSON.parse(storage!);
      setMe(me.id);
    })();
    socket.on("messages", (data: MessageDto[]) => {
      console.log(data);
      setMessages((prev) => [...prev, ...data]);
    });

    return () => {
      socket.off("messages");
    };
  }, [socket]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMessages([])
  }, [chat]);

  async function sendMessage() {
    if (!chat) {
      alert("enter the chat");
      return setMessage("");
    }
    const storage: string | null = localStorage.getItem("USER");
    if (!storage) {
      logout();
    }
    if (message === "") {
      return;
    }
    const user: UserDto = JSON.parse(storage!);
    const date = new Date(Date.now());
    const newMessage: CreateMessageDto = {
      message,
      created_at: date,
      sender: user.id!,
      chat: chat.id!,
      type: "text",
    };
    socket.emit("sendMessage", newMessage);
    setMessage("");
  }

  useEffect(() => {
    console.log(messages)
  },[messages])

  return (
    <div className="chat-cont">
      <div className="chat-messages-cont">
        {messages.length ? (
          messages.map((el: MessageDto, idx: number) => <Message message={el} key={idx} me={me} />)
        ) : (
          <NoMessagesYet pickChat={!chat} />
        )}
      </div>
      <SendMessage send={sendMessage} message={message} setMessage={setMessage} />
    </div>
  );
}

export default Chat;

import type { ChatDto } from "../../dto/ChatDto";
import "../../assets/ChatSection.css";

interface ChatSection {
  chats: ChatDto[];
  handleClick: (id: ChatDto) => void;
}

function ChatSection({ chats, handleClick }: ChatSection) {
  return (
    <div className="chat-section-cont">
      {chats.length
        ? chats.map((el: ChatDto, idx: number) => (
            <div
              key={idx}
              className="chat-section-el"
              onClick={() => {
                handleClick(el);
              }}
            >
              <div className="chat-section-name">{el.name}</div>
            </div>
          ))
        : null}
    </div>
  );
}

export default ChatSection;

import type { Dispatch, SetStateAction } from "react";
import Input from "../../../../components/Input/Input";
import sendIcon from "../../../../assets/send.png";

import "../../assets/Chat.css";

interface SendMessageProps {
  send: () => void;
  message: string;
  setMessage: Dispatch<SetStateAction<string>>;
}

function SendMessage({ send, message, setMessage }: SendMessageProps) {
  return (
    <div className="send-message-cont">
      <Input value={message} setValue={setMessage} placeholder="text... " size="full" />
      <img src={sendIcon} onClick={send} className="send-message-send"/>
    </div>
  );
}

export default SendMessage;

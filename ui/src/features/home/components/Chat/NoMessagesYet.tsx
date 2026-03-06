import emptyInbox from "../../../../assets/empty-inbox.png";
import '../../assets/Chat.css'

interface NoMessagesYetProps{
  pickChat:boolean
}

function NoMessagesYet({pickChat} : NoMessagesYetProps) {
  return (
    <div className="no-messages-yet-cont">
      <img  src={emptyInbox} className="no-messages-yet-img"/>
      <div>{pickChat ? 'Pick A Chat': 'No Messages Yet'}</div>
    </div>
  );
}

export default NoMessagesYet;

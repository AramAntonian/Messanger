import { useState } from "react";
import Input from "../../../../components/Input/Input";
import Modal from "../../../../components/Modal/Modal";
import "../../assets/CreateChat.css";
import Button from "../../../../components/Button/Button";

interface CreateChatModalProps {
  onClose: () => void;
  createChat: (name: string, users: string[]) => void;
  open: boolean;
}

function CreateChatModal({ onClose, open, createChat }: CreateChatModalProps) {
  const [name, setName] = useState("");
  const [user, setUser] = useState("");
  const [users, setUsers] = useState<string[]>([]);

  function removeUser(name: string) {
    setUsers((prev) => prev.filter((el) => el !== name));
  }

  function addUser() {
    if (users.includes(user) || user === "") {
      setUser("");
      return;
    }
    if (users.length > 2) {
      alert("max users 3");
      return;
    }
    setUser("");
    setUsers((prev) => [...prev, user]);
  }

  return open ? (
    <Modal onClose={onClose}>
      <div className="create-chat-modal-cont">
        <Input value={name} setValue={setName} placeholder="Chat Name" />
        <div className="create-chat-modal-user-add-cont">
          <Input value={user} setValue={setUser} placeholder="User Name" />
          <Button text="+" size="add" onClick={addUser} />
        </div>
        {users.length
          ? users.map((el) => (
              <div className="create-chat-modal-add-username-cont">
                <div
                  className="create-chat-modal-add-username-button"
                  onClick={() => {
                    removeUser(el);
                  }}
                >
                  x
                </div>
                <div className="create-chat-modal-add-username-text">{el}</div>
              </div>
            ))
          : null}

        <Button text="Create" size="large" onClick={() => createChat(name, users)} />
      </div>
    </Modal>
  ) : null;
}

export default CreateChatModal;

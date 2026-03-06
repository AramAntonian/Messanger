import type { ReactNode } from "react";
import "./Modal.css";

interface ModalProps {
  children: ReactNode;
  onClose: () => void;
}

function Modal({ children, onClose }: ModalProps) {
  return (
    <>
      <div className="modal-base" onClick={onClose}></div>
      <div className="modal-menu" >
        {children}
      </div>
    </>
  );
}

export default Modal;

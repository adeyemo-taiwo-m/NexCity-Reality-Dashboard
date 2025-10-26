import { cloneElement, createContext, useContext, useState } from "react";
import { createPortal } from "react-dom";
import { HiXMark } from "react-icons/hi2";
import useOutsideClickModal from "../hooks/useOutsideClickModal";

// Context
const ModalContext = createContext();

export default function Modal({ children }) {
  const [isOpenModal, setIsOpenModal] = useState("");

  const open = (modalName) => setIsOpenModal(modalName);
  const close = () => setIsOpenModal("");

  return (
    <ModalContext.Provider value={{ isOpenModal, open, close }}>
      {children}
    </ModalContext.Provider>
  );
}

/* =========================
   Button to open modal
========================= */
function ButtonOpenModal({ children, name: openModalName }) {
  const { open } = useContext(ModalContext);
  return cloneElement(children, { onClick: () => open(openModalName) });
}

/* =========================
   Modal content component
========================= */
function ModalContent({ children, name }) {
  const { close, isOpenModal } = useContext(ModalContext);
  const ref = useOutsideClickModal(close);
  if (name !== isOpenModal) return null;

  return createPortal(
    <div className="fixed inset-0  bg-white/30 backdrop-blur-md flex items-center justify-center animate-fadeIn z-50">
      <div
        ref={ref}
        className="
          relative bg-white/90 backdrop-blur-md rounded-2xl shadow-xl
          w-[90%]  lap:w-3/7 p-6
          border border-white
          transition-all duration-300
        "
      >
        {/* Close button */}
        <button
          onClick={close}
          className="
            absolute top-3 right-3 p-2 rounded-full
            text-neutral-600 hover:bg-[var(--color-light-hover)]
            transition-colors
          "
        >
          <HiXMark size={20} />
        </button>

        {/* Render modal children */}
        <div>{cloneElement(children, { onCloseModal: close })}</div>
      </div>
    </div>,
    document.body
  );
}

Modal.ButtonOpenModal = ButtonOpenModal;
Modal.ModalContent = ModalContent;

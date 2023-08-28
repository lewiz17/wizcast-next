import ContactForm from "./FormContact";
import { useModalContext } from "./ModalContext";

const Modal = () => {
  const { isOpen, closeModal } = useModalContext();

  return (
    <div>
      {isOpen && (
        <div className="modalBackdrop">
          <div className="modalContent">
            <span className="close text-black" onClick={closeModal}>
              &times;
            </span>
            <div className="contact-wrapper">
              <ContactForm />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Modal;

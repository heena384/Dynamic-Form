import { Button } from "antd";
import { ModalContainer } from "./Modal.styles";

interface ModalProps {
  show: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ show, onClose, title, children }) => {
  return (
    <ModalContainer
      open={show}
      title={title}
      footer={null} // No footer by default
      onCancel={onClose}
      closeIcon={<span style={{ display: "none" }} />} // Add custom close behavior
    >
      {children}
      <div className="button-wrapper">
        <Button onClick={onClose} type="primary" className="close-btn">
          Close
        </Button>
      </div>
    </ModalContainer>
  );
};

export default Modal;

import { MouseEventHandler } from 'react';
import Modal from 'react-modal';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

interface Props {
  isOpen: boolean;
  closeModal: MouseEventHandler;
  portalClassName: string;
  children: JSX.Element;
}

export const ModalTemplate = ({ isOpen, closeModal, portalClassName, children }: Props) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeModal}
      portalClassName={portalClassName}
      style={customStyles}
      contentLabel='Example Modal'
    >
      {children}
    </Modal>
  );
};

import { useState } from 'react';

export const useModal = () => {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => setIsOpen(true);
  // const closeModal = () => setIsOpen(false);
  const closeModal = (handler: Function) => {
    handler();
    setIsOpen(false);
  };

  return { isOpen, openModal, closeModal };
};

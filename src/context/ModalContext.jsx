import React, { createContext, useContext, useState } from "react";

const ModalContext = createContext();

export const useModal = () => useContext(ModalContext);

export const ModalProvider = ({ children }) => {
  const [genericModalContent, setGenericModalContent] = useState(null);

  const openGenericModal = (content) => setGenericModalContent(content);
  const closeGenericModal = () => setGenericModalContent(null);

  return (
    <ModalContext.Provider
      value={{
        openGenericModal,
        closeGenericModal,
      }}
    >
      {children}
      {genericModalContent && (
        <div className="modal-overlay">
          <div className="modal-content">{genericModalContent}</div>
        </div>
      )}
    </ModalContext.Provider>
  );
};

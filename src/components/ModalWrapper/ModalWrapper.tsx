import { Modal } from "../Modal/Modal";
import React, { ReactElement, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ModalWrapper({ children }: { children: ReactElement }) {
  const navigate = useNavigate();
  const [modalIsVisible] = useState(true);

  useEffect(() => {
    document.body.classList.add("modal-opened");

    return () => {
      document.body.classList.remove("modal-opened");
    };
  }, []);

  return (
    <Modal
      visible={modalIsVisible}
      hide={() => {
        navigate("/browse");
      }}
      width={"60%"}
    >
      {children}
    </Modal>
  );
}

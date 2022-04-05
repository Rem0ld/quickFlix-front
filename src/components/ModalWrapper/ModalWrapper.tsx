import { Modal } from "../Modal/Modal";
import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Details from "../Details/Details";

export default function ModalWrapper() {
  const navigate = useNavigate();
  const [modalIsVisible] = useState(true);
  const [searchParams] = useSearchParams();

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
      <Details
        hide={() => navigate("/browse")}
        play={(id) =>
          navigate(`/player/${id}`, { state: searchParams.get("id") })
        }
      />
    </Modal>
  );
}

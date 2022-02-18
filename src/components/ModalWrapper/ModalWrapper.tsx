import { Modal } from "../Modal/Modal";
import React, { useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import Details from "../Details/Details";

export default function ModalWrapper() {
  const navigate = useNavigate();
  const [modalIsVisible, setModalIsVisible] = useState(true);
  const [searchParams] = useSearchParams();

  console.log(searchParams.get("id"));

  return (
    <Modal
      visible={modalIsVisible}
      hide={() => setModalIsVisible(false)}
      width={"60%"}
    >
      <Details
        randomNum={0}
        hide={() => setModalIsVisible(false)}
        play={(id) => navigate(`/player/${id}`, { state: id })}
      />
    </Modal>
  );
}

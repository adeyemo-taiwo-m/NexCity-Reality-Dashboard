import React from "react";
import Heading from "../../ui/Heading";
import Button from "../../ui/Button";
import Modal from "../../ui/Modal";
import AddAgentModal from "./AddAgentsModal";

function Header() {
  return (
    <header className="flex items-center justify-between w-full">
      <Heading>Agents</Heading>

      <Modal>
        <Modal.ButtonOpenModal name="add-agent">
          <Button>Add Agent</Button>
        </Modal.ButtonOpenModal>

        <Modal.ModalContent name="add-agent">
          <AddAgentModal />
        </Modal.ModalContent>
      </Modal>
    </header>
  );
}

export default Header;

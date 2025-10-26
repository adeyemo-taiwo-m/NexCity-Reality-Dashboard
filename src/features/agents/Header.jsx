import React from "react";
import Heading from "../../ui/Heading";
import Button from "../../ui/Button";
import Modal from "../../ui/Modal";
import AddAgentModal from "./AddAgentsModal";

function Header() {
  function handleAddAgent(newAgent) {
    console.log("New agent added:", newAgent);
    // You can later insert into Supabase here
  }

  return (
    <header className="flex items-center justify-between w-full">
      <Heading>Agents</Heading>

      <Modal>
        <Modal.ButtonOpenModal name="add-agent">
          <Button>Add Agent</Button>
        </Modal.ButtonOpenModal>

        <Modal.ModalContent name="add-agent">
          <AddAgentModal onSubmit={handleAddAgent} />
        </Modal.ModalContent>
      </Modal>
    </header>
  );
}

export default Header;

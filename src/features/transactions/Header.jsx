import Button from "../../ui/Button";
import Heading from "../../ui/Heading";
import Modal from "../../ui/Modal";
import AddTransactionModal from "./AddTransactionModal";

function Header() {
  return (
    <header className="flex items-center justify-between w-full">
      <Heading>Transaction</Heading>
      <Modal>
        <Modal.ButtonOpenModal name="add-agent">
          <Button>Add Transaction</Button>
        </Modal.ButtonOpenModal>

        <Modal.ModalContent name="add-agent">
          <AddTransactionModal />
        </Modal.ModalContent>
      </Modal>
    </header>
  );
}

export default Header;

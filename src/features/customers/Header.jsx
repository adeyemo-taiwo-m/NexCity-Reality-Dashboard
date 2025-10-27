import Heading from "../../ui/Heading";
import Button from "../../ui/Button";
import Modal from "../../ui/Modal";
import AddCustomerModal from "./AddCustomerModal";

function Header() {
  return (
    <header className="flex items-center justify-between w-full">
      <Heading>Customers</Heading>
      <Modal>
        <Modal.ButtonOpenModal name="add-agent">
          <Button>Add Customer</Button>
        </Modal.ButtonOpenModal>

        <Modal.ModalContent name="add-agent">
          <AddCustomerModal />
        </Modal.ModalContent>
      </Modal>
    </header>
  );
}

export default Header;

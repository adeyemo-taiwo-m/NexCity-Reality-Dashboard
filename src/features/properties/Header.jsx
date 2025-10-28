import Button from "../../ui/Button";
import Heading from "../../ui/Heading";
import Modal from "../../ui/Modal";
import AddPropertiesModal from "./AddPropertiesModal";

function Header() {
  return (
    <header className="flex items-center justify-between w-full">
      {/* Title */}
      <Heading>Properties</Heading>
      <Modal>
        <Modal.ButtonOpenModal name="add-property">
          <Button>Add Property</Button>
        </Modal.ButtonOpenModal>

        <Modal.ModalContent name="add-property">
          <AddPropertiesModal />
        </Modal.ModalContent>
      </Modal>
    </header>
  );
}

export default Header;

import {
  Modal,
  ModalBody,
  ModalContent,
  Image,
  ModalCloseButton,
} from "@chakra-ui/react";
import React from "react";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  src?: string;
};

const ChkrImageModal: React.FC<Props> = ({ isOpen, onClose, src }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalContent>
        <ModalCloseButton size="sm" />
        <ModalBody px="50px" py="50px">
          <Image src={src} width="100%" />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default ChkrImageModal;

import {
  Input,
  Text,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  VStack,
  ModalCloseButton,
  HStack,
} from "@chakra-ui/react";
import React from "react";
import { User } from "../../types";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  users: User[];
};

const ChannelModal: React.FC<Props> = ({ isOpen, onClose, users }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay bg="brand.primary" />
      <ModalContent>
        <ModalBody px="30px" py="30px">
          <ModalCloseButton />
          <VStack>
            <Text>Create Channel</Text>
            <Input name="channelName" placeholder="Name" />
            <VStack>
              {users.map((u, i) => (
                <HStack key={i}>
                  <Text>{u.username}</Text>
                </HStack>
              ))}
            </VStack>
          </VStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default ChannelModal;

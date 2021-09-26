import React, { useState } from "react";
import { IoMdAdd, IoMdTrash } from "react-icons/io";

import {
  Button,
  HStack,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  Text,
  VStack,
} from "@chakra-ui/react";

import { User } from "../../types";
import { useCreateChannel } from "../../hooks/mutations/useCreateChannel";
import { useEffect } from "react";
import { GET_CHANNELS } from "../../hooks/queries/useGetChannels";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  users: User[];
};

const ChannelModal: React.FC<Props> = ({ isOpen, onClose, users }) => {
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [channelName, setChannelName] = useState<string>();
  const [error, setError] = useState<string>();

  const [createChannel, { error: createChannelError }] = useCreateChannel({
    refetchQueries: [GET_CHANNELS],
  });

  useEffect(() => {
    createChannelError && setError(createChannelError?.message);
  }, [createChannelError]);

  const selectUser = (id: string) =>
    setSelectedUsers(
      selectedUsers.includes(id)
        ? selectedUsers.filter((u) => u !== id)
        : [...selectedUsers, id]
    );

  const _onClose = () => {
    onClose();
    setChannelName("");
    setSelectedUsers([]);
    setError("");
  };

  const onCreateChannel = async () => {
    if (!channelName || !selectedUsers.length) return;
    try {
      const res = await createChannel({
        variables: {
          name: channelName,
          users: selectedUsers,
        },
      });
      if (res.data && !res.errors) {
        _onClose();
      }
    } catch (e) {}
  };

  return (
    <Modal isOpen={isOpen} onClose={_onClose}>
      <ModalContent>
        <ModalBody px="30px" py="30px">
          <ModalCloseButton onClick={_onClose} _focus={{ border: "none" }} />
          <VStack spacing="15px" width="100%">
            <Text fontSize="xl" color="brand.secondary.600" fontWeight="bold">
              Créer un chat
            </Text>
            <Input
              name="channelName"
              placeholder="Nom"
              onChange={(e) => setChannelName(e.target.value)}
              maxWidth="300px"
            />
            <VStack spacing="5px" width="100%">
              {users.map((u, i) => (
                <HStack key={i} width="100%" justifyContent="center">
                  <Button
                    onClick={() => selectUser(u.id)}
                    variant="outline"
                    width="100%"
                    maxWidth="300px"
                    justifyContent="space-between"
                  >
                    <Text>{u.username}</Text>
                    {selectedUsers.includes(u.id) ? <IoMdTrash /> : <IoMdAdd />}
                  </Button>
                </HStack>
              ))}
            </VStack>
            {error && (
              <Text
                fontSize="xs"
                color="brand.secondary.800"
                width="100%"
                my="5px"
                textAlign="center"
              >
                {error}
              </Text>
            )}
            <Button
              onClick={onCreateChannel}
              disabled={!channelName || !selectedUsers.length}
            >
              Créer
            </Button>
          </VStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default ChannelModal;

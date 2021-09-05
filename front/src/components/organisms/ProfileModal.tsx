import React from "react";

import {
  Avatar,
  Button,
  HStack,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useGetUser } from "../../hooks/queries/useGetUser";
import { useCurrentUser } from "../../contexts/currentUserContext";
import { useDeleteUser } from "../../hooks/mutations/useDeleteUser";
import { GET_USERS } from "../../hooks/queries/useGetUsers";
import { useApollo } from "../../contexts/apolloContext";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onOpenChat?: (id: string) => void;
  userId: string;
};

const ChannelModal: React.FC<Props> = ({
  isOpen,
  onClose,
  userId,
  onOpenChat,
}) => {
  const { data: user } = useGetUser({ variables: { id: userId } });
  const { currentUser } = useCurrentUser();
  const [deleteUser] = useDeleteUser();
  const { clearToken } = useApollo();

  const _onClose = () => {
    onClose();
  };

  const _onOpenChat = () => {
    onOpenChat && onOpenChat(userId);
    onClose();
  };

  const onDeleteUser = async () => {
    try {
      const res = await deleteUser({
        variables: { id: userId },
        refetchQueries: [GET_USERS],
      });
      if (res) onClose();
    } catch (e) {}
  };

  const onLogOut = () => clearToken();

  const isCurrentUser = userId === currentUser?.id;

  return (
    <Modal isOpen={isOpen} onClose={_onClose}>
      {!!user?.user && (
        <ModalContent>
          <ModalBody px="30px" py="30px">
            <ModalCloseButton onClick={_onClose} />
            <VStack spacing="15px" width="100%">
              <Avatar
                name={user?.user.firstName + " " + user?.user.lastName}
                size="md"
                bg="#AED6F1"
              />
              <Text fontSize="md" color="brand.primary" fontWeight="semibold">
                {user?.user.email}
              </Text>
              <Text fontSize="md" color="brand.primary" fontWeight="bold">
                {user?.user.username}
              </Text>
              <Text fontSize="md" color="brand.primary" fontWeight="semibold">
                {user?.user.firstName} {user?.user.lastName}
              </Text>
            </VStack>
            <HStack justifyContent="space-evenly" mt="30px">
              {!!onOpenChat && <Button onClick={_onOpenChat}>Open chat</Button>}
              {(isCurrentUser || currentUser?.isAdmin) && (
                <Button onClick={onDeleteUser}>Delete</Button>
              )}
              {!onOpenChat && isCurrentUser && (
                <Button onClick={onLogOut}>Log out</Button>
              )}
            </HStack>
          </ModalBody>
        </ModalContent>
      )}
    </Modal>
  );
};

export default ChannelModal;

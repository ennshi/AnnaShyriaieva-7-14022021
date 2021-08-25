import React, { useEffect } from "react";
import { IoMdAdd } from "react-icons/io";

import {
  Avatar,
  Button,
  HStack,
  IconButton,
  Text,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";

import { useCurrentUser } from "../../contexts/currentUserContext";
import { useCreateChannel } from "../../hooks/mutations/useCreateChannel";
import {
  GET_CHANNELS,
  useGetChannels,
} from "../../hooks/queries/useGetChannels";
import { useGetUsers } from "../../hooks/queries/useGetUsers";
import { Channel, User } from "../../types";
import ChannelModal from "./ChannelModal";

type Props = {
  setChannelId: (id: string) => void;
};

const isCurrentUserSavedMessagesChannel = (
  name: string,
  currentUserId: string
) => {
  return name === `saved--${currentUserId}`;
};

const isDirectChannel = (name: string) => {
  return name.includes("direct--");
};

const isDirectChannelWithUser = (
  name: string,
  currentUserId: string,
  userId: string
) => {
  return (
    name === `direct--${currentUserId}--${userId}` ||
    name === `direct--${userId}--${currentUserId}`
  );
};

const ChannelsAndUsers: React.FC<Props> = ({ setChannelId }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { data: usersData } = useGetUsers();
  const { data: channelsData } = useGetChannels();
  const { currentUser } = useCurrentUser();

  const [createChannel] = useCreateChannel({ refetchQueries: [GET_CHANNELS] });

  useEffect(() => {
    if (!channelsData?.channels) return;
    const generalChannelId = channelsData?.channels?.find(
      (ch: Channel) => ch?.name === "general"
    ).id;
    setChannelId(generalChannelId);
  }, [channelsData, currentUser?.id, setChannelId]);

  const finalChannels =
    channelsData?.channels?.filter(
      (ch: Channel) =>
        !isDirectChannel(ch.name) &&
        !isCurrentUserSavedMessagesChannel(ch.name, currentUser?.id || "")
    ) || [];

  const onChannelClick = (id: string) => setChannelId(id);
  const onUserClick = async (userId: string) => {
    const foundChannel = channelsData?.channels?.find((ch: Channel) =>
      userId === currentUser?.id
        ? isCurrentUserSavedMessagesChannel(ch?.name, currentUser?.id)
        : isDirectChannelWithUser(ch?.name, currentUser?.id || "", userId)
    );
    if (foundChannel) return setChannelId(foundChannel.id);
    try {
      const createdChannel = await createChannel({
        variables: {
          name:
            userId === currentUser?.id
              ? `saved--${currentUser?.id}`
              : `direct--${userId}--${currentUser?.id}`,
          users: userId === currentUser?.id ? [] : [userId],
        },
      });
      setChannelId(createdChannel?.data?.channel?.id);
    } catch (e) {
      console.log(e);
    }
  };

  const createNewChannel = () => onOpen();

  return (
    <>
      <VStack
        width="300px"
        bgColor="brand.primary"
        height="100vh"
        spacing="20px"
        textAlign="left"
        overflowY="scroll"
        px="10px"
      >
        <VStack spacing="0" w="100%">
          <HStack justifyContent="space-between" w="100%">
            <Text color="gray.100">CHANNELS</Text>
            {currentUser?.isAdmin && (
              <IconButton
                aria-label="send image"
                bg="transparent"
                borderRadius="none"
                width={10}
                onClick={createNewChannel}
                icon={<IoMdAdd color="white" />}
              />
            )}
          </HStack>
          {!!finalChannels?.length &&
            finalChannels.map((ch: any, i: number) => (
              <Button
                variant="unstyled"
                key={i}
                color="gray.100"
                onClick={() => onChannelClick(ch.id)}
                w="100%"
                textAlign="left"
                paddingLeft="10px"
              >{`#${ch.name}`}</Button>
            ))}
        </VStack>
        <VStack spacing="0" w="100%">
          <Text color="gray.100" w="100%">
            USERS
          </Text>
          {!!usersData?.users?.length &&
            usersData.users.map((u: User, i: number) => (
              <Button
                variant="unstyled"
                key={i}
                color="gray.100"
                onClick={() => onUserClick(u.id)}
                w="100%"
                textAlign="left"
                paddingLeft="10px"
              >
                <HStack>
                  <Avatar
                    name={u.firstName + " " + u.lastName}
                    size="xs"
                    bg="#AED6F1"
                  />
                  <Text>{`${u.username}`}</Text>
                </HStack>
              </Button>
            ))}
        </VStack>
      </VStack>
      <ChannelModal
        isOpen={isOpen}
        onClose={onClose}
        users={
          (usersData &&
            usersData.users.filter((u: User) => u.id !== currentUser?.id)) ||
          []
        }
      />
    </>
  );
};

export default ChannelsAndUsers;

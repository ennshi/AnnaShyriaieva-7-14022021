import React, { MouseEvent, useEffect, useState } from "react";
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
import { BsThreeDotsVertical } from "react-icons/bs";
import ProfileModal from "./ProfileModal";
import { IoChevronBackSharp } from "react-icons/io5";

export type ChannelsAndUsersProps = {
  setChannelId: (id: string) => void;
  threadId?: string;
  channelId?: string;
  width?: string;
  closeDrawer?: () => void;
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

const ChannelsAndUsers: React.FC<ChannelsAndUsersProps> = ({
  setChannelId,
  threadId,
  channelId,
  width,
  closeDrawer,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const {
    isOpen: isOpenProfile,
    onOpen: onOpenProfile,
    onClose: onCloseProfile,
  } = useDisclosure();

  const { currentUser } = useCurrentUser();
  const { data: usersData, stopPolling: stopPollingUsers } = useGetUsers({
    pollInterval: 1000,
  });
  const { data: channelsData, stopPolling: stopPollingChannels } =
    useGetChannels({ pollInterval: 1000 });

  useEffect(() => {
    return () => {
      stopPollingChannels();
      stopPollingUsers();
    };
  }, [stopPollingChannels, stopPollingUsers]);

  const [createChannel] = useCreateChannel({ refetchQueries: [GET_CHANNELS] });
  const [profileId, setProfileId] = useState<string>();

  useEffect(() => {
    if (!channelsData?.channels || !!threadId || !!channelId) return;
    const generalChannelId = channelsData?.channels?.find(
      (ch: Channel) => ch?.name === "general"
    ).id;
    setChannelId(generalChannelId);
  }, [channelId, channelsData, currentUser?.id, setChannelId, threadId]);

  const finalChannels =
    channelsData?.channels?.filter(
      (ch: Channel) =>
        !isDirectChannel(ch.name) &&
        !isCurrentUserSavedMessagesChannel(ch.name, currentUser?.id || "")
    ) || [];

  const onChannelClick = (id: string) => {
    closeDrawer && closeDrawer();
    setChannelId(id);
  };
  const onUserClick = async (userId: string) => {
    closeDrawer && closeDrawer();
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

  const _onOpenProfile = (
    e: React.MouseEvent<HTMLButtonElement, globalThis.MouseEvent>,
    id: string
  ) => {
    e.stopPropagation();
    setProfileId(id);
    onOpenProfile();
  };

  return (
    <>
      <VStack
        w={width || "300px"}
        bgColor="brand.primary.700"
        height="100vh"
        spacing="20px"
        textAlign="left"
        overflowY="auto"
        px="10px"
      >
        <VStack spacing="0" w="100%">
          {closeDrawer && (
            <HStack w="100%">
              <IconButton
                aria-label="back button"
                bg="transparent"
                onClick={closeDrawer}
                icon={<IoChevronBackSharp color="white" />}
                _focus={{ border: "none" }}
              />
            </HStack>
          )}
          <HStack
            justifyContent="space-between"
            w="100%"
            mt={!!closeDrawer ? 0 : "40px"}
          >
            <Text color="gray.100" fontSize="l">
              Channels
            </Text>
            {currentUser?.isAdmin && (
              <IconButton
                aria-label="send image"
                bg="transparent"
                borderRadius="none"
                width={10}
                onClick={createNewChannel}
                icon={<IoMdAdd color="white" />}
                _focus={{ border: "none" }}
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
                _focus={{ border: "none" }}
              >{`#${ch.name}`}</Button>
            ))}
        </VStack>
        <VStack spacing="0" w="100%">
          <Text color="gray.100" w="100%" fontSize="l">
            Users
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
                _focus={{ border: "none" }}
              >
                <HStack justifyContent="space-between">
                  <HStack>
                    <Avatar
                      name={u.firstName + " " + u.lastName}
                      size="xs"
                      bg="brand.primary.300"
                    />
                    <Text>{`${u.username}`}</Text>
                  </HStack>
                  <IconButton
                    size="xs"
                    aria-label="show profile"
                    icon={<BsThreeDotsVertical />}
                    variant="unstyled"
                    justifyContent="center"
                    display="flex"
                    onClick={(e) => _onOpenProfile(e, u.id)}
                    _focus={{ border: "none" }}
                  />
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
      <ProfileModal
        isOpen={isOpenProfile}
        onClose={onCloseProfile}
        userId={profileId || ""}
        onOpenChat={onUserClick}
      />
    </>
  );
};

export default ChannelsAndUsers;

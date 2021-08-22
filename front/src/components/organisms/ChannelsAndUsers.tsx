import {
  Avatar,
  Button,
  HStack,
  IconButton,
  Text,
  VStack,
} from "@chakra-ui/react";
import React, { useEffect } from "react";
import { useCurrentUser } from "../../contexts/currentUserContext";
import { useCreateChannel } from "../../hooks/mutations/useCreateChannel";
import { useGetChannels } from "../../hooks/queries/useGetChannels";
import { useGetUsers } from "../../hooks/queries/useGetUsers";
import { Channel, User } from "../../types";
import { IoMdAdd } from "react-icons/io";

type Props = {
  setChannelId: (id: string) => void;
};

const ChannelsAndUsers: React.FC<Props> = ({ setChannelId }) => {
  const { data: usersData } = useGetUsers();
  const { data: channelsData } = useGetChannels();
  const { currentUser } = useCurrentUser();

  const [createChannel] = useCreateChannel();

  useEffect(() => {
    if (!channelsData?.channels) return;
    const generalChannelId = channelsData?.channels?.find(
      (ch: Channel) => ch.name === "general"
    )?.id;
    setChannelId(generalChannelId);
  }, [channelsData, setChannelId]);

  const finalChannels =
    channelsData?.channels?.filter(
      (ch: Channel) => ch?.users?.length > 2 || ch.name === "general"
    ) || [];

  const onChannelClick = (id: string) => setChannelId(id);
  const onUserClick = async (userId: string) => {
    const foundChannel = channelsData?.channels?.find((ch: Channel) =>
      userId === currentUser?.id
        ? ch?.users?.length === 1
        : ch?.users?.length === 2 && !!ch?.users?.find((u) => u.id === userId)
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

  const createNewChannel = () => {};

  return (
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
  );
};

export default ChannelsAndUsers;

import { Button, Text, VStack } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { useCurrentUser } from "../../contexts/currentUserContext";
import { useCreateChannel } from "../../hooks/mutations/useCreateChannel";
import { useGetChannels } from "../../hooks/queries/useGetChannels";
import { useGetUsers } from "../../hooks/queries/useGetUsers";
import { Channel } from "../../types";

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
  return (
    <VStack
      width="300px"
      bgColor="brand.primary"
      height="100vh"
      spacing="20px"
      textAlign="left"
      overflowY="scroll"
    >
      <VStack spacing="0" w="100%">
        <Text color="gray.100">CHANNELS</Text>
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
        <Text color="gray.100">USERS</Text>
        {!!usersData?.users?.length &&
          usersData.users.map((u: any, i: number) => (
            <Button
              variant="unstyled"
              key={i}
              color="gray.100"
              onClick={() => onUserClick(u.id)}
              w="100%"
              textAlign="left"
              paddingLeft="10px"
            >{`${u.username}`}</Button>
          ))}
      </VStack>
    </VStack>
  );
};

export default ChannelsAndUsers;

import { Button, Text, VStack } from "@chakra-ui/react";
import React from "react";
import { useGetChannels } from "../../hooks/queries/useGetChannels";
import { useGetUsers } from "../../hooks/queries/useGetUsers";

type Props = {
  setEntitySelected: (entity: "user" | "channel") => void;
  setIdSelected: (id: string) => void;
};
const ChannelsAndUsers: React.FC<Props> = ({
  setEntitySelected,
  setIdSelected,
}) => {
  const { data: usersData } = useGetUsers();
  const { data: channelsData } = useGetChannels();

  const finalChannels = channelsData?.channels?.filter(
    (ch: any) => ch?.users.length > 2
  );
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
              onClick={() => {
                setEntitySelected("channel");
                setIdSelected(ch.id);
                console.log(ch.id);
              }}
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
              onClick={() => {
                setEntitySelected("user");
                setIdSelected(u.id);
                console.log(u.id);
              }}
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

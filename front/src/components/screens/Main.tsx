import React, { useState } from "react";
import { HStack } from "@chakra-ui/react";
import ChannelsAndUsers from "../organisms/ChannelsAndUsers";
import ChatView from "../organisms/ChatView";

const Main: React.FC = ({}) => {
  const [channelId, setChannelId] = useState<string>();

  return (
    <HStack spacing="0">
      <ChannelsAndUsers setChannelId={setChannelId} />
      {channelId && <ChatView channelId={channelId} />}
    </HStack>
  );
};

export default Main;

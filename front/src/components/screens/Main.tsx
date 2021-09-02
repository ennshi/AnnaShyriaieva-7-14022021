import React, { useState } from "react";
import { HStack } from "@chakra-ui/react";
import ChannelsAndUsers from "../organisms/ChannelsAndUsers";
import ChatView from "../organisms/ChatView";
import ThreadView from "../organisms/ThreadView";

const Main: React.FC = ({}) => {
  const [channelId, setChannelId] = useState<string>();
  const [messageWithResponsesId, setMessageWithResponsesId] =
    useState<string>();

  const onShowThreadView = (id: string) => setMessageWithResponsesId(id);
  const onHideThreadView = () => setMessageWithResponsesId("");
  const onShowChannel = (id: string) => {
    setChannelId(id);
    onHideThreadView();
  };

  return (
    <HStack spacing="0">
      <ChannelsAndUsers
        setChannelId={onShowChannel}
        threadId={messageWithResponsesId}
        channelId={channelId}
      />
      {!!messageWithResponsesId && !!channelId && (
        <ThreadView
          channelId={channelId}
          messageId={messageWithResponsesId}
          onClose={onHideThreadView}
        />
      )}
      {!!channelId && !messageWithResponsesId && (
        <ChatView channelId={channelId} onShowResponses={onShowThreadView} />
      )}
    </HStack>
  );
};

export default Main;

import React, { useState } from "react";
import { HStack, useDisclosure } from "@chakra-ui/react";
import ChannelsAndUsers from "../organisms/ChannelsAndUsers";
import ChatView from "../organisms/ChatView";
import ThreadView from "../organisms/ThreadView";
import ProfileModal from "../organisms/ProfileModal";
import { useCurrentUser } from "../../contexts/currentUserContext";

const Main: React.FC = ({}) => {
  const [channelId, setChannelId] = useState<string>();
  const [messageWithResponsesId, setMessageWithResponsesId] =
    useState<string>();
  const {
    isOpen: isOpenProfile,
    onOpen: onOpenCurrentUserProfile,
    onClose: onCloseProfile,
  } = useDisclosure();
  const { currentUser } = useCurrentUser();

  const onShowThreadView = (id: string) => setMessageWithResponsesId(id);
  const onHideThreadView = () => setMessageWithResponsesId("");
  const onShowChannel = (id: string) => {
    setChannelId(id);
    onHideThreadView();
  };

  return (
    <>
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
            onOpenCurrentUserProfile={onOpenCurrentUserProfile}
          />
        )}
        {!!channelId && !messageWithResponsesId && (
          <ChatView
            channelId={channelId}
            onShowResponses={onShowThreadView}
            onOpenCurrentUserProfile={onOpenCurrentUserProfile}
          />
        )}
      </HStack>
      <ProfileModal
        isOpen={isOpenProfile}
        onClose={onCloseProfile}
        userId={currentUser?.id || ""}
      />
    </>
  );
};

export default Main;

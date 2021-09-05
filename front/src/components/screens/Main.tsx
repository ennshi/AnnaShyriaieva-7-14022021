import React, { useEffect, useState } from "react";
import { HStack, useDisclosure } from "@chakra-ui/react";
import ChannelsAndUsers from "../organisms/ChannelsAndUsers";
import ChatView from "../organisms/ChatView";
import ThreadView from "../organisms/ThreadView";
import ProfileModal from "../organisms/ProfileModal";
import { useCurrentUser } from "../../contexts/currentUserContext";
import ChannelsAndUsersDrawer from "../organisms/ChannelsAndUsersDrawer";
import useWindowDimensions from "../../hooks/useWindowDimensions";

const Main: React.FC = ({}) => {
  const [channelId, setChannelId] = useState<string>();
  const [messageWithResponsesId, setMessageWithResponsesId] =
    useState<string>();
  const { width } = useWindowDimensions();
  const isSmallScreen = width < 600;

  const {
    isOpen: isOpenProfile,
    onOpen: onOpenCurrentUserProfile,
    onClose: onCloseProfile,
  } = useDisclosure();
  const {
    isOpen: isOpenChannelsAndUsers,
    onOpen: onOpenChannelsAndUsers,
    onClose: onCloseChannelsAndUsers,
  } = useDisclosure();

  const { currentUser } = useCurrentUser();

  useEffect(() => {
    if (isSmallScreen) {
      onOpenChannelsAndUsers();
    }
  }, [isSmallScreen, onOpenChannelsAndUsers]);

  const onShowThreadView = (id: string) => setMessageWithResponsesId(id);
  const onHideThreadView = () => setMessageWithResponsesId("");
  const onShowChannel = (id: string) => {
    setChannelId(id);
    onHideThreadView();
  };

  return (
    <>
      <HStack spacing="0">
        {!isSmallScreen && (
          <ChannelsAndUsers
            setChannelId={onShowChannel}
            threadId={messageWithResponsesId}
            channelId={channelId}
          />
        )}
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
            openDrawer={onOpenChannelsAndUsers}
          />
        )}
      </HStack>
      <ProfileModal
        isOpen={isOpenProfile}
        onClose={onCloseProfile}
        userId={currentUser?.id || ""}
      />
      <ChannelsAndUsersDrawer
        isOpen={isOpenChannelsAndUsers}
        onClose={onCloseChannelsAndUsers}
        setChannelId={onShowChannel}
        threadId={messageWithResponsesId}
        channelId={channelId}
      />
    </>
  );
};

export default Main;

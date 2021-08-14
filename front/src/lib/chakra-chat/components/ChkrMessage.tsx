import React from "react";

import { Box, BoxProps, HStack } from "@chakra-ui/react";

import { IMessage, User } from "../types";
import { isSameDay, isSameUser } from "../utils";
import ChkrAvatar, { ChkrAvatarProps } from "./ChkrAvatar";
import ChkrBubble, { ChkrBubbleProps } from "./ChkrBubble";
import ChkrDay from "./ChkrDay";

export interface ChkrMessageProps<TMessage extends IMessage = IMessage> {
  key: string | number;
  position: "left" | "right";
  user: User;
  showUserAvatar?: boolean;
  renderAvatar?: (props: ChkrAvatarProps<TMessage>) => React.ReactNode;
  renderBubble?: (props: ChkrBubbleProps<TMessage>) => React.ReactNode;
  currentMessage?: TMessage;
  nextMessage?: TMessage;
  previousMessage?: TMessage;
  inverted?: boolean;
  containerStyle?: BoxProps;
  showImage?: (src: string) => void;
}

const ChkrMessage: <TMessage extends IMessage = IMessage>(
  p: ChkrMessageProps<TMessage>
) => React.ReactElement = (props) => {
  const {
    currentMessage,
    showUserAvatar = true,
    position,
    previousMessage,
    nextMessage,
    renderAvatar,
    inverted,
    renderBubble,
  } = props;

  const renderChkrBubble = () => {
    if (renderBubble) return renderBubble(props);
    return <ChkrBubble {...props} />;
  };

  const renderBubbleWithAvatar = () => {
    const renderChkrAvatar = () => {
      if (renderAvatar) return renderAvatar(props);
      return <ChkrAvatar {...props} />;
    };
    if (!showUserAvatar) return <ChkrBubble {...props} />;
    return (
      <>
        {position === "left" && renderChkrAvatar()}
        {renderChkrBubble()}
        {position === "right" && renderChkrAvatar()}
      </>
    );
  };

  return (
    <Box
      w="100%"
      mt={
        (!inverted && !previousMessage?.text) ||
        (inverted && !nextMessage?.text)
          ? "auto"
          : "0"
      }
    >
      <ChkrDay {...props} />
      <HStack
        spacing="8px"
        w="100%"
        alignItems="flex-end"
        mt={
          (!inverted &&
            isSameDay(currentMessage!, previousMessage!) &&
            (isSameUser(currentMessage!, previousMessage) ? "8px" : "24px")) ||
          0
        }
        mb={
          (inverted &&
            isSameDay(currentMessage!, previousMessage!) &&
            (isSameUser(currentMessage!, previousMessage) ? "8px" : "24px")) ||
          0
        }
      >
        {renderBubbleWithAvatar()}
      </HStack>
    </Box>
  );
};

export default ChkrMessage;

import { useDisclosure, VStack, Text } from "@chakra-ui/react";
import React, { useState } from "react";

import { IMessage, User } from "../types";
import ChkrImageModal from "./ChkrImageModal";
import ChkrMessage, { ChkrMessageProps } from "./ChkrMessage";

export interface ChkrMessagesProps<TMessage extends IMessage> {
  showUserAvatar?: boolean;
  messages?: TMessage[];
  inverted?: boolean;
  isTyping?: boolean;
  user?: User;
  infiniteScroll?: boolean;
}

const ChkrMessages: <TMessage extends IMessage = IMessage>(
  p: ChkrMessagesProps<TMessage>
) => React.ReactElement<ChkrMessagesProps<TMessage>> = ({
  messages = [],
  user,
  showUserAvatar,
  inverted,
  ...props
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [imageSrc, setImageSrc] = useState<string>();

  const showImage = (src: string) => {
    setImageSrc(src);
    onOpen();
  };

  const onCloseImage = () => {
    onClose();
    setImageSrc(undefined);
  };

  const renderRow = <TMessage extends IMessage = IMessage>({
    item,
    index,
  }: {
    item: TMessage;
    index: number;
  }) => {
    if (user && item) {
      const previousMessage =
        (inverted ? messages[index + 1] : messages[index - 1]) || {};
      const nextMessage =
        (inverted ? messages[index - 1] : messages[index + 1]) || {};

      const messageProps: ChkrMessageProps<TMessage> = {
        user,
        showUserAvatar,
        key: item._id,
        currentMessage: item,
        previousMessage: previousMessage as unknown as TMessage,
        inverted,
        nextMessage: nextMessage as unknown as TMessage,
        position: item.user._id === user._id ? "right" : "left",
        showImage,
      };
      return <ChkrMessage {...messageProps} {...props} />;
    }
  };

  const renderMessages = () => {
    if (messages?.length)
      return messages.map((message, i) =>
        renderRow({ item: message, index: i })
      );
    return (
      <VStack justifyContent="flex-end" h="100vh">
        <Text fontSize="md" color="gray.400" mb="20px">
          Commencez votre communication...
        </Text>
      </VStack>
    );
  };

  return (
    <>
      {renderMessages()}
      <ChkrImageModal isOpen={isOpen} onClose={onCloseImage} src={imageSrc} />
    </>
  );
};

export default ChkrMessages;

import React, { useRef } from "react";
import useInfiniteScroll from "react-infinite-scroll-hook";

import {
  Box,
  BoxProps,
  Flex,
  FlexProps,
  TextProps,
  Text,
} from "@chakra-ui/react";

import { ScrollContextProvider } from "../context/scrollContext";
import {
  CHAT_CONTAINER_STYLE,
  MESSAGE_CONTAINER_STYLE,
} from "../defaultStyles";
import { BubbleStyle, IMessage, User } from "../types";
import { ChkrAvatarProps } from "./ChkrAvatar";
import { ChkrBubbleProps } from "./ChkrBubble";
import ChkrHeader, { ChkrHeaderProps } from "./ChkrHeader";
import ChkrInputBar, { ChkrInputBarProps } from "./ChkrInputBar";
import ChkrMessages from "./ChkrMessages";

interface ChkrChatProps<TMessage extends IMessage> {
  /* general chat props */
  messages?: TMessage[];
  user?: User;
  isTyping?: boolean;
  chatWrapperStyle?: FlexProps;
  inverted?: boolean;
  messageContainerStyle?: FlexProps;
  showResponses?: (messageId: string) => void;
  /* input bar */
  onSend(message: Pick<TMessage, "text"> | string, image?: File | null): void;
  placeholder?: string;
  sendButton?: React.ReactElement<{ onClick: () => void }>;
  attachImageButton?: React.ReactElement<{ onClick: () => void }>;
  renderInputBar?: (props: ChkrInputBarProps) => React.ReactNode;
  /* messages styling */
  bubbleStyle?: BubbleStyle;
  renderBubble?: (props: ChkrBubbleProps<TMessage>) => React.ReactNode;
  /* header */
  showHeader?: boolean;
  headerStyle?: BoxProps;
  headerText?: string;
  renderHeader?: (props: ChkrHeaderProps) => React.ReactNode;
  /* avatar */
  showUserAvatar?: boolean;
  showAvatarForCurrentUser?: boolean;
  renderAvatar?: (props: ChkrAvatarProps<TMessage>) => React.ReactNode;
  /* infinite scroll */
  infiniteScroll?: boolean;
  onLoadEarlier?: () => void;
  hasNextPage?: boolean;
  loading?: boolean;
  /* date and time */
  dateFormat?: string;
  dateTextStyle?: TextProps;
  renderDay?: (day: string) => React.ReactElement;
}

const ChkrChat: <TMessage extends IMessage = IMessage>(
  p: ChkrChatProps<TMessage>
) => React.ReactElement = (props) => {
  const {
    infiniteScroll = true,
    inverted,
    messages,
    chatWrapperStyle,
    onSend,
    onLoadEarlier = () => {},
    hasNextPage = false,
    loading = false,
    showHeader = true,
    renderHeader,
    renderInputBar,
    sendButton,
    user,
    headerStyle,
    headerText,
    messageContainerStyle,
    attachImageButton,
  } = props;

  const containerRef = useRef<HTMLDivElement>(null);

  const [infiniteRef] = useInfiniteScroll({
    loading,
    hasNextPage,
    onLoadMore: onLoadEarlier,
  });

  const renderMessages = () => {
    return (
      <ChkrMessages<IMessage> messages={messages} user={user} {...props} />
    );
  };

  const renderChkrInputBar = () => {
    if (renderInputBar) return renderInputBar(props);
    return (
      <ChkrInputBar
        sendButton={sendButton}
        onSend={onSend}
        attachImageButton={attachImageButton}
      />
    );
  };

  const renderChkrHeader = () => {
    if (!showHeader) return null;
    if (renderHeader) return renderHeader(props);
    return <ChkrHeader headerText={headerText} headerStyle={headerStyle} />;
  };

  return (
    <>
      <Flex
        position="relative"
        w="100%"
        overflow="hidden"
        maxH="100vh"
        flexDir="column"
        {...CHAT_CONTAINER_STYLE}
        {...chatWrapperStyle}
      >
        <ScrollContextProvider
          messages={messages}
          refContainer={containerRef}
          inverted={inverted}
        >
          {renderChkrHeader()}
          <Flex
            w="100%"
            flex="auto"
            overflowY="auto"
            flexFlow="column nowrap"
            ref={containerRef as unknown as React.RefObject<HTMLDivElement>}
            {...MESSAGE_CONTAINER_STYLE}
            {...messageContainerStyle}
          >
            {infiniteScroll && !inverted && (
              <Box
                ref={infiniteRef as unknown as React.RefObject<HTMLDivElement>}
                w="100%"
              >
                {loading && <Text color="red">Loading</Text>}
              </Box>
            )}
            {renderMessages()}
            {infiniteScroll && inverted && (
              <Box
                ref={infiniteRef as unknown as React.RefObject<HTMLDivElement>}
                w="100%"
              />
            )}
          </Flex>
          {renderChkrInputBar()}
        </ScrollContextProvider>
      </Flex>
    </>
  );
};

export default ChkrChat;

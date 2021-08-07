import React from "react";

import { Box, Text } from "@chakra-ui/react";

import { BUBBLE_STYLE } from "../defaultStyles";
import { BubbleStyle, IMessage, User } from "../types";

export type ChkrBubbleProps<TMessage extends IMessage> = {
  user?: User;
  currentMessage?: TMessage;
  bubbleStyle?: BubbleStyle;
  position: "left" | "right";
  renderInnerText?: (text: string) => React.ReactNode;
};

const ChkrBubble: <TMessage extends IMessage = IMessage>(
  p: ChkrBubbleProps<TMessage>
) => React.ReactElement = (props) => {
  const { currentMessage, bubbleStyle, position, renderInnerText } = props;

  const renderText = () => {
    if (renderInnerText) return renderInnerText(currentMessage?.text || "");
    return (
      <Text whiteSpace="pre-line" {...BUBBLE_STYLE.text}>
        {currentMessage?.text}
      </Text>
    );
  };

  return (
    <Box
      wordWrap="break-word"
      overflowX="hidden"
      {...BUBBLE_STYLE.general}
      {...BUBBLE_STYLE[position]}
      {...bubbleStyle?.general}
      {...bubbleStyle?.[position]}
    >
      {renderText()}
    </Box>
  );
};

export default ChkrBubble;

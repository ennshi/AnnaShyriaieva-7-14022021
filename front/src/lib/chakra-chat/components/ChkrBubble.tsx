import React, { useState } from "react";

import {
  Box,
  Flex,
  Text,
  Image,
  Button,
  HStack,
  IconButton,
} from "@chakra-ui/react";
import { IoMdArrowDropright } from "react-icons/io";
import { RiMessage3Line } from "react-icons/ri";

import { BUBBLE_STYLE } from "../defaultStyles";
import { BubbleStyle, IMessage, User } from "../types";

export type ChkrBubbleProps<TMessage extends IMessage> = {
  user?: User;
  currentMessage?: TMessage;
  bubbleStyle?: BubbleStyle;
  position: "left" | "right";
  renderInnerText?: (text: string) => React.ReactNode;
  showImage?: (src: string) => void;
  showResponses?: (messageId: string) => void;
};

const ChkrBubble: <TMessage extends IMessage = IMessage>(
  p: ChkrBubbleProps<TMessage>
) => React.ReactElement = (props) => {
  const {
    currentMessage,
    bubbleStyle,
    position,
    renderInnerText,
    showImage,
    showResponses,
  } = props;

  const [showAnswerBtn, setShowAnswerBtn] = useState(false);

  const renderShowThread = (responses?: number) => {
    return responses ? (
      <HStack justifyContent="center" pt="5px">
        <Text fontSize="0.7rem">
          {`${currentMessage?.responses?.length || 0} responses`}
        </Text>
        <Button
          size="xs"
          variant="unstyled"
          onClick={() =>
            showResponses &&
            showResponses((currentMessage?._id as string) || "0")
          }
        >
          <HStack spacing="2px">
            <Text>Show Thread</Text>
            <IoMdArrowDropright />
          </HStack>
        </Button>
      </HStack>
    ) : (
      <>
        {showAnswerBtn && (
          <IconButton
            position="absolute"
            top="-5px"
            right="-5px"
            aria-label="Answer in Thread"
            icon={<RiMessage3Line />}
            size="sm"
            onClick={() =>
              showResponses &&
              showResponses((currentMessage?._id as string) || "0")
            }
          />
        )}
      </>
    );
  };

  const renderText = () => {
    if (renderInnerText) return renderInnerText(currentMessage?.text || "");
    return (
      <Flex
        flexDir="column"
        alignItems="flex-start"
        onMouseEnter={() => setShowAnswerBtn(true)}
        onMouseLeave={() => setShowAnswerBtn(false)}
        position="relative"
      >
        <Text whiteSpace="pre-line" {...BUBBLE_STYLE.text}>
          {currentMessage?.text}
        </Text>
        {currentMessage?.image && (
          <Image
            src={currentMessage?.image}
            {...BUBBLE_STYLE.image}
            onClick={() => showImage && showImage(currentMessage?.image || "")}
          />
        )}
        {currentMessage?.responses &&
          renderShowThread(currentMessage?.responses?.length)}
      </Flex>
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

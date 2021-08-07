import React, { useEffect, useRef, useState } from "react";
import ResizeTextarea, { TextareaAutosizeProps } from "react-textarea-autosize";

import {
  Box,
  BoxProps,
  HStack,
  StackProps,
  Textarea,
  TextareaProps,
} from "@chakra-ui/react";

import { CHAT_PLACEHOLDER } from "../constants";
import { useScroll } from "../context/scrollContext";
import { INPUT_BAR_STYLE, TEXTAREA_PROPS } from "../defaultStyles";

export type ChkrInputBarProps = {
  onSend: (text: string) => void;
  sendButton?: React.ReactElement<{ onClick: () => void }>;
  placeholder?: string;
  textAreaProps?: TextareaProps & TextareaAutosizeProps;
  inputBarWrapperStyle?: BoxProps;
  inputBarStyle?: StackProps;
};

const ChkrInputBar: React.FC<ChkrInputBarProps> = ({
  onSend,
  placeholder = CHAT_PLACEHOLDER,
  sendButton,
  textAreaProps,
  inputBarWrapperStyle,
  inputBarStyle,
}) => {
  const [message, setMessage] = useState("");
  const { onScrollToStart, onScrollForFewPixels } = useScroll();
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const textAreaPrevHeight = useRef<number | undefined>();

  useEffect(() => {
    textAreaPrevHeight.current = textAreaRef?.current?.offsetHeight;
  }, []);

  const onTextAreaResize = (newHeight: number) => {
    if (!textAreaPrevHeight?.current) return;
    onScrollForFewPixels(newHeight - textAreaPrevHeight.current);
    textAreaPrevHeight.current = newHeight;
  };

  const handleOnSend = () => {
    onSend(message.trim());
    setMessage("");
    onScrollToStart();
  };

  const renderSendButton = () => {
    if (!sendButton) return;
    return React.cloneElement(sendButton, { onClick: handleOnSend });
  };

  return (
    <Box
      py="8px"
      w="100%"
      {...INPUT_BAR_STYLE.wrapper}
      {...inputBarWrapperStyle}
    >
      <HStack
        spacing={0}
        width="100%"
        alignItems="flex-end"
        {...INPUT_BAR_STYLE.inputbar}
        {...inputBarStyle}
      >
        <Textarea
          minH="unset"
          overflow="hidden"
          flex={1}
          resize="none"
          as={ResizeTextarea}
          onChange={(e) => setMessage(e.target.value)}
          onHeightChange={onTextAreaResize}
          placeholder={placeholder}
          value={message}
          border="none"
          _focus={{
            border: "none",
          }}
          ref={textAreaRef}
          {...TEXTAREA_PROPS}
          {...textAreaProps}
        />
        {renderSendButton()}
      </HStack>
    </Box>
  );
};

export default ChkrInputBar;

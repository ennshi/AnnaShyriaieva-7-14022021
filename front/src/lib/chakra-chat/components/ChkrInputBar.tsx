import React, {
  ChangeEvent,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import ResizeTextarea, { TextareaAutosizeProps } from "react-textarea-autosize";

import {
  Box,
  BoxProps,
  HStack,
  Input,
  StackProps,
  Textarea,
  TextareaProps,
  Image,
  Flex,
  ImageProps,
  CloseButton,
} from "@chakra-ui/react";

import { CHAT_PLACEHOLDER } from "../constants";
import { useScroll } from "../context/scrollContext";
import { INPUT_BAR_STYLE, TEXTAREA_PROPS } from "../defaultStyles";

export type ChkrInputBarProps = {
  onSend: (text: string, image?: File | null) => void;
  attachImageButton?: React.ReactElement<{ onClick: () => void }>;
  sendButton?: React.ReactElement<{ onClick: () => void }>;
  placeholder?: string;
  textAreaProps?: TextareaProps & TextareaAutosizeProps;
  inputBarWrapperStyle?: BoxProps;
  inputBarStyle?: StackProps;
  inputImageStyle?: Omit<ImageProps, "src">;
};

const ChkrInputBar: React.FC<ChkrInputBarProps> = ({
  onSend,
  placeholder = CHAT_PLACEHOLDER,
  sendButton,
  textAreaProps,
  inputBarWrapperStyle,
  inputBarStyle,
  attachImageButton,
  inputImageStyle,
}) => {
  const [message, setMessage] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const { onScrollToStart, onScrollForFewPixels } = useScroll();
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const imageInput = useRef<HTMLInputElement>(null);
  const textAreaPrevHeight = useRef<number | undefined>();

  useEffect(() => {
    textAreaPrevHeight.current = textAreaRef?.current?.offsetHeight;
  }, []);

  const imageElement = useMemo(() => {
    if (image)
      return (
        <Box position="relative">
          <Image
            src={URL.createObjectURL(image)}
            {...INPUT_BAR_STYLE.image}
            {...inputImageStyle}
          />
          <CloseButton
            position="absolute"
            top="3px"
            right="3px"
            height="12px"
            width="12px"
            fontSize="0.4rem"
            onClick={() => setImage(null)}
          />
        </Box>
      );
  }, [image, inputImageStyle]);

  const onTextAreaResize = (newHeight: number) => {
    if (!textAreaPrevHeight?.current) return;
    onScrollForFewPixels(newHeight - textAreaPrevHeight.current);
    textAreaPrevHeight.current = newHeight;
  };

  const handleOnSend = () => {
    onSend(message.trim(), image);
    setMessage("");
    if (image) setImage(null);
    onScrollToStart();
  };

  const renderSendButton = () => {
    if (!sendButton) return;
    return React.cloneElement(sendButton, { onClick: handleOnSend });
  };

  const attachImage = (e: ChangeEvent<HTMLInputElement>) =>
    setImage(e?.target?.files?.[0] || null);

  const renderAttachImageButton = () => {
    if (!attachImageButton) return;
    const handleAttachImage = () => imageInput.current?.click();
    return React.cloneElement(attachImageButton, {
      onClick: handleAttachImage,
    });
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
        <Flex
          width="100%"
          alignItems="flex-start"
          justifyContent="center"
          flexDir="column"
        >
          <Box width="100%">
            <Textarea
              minH="unset"
              overflowY="scroll"
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
          </Box>
          {imageElement}
        </Flex>
        {renderAttachImageButton()}
        {!!attachImageButton && (
          <Input
            type="file"
            hidden
            ref={imageInput}
            onChange={attachImage}
            value={""}
          />
        )}
        {renderSendButton()}
      </HStack>
    </Box>
  );
};

export default ChkrInputBar;

import moment from "moment";
import React, { useEffect, useState } from "react";

import { BoxProps, Button, IconButton } from "@chakra-ui/react";

// import RksvButton from '../../../components/atoms/RksvButton/RksvButton'
// import RksvIconButton from '../../../components/atoms/RksvIconButton/RksvIconButton'
// import colors from '../../../themes/mainTheme/colors'
import ChkrChat from "../components/ChkrChat";
import ChkrHeader, { ChkrHeaderProps } from "../components/ChkrHeader";
import { IMessage } from "../types";
import DEFAULT_MESSAGES from "./messages";

const TestChatNoInfiniteScrollInverse: React.FC<BoxProps> = (props) => {
  const [messages, setMessages] = useState<IMessage[]>(
    DEFAULT_MESSAGES.sort((a: any, b: any) => b.createdAt - a.createdAt)
  );
  const [newMessage, setNewMessage] = useState<IMessage>();

  useEffect(() => {
    if (newMessage?.text)
      setMessages((prevState) =>
        prevState.length ? [newMessage, ...prevState] : [newMessage]
      );
  }, [newMessage?.createdAt]);

  const onSend = (message: string) => {
    const newMes: IMessage = {
      _id: Math.random() * 10000,
      createdAt: moment().toISOString(),
      text: message,
      user: {
        _id: 1,
        name: "React Native",
        avatar: "https://placeimg.com/140/140/any",
      },
    };
    setNewMessage(newMes);
  };

  const renderHeader = () => {
    return (
      <ChkrHeader
        recipient={{
          _id: 2,
          name: "React Native",
          avatar: "https://placeimg.com/140/140/any",
        }}
        leftButton={
          <IconButton
            aria-label="btn"
            bg="transparent"
            // icon="arrowBack"
            iconColor={""}
            onClick={() => console.log("GO BACK")}
          />
        }
        rightButton={
          <Button
            size="small"
            bg="transparent"
            text="Annuler la mission"
            onClick={() => console.log("CANCEL MISSION")}
          />
        }
      />
    );
  };

  return (
    <ChkrChat
      dateFormat="ddd D MMMM, HH:mm"
      user={{
        _id: 1,
        name: "React Native",
        avatar: "https://placeimg.com/140/140/any",
      }}
      isTyping={false}
      messages={messages}
      onSend={onSend}
      inverted
      infiniteScroll={false}
      sendButton={
        <IconButton
          // icon="send"
          aria-label="label"
          bg="transparent"
          borderRadius="none"
          // iconColor={colors.neutral[40]}
        />
      }
      renderHeader={renderHeader}
      {...props}
    />
  );
};

export default TestChatNoInfiniteScrollInverse;

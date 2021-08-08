import React from "react";
import TestChat from "../../lib/chakra-chat/testChat/TestChat";

type Props = {
  idSelected?: string;
  entitySelected?: "user" | "channel";
};

const ChatView: React.FC<Props> = ({}) => {
  return <TestChat />;
};

export default ChatView;

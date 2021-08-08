import React, { useState } from "react";
import { HStack } from "@chakra-ui/react";
import ChannelsAndUsers from "../organisms/ChannelsAndUsers";
import ChatView from "../organisms/ChatView";

const Main: React.FC = ({}) => {
  const [idSelected, setIdSelected] = useState<string>();
  const [entitySelected, setEntitySelected] = useState<"user" | "channel">();

  return (
    <HStack spacing="0">
      <ChannelsAndUsers
        setIdSelected={setIdSelected}
        setEntitySelected={setEntitySelected}
      />
      <ChatView idSelected={idSelected} entitySelected={entitySelected} />
    </HStack>
  );
};

export default Main;

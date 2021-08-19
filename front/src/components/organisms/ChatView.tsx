import { Avatar, IconButton } from "@chakra-ui/react";
import moment from "moment";
import React, { useRef } from "react";
import { IoMdAdd } from "react-icons/io";
import { RiSendPlaneFill } from "react-icons/ri";
import { useCurrentUser } from "../../contexts/currentUserContext";
import { useSendMessage } from "../../hooks/mutations/useSendMessage";
import { useGetMessages } from "../../hooks/queries/useGetMessages";
import ChkrChat from "../../lib/chakra-chat/components/ChkrChat";
import ChkrHeader from "../../lib/chakra-chat/components/ChkrHeader";
import { IMessage } from "../../lib/chakra-chat/types";
import { Message } from "../../types";

type Props = {
  channelId: string;
};

const limitItems = 20;

const ChatView: React.FC<Props> = ({ channelId }) => {
  const [sendMessage] = useSendMessage();
  const page = useRef(0);
  const { currentUser } = useCurrentUser();

  const {
    data: messagesData,
    fetchMore,
    loading,
    refetch,
  } = useGetMessages({
    variables: { offset: page.current, limit: limitItems, channelId },
  });

  const onLoadMore = async () => {
    await fetchMore({ variables: { offset: page.current } });
    page.current += 1;
  };

  const chkrMessages = messagesData?.messages?.messages?.map(
    ({ id, text, image, from, responses, createdAt }: Message) =>
      ({
        _id: id,
        text,
        image,
        user: {
          _id: from?.id,
          name: from?.firstName + from?.lastName,
        },
        responses,
        createdAt: moment(createdAt, "x").toISOString(),
      } as IMessage)
  );

  const onSend = async (message: string, image: File) => {
    try {
      const sentMessage = await sendMessage({
        variables: {
          text: message,
          channelId,
          image,
        },
      });
      if (sentMessage) await refetch();
    } catch (e) {
      console.log(e);
    }
  };

  const renderHeader = () => {
    return (
      <ChkrHeader
        recipient={{
          _id: 2,
          name: "React Native",
          avatar: "https://placeimg.com/140/140/any",
        }}
        // leftButton={
        //   <IconButton
        //     aria-label="back button"
        //     bg="transparent"
        //     iconColor="blue"
        //     onClick={() => console.log("GO BACK")}
        //   >
        //     <Icon icon="arrow-back" />
        //   </IconButton>
        // }
        rightButton={
          <Avatar name={currentUser?.firstName + " " + currentUser?.lastName} />
        }
      />
    );
  };

  return (
    <ChkrChat
      chatWrapperStyle={{ minH: "100vh" }}
      dateFormat="ddd D MMMM, HH:mm"
      user={{
        _id: currentUser?.id!,
        name: currentUser?.firstName + " " + currentUser?.lastName,
      }}
      messages={chkrMessages || []}
      onSend={onSend}
      onLoadEarlier={onLoadMore}
      hasNextPage={
        messagesData?.messages?.messages?.length < messagesData?.messages?.count
      }
      loading={loading}
      sendButton={
        <IconButton
          aria-label="send"
          bg="transparent"
          borderRadius="none"
          width={30}
          icon={<RiSendPlaneFill />}
        />
      }
      renderHeader={renderHeader}
      attachImageButton={
        <IconButton
          aria-label="send"
          bg="transparent"
          borderRadius="none"
          width={30}
          icon={<IoMdAdd />}
        />
      }
      showResponses={(id) => console.log(id)}
    />
  );
  return <></>;
};

export default ChatView;

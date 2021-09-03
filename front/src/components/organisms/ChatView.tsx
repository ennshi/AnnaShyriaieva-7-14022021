import { Avatar, IconButton } from "@chakra-ui/react";
import moment from "moment";
import React, { useEffect, useRef } from "react";
import { IoMdAdd } from "react-icons/io";
import { RiSendPlaneFill } from "react-icons/ri";
import { useCurrentUser } from "../../contexts/currentUserContext";
import { useSendMessage } from "../../hooks/mutations/useSendMessage";
import { useGetMessages } from "../../hooks/queries/useGetMessages";
import { useGetChannel } from "../../hooks/queries/useGetChannel";
import { ChkrAvatarProps } from "../../lib/chakra-chat/components/ChkrAvatar";
import ChkrChat from "../../lib/chakra-chat/components/ChkrChat";
import ChkrHeader from "../../lib/chakra-chat/components/ChkrHeader";
import { IMessage } from "../../lib/chakra-chat/types";
import { Message, User } from "../../types";

type Props = {
  channelId: string;
  onShowResponses: (id: string) => void;
  onOpenCurrentUserProfile: () => void;
};

const limitItems = 20;

const ChatView: React.FC<Props> = ({
  channelId,
  onShowResponses,
  onOpenCurrentUserProfile,
}) => {
  const [sendMessage] = useSendMessage();
  const page = useRef(0);
  const { currentUser } = useCurrentUser();

  const { data: channel, stopPolling } = useGetChannel({
    variables: { id: channelId },
    pollInterval: 1000,
  });

  useEffect(() => {
    return stopPolling;
  }, [stopPolling]);

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
          name: from?.firstName + " " + from?.lastName,
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
    } catch (e) {}
  };

  const chatHeaderTitle = () => {
    if (!channel?.channel?.name) return;
    if (channel.channel.name.includes("direct--")) {
      const recipient = channel.channel.users.filter(
        (u: User) => u.id !== currentUser?.id
      )[0];
      return { _id: recipient.id, name: recipient.username };
    }
    if (channel.channel.name.includes("saved--")) {
      return { _id: currentUser?.id, name: currentUser?.username };
    }
    return { _id: channelId, name: "#" + channel.channel.name };
  };

  const renderHeader = () => {
    return (
      <ChkrHeader
        recipient={chatHeaderTitle()}
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
        displayRecipientAvatar={false}
        rightButton={
          <Avatar
            name={currentUser?.firstName + " " + currentUser?.lastName}
            bg="#AED6F1"
            cursor="pointer"
            onClick={onOpenCurrentUserProfile}
          />
        }
      />
    );
  };

  const renderAvatar = (props: ChkrAvatarProps<IMessage>) => {
    if (`${props.currentMessage?.user._id}` === `${currentUser?.id}`) return;
    return (
      <Avatar
        name={props.currentMessage?.user.name}
        size="xs"
        backgroundColor="#AED6F1"
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
          aria-label="send image"
          bg="transparent"
          borderRadius="none"
          width={30}
          icon={<IoMdAdd />}
        />
      }
      showResponses={(id) => onShowResponses(id)}
      renderAvatar={renderAvatar}
    />
  );
};

export default ChatView;

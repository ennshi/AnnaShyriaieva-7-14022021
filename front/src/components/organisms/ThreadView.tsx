import { Avatar, IconButton } from "@chakra-ui/react";
import moment from "moment";
import React, { useEffect, useRef } from "react";
import { IoMdAdd } from "react-icons/io";
import { RiSendPlaneFill } from "react-icons/ri";
import { useCurrentUser } from "../../contexts/currentUserContext";
import { useSendMessage } from "../../hooks/mutations/useSendMessage";
import { ChkrAvatarProps } from "../../lib/chakra-chat/components/ChkrAvatar";
import ChkrChat from "../../lib/chakra-chat/components/ChkrChat";
import ChkrHeader from "../../lib/chakra-chat/components/ChkrHeader";
import { IMessage } from "../../lib/chakra-chat/types";
import { Message } from "../../types";
import { useGetResponses } from "../../hooks/queries/useGetResponses";
import { IoChevronBackSharp } from "react-icons/io5";

type Props = {
  messageId: string;
  channelId: string;
  onClose: () => void;
  onOpenCurrentUserProfile: () => void;
};

const limitItems = 20;

const ThreadView: React.FC<Props> = ({
  messageId,
  channelId,
  onClose,
  onOpenCurrentUserProfile,
}) => {
  const [sendMessage] = useSendMessage();
  const page = useRef(0);
  const { currentUser } = useCurrentUser();

  const {
    data: responsesData,
    fetchMore,
    loading,
    refetch,
    stopPolling,
  } = useGetResponses({
    variables: { offset: page.current, limit: limitItems, messageId },
    pollInterval: 1000,
  });

  useEffect(() => {
    return stopPolling;
  }, [stopPolling]);

  const onLoadMore = async () => {
    await fetchMore({ variables: { offset: page.current } });
    page.current += 1;
  };

  const chkrMessages = responsesData?.responses?.messages?.map(
    ({ id, text, image, from, createdAt }: Message) =>
      ({
        _id: id,
        text,
        image,
        user: {
          _id: from?.id,
          name: from?.firstName + " " + from?.lastName,
        },
        createdAt: moment(createdAt, "x").toISOString(),
      } as IMessage)
  );

  const onSend = async (message: string, image: File) => {
    if (!message.trim().length) return;
    try {
      const sentMessage = await sendMessage({
        variables: {
          text: message,
          channelId,
          image,
          toMessageId: messageId,
        },
      });
      if (sentMessage) await refetch();
    } catch (e) {}
  };

  const renderHeader = () => {
    return (
      <ChkrHeader
        recipient={{ _id: messageId, name: "Discussion" }}
        leftButton={
          <IconButton
            aria-label="back button"
            bg="transparent"
            iconColor="blue"
            onClick={onClose}
            icon={<IoChevronBackSharp />}
          />
        }
        rightButton={
          <Avatar
            name={currentUser?.firstName + " " + currentUser?.lastName}
            bg="brand.primary.300"
            cursor="pointer"
            onClick={onOpenCurrentUserProfile}
          />
        }
        displayRecipientAvatar={false}
      />
    );
  };

  const renderAvatar = (props: ChkrAvatarProps<IMessage>) => {
    if (`${props.currentMessage?.user._id}` === `${currentUser?.id}`) return;
    return (
      <Avatar
        name={props.currentMessage?.user.name}
        size="xs"
        backgroundColor="brand.primary.300"
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
        (responsesData?.responses?.messages?.length || 0) <
        (responsesData?.responses?.count || 0)
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
      renderAvatar={renderAvatar}
    />
  );
};

export default ThreadView;

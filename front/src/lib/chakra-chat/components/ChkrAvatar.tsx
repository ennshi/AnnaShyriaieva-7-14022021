import React from "react";

import { Avatar, AvatarProps } from "@chakra-ui/avatar";
import { Box } from "@chakra-ui/react";

import { AVATAR_STYLE } from "../defaultStyles";
import { IMessage, User } from "../types";
import { isSameDay, isSameUser } from "../utils";

export type ChkrAvatarProps<TMessage extends IMessage> = {
  user: User;
  showAvatarForCurrentUser?: boolean;
  currentMessage?: TMessage;
  nextMessage?: TMessage;
  avatarStyle?: Omit<AvatarProps, "src">;
};

const ChkrAvatar: <TMessage extends IMessage = IMessage>(
  p: ChkrAvatarProps<TMessage>
) => React.ReactElement = ({
  showAvatarForCurrentUser,
  user,
  currentMessage,
  nextMessage,
  avatarStyle,
}) => {
  if (!showAvatarForCurrentUser && currentMessage?.user._id === user._id)
    return <></>;
  if (
    currentMessage &&
    isSameUser(currentMessage, nextMessage) &&
    isSameDay(currentMessage, nextMessage)
  ) {
    return <Box w={AVATAR_STYLE.w} h={AVATAR_STYLE.h} {...avatarStyle} />;
  }
  return (
    <Avatar
      borderRadius="20%"
      src={currentMessage?.user.avatar}
      {...AVATAR_STYLE}
      {...avatarStyle}
    />
  );
};

export default ChkrAvatar;

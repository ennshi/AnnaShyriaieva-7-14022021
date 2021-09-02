export type LoginInput = {
  username: string;
  password: string;
};

export type SignUpInput = {
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  email: string;
};

export type CreateChannelInput = {
  name: string;
  users: string[];
};

export type SendMessageInput = {
  text: string;
  image?: File;
  toMessageId?: string;
  channelId: string;
};

export type Channel = {
  id: string;
  name: string;
  users: User[];
};

export type User = {
  id: string;
  firstName: string;
  lastName: string;
  username: string;
  password: string;
  email: string;
  isAdmin: boolean;
  channels: Channel[];
};

export type Message = {
  id?: string;
  text: string;
  image?: string;
  from: User;
  responses?: string[];
  channel: Channel;
  createdAt: string;
};

export type GetMessagesInput = {
  channelId: string;
  offset: number;
  limit: number;
};

export type GetResponsesInput = {
  messageId: string;
  offset: number;
  limit: number;
};

export type GetChannelInput = {
  id: string;
};

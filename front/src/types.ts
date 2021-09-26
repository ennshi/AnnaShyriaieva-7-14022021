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

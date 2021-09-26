import { BoxProps } from "@chakra-ui/layout";
import { TextProps } from "@chakra-ui/react";

export interface User {
  _id: string | number;
  name?: string;
  avatar?: string;
}

export interface IMessage {
  _id: string | number;
  text: string;
  createdAt: Date | number | string;
  user: User;
  image?: string;
  system?: boolean;
  sent?: boolean;
  received?: boolean;
  pending?: boolean;
  responses?: string[];
}

export type BubbleStyle = {
  text?: TextProps;
  general?: BoxProps;
  right?: BoxProps;
  left?: BoxProps;
};

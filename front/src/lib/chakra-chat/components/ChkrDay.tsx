import moment from "moment";
import React from "react";

import { Box, Text, TextProps } from "@chakra-ui/react";

import { DATE_FORMAT } from "../constants";
import { DATE_TEXT_STYLE, DATE_WRAPPER_STYLE } from "../defaultStyles";
import { IMessage } from "../types";
import { isSameDay } from "../utils";

interface ChkrDayProps<TMessage extends IMessage> {
  currentMessage?: TMessage;
  nextMessage?: TMessage;
  previousMessage?: TMessage;
  dateTextStyle?: TextProps;
  inverted?: boolean;
  dateFormat?: string;
  renderDay?: (day: string) => React.ReactElement;
}

const ChkrDay: <TMessage extends IMessage = IMessage>(
  p: ChkrDayProps<TMessage>
) => React.ReactElement | null = (props) => {
  const {
    currentMessage,
    previousMessage,
    dateFormat = DATE_FORMAT,
    dateTextStyle,
    nextMessage,
    renderDay,
    inverted,
  } = props;

  if (
    (!inverted &&
      currentMessage &&
      !isSameDay(currentMessage, previousMessage!)) ||
    (inverted && currentMessage && !isSameDay(currentMessage, nextMessage!))
  ) {
    const date = moment(currentMessage.createdAt).format(dateFormat);

    if (renderDay) return renderDay(date);

    return (
      <Box {...DATE_WRAPPER_STYLE}>
        <Text {...DATE_TEXT_STYLE} {...dateTextStyle}>
          {date}
        </Text>
      </Box>
    );
  }
  return null;
};

export default ChkrDay;

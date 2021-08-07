import React from "react";

// import { TestingLayoutPartialProps } from '../../../components/molecules/atomTesting/TestingLayout'
import TestChat from "./TestChat";

const testChatView = {
  title: "Test Chat",
  variants: [
    {
      variantLabel: "",
      components: [
        {
          stateLabel: "Test Chat",
          component: <TestChat />,
        },
      ],
    },
  ],
};

export default testChatView;

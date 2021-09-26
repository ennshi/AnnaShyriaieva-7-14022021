import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import React from "react";

export const theme = extendTheme({
  colors: {
    brand: {
      primary: {
        800: "#0e2f47",
        700: "#113753",
        500: "#184e77",
        300: "#74C4E3",
        100: "#F3FBFE",
      },
      secondary: {
        800: "#c33439",
        600: "#f25f5c",
        300: "#FFCDC1",
      },
    },
  },
});

export const ThemeContextProvider: React.FC = ({ children }) => {
  return <ChakraProvider theme={theme}>{children}</ChakraProvider>;
};

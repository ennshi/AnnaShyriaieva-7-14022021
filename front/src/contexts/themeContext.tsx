import {ChakraProvider, extendTheme} from '@chakra-ui/react';
import React from 'react';

export const theme = extendTheme({
  colors: {
    brand: {
      primary: "#184e77",
      secondary: "#f25f5c",
    },
  },
})

export const ThemeContextProvider: React.FC = ({children}) => {
  return (
    <ChakraProvider theme={theme}>
      {children}
    </ChakraProvider>
  )
}

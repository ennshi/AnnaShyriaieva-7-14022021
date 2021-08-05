import {ChakraProvider, extendTheme} from '@chakra-ui/react';
import React, {useContext} from 'react';

export const themeContext = React.createContext({});

const theme = extendTheme({
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

export const useCustomTheme = () => {
  //@ts-ignore
  const {theme} = useContext(themeContext)
  return {theme};
}
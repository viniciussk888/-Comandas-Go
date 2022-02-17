import { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";

import { theme } from "../styles/theme";
import { SidebarDrawerProvider } from "../contexts/SidebarDrawerContext";
import { AlertProvider } from "../contexts/AlertContext";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider resetCSS theme={theme}>
      <SidebarDrawerProvider>
        <AlertProvider>
          <Component {...pageProps} />
        </AlertProvider>
      </SidebarDrawerProvider>
    </ChakraProvider>
  );
}

export default MyApp;

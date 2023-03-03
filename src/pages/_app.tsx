import {
  ChakraProvider,
  defineStyleConfig,
  extendTheme,
} from "@chakra-ui/react";
import { Montserrat } from "@next/font/google";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { type AppType } from "next/app";
import { api } from "~/utils/api";
import { NextAdapter } from "next-query-params";
import { QueryParamProvider } from "use-query-params";

import "~/styles/globals.css";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const buttonTheme = defineStyleConfig({
  baseStyle: {
    borderRadius: "9px",
  },
  variants: {
    solid: {
      bg: "#7267CB",
      color: "white",
      fontWeight: "medium",
      fontSize: "20px",
      _hover: {
        bg: "#7267CB",
        color: "white",
        _disabled: {
          bg: "gray.800",
          color: "white",
        },
      },
      _active: {
        bg: "#7267CB",
        color: "white",
      },
      _disabled: {
        bg: "gray.800",
        color: "white",
      },
    },
  },
});

const theme = extendTheme({
  fonts: {
    heading: montserrat.style.fontFamily,
    body: montserrat.style.fontFamily,
  },
  components: {
    Button: buttonTheme,
  },
});

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <SessionProvider session={session}>
      <main className={montserrat.className}>
        <ChakraProvider theme={theme}>
          <QueryParamProvider adapter={NextAdapter}>
            <Component {...pageProps} />
          </QueryParamProvider>
        </ChakraProvider>
      </main>
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);

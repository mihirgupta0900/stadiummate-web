import { type AppType } from "next/app";
import {
  ChakraProvider,
  defineStyleConfig,
  extendTheme,
} from "@chakra-ui/react";
import { Montserrat } from "@next/font/google";

import { api } from "~/utils/api";

import "~/styles/globals.css";
import { initFirebase } from "~/utils/firebase";

import Sidebar from "~/components/shared/Sidebar";
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

initFirebase();

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <main className={montserrat.className}>
      <ChakraProvider theme={theme}>
        <Sidebar />
        <Component {...pageProps} />
      </ChakraProvider>
    </main>
  );
};

export default api.withTRPC(MyApp);

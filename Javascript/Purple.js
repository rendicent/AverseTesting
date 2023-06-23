import React from "react";
import ReactDOM from "react-dom";
import { ThemeProvider, ChakraProvider } from "@chakra-ui/react";

const customTheme = {
    colors: {
      purple: {
        50: "#F6F9FF",
        100: "#E9EBFF",
        200: "#D4DAFF",
        300: "#B8BCFF",
        400: "#9CA8FF",
        500: "#7DA4FF",
        600: "#5CA0FF",
        700: "#3BA6FF",
        800: "#1AA2FF",
        900: "#009EFF",
      },
    },
    // other props...
  };
  
  const App = () => {
    return (
      <ChakraProvider theme={customTheme}>
        <h1>This is a purple UI Next.js page</h1>
      </ChakraProvider>
    );
  };
  
  ReactDOM.render(<App />, document.getElementById("root"));
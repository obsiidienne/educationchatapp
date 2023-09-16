import React from "react";
import ReactDOM from "react-dom/client";
import { ChakraProvider } from "@chakra-ui/react";
import "./index.css";
import App from "./App";
import { BrowserRouter} from "react-router-dom";
import ChatProvider from "./Context/ChatProvider";
import store from "./redux/store";
import { Provider } from "react-redux";

import "bootstrap/dist/css/bootstrap.min.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <><ChakraProvider>
    <BrowserRouter>
      <ChatProvider>
      <Provider store={store}>
        <App />
      </Provider>
      </ChatProvider>

    </BrowserRouter>
  </ChakraProvider> 
    </>
); 


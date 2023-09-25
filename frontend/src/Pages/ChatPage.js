import { Box } from "@chakra-ui/react";
import React, { useState } from "react";
import styled from "styled-components";
import ChatBox from "../Components/ChatBox";
import SideDrawer from "../Components/miscellaneous/SideDrawer";
import MyChats from "../Components/MyChats";
import { ChatState } from "../Context/ChatProvider";

const MainBox = styled.div`
  width: 100%;
  height: 100vh;
  background-image: linear-gradient(to top, #e6e9f0 0%, #eef1f5 100%);
  background-position: center;
  background-size: cover;
  overflow: hidden;
`;

const ChatPage = () => {
  const [fetchAgain, setFetchAgain] = useState(false);
  const { user } = ChatState();
  return (
    <MainBox>
      {user && <SideDrawer />}
      <Box
        display="flex"
        justifyContent="space-between"
        w="100%"
        h="93%"
        p="10px"
      >
        {user && <MyChats fetchAgain={fetchAgain} />}
        {user && (
          <ChatBox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
        )}
      </Box>
    </MainBox>
  );
};

export default ChatPage;

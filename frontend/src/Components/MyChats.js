import { Avatar, Box, Button, Divider, Stack, Text } from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { ChatState } from "../Context/ChatProvider";
import Toast from "./Toast";
import { AiOutlineUsergroupAdd } from "react-icons/ai";
import ChatLoading from "./ChatLoading";
import { getSender } from "../config/ChatLogics";
import styled from "styled-components";
import GroupChatModal from "./miscellaneous/GroupChatModal";

const MyBox = styled(Box)`
background-image: linear-gradient(to top, #accbee 0%, #e7f0fd 100%);
  background-position: center;
  background-size: cover;
  
`;
const StackBox = styled(Stack)`
  overflow-y: auto;
  border-radius: 20px;
  &::-webkit-scrollbar {
    display: none;
  }
`;
const MyChats = ({ fetchAgain }) => {
  const [toastShow, setToastShow] = useState(false);
  const [toastText, setToastText] = useState("");
  const [toastIcon, setToastIcon] = useState("");
  const [chatLoader, setChatLoader] = useState(true);
  const [loggedUser, setLoggedUser] = useState();
  const { selectedChat, setSelectedChat, chats, setChats, user } = ChatState();

  const fetchChats = async () => {
    setChatLoader(true);
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.get("/api/chat", config);

      setChats(data);
      setChatLoader(false);
    } catch (error) {
      setToastShow(true);
      setToastText("Failed to fetch chats");
      setToastIcon("failed");
      setTimeout(() => {
        setToastShow(false);
        setToastText("");
        setToastIcon("");
      }, 1500);
    }
  };

  useEffect(() => {
    setLoggedUser(JSON.parse(localStorage.getItem("userInfo")));
    fetchChats();
  }, [fetchAgain]);
  return (
    <>
      <MyBox
        display={{ base: selectedChat ? "none" : "flex", md: "flex" }}
        flexDirection="column"
        width={{ base: "100%", md: "30%" }}
        height="100%"
        p={3}
        alignItems="center"
        borderRadius="lg"
        boxShadow="lg"
        borderWidth="1px"
      >
        <Box
          pb={3}
          px={3}
          display="flex"
          w="100%"
          justifyContent="space-between"
          alignItems="center"
        >
          <Text fontSize={{ base: "20px", md: "17px", lg: "20px" }}>
            My Chats
          </Text>
          <GroupChatModal>
            <Button
              rightIcon={<AiOutlineUsergroupAdd />}
              backgroundImage="linear-gradient(to right, #83a4d4 0%, #b6fbff  51%, #83a4d4  100%)"
              margin="10px"
              padding="15px 45px"
              textAlign="center"
              textTransform="uppercase"
              transition="0.9s"
              backgroundSize="200% auto"
              color= "white"           
              boxShadow=" 0 0 20px #eee"
              border-radius="10px"
              display="flex"
              hover={{ color:"#e7f0fd", backgroundPosition:"right center" ,textDecoration: "none"}}
            >
              Créer un groupe
            </Button>
          </GroupChatModal>
        </Box>
        <Box
          display="flex"
          flexDirection="column"
          p={3}
          w="100%"
          overflowY="hidden"
          bg="transparent"
          borderRadius="lg"
        >
          {!chatLoader ? (
            <StackBox>
              {chats.map((chat) => (
                <Box key={chat._id}>
                  <Box
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                    p={3}
                    bg={selectedChat === chat ? "#B2E3FD" : "gray.200"}
                    borderRadius="lg"
                    color={selectedChat === chat ? "white" : "black"}
                    borderWidth="1px"
                    cursor="pointer"
                    onClick={() => setSelectedChat(chat)}
                    mb={3}
                  >
                    {!chat.isGroupChat ? (
                      <Box
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                      >
                        <Avatar
                          size="sm"
                          cursor="pointer"
                          name={getSender(loggedUser, chat.users)}
                          bg="#4FB2E5"
                          src={
                            chat.users[0]._id === loggedUser._id
                              ? chat.users[1].pic
                              : chat.users[0].pic
                          }
                        />
                        <Box
                          display="flex"
                          flexDirection="column"
                          justifyContent="center"
                          alignItems="flex-start"
                        >
                          <Text fontSize="lg" fontWeight="bold" pl={3}>
                            {getSender(loggedUser, chat.users)}
                          </Text>
                          {chat.lastestMessage && (
                            <Text fontSize="xs" pl={3} pt={1}>
                              {chat.lastestMessage.content.length > 50
                                ? chat.lastestMessage.content.substring(0, 51) +
                                  "..."
                                : chat.lastestMessage.content}
                            </Text>
                          )}
                        </Box>
                      </Box>
                    ) : (
                      <>
                        <Box
                          display="flex"
                          justifyContent="center"
                          alignItems="center"
                        >
                          <Avatar
                            size="sm"
                            cursor="pointer"
                            name={chat.chatName}
                            bg="#4FB2E5"
                          />
                          <Box
                            display="flex"
                            flexDirection="column"
                            justifyContent="center"
                            alignItems="flex-start"
                          >
                            <Text fontSize="lg" fontWeight="bold" pl={3}>
                              {chat.chatName}
                            </Text>
                            {chat.lastestMessage && (
                              <Text fontSize="xs" pl={3} pt={1}>
                                <b>
                                  {chat.lastestMessage.sender._id ===
                                  loggedUser._id
                                    ? "You : "
                                    : chat.lastestMessage.sender.firstname +
                                      " " +
                                      chat.lastestMessage.sender.lastname +
                                      " : "}
                                </b>
                                {chat.lastestMessage.content.length > 50
                                  ? chat.lastestMessage.content.substring(
                                      0,
                                      51
                                    ) + "..."
                                  : chat.lastestMessage.content}
                              </Text>
                            )}
                          </Box>
                        </Box>
                        <Text fontSize="sm" fontWeight="bold">
                          {chat.users.length}
                        </Text>
                      </>
                    )}
                  </Box>
                  <Divider mb={1} colorScheme="" />
                </Box>
              ))}
            </StackBox>
          ) : (
            <ChatLoading />
          )}
        </Box>
      </MyBox>
      <Toast toast={toastShow} toastText={toastText} icon={toastIcon} />
    </>
  );
};

export default MyChats;

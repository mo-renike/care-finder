import React, { useContext, useState } from "react";
import axios from "axios";
import { Box, Typography, Button } from "@mui/material";
import { AppContext } from "@/app/AppContext";

const Chat = () => {
  const [userInput, setUserInput] = useState("");
  const [chatHistory, setChatHistory] = useState<string[]>([]);

  const { isChatOpen, setIsChatOpen, currentUser } = useContext(AppContext);
  const handleUserInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserInput(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (userInput.trim() === "") return;

    try {
      const response = await axios.post(
        "https://carefinder.onrender.com/chat",
        {
          message: userInput,
        }
      );
      const aiResponse = response.data.response;

      setChatHistory([...chatHistory, userInput, aiResponse]);
      console.log(aiResponse);

      setUserInput("");
    } catch (error) {
      console.error(error, "error");
    }
  };

  return (
    <Box
      position="fixed"
      bottom={0}
      right={0}
      maxWidth={400}
      boxShadow={3}
      bgcolor="#fff"
      zIndex={999}
      borderRadius="8px 0 0 0"
      flexDirection="column"
      display={isChatOpen ? "flex" : "none"}
    >
      <Box mb={7} p={2}>
        <Typography variant="h6">Ask your health related questions</Typography>
        {currentUser ? (
          <Box
            sx={{
              padding: "3px",
              maxHeight: 500,
              overflow: "auto",
              scrollbarWidth: "none",
            }}
          >
            {chatHistory.map((message, index) => (
              <Typography
                sx={{
                  background: "rgba(250, 250, 250)",
                  padding: "5px",
                  borderRadius: "5px",
                }}
                key={index}
              >
                {message}
              </Typography>
            ))}
          </Box>
        ) : (
          <Typography sx={{ textAlign: "center" }}>
            You need to be logged in to chat with DocGPT!
          </Typography>
        )}
        <form
          style={{
            display: "flex",
            border: "1px solid #ccc",
            borderRadius: "0.25rem",
          }}
          onSubmit={handleSubmit}
        >
          <input
            width="100%"
            placeholder="Message docGPT..."
            type="text"
            value={userInput}
            onChange={handleUserInput}
          />
          <button
            style={{ background: "rgba(240, 240, 240)", color: "#242647" }}
            type="submit"
          >
            &rarr;
          </button>
        </form>
      </Box>
    </Box>
  );
};

export default Chat;

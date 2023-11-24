import React, { useContext, useState } from "react";
import axios from "axios";
import { Box, Typography, Button } from "@mui/material";
import { AppContext } from "@/app/AppContext";
import { ToastContainer, toast } from "react-toastify";
import Loader from "@/components/Loader";

const Chat = () => {
  const [userInput, setUserInput] = useState("");
  const [chatHistory, setChatHistory] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const { isChatOpen, setIsChatOpen, currentUser } = useContext(AppContext);

  const handleUserInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserInput(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (userInput.trim() === "") return;

    try {
      setLoading(true);
      const response = await axios.post(
        "https://carefinder.onrender.com/chat",
        {
          message: userInput,
        }
      );
      const aiResponse = response.data.response;

      setChatHistory([...chatHistory, userInput, aiResponse]);
      setUserInput("");
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
      toast.error("An error occured, please try later", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
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
            {chatHistory.map((message: string, index: number) => (
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  marginBottom: "4px",
                  "&.user": {
                    justifyContent: "flex-end",
                  },
                  "&.ai": {
                    justifyContent: "flex-start",
                  },
                }}
                key={index}
                className={index % 2 === 0 ? "user" : "ai"}
              >
                {index % 2 === 0 ? (
                  <Typography
                    sx={{
                      background: "rgba(235, 235, 235)",
                      padding: "7px",
                      borderRadius: "5px",
                      fontSize: "0.9rem",
                      boxShadow: "0 1px 1px rgba(0, 0, 0, 0.1)",
                    }}
                  >
                    {message}
                  </Typography>
                ) : (
                  <Typography
                    sx={{
                      background: "rgb(120, 170, 145)",
                      padding: "7px",
                      borderRadius: "5px",
                      fontSize: "0.9rem",
                      color: "#ffffff",
                      boxShadow: "0 1px 1px rgba(0, 0, 0, 0.1)",
                    }}
                  >
                    {message}
                  </Typography>
                )}
              </Box>
            ))}
          </Box>
        ) : (
          ""
          // <Typography sx={{ textAlign: "center" }}>
          //   You need to be logged in to chat with DocGPT!
          // </Typography>
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
            placeholder={
              currentUser ? `Message docGPT` : "Login to Message DocGPT"
            }
            type="text"
            value={userInput}
            onChange={handleUserInput}
            disabled={!currentUser}
            style={{
              cursor: currentUser ? "auto" : "not-allowed",
            }}
          />
          <button
            style={{
              background: "rgba(240, 240, 240)",
              color: "#242647",
              border: " 1px solid #78aa91",
              cursor: currentUser ? "auto" : "not-allowed",
            }}
            type="submit"
            disabled={loading || !currentUser}
          >
            {loading ? <Loader /> : "\u2192"}
          </button>
        </form>
      </Box>
    </Box>
  );
};

export default Chat;

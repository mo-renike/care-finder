import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";
import { Configuration, OpenAIApi } from "openai";

const app = express();
dotenv.config();

app.use(cors());
app.use(express.json());
app.get("/", (req, res) => {
  res.send("Server is running!");
});
app.listen(8080, () => {
  console.log(`Server is listening on port 8080`);
});

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

app.post("/chat", (req, res) => {
  const { message } = req.body;

  openai
    .createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "user",
          content: message,
        },
      ],
    })
    .then((response) => {
      const aiResponse = response.data.choices[0].message.content;
      res.json({ response: aiResponse });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: "An error occurred" });
    });
});

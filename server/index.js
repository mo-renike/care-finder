import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";
import { GoogleGenerativeAI } from "@google/generative-ai"

const app = express();
dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY);

const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(8080, () => {
  console.log(`Server is listening on port 8080`);
});

app.get("/", (req, res) => {
  res.send("Server is running!");
});


app.post("/chat", async (req, res) => {
  const { message } = req.body;

  try {
    const result = await model.generateContent(message);
    const response = result.response;
    const text = response.text();

    res.status(200).json({ text });

  } catch (error) {
    console.log(error, 'Error processing message');
  }

})
import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";
//import fetch from "node-fetch";
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

// app.get("/hospitals", async (req, res) => {
//   const { latitude, longitude } = req.query;
//   const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude}%2C${longitude}&radius=50000&type=hospital&keyword=hospital&key=${process.env.DATA_API_KEY}`;
//   try {
//     const response = await fetch(url);
//     const data = await response.json();
//     res.json(data);

//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ error: "Something went wrong" });
//   }
// });

// find place from text

// app.get("/findplace", async (req, res) => {
//   const { location } = req.query;
//   const url = `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=${location}&inputtype=textquery&fields=formatted_address,name,geometry&key=${process.env.DATA_API_KEY}`;
//   try {
//     const response = await fetch(url);
//     const data = await response.json();
//     res.json(data);
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ error: "Something went wrong" });
//   }
// });

// // place details
// app.get("/details", async (req, res) => {
//   const { id } = req.query;
//   const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${id}&key=${process.env.DATA_API_KEY}`;
//   try {
//     const response = await fetch(url);
//     const data = await response.json();
//     res.json(data);
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ error: "Something went wrong" });
//   }
// });

import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";
import fetch from "node-fetch";

const app = express();
dotenv.config();

app.use(cors());

app.get("/", (req, res) => {
  res.send("Server is running!");
});

app.get("/hospitals", async (req, res) => {
  const { latitude, longitude } = req.query;
  const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude}%2C${longitude}&radius=50000&type=hospital&keyword=hospital&key=${process.env.DATA_API_KEY}`;
  try {
    const response = await fetch(url);
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Something went wrong" });
  }
});

// find place from text

app.get("/findplace", async (req, res) => {
  const { location } = req.query;
  const url = `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=${location}&inputtype=textquery&fields=formatted_address,name,geometry&key=${process.env.DATA_API_KEY}`;
  try {
    const response = await fetch(url);
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Something went wrong" });
  }
});

// place details
app.get("/details", async (req, res) => {
  const { id } = req.query;
  const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${id}&key=${process.env.DATA_API_KEY}`;
  try {
    const response = await fetch(url);
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Something went wrong" });
  }
});

app.listen(8080, () => {
  console.log(`Server is listening on port 8080`);
});

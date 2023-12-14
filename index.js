const express = require("express");
const { GoogleGenerativeAI } = require("@google/generative-ai");
require("dotenv").config();

const genAI = new GoogleGenerativeAI(process.env.API_KEY);

const app = express(); 

async function run() {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    const prompt = "Write me a love message for my girlfriend";

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    console.log(text);
  } catch (error) {
    console.error("Error in run():", error);
  }
}

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
  run();
});

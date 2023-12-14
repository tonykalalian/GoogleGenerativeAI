const readline = require('readline');

const {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} = require("@google/generative-ai");
require("dotenv").config();

const MODEL_NAME = "gemini-pro";
const API_KEY = process.env.API_KEY;

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

async function runChat() {
  // Initialize GoogleGenerativeAI
  const genAI = new GoogleGenerativeAI(API_KEY);
  const model = genAI.getGenerativeModel({ model: MODEL_NAME });

  // Configuration for chat generation
  const generationConfig = {
    temperature: 1,
    topK: 1,
    topP: 1,
    maxOutputTokens: 2048,
  };

  // Safety settings to block harmful content
  const safetySettings = [
    {
      category: HarmCategory.HARM_CATEGORY_HARASSMENT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
  ];

  // Start a chat with the configured settings
  const chat = model.startChat({
    generationConfig,
    safetySettings,
    history: [],
  });

  try {
    while (true) {
      // Prompt the user for input
      const userInput = await askQuestion('Enter your prompt (type "exit" to end): ');

      if (userInput.toLowerCase() === 'exit') {
        console.log('Exiting the chat loop.');
        break;
      }

      // Send the user input to the chat
      const result = await chat.sendMessage(userInput);
      const response = result.response;

      // Log the generated response
      console.log(response.text());
    }
  } catch (error) {
    console.error("Error during chat:", error.message);
  } finally {
    // Close the readline interface
    rl.close();
  }
}

// Utility function to ask a question asynchronously
function askQuestion(question) {
  return new Promise((resolve) => {
    rl.question(question, resolve);
  });
}

// Run the chat function
runChat();

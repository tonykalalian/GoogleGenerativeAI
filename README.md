# Generate text from text-only input
When the prompt input includes only text, use the gemini-pro model with the generateContent method to generate text output
### To use Generate text from text-only input : nodemon index.js
# Generate text from text-and-image input (multimodal)
Gemini provides a multimodal model (gemini-pro-vision), so you can input both text and images. Make sure to review the image requirements for prompts.

When the prompt input includes both text and images, use the gemini-pro-vision model with the generateContent method to generate text output
### To use Generate text from text-and-image input (multimodal) : nodemon app.js
# Build multi-turn conversations (chat)
Using Gemini, you can build freeform conversations across multiple turns. The SDK simplifies the process by managing the state of the conversation, so unlike with generateContent, you don't have to store the conversation history yourself.

To build a multi-turn conversation (like chat), use the gemini-pro model, and initialize the chat by calling startChat(). Then use sendMessage() to send a new user message, which will also append the message and the response to the chat history.

There are two possible options for role associated with the content in a conversation:

user: the role which provides the prompts. This value is the default for sendMessage calls.

model: the role which provides the responses. This role can be used when calling startChat() with existing history.
### To use Build multi-turn conversations (chat) : nodemon server.js

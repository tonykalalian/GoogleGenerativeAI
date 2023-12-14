const chatOutput = document.getElementById("chat-output");
const userInputText = document.getElementById("user-input-text");

async function sendMessage() {
  const userInput = userInputText.value.trim();
  if (!userInput) return;

  appendMessage("You", userInput, "user");

  // Send user input to the backend
  const response = await fetch("/send-message", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ userInput }),
  });

  const responseData = await response.json();
  appendMessage("Chatbot", responseData.response, "bot");

  userInputText.value = "";
}

function appendMessage(sender, message, className) {
  const messageElement = document.createElement("div");
  messageElement.className = className;
  messageElement.innerHTML = `<strong>${sender}:</strong> ${message}`;
  chatOutput.appendChild(messageElement);

  chatOutput.scrollTop = chatOutput.scrollHeight;
}

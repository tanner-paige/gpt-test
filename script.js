let messages = [];

function saveMessage() {
  const messageText = document.getElementById("message-input").value.trim();
  if (messageText === "") {
    alert("Please enter a message before submitting");
    return;
  }

  const newMessage = { text: messageText, votes: 0 };
  messages.push(newMessage);

  fetch("./messages.json", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(messages),
  })
    .then(() => {
      loadMessages();
      document.getElementById("message-input").value = "";
    })
    .catch((error) => {
      console.error("Error saving messages:", error);
    });
}

function loadMessages() {
  fetch("./messages.json")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      messages = data;
      const messageList = document.getElementById("message-list");
      messageList.innerHTML = "";
      for (let i = 0; i < messages.length; i++) {
        const message = messages[i];
        const listItem = document.createElement("li");
        listItem.innerText = message.text;
        messageList.appendChild(listItem);
      }
    })
    .catch((error) => {
      console.error("Error loading messages:", error);
    });
}

loadMessages();



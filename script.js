function postMessage() {
  // Get the values of the name and message fields
  var name = document.getElementById('name').value;
  var message = document.getElementById('message').value;

  // Create a new XHR object
  var xhr = new XMLHttpRequest();

  // Set up the request
  xhr.open('POST', '/post-message', true);
  xhr.setRequestHeader('Content-Type', 'application/json');

  // Set up a callback function for when the request completes
  xhr.onload = function() {
    if (xhr.status === 200) {
      // Clear the form
      document.getElementById('name').value = '';
      document.getElementById('message').value = '';

      // Reload the message list
      loadMessages();
    } else {
      alert('Error posting message');
    }
  };

  // Send the request with the JSON data
  xhr.send(JSON.stringify({ name: name, message: message }));
}

function loadMessages() {
  // Create a new XHR object
  var xhr = new XMLHttpRequest();

  // Set up the request
  xhr.open('GET', '/messages.json', true);

  // Set up a callback function for when the request completes
  xhr.onload = function() {
    if (xhr.status === 200) {
      // Parse the JSON response
      var messages = JSON.parse(xhr.responseText);

      // Clear the message list
      var messageList = document.getElementById('message-list');
      messageList.innerHTML = '';

      // Add each message to the list
      messages.forEach(function(message) {
        var li = document.createElement('li');
        li.textContent = message.name + ': ' + message.message;
        messageList.appendChild(li);
      });
    } else {
      alert('Error loading messages');
    }
  };

  // Send the request
  xhr.send();
}

// Load the messages when the page loads
loadMessages();



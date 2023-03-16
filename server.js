const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();
const port = process.env.PORT || 3000;

// Serve static files from the public directory
app.use(express.static('public'));

// Parse JSON body data
app.use(bodyParser.json());

// Handle POST requests to /post-message
app.post('/post-message', (req, res) => {
  // Load the existing messages from the messages.json file
  let messages = [];
  try {
    messages = JSON.parse(fs.readFileSync('messages.json', 'utf8'));
  } catch (err) {
    console.error('Error reading messages file:', err);
  }

  // Add the new message to the messages array
  const newMessage = {
    name: req.body.name,
    message: req.body.message
  };
 

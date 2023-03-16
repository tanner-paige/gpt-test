const express = require('express')
const bodyParser = require('body-parser')
const fs = require('fs')

const app = express()

app.use(express.static('public'))
app.use(bodyParser.json())

app.get('/messages', getMessages)
app.post('/messages', postMessage)
app.put('/messages/:id/vote', voteMessage)

function getMessages(request, response) {
  fs.readFile('./messages.json', 'utf8', function(err, data) {
    if (err) {
      console.error(err)
      response.status(500).send('Server Error')
    } else {
      response.setHeader('Content-Type', 'application/json')
      response.send(data)
    }
  })
}

function postMessage(request, response) {
  var newMessage = request.body

  fs.readFile('./messages.json', 'utf8', function(err, data) {
    if (err) {
      console.error(err)
      response.status(500).send('Server Error')
    } else {
      var messages = JSON.parse(data)
      var lastId = messages.length > 0 ? messages[messages.length - 1].id : 0
      var newId = lastId + 1
      var newMessageWithId = {
        id: newId,
        text: newMessage.text,
        votes: 0
      }
      messages.push(newMessageWithId)
      var json = JSON.stringify(messages)

      fs.writeFile('./messages.json', json, 'utf8', function(err) {
        if (err) {
          console.error(err)
          response.status(500).send('Server Error')
        } else {
          response.status(201).send(newMessageWithId)
        }
      })
    }
  })
}

function voteMessage(request, response) {
  var id = parseInt(request.params.id)
  var voteType = request.body.type
  var voteValue = voteType === 'up' ? 1 : -1

  fs.readFile('./messages.json', 'utf8', function(err, data) {
    if (err) {
      console.error(err)
      response.status(500).send('Server Error')
    } else {
      var messages = JSON.parse(data)
      var message = messages.find(function(m) {
        return m.id === id
      })

      if (message) {
        message.votes += voteValue
        var json = JSON.stringify(messages)

        fs.writeFile('./messages.json', json, 'utf8', function(err) {
          if (err) {
            console.error(err)
            response.status(500).send('Server Error')
          } else {
            response.status(200).send(message)
          }
        })
      } else {
        response.status(404).send('Message not found')
      }
    }
  })
}

app.listen(3000, function() {
  console.log('Server listening on port 3000')
})

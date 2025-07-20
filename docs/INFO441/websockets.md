---
hide:
  - navigation
  - toc
---

<small><i>Last modified: {{ git_revision_date_localized }}</i></small>

<div class="back-button">
    <br>
    <a href="javascript:history.back()">← Back</a>
    <br>
    <br>
</div>

# Websockets


How does our view (browser) get live updates? (e.g., new posts, chat messages)  

- One solution is **polling**, that is, keeping sending a request to the server asking "is there anything new?"

websockets

- create a connection where messages can be sent at any time in either direction

<br>

app.js
```
import express from 'express'
import enableWs from 'express-ws'

const app = express()
enableWs(app)

// track websocket connections
let socketCounter = 1
let allSockets = []

app.ws('/chatSocket', (ws, res) => {
    const mySocketNum = socketCounter
    socketCounter++
    console.log(`user ${mySocketNum} connected`)

    // add this ws to the global array tracking all websockets
    allSockets.push(ws)

    ws.on('message', (chat) => {
        console.log(`chat (user ${mySocketNum}): ${chat}`)
        allSockets.forEach(socket => {
            socket.send(mySocketNum + ": " + chat)
        })
    })

    ws.on('close', () => {
        console.log(`user ${mySocketNum} disconnected`)
        console.log("I should probably delete them from the array or something")
    })
})

app.get('/', (req, res) => {
    res.sendFile(process.cwd() + "/index.html")
})

app.listen(3000, () => {
    console.log("Example app listening at http://localhost:3000")
})
```

index.html
```
<html>
<head>
    <script>
        const socketURL = "ws://localhost:3000/chatSocket"
        let webSocket = new WebSocket(socketURL)

        function sendChat() {
            let chatMsg = document.getElementById("textInput").value
            webSocket.send(chatMsg)
        }

        webSocket.onmessage = (event) => {
            const chat = event.data
            document.getElementById("output")
                .innerText += chat + "\n"
        }
    </script>
</head>
<body>
    <h1>Web socket chat demo!</h1>

    <input type="text" id="textInput" />
    <button id="sendBtn" onclick="sendChat()">send</button>

    <h3>chat history</h3>
    <div id = "output"></div>
</body>
</html>
```
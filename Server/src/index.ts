import express from "express";
import http from "http";
import { WebSocketServer, WebSocket as WS } from "ws";

const app = express();

const server = http.createServer(app);

const wss = new WebSocketServer({ server });

wss.on("connection", (ws: WS) => {
  console.log("New WebSocket connection established");

  ws.on("message", (message: string) => {
    console.log(`Received: ${message}`);

    wss.clients.forEach((client) => {
      if (client.readyState === WS.OPEN) {
        client.send(message);
      }
    });
  });

  ws.on("close", () => {
    console.log("WebSocket connection closed");
  });

  ws.send("Welcome to the WebSocket server!");
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

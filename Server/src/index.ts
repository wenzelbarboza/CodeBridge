import express from "express";
import http from "http";
import { WebSocketServer, WebSocket as WS } from "ws";
import { v4 as uuid } from "uuid";
import { joinRoom, leaveRoom } from "./roomsActions";
import { setMap } from "./types";

const app = express();
app.use(express.urlencoded());
const server = http.createServer(app);
const wss = new WebSocketServer({ server });

export const rooms: setMap<WS> = {};
let len = 0;
export const users: setMap<string> = {};

wss.on("connection", (ws: WS, request: any) => {
  console.log("New WebSocket connection established");
  len++;

  let wsId = uuid() as string;
  const url = new URL(request.url || "", `http://${request.headers.host}`);

  const name = url.searchParams.get("name");
  const roomId = url.searchParams.get("id");

  if (!name || !roomId) {
    ws.send(
      JSON.stringify({
        error: "Missing required parameters: 'name' and 'id' are mandatory.",
      })
    );
    ws.close(1008, "Invalid Parameters");
    return;
  }

  joinRoom(roomId, ws, name);

  // notify about newuser
  const userNames = Array.from(users[roomId]);
  wss.clients.forEach((client) => {
    if (client.readyState == WS.OPEN && client !== ws) {
      const message = {
        type: "USER_UPDATE",
        updateType: "CONNECTED",
        updatedUser: name,
        names: userNames,
      };
      client.send(JSON.stringify(message));
    }
  });

  ws.on("message", (message: string) => {
    console.log(`Received: ${message}`);
    console.log("id on message is: ", wsId);

    if (message)
      wss.clients.forEach((client) => {
        if (client.readyState === WS.OPEN) {
          // test --
          console.log("no of users are: ", len);
          console.log("users in server are: ", JSON.stringify(users));
          console.log("\n\n");
          // -----
          client.send(message);
        }
      });
  });

  ws.on("close", () => {
    len--;

    // leaveRoom(roomId, ws, `name${len}`);
    leaveRoom("room1", ws, name);
    const userNames = users[roomId];
    wss.clients.forEach((client) => {
      if (client.readyState == WS.OPEN && client !== ws) {
        const message = {
          type: "USER_UPDATE",
          updateType: "DISCONNECTED",
          updatedUser: name,
          names: userNames,
        };
        client.send(JSON.stringify(message));
      }
    });
    console.log("WebSocket connection closed");
  });

  ws.send("Welcome to the WebSocket server!");
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

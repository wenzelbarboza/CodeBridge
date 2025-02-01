import express from "express";
import http from "http";
import { WebSocketServer, WebSocket as WS } from "ws";
import { v4 as uuid } from "uuid";
import { joinRoom, leaveRoom } from "./roomsActions";
import { Code, setMap } from "./types";

const app = express();
app.use(express.urlencoded());
const server = http.createServer(app);
const wss = new WebSocketServer({ server });

export const rooms: setMap<WS> = {};
let len = 0;
export const users: setMap<string> = {};
export const code: Code = {};

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

  // notify about newuser to the room
  const userNames = Array.from(users[roomId]);
  rooms[roomId].forEach((client) => {
    if (client.readyState == WS.OPEN) {
      const message = {
        type: "USER_UPDATE",
        updateType: "CONNECTED",
        updatedUser: name,
        names: userNames,
      };
      client.send(JSON.stringify(message));
    }
  });
  // wss.clients.forEach((client) => {
  // });

  ws.on("message", (jsonMessage: string) => {
    const message = JSON.parse(jsonMessage);

    console.log(`Received: ${message}`);
    console.log("id on message is: ", wsId);
    code[roomId] = message;

    console.log("received code in message is: ", message);
    console.log("received code in session memory is: ", code[roomId]);

    if (message)
      rooms[roomId].forEach((client) => {
        if (client !== ws && client.readyState === WS.OPEN) {
          const message = {
            type: "CODE_UPDATE",
            updatingUser: name,
            code: code[roomId],
          };
          client.send(JSON.stringify(message));
        }
      });
  });

  ws.on("close", () => {
    len--;

    // leaveRoom(roomId, ws, `name${len}`);
    leaveRoom(roomId, ws, name);
    const userNames = Array.from(users[roomId]);
    rooms[roomId].forEach((client) => {
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
  const message = code[roomId]
    ? {
        type: "CODE_UPDATE",
        updatingUser: "room",
        code: code[roomId],
      }
    : {
        type: "WELCOME",
        message: "Welcome to the ws server!",
      };

  ws.send(JSON.stringify(message));
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

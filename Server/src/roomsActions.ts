import { WebSocket as WS } from "ws";
import { rooms, users } from ".";

export const joinRoom = (roomName: string, ws: WS, userName: string) => {
  if (!users[roomName]) {
    users[roomName] = new Set();
  }

  if (!rooms[roomName]) {
    rooms[roomName] = new Set();
  }
  console.log("name: ", userName);

  users[roomName].add(userName);
  rooms[roomName].add(ws);

  console.log("users List:", users);
};

export const leaveRoom = (roomName: string, ws: WS, userName: string) => {
  if (roomName && rooms[roomName]) {
    rooms[roomName].delete(ws);

    if (rooms[roomName].size == 0) {
      delete rooms[roomName];
    }
  }

  if (userName && users[roomName]) {
    users[roomName].delete(userName);

    if (users[roomName].size == 0) {
      delete users[roomName];
    }
  }
};

export const broadcastToRooms = (
  roomName: string,
  message: string,
  sender: WS,
  senderName: string
) => {
  if (!rooms[roomName]) return;

  rooms[roomName].forEach((client) => {
    if (client !== sender && client.readyState == client.OPEN) {
      client.send(message);
    }
  });
};

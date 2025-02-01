import { WebSocket as WS } from "ws";
import { code, rooms, users } from ".";

export const joinRoom = (rooomId: string, ws: WS, userName: string) => {
  if (!users[rooomId]) {
    users[rooomId] = new Set();
  }

  if (!code[rooomId]) code[rooomId] = "";

  if (!rooms[rooomId]) {
    rooms[rooomId] = new Set();
  }
  console.log("name: ", userName);

  users[rooomId].add(userName);
  rooms[rooomId].add(ws);

  console.log("users List:", users);
};

export const leaveRoom = (rooomId: string, ws: WS, userName: string) => {
  if (rooomId && rooms[rooomId]) {
    rooms[rooomId].delete(ws);

    if (rooms[rooomId].size == 0) {
      delete rooms[rooomId];
    }
  }

  if (userName && users[rooomId]) {
    console.log("user left the room: ", userName);
    users[rooomId].delete(userName);
    console.log("after deleting the user: ", users[rooomId].size);

    if (users[rooomId].size == 0) {
      delete users[rooomId];
      code[rooomId] = "";
      delete code[rooomId];
    }
  }
};

// export const broadcastToRooms = (
//   rooomId: string,
//   message: string,
//   sender: WS,
//   senderName: string
// ) => {
//   if (!rooms[rooomId]) return;

//   rooms[rooomId].forEach((client) => {
//     if (client !== sender && client.readyState == client.OPEN) {
//       client.send(message);
//     }
//   });
// };

module.exports = ({ app }) => {
  const io = require("socket.io")();

  const rooms = {};
  const socketToRoom = {};

  io.on("connection", (socket) => {
    socket.on("makeNewRoom", (roomID) => {
      if (rooms[roomID]) {
        socket.emit("error", { message: "Room is already exist" });
      }
      
      rooms[roomID] = {
        creator: socket.id,
      };

      socket.join(roomID);

      socket.emit("successCreateRoom", { creaetor: socket.id, roomID: roomID });
    });

    socket.on("somePlayerJoin", ({ message }) => {
      socket.emit("success", message);
    });
  });

  app.io = io;
};

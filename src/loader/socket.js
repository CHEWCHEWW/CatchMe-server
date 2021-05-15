module.exports = ({ app }) => {
  const io = require("socket.io")();

  const rooms = {};
  const socketToRoom = {};

  io.on("connection", (socket) => {
    socket.on("makeNewRoom", (roomId) => {
      if (rooms[roomId]) {
        socket.emit("error", { message: "Room is already exist" });
      }
      
      rooms[roomId] = {
        creatorId: socket.id,
      };

      socket.join(roomId);

      socket.emit("createRoomSuccess", { creatorId: socket.id, roomId });
    });

    socket.on("somePlayerJoin", ({ message }) => {
      socket.emit("success", message);
    });
  });

  app.io = io;
};

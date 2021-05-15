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
        members: [],
      };

      socket.emit("createRoomSuccess", { creatorId: socket.id, roomId });
    });

    socket.on("enterRoom", ({ roomId, username }) => {
      const room = rooms[roomId];

      if (!room) {
        socket.emit("error", { message: "Room is not exist" });

        return;
      }

      socket.join(roomId);
      socketToRoom[socket.id] = roomId;
      room.members.push({ userId: socket.id, isReady: false, role: "rabbit", username });

      io.in(roomId).emit("joinUserSuccess", { members: room.members, creatorId: room.creatorId, userId: socket.id, roomId, username });
    });

    socket.on("changeReadyState", ({ username, role, isReady }) => {
      const roomId = socketToRoom[socket.id];
      
      rooms[roomId].members?.forEach((member) => {
        if (member.userId === socket.id) {
          member.username = username;
          member.role = role;
          member.isReady = isReady;
        }
      });

      const isAllReady = rooms[roomId].members.every((member) => member.isReady === true);
      
      io.in(roomId).emit("changeSomeUserState", { players: rooms[roomId].members });
      socket.emit("changeMyState", { username, role, isReady });

      if (isAllReady) {
        io.in(roomId).emit("startGame");
      }
    });

    socket.on("disconnect", () => {
      const roomId = socketToRoom[socket.id];

      const leftUsers = rooms[roomId]?.members.filter(
        (member) => member.userId !== socket.id
      );

      if (leftUsers?.length) {
        if (rooms[roomId]) {
          rooms[roomId].members = leftUsers;
        }
      } else {
        delete rooms[roomId];
      }

      delete socketToRoom[socket.id];

      socket.broadcast.emit(`${socket.id} user left`);

      socket.emit("successToLeave");
    });
  });

  app.io = io;
};

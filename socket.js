const app = require('./app');
const socket = require('http').createServer(app);
const corsConfig = require('./config/cors.config');

const {
  getUsersFromDB,
  messageWithAttachedUser,
  getRoomUsernames,
  getActiveUserRooms,
  getActiveRooms
} = require('./src/tasks');

const {
  CONNECTION,
  JOIN_ROOM,
  USER_JOINED,
  MESSAGE,
  DISCONNECT,
  DISCONNECTION,
  SHOW_ROOM_USER_COUNT
} = require('./events');

const io = require('socket.io')(socket, { cors: corsConfig });

io.on('connection', async socket => {
  socket.emit(CONNECTION, 'connected to chat');

  socket.on(JOIN_ROOM, async ({ roomId, ...currentUser }) => {
    try {
      if (!roomId) {
        return;
      }
      socket.username = currentUser.username;
      socket.join(roomId);

      const users = await getUsersFromDB(
        getRoomUsernames({ io, roomId })
      );

      const userThatJoined = await messageWithAttachedUser({
        message: 'Joined The Room', username: currentUser.username
      });

      io.to(roomId).emit(USER_JOINED, { users });
      io.to(roomId).emit(JOIN_ROOM , {
        users,
        roomId,
        ...userThatJoined
      });

      socket.on(MESSAGE, async message => {
        try {
          const messageData = await messageWithAttachedUser({
            message, username: currentUser.username
          });
          io.to(roomId).emit( 'message', messageData);
        } catch (err) {
          console.error(err);
        }
      });

      socket.on(DISCONNECT, async () => {
        try {
          const users = await getUsersFromDB(
            getRoomUsernames({ io, roomId })
          );
          const messageData = await messageWithAttachedUser({
            message: `${socket.username} has left the room`,
            username: socket.username
          });
          io.to(roomId).emit(DISCONNECTION, {
            users,
            ...messageData
          });
          socket.emit(DISCONNECTION, {
            users,
            ...messageData
          });
        } catch (err) {
          console.error(err);
        }
      });

    } catch (err) {
      console.error(err);
    }
  });

  socket.on(SHOW_ROOM_USER_COUNT, async ({ currentUser }) => {
    try {
      const activeUserRooms = await getActiveUserRooms({ io, user_id: currentUser.id });
      const activeRooms = getActiveRooms({ io });
      socket.emit(SHOW_ROOM_USER_COUNT, { activeUserRooms, activeRooms });
    } catch (err) {
      console.error(err);
    }
  });

  socket.on(DISCONNECT, () => {
    null;
  });

});

module.exports = socket;
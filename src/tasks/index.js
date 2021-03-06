const userService = require('../user/user.service');
const AntiqueService = require('../antique/antique.service');
const STATIC_ROOMS = require('../../lib/static-rooms');

const getUsersFromDB = async usernames => {
  try {
    if (!usernames.length) {
      return;
    }
    return await userService.getUsersByUsername({ usernames });
  } catch (err) {
    console.error(err);
  }
};

const socketMapper = ({ io, rooms }) => rooms.map(data => {
  const { id, ...rest } = data;
  return {
    roomId: id,
    socketUsers: io.sockets.adapter.rooms.get(id.toString()),
    ...rest
  };
});

const getActiveRooms = ({ io }) => {
  const usersInRoomData = socketMapper({ rooms: STATIC_ROOMS, io });
  const activeRooms = usersInRoomData;
  const roomsCount = getUserRoomCountWithSet({ activeRooms });
  const sortedRooms = roomsCount.sort((a,b) => b.socketUsers - a.socketUsers);
  return sortedRooms;
};

const getActiveUserRooms = async ({ io, user_id }) => {
  try {
    const antique_ids = await AntiqueService.getUserAntiques(user_id);
    const userAntiqueRoomData = socketMapper({ rooms: antique_ids, io });
    const activeRooms = userAntiqueRoomData.filter(data => data.socketUsers !== undefined);
    const antiqueOwnersVacantRooms = getUserRoomCountWithSet({ activeRooms });
    const sortedRooms = antiqueOwnersVacantRooms.sort((a,b) => b.socketUsers - a.socketUsers);
    return sortedRooms;
  } catch (err) {
    console.error(err);
  }
};

const getUserRoomCountWithSet = ({ activeRooms }) => {
  return activeRooms.map(({ socketUsers, ...rest }) => {
    const userUndefinedConverter = socketUsers ? [...socketUsers].length : 0;
    return {
      ...rest,
      socketUsers: userUndefinedConverter
    };
  });
};

const getRoomUsernames = ({ io, roomId }) => {
  const clients = io.sockets.adapter.rooms.get(roomId) ?? [];
  const usernames = [...clients].map(clientId => {
    return io.sockets.sockets.get(clientId).username;
  });
  return usernames;
};

const messageWithAttachedUser = async ({ message, username }) => {
  try {
    const user = await userService.getUserByUsername(username);
    return {
      message: {
        message,
        timeStamp: new Date(),
        username: user.username,
        ...user
      }
    };
  } catch (err) {
    console.error(err);
  }
};

module.exports = {
  getUsersFromDB,
  messageWithAttachedUser,
  getRoomUsernames,
  getActiveUserRooms,
  getActiveRooms
};

const socket = require('./socket');

const PORT = 80;

socket.listen(PORT, () => console.log('listening on port %d', PORT));
const socket = require('./socket');

const PORT = 3003;

socket.listen(PORT, () => console.log('listening on port %d', PORT));
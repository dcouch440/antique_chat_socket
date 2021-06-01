const server = require('./server');

const PORT = process.env.PORT || 3003;

server.listen(PORT, () => console.log('listening on port %d', PORT));
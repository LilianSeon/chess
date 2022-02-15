const http = require('http').createServer();

const io = require('socket.io')(http, {
    cors: { 
        origin: "*",
    }
});

var nsp = io.of('/');

nsp.on('connection', (socket) => {

    socket.join("chessRoom1");

    let date = new Date();
    const count = socket.client.conn.server.clientsCount;
    console.log(`${count} User connected at ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}:${date.getMilliseconds()}ms`);

    socket.on('onDrop', (sourceSquare, targetSquare) =>     {
        console.log('#2 on - onDrop serverside from : '+sourceSquare+' to : '+targetSquare+'');
        socket.to('chessRoom1').emit('onDrop', sourceSquare, targetSquare);   
    });
});

http.listen(8080, () => console.log('listening on http://localhost:8080') );
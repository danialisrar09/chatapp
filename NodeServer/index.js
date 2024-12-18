//Node Server  which will handle socket io connection 
const io = require('socket.io')(3002)

const user = {};

io.on('connection', socket => {
    //Agar new user join event ayega to ye hoga.
    socket.on('new-user-joined', name =>{
        console.log("New user", name);
        user[socket.id] = name;
        socket.broadcast.emit('user-joined', name)
    });

    //Agar koi user msg send karega to baki logon ke pass broadcast hojayega
    socket.on('send', message =>{
        socket.broadcast.emit('recieve', {message: message, name: user[socket.id]})
    });
    
    socket.on('disconnect', message =>{
        socket.broadcast.emit('left', user[socket.id])
        delete user[socket.id]
    });




})

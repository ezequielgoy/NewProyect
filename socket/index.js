const io = require("socket.io")(8900, {
    cors: {
      origin: "http://localhost:3000",
    },
  });

io.on("connection", (socket) =>{
    console.log("A user connected");

    socket.on("join_room", (data) => {
        socket.join(data);
        console.log(`User: ${socket.id} joined room: ${data}`);
    });
    
    socket.on("send_message", (data) => {
        socket.to(data.roomName).emit("receive_message", data);
        console.log(data);
      });


})
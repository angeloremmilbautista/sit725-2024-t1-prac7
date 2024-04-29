const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const { connectDB } = require("./models/catModel");
const catRoutes = require("./routes/catRoutes");

const http = require('http').createServer(app);
const io = require('socket.io')(http);

app.use(express.static(__dirname + "/public"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/", catRoutes);

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/index.html");
});

//socket test
io.on('connection', (socket) => {
  console.log('a user connected', socket.id);
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
  setInterval(()=>{
    socket.emit('number', parseInt(Math.random()*10));
  }, 1000);

});

http.listen(3000,()=>{
  console.log("Listening on port  3000");
});

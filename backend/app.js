// const express = require('express');
// const router = require("./routes/router");
// const app = express();
// const cookieParser = require("cookie-parser");
// const { config } = require("dotenv");
// const cors = require("cors");
// config();

// // CORS configuration
// app.use(cors({
//   origin: 'http://localhost:3000',
//   credentials: true,
//   methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
//   allowedHeaders: ['Content-Type', 'Authorization', 'x-client-ip']
// }));
 
// //To access the data user inputs in form.
// app.use(express.urlencoded({ extended: true }));
// //just a boilerplate code, tells our express server to add the user submitted data to request object.
// app.use(express.json());
// // app.use('/api', require('./router-api'))
// //(aoi routw wont use any of tye session data etc. etc. written below)
// app.use(cookieParser());
// app.use(express.static("public"));



// app.use(function (req, res, next) {
//   // make our markdown function available from within ejs templates
//   res.locals.filterUserHTML = function (content) {
//     return sanitizeHTML(markdown.parse(content), {
//       allowedTags: [
//         "p",
//         "br",
//         "ul",
//         "ol",
//         "li",
//         "strong",
//         "bold",
//         "i",
//         "em",
//         "h1",
//         "h2",
//         "h3",
//         "h4",
//         "h5",
//         "h6",
//       ],
//       allowedAttributes: {},
//     });
//   };

  
//   next();
// });

// // app.use(function (req, res, next) {
// //   res.setHeader("Access-Control-Allow-Origin", "*");
// //   res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
// //   res.setHeader("Access-Control-Allow-Headers", "Content-Type");
// //   res.setHeader("Access-Control-Allow-Credentials", "true");
// //   next();
// // });

// app.use("/", router);




// module.exports = app;



const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const router = require("./routes/router");
const app = express();
const cookieParser = require("cookie-parser");
const { config } = require("dotenv");
const cors = require("cors");
config();

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3000',
    credentials: true,
  },
});

// CORS configuration
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'x-client-ip']
}));
 
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(express.static("public"));

app.use(function (req, res, next) {
  res.locals.filterUserHTML = function (content) {
    return sanitizeHTML(markdown.parse(content), {
      allowedTags: [
        "p", "br", "ul", "ol", "li", "strong", "bold", "i", "em", "h1", "h2", "h3", "h4", "h5", "h6"
      ],
      allowedAttributes: {},
    });
  };
  next();
});

// WebSocket Connection
io.on('connection', (socket) => {
  console.log('A user connected:', socket.id);
  
  socket.on('joinGroup', (groupId) => {
    socket.join(groupId);
    console.log(`User joined group: ${groupId}`);
  });

  socket.on('sendMessage', (data) => {
    const { groupChatId, content, sender } = data;
    io.to(groupChatId).emit('receiveMessage', { content, sender, createdAt: new Date().toISOString() });
  });

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

app.use("/", router);

module.exports = { app, server };
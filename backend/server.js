/* eslint no-console: 0 */
const Koa = require('koa');
const cors = require('@koa/cors');

const app = new Koa();

app.use(cors());

app.use(async (ctx) => {
  ctx.body = 'Hello Koa!';
});


const server = require('http').createServer(app.callback());
const io = require('socket.io')(server);


io.set('origins', 'http://localhost:8080');


io.on('connection', (socket) => {
  console.log('connection established');
  socket.on('joined', () => {
    console.log('received joined event -');
    io.emit('joined');
  });

  socket.on('poll-created', (question) => {
    console.log('poll created - -');
    io.emit('pollCreated', question);
  });

  socket.on('poll-answered', (answer) => {
    console.log('poll answered');
    io.emit('pollAnswered', answer);
  });
});


// app.listen(3000);
//
//
server.listen(3000, () => {
  console.log('Application is starting on port 3000');
});

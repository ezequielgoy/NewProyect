const express = require('express');
const app = express();
const http = require('http');
const cors = require('cors');
require('dotenv').config();

const mongoose = require('mongoose');
const userRoute = require('./routes/user');
const authRoute = require('./routes/auth');
const roomRoute = require('./routes/room');
const messageRoute = require('./routes/message');

// Connect to mongoose
mongoose
  .connect(process.env.MDBURI, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then(() => console.log('DB connected'))
  .catch((err) => {
    console.log(err);
  });

//middleware
app.use(express.json());

app.use('/api/user', userRoute);
app.use('/api/auth', authRoute);
app.use('/api/room', roomRoute);
app.use('/api/message', messageRoute);
app.use(cors());

app.listen(8800, () => {
  console.log('Server running');
});

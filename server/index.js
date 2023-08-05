const express = require('express');
require('dotenv').config();
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const { logger } = require('./middlewares/logger.js');
const authChecker = require('./middlewares/authChecker');
const { authRoute } = require('./routes/authRoute.js');
const { followRoute } = require('./routes/followRoute.js');
const { messagesRoute } = require('./routes/messagesRoute.js');
const { usersProfileRoute } = require('./routes/usersProfileRoute.js');
const { usersAvatarsRoute } = require('./routes/usersAvatarsRoute.js');
const { postsRoute } = require('./routes/postsRoute.js');
const { ratingRoute } = require('./routes/ratingRoute.js');
const { statusRoute } = require('./routes/statusRoute.js');

const MONGODB_URL = `${process.env.MONGODB_SERVER}/${process.env.MONGODB_COLLECTION}`;

mongoose.set("strictQuery", false);
mongoose.connect(MONGODB_URL, () => {
  console.log(`Server connected to database ${MONGODB_URL}...`);
},
  (e) => {
    console.log(`Error on connect to ${MONGODB_URL}`);
    console.log(e.message);
  }
);

const PORT = process.env.PORT || 3001;

const app = express();

const whitelist = new Set([process.env.REACT_LOCAL_HOST, process.env.REACT_LAN_HOST]);

app.use(cors({
  origin: function (origin, cb) {
    whitelist.has(origin) || !origin ? // Security issue? 
      cb(null, true) :
      cb(new Error('Not allowed by CORS'))
  },
  credentials: true,
}));

// for parsing application/json
app.use(express.json());

// for parsing application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// for parsing cookies
app.use(cookieParser(process.env.SECRET));

app.use(logger); // Для отображения в консоли входящих  запросов

app.use('/api/auth', authRoute);

//Проверка на авторизованность пользователя по кукам (корректный id сессии)

app.use(authChecker);

app.use('/api/avatars', usersAvatarsRoute);

app.use('/api/users', usersProfileRoute);

app.use('/api/follow', followRoute);

app.use('/api/messages', messagesRoute);

app.use('/api/posts', postsRoute)

app.use('/api/rate', ratingRoute)

app.use('/api/status', statusRoute)

app.use(express.static('public'));

app.listen(PORT, async () => {
  console.log(`Server has been started on port ${PORT}...`);
});

require('dotenv').config();

const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const PORT = process.env.PORT || 5000;

const app = express();
const db = require('./db.js');
const router = require('./router/index');
const errorMiddleware = require('./middlewares/error-middleware');

app.use(express.json());
app.use(cookieParser());
app.use(cors({
  credentials: true,
  origin: process.env.CLIENT_URL,
}));
app.use('/api', router);
app.use(errorMiddleware);

const start = async () => {
  try {
    app.listen(PORT, () => console.log(`Server running on port ${PORT}.`));

    db.authenticate()
      .then(() => {
        console.log('Connect database successfully.')

        // Enable if need sync db
        db.sync()
          .then(() => console.log('All models were synchronized successfully.'))
          .catch((error) => console.error('Unable to synchronize all models:', error));
      })
      .catch((error) => console.error('Unable to connect to the database:', error));
  } catch (error) {
    console.error(error);
  }
}

start();

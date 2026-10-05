require('dotenv').config();

const express = require('express');
const connectDB = require('./module/config/db');
const routes = require('./routes/index');

const app = express();

app.use(express.json());
app.use('/', routes);

const PORT = process.env.PORT || 5000;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is keep running on http://localhost:${PORT}`);
  });
});

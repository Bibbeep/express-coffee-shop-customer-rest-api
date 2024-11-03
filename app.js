require('dotenv').config();

const express = require('express');
const app = express();
const router = require('./routes/index');
const morgan = require('morgan');
const { PORT } = process.env;

app.use(morgan('dev'));
app.use(express.json());

app.use(router);

app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));
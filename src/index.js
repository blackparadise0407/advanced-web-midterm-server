const express = require('express')
if (process.env.NODE_ENV !== 'production') require('dotenv').config();
const cors = require('cors')
const path = require('path');
const compression = require('compression')
const morgan = require('morgan')

const connect = require('./services/dbConnection');

const app = express()

connect(process.env.DB_URL);
app.use(morgan('dev'))
app.use(cors({
  origin: process.env.CORS_ORIGIN
}))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
// app.use('/uploads', path.join(__dirname, 'public/uploads'))

app.get('/favicon.ico', (_req, res) => res.status(200).send('OK'))

app.use('/api', require('./api'))

app.use(require('./middlewares/notFound'))
app.use(require('./middlewares/errorHandler'))

const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`App is listening on port ${PORT}`))
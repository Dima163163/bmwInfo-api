const express = require('express');
const cors = require('cors');
const PORT = 3000;

const app = express();

const usersRouter = require('./users/index');
const carsRouter = require('./cars/index');
const commentsRouter = require('./comments/index');

app.use(cors({origin: true}));
app.options("*", cors())
app.use(express.json());
app.use(express.urlencoded({extended: true}))
app.use('/public', express.static('public'));

app.get('/', (req, res) => {
  res.send('Server started')
})

app.use('/users', usersRouter)
app.use('/cars', carsRouter)
app.use('/comments', commentsRouter)

app.listen(PORT, 'localhost', (err) => {
  if (err) {
    console.log(err);
    return;
  }
  console.log('Listening at http://localhost:' + PORT);
})
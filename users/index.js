const express = require('express');
const usersRouter = express.Router();
const { getUniqueId } = require('../utils/utils');
const bcrypt = require('bcrypt');

const users = require('../mock/users');

usersRouter.get('/', (req, res) => {
  setTimeout(() => {
    const usersData = users.map(user => {
      return {
        ...user,
        email: undefined,
        passwordHash: undefined
      }
    })

    res.status(200).json(usersData);
  }, 1000)
});

usersRouter.post('/login', (req, res) => {
  setTimeout(() => {
    const body = req.body;
    const user = users.find((user) => user.email === body.email);

    if (!user) {
      res.status(400).json('Taкой пользователь не зарегистрирован');
    } else if (bcrypt.compareSync(body.password, user.passwordHash)) {
      res.status(200);
      res.send({
        ...user,
        email: undefined,
        passwordHash: undefined
      });
    } else {
      res.status(400).json('Пароль не верный');
    }
  }, 1000);
});

usersRouter.post('/registration', (req, res) => {
  setTimeout(() => {
    const body = req.body;
    const user = users.find((user) => user.email === body.email);
    if (!user) {
      const userId = getUniqueId();
      const userPasswordHash = bcrypt.hashSync(req.body.password, 10);

      const newUser = {
        id: userId,
        email: body.email,
        name: body.name,
        passwordHash: userPasswordHash
      };

      users.push(newUser);

      res.status(200);
      res.json({
        ...newUser,
        email: undefined,
        passwordHash: undefined
      });
    } else {
      res.status(400).json('Такой email уже зарегестрирован');
    }
  }, 1500);
});

module.exports = usersRouter;

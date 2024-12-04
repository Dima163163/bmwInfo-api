const express = require('express');
const commentsRouter = express.Router();
const { getUniqueId } = require('../utils/utils');

const cars = require('../mock/cars');
const comments = require('../mock/comments');

commentsRouter.get('/', (req, res) => {
  setTimeout(() => {
    const { carId } = req.query;
    let result = comments;

    if (carId) {
      const car = cars.find((car) => car.id === carId);
      if (car) {
        result = car.comments.map((commentId) =>
          result.find((item) => item.id === commentId)
        );
        res.status(200).json(result);
      } else {
        res.status(400).json('Ошибка: нет такого авто');
      }
    } else {
      res.status(400).json('Ошибка запроса');
    }
  }, 1000);
});

commentsRouter.post('/:carId', (req, res) => {
  const body = req.body;
  if (req.params) {
    const carId = req.params?.carId;
    let car = null;
    let newComment = {};

    if (carId) {
      car = cars.find((car) => car.id === carId);

      if (car && body) {
        const newCommentId = getUniqueId();

        newComment = {
          ...body,
          id: newCommentId
        };

        car.comments.push(newCommentId);
        comments.push(newComment);

        res.status(200).json(newComment);
      } else {
        res.status(400).json('Ошибка, такого автомобиля нет');
      }
    } else {
      res.status(400).json('Параметры не переданы');
    }
  }
});

commentsRouter.delete('/:carId/:commentId', (req, res) => {
  if (req.params) {
    const {carId, commentId} = req.params;
    if (carId) {
      const car = cars.find(car => car.id === carId);

      if (car) {
        const deleteComentIndex = comments.findIndex(commentItem => commentItem.id === commentId);
        const carDeletCommentIndex = car.comments.findIndex(commentItem => commentItem === commentId);
        comments.splice(deleteComentIndex, 1);
        car.comments.splice(carDeletCommentIndex, 1);

        res.status(200).json('Комментарий удален')

      }
    } else {
      res.status(400).json('Такого id нет');
    }
  } else {
      res.status(400).json('Параметры не переданы');
    }

  
});

commentsRouter.patch('/:commentId', (req, res) => {
  const body = req.body;
  const id = req.params?.commentId;

  if (id) {
    const commentIndex = comments.findIndex((comment) => comment.id === id);
    if (commentIndex !== -1) {
      comments[commentIndex] = {
        ...comments[commentIndex],
        ...body
      };
      res.status(200).json(comments[commentIndex]);
    } else {
      res.status(400).json('Такого комментария нет');
    }
  } else {
    res.status(400).json('Id комментария не получен');
  }
});


module.exports = commentsRouter;

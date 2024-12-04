const express = require('express');
const carsRouter = express.Router();

const cars = require('../mock/cars');

carsRouter.get('/', (req, res) => {
  setTimeout(() => {
    res.status(200).json(cars);
  }, 1500);
});

carsRouter.get('/series', (req, res) => {
  setTimeout(() => {
    const series = Array.from(new Set(cars.map((car) => car.series))).sort();
    if (series) {
      res.status(200).json(series);
    } else {
      res.status(400).json('Серий не найдено');
    }
  }, 1500);
});

carsRouter.get('/:carId', (req, res) => {
  setTimeout(() => {
    const oneCar = cars.find((car) => car.id === req.params.carId);
    if (oneCar) {
      res.status(200).json(oneCar);
    } else {
      res.status(400).json('Автомобиль не найден');
    }
  }, 1500);
});

carsRouter.get('/carseries/:seriesId', (req, res) => {
  setTimeout(() => {
    if (req.params) {
      const { seriesId } = req.params;

      if (seriesId) {
        if (seriesId === 'all') {
          res.status(200).json(cars);
        } else {
          const filteredCars = cars.filter((car) => car.series === seriesId);
          if (filteredCars) {
            res.status(200).json(filteredCars);
          } else {
            res.status(400).json('Автомобилей данной серии нет');
          }
        }
      } else {
        res.status(400).json('Не верно задана серия автомобилей');
      }
    } else {
      res.status(400).json('Не переданы параметры');
    }
  }, 1500);
});

module.exports = carsRouter;

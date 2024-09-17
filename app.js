const express = require('express');
const morgan = require('morgan');

const AppError = require('./utils/appError');
const globalError = require('./controllers/errorController');
const userRouter = require('./routes/userRoutes');
const tourRouter = require('./routes/tourRoutes');

const app = express();

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// MIDDLEWARE
app.use(express.json());
app.use(express.static(`${__dirname}/public`));

// Routes
app.use('/api/v1/users', userRouter);
app.use('/api/v1/tours', tourRouter);

app.all('*', (req, res, next) => {
  // 1.
  // res.status(404).json({
  //   status: 'fail',
  //   message: `Can't find ${req.originalUrl} on this server`,
  // });

  // 2.
  // const err = new Error(`Can't find ${req.originalUrl} on this server`);
  // err.status = 'fail';
  // err.statusCode = 404;

  // next(err);
  // 3.
  const err = new AppError(`Can't find ${req.originalUrl} on this server`, 404);
  next(err);

  // next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
});

app.use(globalError);

//  Start server
module.exports = app;

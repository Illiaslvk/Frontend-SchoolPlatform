var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var app = express();

const studentRouter = require('./routes/studentRoute');
const teacherRouter = require('./routes/teacherRoute');
const gradesRouter = require('./routes/gradesRoute');

const StudentAPIRoute = require('./routes/api/StudentAPIRoute');
const TeacherAPIRoute = require('./routes/api/TeacherAPIRoute');
const GradesAPIRoute = require('./routes/api/GradesAPIRoute');

const sequelizeInit = require('./config/sequelize/init');
sequelizeInit()
    .catch(err => {
      console.log(err);
    });

const cors = require('cors');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());

app.use('/', indexRouter);
app.use('/student',studentRouter);
app.use('/teacher',teacherRouter);
app.use('/grades',gradesRouter);

app.use('/api/students', StudentAPIRoute);
app.use('/api/teachers', TeacherAPIRoute);
app.use('/api/grades', GradesAPIRoute);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

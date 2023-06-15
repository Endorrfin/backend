const express = require('express');

const commentsRouter = require('./comments');
const usersRouter = require('./users');
const rootRouter = require('./root');

const router = express.Router();


router.use('/comments', commentsRouter); // use - самый широкий метод обозначает что для этого маршрута будут разрешены все методы http (get, post, put, delete)
router.use('/users', usersRouter);
router.use('/', rootRouter); // последовательность расположения маршрутов важна, так как используется use, если не будет найден ни один из маршрутов применится rootRouter


module.exports = router;

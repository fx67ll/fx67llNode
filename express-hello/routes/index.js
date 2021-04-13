// 这个应该是渲染ejs那种模板页面需要的首页，目前不知道有什么卵用

var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Hello Express!' });
});

module.exports = router;

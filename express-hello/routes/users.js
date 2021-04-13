// 这个好像是express项目生成的默认文件，没什么卵用

var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource users');
});

module.exports = router;

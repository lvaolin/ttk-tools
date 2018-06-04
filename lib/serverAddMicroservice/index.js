'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _serverUtils = require('../serverUtils');

function serverAddMicroservice(projectName) {
  console.log('开始创建');

  (0, _serverUtils.addServiceFromTemplate)("yewuxianmingcheng", "mokuaimingcheng");

  //占位符替换

  process.exit();
}
exports.default = serverAddMicroservice;
module.exports = exports['default'];
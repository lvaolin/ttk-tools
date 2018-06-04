'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var serverAddMicroservice = function () {
    var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(projectName) {
        return _regenerator2.default.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        console.log('开始创建');

                        _context.next = 3;
                        return (0, _serverUtils.addServiceFromTemplate)("yewuxianmingcheng", "mokuaimingcheng");

                    case 3:

                        //占位符替换

                        process.exit();

                    case 4:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, this);
    }));

    return function serverAddMicroservice(_x) {
        return _ref.apply(this, arguments);
    };
}();

var _serverUtils = require('../serverUtils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = serverAddMicroservice;
module.exports = exports['default'];
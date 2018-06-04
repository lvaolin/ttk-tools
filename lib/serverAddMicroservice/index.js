'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var checkPath = function () {
    var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(path) {
        var result, flag;
        return _regenerator2.default.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        result = path;

                    case 1:
                        if (!true) {
                            _context.next = 17;
                            break;
                        }

                        _context.next = 4;
                        return (0, _utils.haveFile)(result);

                    case 4:
                        flag = _context.sent;

                        if (!(flag && noExit)) {
                            _context.next = 7;
                            break;
                        }

                        return _context.abrupt('return', true);

                    case 7:
                        if (!flag) {
                            _context.next = 14;
                            break;
                        }

                        console.log(_chalk2.default.yellowBright('该路径下已经存在app!'));
                        _context.next = 11;
                        return (0, _utils.prompt)('请输入新的路径：');

                    case 11:
                        result = _context.sent;
                        _context.next = 15;
                        break;

                    case 14:
                        return _context.abrupt('return', result);

                    case 15:
                        _context.next = 1;
                        break;

                    case 17:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, this);
    }));

    return function checkPath(_x) {
        return _ref.apply(this, arguments);
    };
}();

var serverAddMicroservice = function () {
    var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(businessName, moduleName) {
        var path;
        return _regenerator2.default.wrap(function _callee2$(_context2) {
            while (1) {
                switch (_context2.prev = _context2.next) {
                    case 0:
                        _context2.next = 2;
                        return (0, _utils.checkYarn)();

                    case 2:
                        if (!(typeof businessName != 'string')) {
                            _context2.next = 7;
                            break;
                        }

                        console.log(_chalk2.default.yellowBright('你没有输入业务线名称！'));
                        _context2.next = 6;
                        return (0, _utils.getInput)('请输入业务线的名称(英文，首字母小写)：');

                    case 6:
                        businessName = _context2.sent;

                    case 7:
                        if (!(typeof moduleName != 'string')) {
                            _context2.next = 12;
                            break;
                        }

                        console.log(_chalk2.default.yellowBright('你没有输入模块名称！'));
                        _context2.next = 11;
                        return (0, _utils.getInput)('请输入模块名称(英文，首字母小写)：');

                    case 11:
                        moduleName = _context2.sent;

                    case 12:
                        console.log('检查该服务是否已经存在...');
                        path = businessName + '-' + moduleName;
                        _context2.next = 16;
                        return checkPath(path);

                    case 16:
                        path = _context2.sent;

                        if (!(path === true)) {
                            _context2.next = 20;
                            break;
                        }

                        console.log(_chalk2.default.yellowBright(path + '\u670D\u52A1\u5DF2\u7ECF\u5B58\u5728\uFF0C\u8DF3\u8FC7'));
                        return _context2.abrupt('return', true);

                    case 20:
                        console.log(path + '开始创建');
                        (0, _serverUtils.addServiceFromTemplate)(businessName, moduleName);
                        //process.exit();

                    case 22:
                    case 'end':
                        return _context2.stop();
                }
            }
        }, _callee2, this);
    }));

    return function serverAddMicroservice(_x2, _x3) {
        return _ref2.apply(this, arguments);
    };
}();

var _chalk = require('chalk');

var _chalk2 = _interopRequireDefault(_chalk);

var _serverUtils = require('../serverUtils');

var _utils = require('../utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = serverAddMicroservice;
module.exports = exports['default'];
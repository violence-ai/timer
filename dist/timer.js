(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("Timer", [], factory);
	else if(typeof exports === 'object')
		exports["Timer"] = factory();
	else
		root["Timer"] = factory();
})(typeof self === 'undefined' ? this : self, function() {
return /******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/timer.ts":
/*!**********************!*\
  !*** ./src/timer.ts ***!
  \**********************/
/***/ ((__unused_webpack_module, exports) => {



function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

Object.defineProperty(exports, "__esModule", ({
  value: true
}));

var Timer = /*#__PURE__*/function () {
  function Timer(options) {
    _classCallCheck(this, Timer);

    this.cubicFunctions = {
      'linear': [0, 0, 1, 1],
      'ease': [.25, .1, .25, 1],
      'ease-in': [.42, 0, 1, 1],
      'ease-out': [0, 0, .58, 1],
      'ease-in-out': [.42, 0, .58, 1]
    };
    this.refreshRateMs = 50; // ms

    this.duration = 0; // ms

    this.cubicBezierPoints = [0, 0, 1, 1]; // linear

    this.remained = 0;
    this.timerInterval = null;
    this.onTimeFunc = null;
    this.onEndFunc = null;
    this.days = 0;
    this.hours = 0;
    this.minutes = 0;
    this.seconds = 0;
    this.ms = 0;
    this.duration = options.duration;
    this.remained = options.duration;

    if (options.refreshRateMs) {
      this.refreshRateMs = options.refreshRateMs >= 5 ? options.refreshRateMs : 5; // min 5, otherwise there will be performance problems!
    }

    if (options.cubicBezier) {
      if (typeof options.cubicBezier === 'string') {
        if (this.cubicFunctions.hasOwnProperty(options.cubicBezier)) {
          this.cubicBezierPoints = this.cubicFunctions[options.cubicBezier];
        } else {
          throw Error('Incorrect cubicBezier function name');
        }
      } else if (Array.isArray(options.cubicBezier)) {
        this.cubicBezierPoints = options.cubicBezier;
      }
    }
  }

  _createClass(Timer, [{
    key: "start",
    value: function start() {
      var _this = this;

      var timingFunction = Timer.cubicBezier(this.cubicBezierPoints);
      this.timerInterval = setInterval(function () {
        _this.remained -= _this.refreshRateMs; // if end

        if (_this.remained <= 0) {
          // correct final value
          _this.remained = 0; // stop cycle

          _this.stop(); // if listen onEnd event


          if (_this.onEndFunc) {
            _this.onEndFunc();
          }
        } // calc


        _this.calcRemained(); // if listen onTime event


        if (_this.onTimeFunc) {
          var t = (_this.duration - _this.remained) / (_this.duration / 100) / 100; // 0-1

          _this.onTimeFunc({
            days: _this.days,
            hours: _this.hours,
            minutes: _this.minutes,
            seconds: _this.seconds,
            ms: _this.ms,
            progress: timingFunction(t) * 100 // 0-100

          });
        }
      }, this.refreshRateMs);
    }
  }, {
    key: "stop",
    value: function stop() {
      if (this.timerInterval) {
        clearInterval(this.timerInterval);
      }
    }
  }, {
    key: "onTime",
    value: function onTime(func) {
      this.onTimeFunc = func;
      return this;
    }
  }, {
    key: "onEnd",
    value: function onEnd(func) {
      this.onEndFunc = func;
      return this;
    }
  }, {
    key: "calcRemained",
    value: function calcRemained() {
      var remained = this.remained;
      this.days = Math.floor(remained / 86400000);
      remained -= this.days * 86400000;
      this.hours = Math.floor(remained / 3600000);
      remained -= this.hours * 3600000;
      this.minutes = Math.floor(remained / 60000);
      remained -= this.minutes * 60000;
      this.seconds = Math.floor(remained / 1000);
      remained -= this.seconds * 1000;
      this.ms = remained;
    }
  }], [{
    key: "cubicBezier",
    value: function cubicBezier(points) {
      var p0 = {
        x: 0,
        y: 0
      },
          p1 = {
        x: points[0],
        y: points[1]
      },
          p2 = {
        x: points[2],
        y: points[3]
      },
          p3 = {
        x: 1,
        y: 1
      };

      var curve = function curve(p0, p1, p2, p3, t) {
        return Math.pow(1 - t, 3) * p0 + 3 * t * Math.pow(1 - t, 2) * p1 + 3 * Math.pow(t, 2) * (1 - t) * p2 + Math.pow(t, 3) * p3;
      };

      var bezier = {};

      for (var t = 0; t <= 1; t += 0.001) {
        var x = curve(p0.x, p1.x, p2.x, p3.x, t); // 0-1 time

        var y = curve(p0.y, p1.y, p2.y, p3.y, t); // 0-1 animate

        bezier[x.toFixed(3)] = y;
      }

      return function (t) {
        return bezier[t.toFixed(3)];
      };
    }
  }]);

  return Timer;
}();

exports.default = Timer;

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	// module exports must be returned from runtime so entry inlining is disabled
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__("./src/timer.ts");
/******/ })()
.default;
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9UaW1lci93ZWJwYWNrL3VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24iLCJ3ZWJwYWNrOi8vVGltZXIvLi9zcmMvdGltZXIudHMiLCJ3ZWJwYWNrOi8vVGltZXIvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vVGltZXIvd2VicGFjay9zdGFydHVwIl0sIm5hbWVzIjpbIk9iamVjdCIsInZhbHVlIiwiVGltZXIiLCJvcHRpb25zIiwiY3ViaWNGdW5jdGlvbnMiLCJyZWZyZXNoUmF0ZU1zIiwiZHVyYXRpb24iLCJjdWJpY0JlemllclBvaW50cyIsInJlbWFpbmVkIiwidGltZXJJbnRlcnZhbCIsIm9uVGltZUZ1bmMiLCJvbkVuZEZ1bmMiLCJkYXlzIiwiaG91cnMiLCJtaW51dGVzIiwic2Vjb25kcyIsIm1zIiwiY3ViaWNCZXppZXIiLCJoYXNPd25Qcm9wZXJ0eSIsIkVycm9yIiwiQXJyYXkiLCJpc0FycmF5IiwidGltaW5nRnVuY3Rpb24iLCJzZXRJbnRlcnZhbCIsInN0b3AiLCJjYWxjUmVtYWluZWQiLCJ0IiwicHJvZ3Jlc3MiLCJjbGVhckludGVydmFsIiwiZnVuYyIsIk1hdGgiLCJmbG9vciIsInBvaW50cyIsInAwIiwieCIsInkiLCJwMSIsInAyIiwicDMiLCJjdXJ2ZSIsImJlemllciIsInRvRml4ZWQiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0QsTzs7Ozs7Ozs7OztBQ1ZhOzs7Ozs7OztBQUNiQSw4Q0FBNkM7QUFBRUMsT0FBSyxFQUFFO0FBQVQsQ0FBN0M7O0lBQ01DLEs7QUFDRixpQkFBWUMsT0FBWixFQUFxQjtBQUFBOztBQUNqQixTQUFLQyxjQUFMLEdBQXNCO0FBQ2xCLGdCQUFVLENBQUMsQ0FBRCxFQUFJLENBQUosRUFBTyxDQUFQLEVBQVUsQ0FBVixDQURRO0FBRWxCLGNBQVEsQ0FBQyxHQUFELEVBQU0sRUFB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QUFJZCxDQUFDLEdBQUcsQ0FBYixFQUFnQkEsQ0FBQyxJQUFJLENBQXJCLEVBQXdCQSxDQUFDLElBQUksS0FBN0IsRUFBb0M7QUFDaEMsWUFBSVEsQ0FBQyxHQUFHSyxLQUFLLENBQUNOLEVBQUUsQ0FBQ0MsQ0FBSixFQUFPRSxFQUFFLENBQUNGLENBQVYsRUFBYUcsRUFBRSxDQUFDSCxDQUFoQixFQUFtQkksRUFBRSxDQUFDSixDQUF0QixFQUF5QlIsQ0FBekIsQ0FBYixDQURnQyxDQUNVOztBQUMxQyxZQUFJUyxDQUFDLEdBQUdJLEtBQUssQ0FBQ04sRUFBRSxDQUFDRSxDQUFKLEVBQU9DLEVBQUUsQ0FBQ0QsQ0FBVixFQUFhRSxFQUFFLENBQUNGLENBQWhCLEVBQW1CRyxFQUFFLENBQUNILENBQXRCLEVBQXlCVCxDQUF6QixDQUFiLENBRmdDLENBRVU7O0FBQzFDYyxjQUFNLENBQUNOLENBQUMsQ0FBQ08sT0FBRixDQUFVLENBQVYsQ0FBRCxDQUFOLEdBQXVCTixDQUF2QjtBQUNIOztBQUNELGFBQU8sVUFBVVQsQ0FBVixFQUFhO0FBQ2hCLGVBQU9jLE1BQU0sQ0FBQ2QsQ0FBQyxDQUFDZSxPQUFGLENBQVUsQ0FBVixDQUFELENBQWI7QUFDSCxPQUZEO0FBR0g7Ozs7OztBQUVMQyxlQUFBLEdBQWtCeEMsS0FBbEIsQzs7Ozs7O1VDbEhBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7VUNyQkE7VUFDQTtVQUNBO1VBQ0EiLCJmaWxlIjoidGltZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gd2VicGFja1VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24ocm9vdCwgZmFjdG9yeSkge1xuXHRpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIG1vZHVsZSA9PT0gJ29iamVjdCcpXG5cdFx0bW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KCk7XG5cdGVsc2UgaWYodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKVxuXHRcdGRlZmluZShcIlRpbWVyXCIsIFtdLCBmYWN0b3J5KTtcblx0ZWxzZSBpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcpXG5cdFx0ZXhwb3J0c1tcIlRpbWVyXCJdID0gZmFjdG9yeSgpO1xuXHRlbHNlXG5cdFx0cm9vdFtcIlRpbWVyXCJdID0gZmFjdG9yeSgpO1xufSkodHlwZW9mIHNlbGYgPT09ICd1bmRlZmluZWQnID8gdGhpcyA6IHNlbGYsIGZ1bmN0aW9uKCkge1xucmV0dXJuICIsIlwidXNlIHN0cmljdFwiO1xyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XHJcbmNsYXNzIFRpbWVyIHtcclxuICAgIGNvbnN0cnVjdG9yKG9wdGlvbnMpIHtcclxuICAgICAgICB0aGlzLmN1YmljRnVuY3Rpb25zID0ge1xyXG4gICAgICAgICAgICAnbGluZWFyJzogWzAsIDAsIDEsIDFdLFxyXG4gICAgICAgICAgICAnZWFzZSc6IFsuMjUsIC4xLCAuMjUsIDFdLFxyXG4gICAgICAgICAgICAnZWFzZS1pbic6IFsuNDIsIDAsIDEsIDFdLFxyXG4gICAgICAgICAgICAnZWFzZS1vdXQnOiBbMCwgMCwgLjU4LCAxXSxcclxuICAgICAgICAgICAgJ2Vhc2UtaW4tb3V0JzogWy40MiwgMCwgLjU4LCAxXSxcclxuICAgICAgICB9O1xyXG4gICAgICAgIHRoaXMucmVmcmVzaFJhdGVNcyA9IDUwOyAvLyBtc1xyXG4gICAgICAgIHRoaXMuZHVyYXRpb24gPSAwOyAvLyBtc1xyXG4gICAgICAgIHRoaXMuY3ViaWNCZXppZXJQb2ludHMgPSBbMCwgMCwgMSwgMV07IC8vIGxpbmVhclxyXG4gICAgICAgIHRoaXMucmVtYWluZWQgPSAwO1xyXG4gICAgICAgIHRoaXMudGltZXJJbnRlcnZhbCA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5vblRpbWVGdW5jID0gbnVsbDtcclxuICAgICAgICB0aGlzLm9uRW5kRnVuYyA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5kYXlzID0gMDtcclxuICAgICAgICB0aGlzLmhvdXJzID0gMDtcclxuICAgICAgICB0aGlzLm1pbnV0ZXMgPSAwO1xyXG4gICAgICAgIHRoaXMuc2Vjb25kcyA9IDA7XHJcbiAgICAgICAgdGhpcy5tcyA9IDA7XHJcbiAgICAgICAgdGhpcy5kdXJhdGlvbiA9IG9wdGlvbnMuZHVyYXRpb247XHJcbiAgICAgICAgdGhpcy5yZW1haW5lZCA9IG9wdGlvbnMuZHVyYXRpb247XHJcbiAgICAgICAgaWYgKG9wdGlvbnMucmVmcmVzaFJhdGVNcykge1xyXG4gICAgICAgICAgICB0aGlzLnJlZnJlc2hSYXRlTXMgPSBvcHRpb25zLnJlZnJlc2hSYXRlTXMgPj0gNSA/IG9wdGlvbnMucmVmcmVzaFJhdGVNcyA6IDU7IC8vIG1pbiA1LCBvdGhlcndpc2UgdGhlcmUgd2lsbCBiZSBwZXJmb3JtYW5jZSBwcm9ibGVtcyFcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKG9wdGlvbnMuY3ViaWNCZXppZXIpIHtcclxuICAgICAgICAgICAgaWYgKHR5cGVvZiBvcHRpb25zLmN1YmljQmV6aWVyID09PSAnc3RyaW5nJykge1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuY3ViaWNGdW5jdGlvbnMuaGFzT3duUHJvcGVydHkob3B0aW9ucy5jdWJpY0JlemllcikpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmN1YmljQmV6aWVyUG9pbnRzID0gdGhpcy5jdWJpY0Z1bmN0aW9uc1tvcHRpb25zLmN1YmljQmV6aWVyXTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHRocm93IEVycm9yKCdJbmNvcnJlY3QgY3ViaWNCZXppZXIgZnVuY3Rpb24gbmFtZScpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2UgaWYgKEFycmF5LmlzQXJyYXkob3B0aW9ucy5jdWJpY0JlemllcikpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuY3ViaWNCZXppZXJQb2ludHMgPSBvcHRpb25zLmN1YmljQmV6aWVyO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgc3RhcnQoKSB7XHJcbiAgICAgICAgbGV0IHRpbWluZ0Z1bmN0aW9uID0gVGltZXIuY3ViaWNCZXppZXIodGhpcy5jdWJpY0JlemllclBvaW50cyk7XHJcbiAgICAgICAgdGhpcy50aW1lckludGVydmFsID0gc2V0SW50ZXJ2YWwoKCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLnJlbWFpbmVkIC09IHRoaXMucmVmcmVzaFJhdGVNcztcclxuICAgICAgICAgICAgLy8gaWYgZW5kXHJcbiAgICAgICAgICAgIGlmICh0aGlzLnJlbWFpbmVkIDw9IDApIHtcclxuICAgICAgICAgICAgICAgIC8vIGNvcnJlY3QgZmluYWwgdmFsdWVcclxuICAgICAgICAgICAgICAgIHRoaXMucmVtYWluZWQgPSAwO1xyXG4gICAgICAgICAgICAgICAgLy8gc3RvcCBjeWNsZVxyXG4gICAgICAgICAgICAgICAgdGhpcy5zdG9wKCk7XHJcbiAgICAgICAgICAgICAgICAvLyBpZiBsaXN0ZW4gb25FbmQgZXZlbnRcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLm9uRW5kRnVuYykge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMub25FbmRGdW5jKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy8gY2FsY1xyXG4gICAgICAgICAgICB0aGlzLmNhbGNSZW1haW5lZCgpO1xyXG4gICAgICAgICAgICAvLyBpZiBsaXN0ZW4gb25UaW1lIGV2ZW50XHJcbiAgICAgICAgICAgIGlmICh0aGlzLm9uVGltZUZ1bmMpIHtcclxuICAgICAgICAgICAgICAgIGxldCB0ID0gKCh0aGlzLmR1cmF0aW9uIC0gdGhpcy5yZW1haW5lZCkgLyAodGhpcy5kdXJhdGlvbiAvIDEwMCkpIC8gMTAwOyAvLyAwLTFcclxuICAgICAgICAgICAgICAgIHRoaXMub25UaW1lRnVuYyh7XHJcbiAgICAgICAgICAgICAgICAgICAgZGF5czogdGhpcy5kYXlzLFxyXG4gICAgICAgICAgICAgICAgICAgIGhvdXJzOiB0aGlzLmhvdXJzLFxyXG4gICAgICAgICAgICAgICAgICAgIG1pbnV0ZXM6IHRoaXMubWludXRlcyxcclxuICAgICAgICAgICAgICAgICAgICBzZWNvbmRzOiB0aGlzLnNlY29uZHMsXHJcbiAgICAgICAgICAgICAgICAgICAgbXM6IHRoaXMubXMsXHJcbiAgICAgICAgICAgICAgICAgICAgcHJvZ3Jlc3M6IHRpbWluZ0Z1bmN0aW9uKHQpICogMTAwIC8vIDAtMTAwXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sIHRoaXMucmVmcmVzaFJhdGVNcyk7XHJcbiAgICB9XHJcbiAgICBzdG9wKCkge1xyXG4gICAgICAgIGlmICh0aGlzLnRpbWVySW50ZXJ2YWwpIHtcclxuICAgICAgICAgICAgY2xlYXJJbnRlcnZhbCh0aGlzLnRpbWVySW50ZXJ2YWwpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIG9uVGltZShmdW5jKSB7XHJcbiAgICAgICAgdGhpcy5vblRpbWVGdW5jID0gZnVuYztcclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxuICAgIG9uRW5kKGZ1bmMpIHtcclxuICAgICAgICB0aGlzLm9uRW5kRnVuYyA9IGZ1bmM7XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9XHJcbiAgICBjYWxjUmVtYWluZWQoKSB7XHJcbiAgICAgICAgbGV0IHJlbWFpbmVkID0gdGhpcy5yZW1haW5lZDtcclxuICAgICAgICB0aGlzLmRheXMgPSBNYXRoLmZsb29yKHJlbWFpbmVkIC8gODY0MDAwMDApO1xyXG4gICAgICAgIHJlbWFpbmVkIC09IHRoaXMuZGF5cyAqIDg2NDAwMDAwO1xyXG4gICAgICAgIHRoaXMuaG91cnMgPSBNYXRoLmZsb29yKHJlbWFpbmVkIC8gMzYwMDAwMCk7XHJcbiAgICAgICAgcmVtYWluZWQgLT0gdGhpcy5ob3VycyAqIDM2MDAwMDA7XHJcbiAgICAgICAgdGhpcy5taW51dGVzID0gTWF0aC5mbG9vcihyZW1haW5lZCAvIDYwMDAwKTtcclxuICAgICAgICByZW1haW5lZCAtPSB0aGlzLm1pbnV0ZXMgKiA2MDAwMDtcclxuICAgICAgICB0aGlzLnNlY29uZHMgPSBNYXRoLmZsb29yKHJlbWFpbmVkIC8gMTAwMCk7XHJcbiAgICAgICAgcmVtYWluZWQgLT0gdGhpcy5zZWNvbmRzICogMTAwMDtcclxuICAgICAgICB0aGlzLm1zID0gcmVtYWluZWQ7XHJcbiAgICB9XHJcbiAgICBzdGF0aWMgY3ViaWNCZXppZXIocG9pbnRzKSB7XHJcbiAgICAgICAgbGV0IHAwID0geyB4OiAwLCB5OiAwIH0sIHAxID0geyB4OiBwb2ludHNbMF0sIHk6IHBvaW50c1sxXSB9LCBwMiA9IHsgeDogcG9pbnRzWzJdLCB5OiBwb2ludHNbM10gfSwgcDMgPSB7IHg6IDEsIHk6IDEgfTtcclxuICAgICAgICBsZXQgY3VydmUgPSBmdW5jdGlvbiAocDAsIHAxLCBwMiwgcDMsIHQpIHtcclxuICAgICAgICAgICAgcmV0dXJuICgxIC0gdCkgKiogMyAqIHAwICsgMyAqIHQgKiAoMSAtIHQpICoqIDIgKiBwMSArIDMgKiB0ICoqIDIgKiAoMSAtIHQpICogcDIgKyB0ICoqIDMgKiBwMztcclxuICAgICAgICB9O1xyXG4gICAgICAgIGxldCBiZXppZXIgPSB7fTtcclxuICAgICAgICBmb3IgKGxldCB0ID0gMDsgdCA8PSAxOyB0ICs9IDAuMDAxKSB7XHJcbiAgICAgICAgICAgIGxldCB4ID0gY3VydmUocDAueCwgcDEueCwgcDIueCwgcDMueCwgdCk7IC8vIDAtMSB0aW1lXHJcbiAgICAgICAgICAgIGxldCB5ID0gY3VydmUocDAueSwgcDEueSwgcDIueSwgcDMueSwgdCk7IC8vIDAtMSBhbmltYXRlXHJcbiAgICAgICAgICAgIGJlemllclt4LnRvRml4ZWQoMyldID0geTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uICh0KSB7XHJcbiAgICAgICAgICAgIHJldHVybiBiZXppZXJbdC50b0ZpeGVkKDMpXTtcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG59XHJcbmV4cG9ydHMuZGVmYXVsdCA9IFRpbWVyO1xyXG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHRpZihfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdKSB7XG5cdFx0cmV0dXJuIF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0uZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIG1vZHVsZSBleHBvcnRzIG11c3QgYmUgcmV0dXJuZWQgZnJvbSBydW50aW1lIHNvIGVudHJ5IGlubGluaW5nIGlzIGRpc2FibGVkXG4vLyBzdGFydHVwXG4vLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbnJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKFwiLi9zcmMvdGltZXIudHNcIik7XG4iXSwic291cmNlUm9vdCI6IiJ9
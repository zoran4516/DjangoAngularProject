webpackJsonp(["styles"],{

/***/ "../../../../../src/assets/css/main.css":
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__("../../../../css-loader/index.js?{\"sourceMap\":false,\"import\":false}!../../../../postcss-loader/lib/index.js?{\"ident\":\"postcss\",\"sourceMap\":false}!../../../../../src/assets/css/main.css");
if(typeof content === 'string') content = [[module.i, content, '']];
// add the styles to the DOM
var update = __webpack_require__("../../../../style-loader/addStyles.js")(content, {});
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../../node_modules/css-loader/index.js??ref--7-1!../../../node_modules/postcss-loader/lib/index.js??postcss!./main.css", function() {
			var newContent = require("!!../../../node_modules/css-loader/index.js??ref--7-1!../../../node_modules/postcss-loader/lib/index.js??postcss!./main.css");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ "../../../../../src/assets/font/Google-Sans-Font/GoogleSans-Bold.ttf":
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "GoogleSans-Bold.4457817ac2b9993c65e8.ttf";

/***/ }),

/***/ "../../../../../src/assets/font/Google-Sans-Font/GoogleSans-Medium.ttf":
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "GoogleSans-Medium.8d57e4014b18edef070d.ttf";

/***/ }),

/***/ "../../../../../src/assets/font/Google-Sans-Font/GoogleSans-Regular.ttf":
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "GoogleSans-Regular.b5c77a6aed75cdad9489.ttf";

/***/ }),

/***/ "../../../../../src/assets/font/font.css":
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__("../../../../css-loader/index.js?{\"sourceMap\":false,\"import\":false}!../../../../postcss-loader/lib/index.js?{\"ident\":\"postcss\",\"sourceMap\":false}!../../../../../src/assets/font/font.css");
if(typeof content === 'string') content = [[module.i, content, '']];
// add the styles to the DOM
var update = __webpack_require__("../../../../style-loader/addStyles.js")(content, {});
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../../node_modules/css-loader/index.js??ref--7-1!../../../node_modules/postcss-loader/lib/index.js??postcss!./font.css", function() {
			var newContent = require("!!../../../node_modules/css-loader/index.js??ref--7-1!../../../node_modules/postcss-loader/lib/index.js??postcss!./font.css");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ "../../../../../src/assets/img/service-brand.png":
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "service-brand.7025c8ebf6d2690c4dc5.png";

/***/ }),

/***/ "../../../../../src/assets/img/service-comm.png":
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "service-comm.90f82cca0f6466127941.png";

/***/ }),

/***/ "../../../../../src/assets/img/service-comp.png":
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "service-comp.0564d153a50b3f37baaa.png";

/***/ }),

/***/ "../../../../../src/assets/img/service-product.png":
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "service-product.f1c591a90dbcfe684086.png";

/***/ }),

/***/ "../../../../../src/styles.css":
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__("../../../../css-loader/index.js?{\"sourceMap\":false,\"import\":false}!../../../../postcss-loader/lib/index.js?{\"ident\":\"postcss\",\"sourceMap\":false}!../../../../../src/styles.css");
if(typeof content === 'string') content = [[module.i, content, '']];
// add the styles to the DOM
var update = __webpack_require__("../../../../style-loader/addStyles.js")(content, {});
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../node_modules/css-loader/index.js??ref--7-1!../node_modules/postcss-loader/lib/index.js??postcss!./styles.css", function() {
			var newContent = require("!!../node_modules/css-loader/index.js??ref--7-1!../node_modules/postcss-loader/lib/index.js??postcss!./styles.css");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ "../../../../css-loader/index.js?{\"sourceMap\":false,\"import\":false}!../../../../postcss-loader/lib/index.js?{\"ident\":\"postcss\",\"sourceMap\":false}!../../../../../src/assets/css/main.css":
/***/ (function(module, exports, __webpack_require__) {

var escape = __webpack_require__("../../../../css-loader/lib/url/escape.js");
exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "\n/* For Firefox */\ninput[type='number'] {\n  -moz-appearance:textfield;\n}\n/* Webkit browsers like Safari and Chrome */\ninput[type=number]::-webkit-inner-spin-button,\ninput[type=number]::-webkit-outer-spin-button {\n  -webkit-appearance: none;\n  margin: 0;\n}\n#main{\n  margin-top: 100px;\n}\nbody {\n  background: #fafafa;\n  margin: 0px;\n  padding: 0px;\n  width: 100%;\n  height: 100%;\n  /* font-family: 'GoogleSans'; */\n  font-family: 'Nanum Gothic', sans-serif;\n  overflow-x: hidden;\n}\nbutton  {\n  cursor: pointer;\n}\nhtml, body {\n  height: 100%;\n}\n*:focus {\n  outline: none;\n}\na, a:hover, a:focus, a:clicked {\n  color: #fff;\n  text-decoration: none !important;\n}\n/** Content **/\n.content {\n  width: 95%;\n  float: right;\n}\n.content .wrap {\n  padding: 50px 60px;\n}\n.content h1 {\n  color:#2a0e3c;\n  font-size: 18px;\n}\n.content p {\n  color:#b9b9b9;\n  font-weight: 700;\n  font-size: 12px;\n}\n.quick_stats, .recommend {\n  margin-top: 60px;\n}\n.quick_stats h1, .recommend h1 {\n  color:#2a0e3c;\n  font-size: 15px;\n}\n/** Quick Stats **/\n.quick_stats .block {\n  width: 100%;\n  height: 58px;\n  margin-top: 20px;\n  background: white;\n  border-radius: 7px;\n  -webkit-box-shadow: 0px 1px 3px #d1d1d1;\n          box-shadow: 0px 1px 3px #d1d1d1;\n}\n.quick_stats .block .wrap-sm {\n  padding: 5px 6px;\n}\n.quick_stats .block .wrap-sm h1 {\n  font-size: 13px;\n  color:#a1a1a1;\n}\n.quick_stats .block .wrap-sm p {\n  font-size: 18px;\n  color:#a1a1a1;\n  font-weight: bolder;\n}\n.quick_stats .block .wrap-sm .icon i {\n  font-size: 25px;\n  padding: 0;\n  margin:0;\n  color: white;\n}\n.quick_stats .block .wrap-sm .icon i.rup {\n  font-size: 21px;\n  color: white;\n}\n.quick_stats .block .wrap-sm .icon {\n  text-align: center;\n  background: red;\n  width: 48px;\n  border-radius: 5px;\n  color: white;\n  font-weight: 30px;\n  font-weight: bold;\n  padding: 9.5px 0px;\n  vertical-align: middle;\n}\n.quick_stats .redeem {\n  width: 214px;\n  height: 214px;\n  margin-top: 20px;\n  background: red;\n  border-radius: 10px;\n  margin-left: 20px;\n  background: #2a0e3c;\n  background: -webkit-gradient(linear, left top, right bottom, from(#2a0e3c), to(#e03e92));\n  background: linear-gradient(to bottom right, #2a0e3c, #e03e92);\n  position: relative;\n}\n.quick_stats .redeem .trans-layer {\n  top:0px;\n  left: 0px;\n  width: 100%;\n  height: 100%;\n  border-radius: 10px;\n  background: -webkit-gradient(linear, left top, right bottom, from(#2a0e3cb3), to(#e03e92));\n  background: linear-gradient(to bottom right, #2a0e3cb3, #e03e92);\n}\n.quick_stats .redeem  .text {\n  position: absolute;\n  top:15px;\n  left: 15px;\n}\n.quick_stats .redeem .button {\n  position: absolute;\n  width: 100%;\n  bottom: 10px;\n  text-align: center;\n  left: 0px;\n}\n.quick_stats .redeem .button button {\n  font-weight: 700;\n  font-size: 15px;\n  color: #2a0e3c;\n  background: white;\n  border:none;\n  width: 90%;\n  padding: 12px 0px;\n  /* font-family: 'GoogleSans'; */\n  font-family: 'Nanum Gothic', sans-serif;\n  border-radius: 5px;\n}\n.quick_stats .redeem  .text  h1 {\n  font-size: 20px;\n  color: white;\n  font-weight: 100;\n}\n.quick_stats .redeem  .text  p {\n  font-size: 38px;\n  color: white;\n  font-weight: bold;\n}\n.quick_stats .redeem  .text  h2 {\n  font-size: 13px;\n  color: white;\n  text-transform: uppercase;\n  font-weight: 100;\n}\n/** Quick Stats End **/\n/** Recommend **/\n.recommend .wrap-rec {\n  margin: 0 auto;\n  margin-top: 20px;\n  width: 80%;\n  height: 400px;\n  background: white;\n  -webkit-box-shadow: 0px 1px 3px #d1d1d1;\n          box-shadow: 0px 1px 3px #d1d1d1;\n  border-radius: 10px;\n}\n.recommend .wrap-rec .upper {\n  width: 100%;\n  height: 220px;\n  border-top-right-radius: 10px;\n  border-top-left-radius: 10px;\n}\n.recommend .wrap-rec .lower {\n  padding: 10px;\n}\n.recommend .wrap-rec .lower h1 {\n  color:#2a0e3c;\n  font-size: 20px;\n}\n.recommend .wrap-rec .lower p {\n  color:#a1a1a1;\n  font-size: 15px;\n}\n.recommend .wrap-rec .lower p {\n  color:#a1a1a1;\n  font-size: 15px;\n}\n.recommend .wrap-rec .lower h2 {\n  color: #e03e92;\n  font-size: 30px;\n}\n.recommend .wrap-rec .lower .description p  {\n  color: #a1a1a1;\n  font-size: 12px;\n  margin-top: 10px;\n}\n/** Recommend End **/\n/** Intro Que **/\n.intro .arrow_box {\n  position: relative;\n  width: 300px;\n  border-radius: 10px;\n  background: -webkit-gradient(linear, left top, right bottom, from(#2a0e3c), to(#e03e92));\n  background: linear-gradient(to bottom right, #2a0e3c, #e03e92);\n}\n.intro .arrow_box:after, .intro .arrow_box:before {\n  bottom: 100%;\n  left: 25%;\n  border: solid transparent;\n  content: \" \";\n  height: 0;\n  width: 0;\n  position: absolute;\n  pointer-events: none;\n}\n.intro .arrow_box:after {\n  border-color: linear-gradient(to bottom right, #2a0e3c, #e03e92);\n  border-color: -webkit-linear-gradient(to bottom right, #2a0e3c, #e03e92);\n  border-bottom-color: #2a0e3c;\n  border-width: 30px;\n  margin-left: -30px;\n}\n.intro .arrow_box:before {\n  border-color: linear-gradient(to bottom right, #2a0e3c, #e03e92);\n  border-color: -webkit-linear-gradient(to bottom right, #2a0e3c, #e03e92);\n  border-bottom-color: #2a0e3c;\n  border-width: 36px;\n  margin-left: -36px;\n}\n.intro {\n  position: absolute;\n  top:100px;\n  right: 100px;\n}\n.intro .inside {\n  /* font-family: 'GoogleSans'; */\n  font-family: 'Nanum Gothic', sans-serif;\n  margin: 0 auto;\n  width: 90%;\n  position: relative;\n  padding: 20px;\n  line-height: 120%;\n  color:white;\n}\n.intro button {\n  /* font-family: 'GoogleSans'; */\n  font-family: 'Nanum Gothic', sans-serif;\n  padding: 5px;\n  font-size: 15px;\n  color: #2a0e3c;\n  background: white;\n  font-weight: 600;\n  text-transform: uppercase;\n  border: 2px solid white;\n  border-radius: 3px;\n  width: 70px;\n}\n.intro button.transBtn {\n  background: transparent;\n  color: white;\n  margin-left: 10px;\n}\n.quick_stats .redeem.ser-product {\n  background: url(" + escape(__webpack_require__("../../../../../src/assets/img/service-product.png")) + ");\n  background-size: cover;\n}\n.quick_stats .redeem.ser-comm {\n  background: url(" + escape(__webpack_require__("../../../../../src/assets/img/service-comm.png")) + ");\n  background-size: cover;\n}\n.quick_stats .redeem.ser-comp {\n  background: url(" + escape(__webpack_require__("../../../../../src/assets/img/service-comp.png")) + ");\n  background-size: cover;\n}\n.quick_stats .redeem.ser-brand {\n  background: url(" + escape(__webpack_require__("../../../../../src/assets/img/service-brand.png")) + ");\n  background-size: cover;\n}\na {\n  text-decoration: none !important;\n}\n.message-box {\n  border-radius: 10px;\n  padding: 20px;\n  font-size: 20px;\n  color: white;\n  width: 100%;\n  background: -webkit-gradient(linear, left top, right bottom, from(#2a0e3c), to(#e03e92));\n  background: linear-gradient(to bottom right, #2a0e3c, #e03e92);\n}\n", ""]);

// exports


/***/ }),

/***/ "../../../../css-loader/index.js?{\"sourceMap\":false,\"import\":false}!../../../../postcss-loader/lib/index.js?{\"ident\":\"postcss\",\"sourceMap\":false}!../../../../../src/assets/font/font.css":
/***/ (function(module, exports, __webpack_require__) {

var escape = __webpack_require__("../../../../css-loader/lib/url/escape.js");
exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "@font-face {\n   \tfont-family: 'GoogleSans';\n    src: url(" + escape(__webpack_require__("../../../../../src/assets/font/Google-Sans-Font/GoogleSans-Regular.ttf")) + ");\n   \tfont-weight: 500;\n   \tfont-style: normal;\n}\n\n@font-face {\n   \tfont-family: 'GoogleSans';\n    src: url(" + escape(__webpack_require__("../../../../../src/assets/font/Google-Sans-Font/GoogleSans-Medium.ttf")) + ");\n   \tfont-weight: 600;\n   \tfont-style: normal;\n}\n\n@font-face {\n   \tfont-family: 'GoogleSans';\n    src: url(" + escape(__webpack_require__("../../../../../src/assets/font/Google-Sans-Font/GoogleSans-Bold.ttf")) + ");\n   \tfont-weight: 800;\n   \tfont-style: normal;\n}", ""]);

// exports


/***/ }),

/***/ "../../../../css-loader/index.js?{\"sourceMap\":false,\"import\":false}!../../../../postcss-loader/lib/index.js?{\"ident\":\"postcss\",\"sourceMap\":false}!../../../../../src/styles.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "/* You can add global styles to this file, and also import other style files */\n  /* .sidenav {\n         height: 100%;\n         width: 0;\n         position: fixed;\n         z-index: 1;\n         top: 0;\n         left: 0;\n         background-color: #111;\n         overflow-x: hidden;\n         transition: 0.5s;\n         padding-top: 60px;\n         } */\n  .navbar.navbar-default{\n            margin-bottom: 0px;\n            background: #fff;\n            -webkit-box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.13);\n                    box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.13);\n            }\n  a.logo{\n              display: block;\n              float: none;\n             height: auto;\n            }\n  a.logo img{\n              width:150px;\n              margin: 0 auto;\n            }\n  .col-md-1.col-sidebar{\n            padding-left: 0px\n            }\n  .sidenav{\n            height: 100vh;\n            background: #2a0e3c;\n            position: fixed;\n            width: 8%;\n            top: 0;\n            }\n  .side_menu{\n            list-style: none;\n            padding: 0;\n            margin: 0;\n            }\n  .side_menu li{\n            list-style: none;\n            margin-bottom: 20px;\n            }\n  .side_menu li a{\n            text-decoration: none;\n            font-size: 10px;\n            color: #B7B7B7E6;\n            display: block;\n            -webkit-transition: 0.3s;\n            transition: 0.3s;\n            text-align: center;\n            font-weight: 700;\n            text-transform: uppercase;\n            padding: 15px 0px;\n            word-wrap: break-word;\n            }\n  .side_menu li a.active{\n            background: #e03e92;\n            color: #fff;\n            }\n  .side_menu li a.active i{\n            background: #e03e92;\n            color: #fff;\n            }\n  .side_menu li a i{\n            font-size: 35px;\n            margin-bottom: 15px;\n            color: #B7B7B7E6;\n            }\n  .side_menu li a p{\n            margin: 0 0 0 0;\n            }\n  .sidenav a:hover {\n            color: #f1f1f1;\n            }\n  .sidenav .closebtn {\n            position: absolute;\n            top: 0;\n            right: 25px;\n            font-size: 36px;\n            margin-left: 50px;\n            }\n  #main {\n            -webkit-transition: margin-left .5s;\n            transition: margin-left .5s;\n            padding: 16px;\n            }\n  ul.nav{\n              padding: 20px 20px 20px 0;\n            }\n  .we{\n            color: #b9b9b9;\n            font-weight: 700;\n            font-size: 12px;\n            margin-bottom:60px;\n            }\n  .text-wrap{\n            background: -webkit-gradient(linear, left top, right bottom, from(#2a0e3cb3), to(#e03e92));\n            background: linear-gradient(to bottom right, #2a0e3cb3, #e03e92);\n            min-height:200px;\n            padding:10px;\n            border-radius: 10px;\n            position: relative;\n            }\n  .text-wrap h4{\n            line-height: 1.2;\n            color: #fff;\n            margin:0!important;\n            font-size: 20px;\n            font-weight: 100;\n            word-wrap: break-word;\n            }\n  .text-wrap p{\n            line-height: 1.45;\n            color: #fff;\n            margin:0!important;\n            font-size: 13px;\n            text-transform: uppercase;\n            font-weight: 100;\n            }\n  .text-wrap button{\n            font-weight: 700;\n            font-size: 15px;\n            color: #2a0e3c;\n            background: white;\n            border: none;\n            width: 90%;\n            padding: 12px 0px;\n            border-radius: 5px;\n            position: absolute;\n            left: 0;\n            right: 0;\n            bottom: 10px;\n            margin: 0 auto;\n            }\n  .pepsico{\n            color: #2a0e3c;\n            font-size: 18px;\n            margin: 0 0 0 0;\n            font-weight: 700;\n            }\n  .recomended{\n            margin-top: 60px;\n            }\n  .list-wrap h5{\n            color: #2a0e3c;\n            font-size: 15px;\n            }\n  .list-wrap .box{\n            -webkit-box-shadow: 0px 1px 3px #d1d1d1;\n                    box-shadow: 0px 1px 3px #d1d1d1;\n            border-radius: 10px;\n            padding: 10px;\n            }\n  .box h1{\n            color: #2a0e3c;\n            font-size: 20px;\n            }\n  .box h2{\n            color: #e03e92;\n            font-size: 30px;\n            }\n  h2.quick_status{\n            color: #2a0e3c;\n            font-size: 15px;\n            margin: 0 0 22px 0;\n            font-weight: bold;\n            }\n  .active_servy h2{\n            font-size: 13px;\n            color: #a1a1a1;\n            margin: 0 0 0 0;\n            font-weight: bold;\n            }\n  .active_servy{\n            -webkit-box-shadow: 0px 1px 3px #d1d1d1;\n                    box-shadow: 0px 1px 3px #d1d1d1;\n            padding: 5px;\n            border-radius: 7px;\n            margin-bottom: 20px;\n            }\n  .active_servy p{\n            font-size: 18px;\n            color: #a1a1a1;\n            font-weight: bold;\n            margin: 0 0 0 0;\n            }\n  .icon-wrap{\n            background: #e03e92;\n            cursor: pointer;\n            text-align: center;\n            border-radius: 5px;\n            color: white;\n            font-weight: bold;\n            padding: 9.5px 0px;\n            vertical-align: middle;\n            }\n  .icon-wrap i{\n            font-size: 25px;\n            padding: 0;\n            margin: 0;\n            color: white;\n            }\n  .icon-wrap.new_icon{\n            background: #741a47;\n            }\n  li.dropdown{\n              position: relative;\n   \n            }\n  li.dropdown > a{\n              padding: 0 0 0 0;\n              line-height: 40px;\n   \n            }\n  .form_bg {\n               background-color:#eee;\n               color:#666;\n               padding:10px;\n               border-radius:10px;\n               position: absolute;\n               border:1px solid #fff;\n               margin: auto;\n               top: 42px;\n               left: -40px;\n               width: 200px;\n               height: auto;\n               z-index: 11;\n               display: none;\n           }\n  .form_bg h2{\n             font-size: 13px;\n             margin: 0 0 10px 0;\n             line-height: 1.2;\n           }\n  .form-group input{\n             height: auto;\n             padding: 3px 12px;\n             font-size: 10px;\n           }\n  .align-center {\n               text-align:center;\n               }\n  .form_bg  .btn-default{\n             padding: 3px 12px;\n             font-size: 13px;\n           }\n  /****media query start*******/\n  @media screen and (max-width: 992px) {\n             .text-wrap {\n                 margin-bottom: 20px;\n             }\n             .text-wrap button {\n               font-size: 14px;\n             }\n             .text-wrap h4{\n               font-size: 16px;\n             }\n             .text-wrap p{\n               font-size:11px;\n             }\n   \n           }\n  @media screen and (max-width: 767px) {\n   \n            .sidenav {\n              width: 16%;\n            }\n            .side_menu li a p {\n             display: none;\n           }\n           li.dropdown > a {\n             text-align: right;\n               line-height: 27px;\n           }\n   \n          }\n  @media (min-width: 768px) {\n           .row-five-col > .col-md-2 {\n             width: 20%;\n           }\n         }\n  @media (max-width: 575px) {\n          a.navbar-brand {\n               padding: 15px 10px;\n           }\n           a.logo img {\n               width: 115px;\n               margin: 0 auto;\n           }\n           ul.nav {\n               padding: 20px 0px;\n           }\n           .navbar-nav {\n               margin: 0 -3px;\n           }\n        }\n   ", ""]);

// exports


/***/ }),

/***/ "../../../../css-loader/lib/css-base.js":
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function(useSourceMap) {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		return this.map(function (item) {
			var content = cssWithMappingToString(item, useSourceMap);
			if(item[2]) {
				return "@media " + item[2] + "{" + content + "}";
			} else {
				return content;
			}
		}).join("");
	};

	// import a list of modules into the list
	list.i = function(modules, mediaQuery) {
		if(typeof modules === "string")
			modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for(var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if(typeof id === "number")
				alreadyImportedModules[id] = true;
		}
		for(i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if(mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if(mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};

function cssWithMappingToString(item, useSourceMap) {
	var content = item[1] || '';
	var cssMapping = item[3];
	if (!cssMapping) {
		return content;
	}

	if (useSourceMap && typeof btoa === 'function') {
		var sourceMapping = toComment(cssMapping);
		var sourceURLs = cssMapping.sources.map(function (source) {
			return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */'
		});

		return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
	}

	return [content].join('\n');
}

// Adapted from convert-source-map (MIT)
function toComment(sourceMap) {
	// eslint-disable-next-line no-undef
	var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
	var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;

	return '/*# ' + data + ' */';
}


/***/ }),

/***/ "../../../../css-loader/lib/url/escape.js":
/***/ (function(module, exports) {

module.exports = function escape(url) {
    if (typeof url !== 'string') {
        return url
    }
    // If url is already wrapped in quotes, remove them
    if (/^['"].*['"]$/.test(url)) {
        url = url.slice(1, -1);
    }
    // Should url be wrapped?
    // See https://drafts.csswg.org/css-values-3/#urls
    if (/["'() \t\n]/.test(url)) {
        return '"' + url.replace(/"/g, '\\"').replace(/\n/g, '\\n') + '"'
    }

    return url
}


/***/ }),

/***/ "../../../../style-loader/addStyles.js":
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
var stylesInDom = {},
	memoize = function(fn) {
		var memo;
		return function () {
			if (typeof memo === "undefined") memo = fn.apply(this, arguments);
			return memo;
		};
	},
	isOldIE = memoize(function() {
		return /msie [6-9]\b/.test(self.navigator.userAgent.toLowerCase());
	}),
	getHeadElement = memoize(function () {
		return document.head || document.getElementsByTagName("head")[0];
	}),
	singletonElement = null,
	singletonCounter = 0,
	styleElementsInsertedAtTop = [];

module.exports = function(list, options) {
	if(typeof DEBUG !== "undefined" && DEBUG) {
		if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
	}

	options = options || {};
	// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
	// tags it will allow on a page
	if (typeof options.singleton === "undefined") options.singleton = isOldIE();

	// By default, add <style> tags to the bottom of <head>.
	if (typeof options.insertAt === "undefined") options.insertAt = "bottom";

	var styles = listToStyles(list);
	addStylesToDom(styles, options);

	return function update(newList) {
		var mayRemove = [];
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			domStyle.refs--;
			mayRemove.push(domStyle);
		}
		if(newList) {
			var newStyles = listToStyles(newList);
			addStylesToDom(newStyles, options);
		}
		for(var i = 0; i < mayRemove.length; i++) {
			var domStyle = mayRemove[i];
			if(domStyle.refs === 0) {
				for(var j = 0; j < domStyle.parts.length; j++)
					domStyle.parts[j]();
				delete stylesInDom[domStyle.id];
			}
		}
	};
}

function addStylesToDom(styles, options) {
	for(var i = 0; i < styles.length; i++) {
		var item = styles[i];
		var domStyle = stylesInDom[item.id];
		if(domStyle) {
			domStyle.refs++;
			for(var j = 0; j < domStyle.parts.length; j++) {
				domStyle.parts[j](item.parts[j]);
			}
			for(; j < item.parts.length; j++) {
				domStyle.parts.push(addStyle(item.parts[j], options));
			}
		} else {
			var parts = [];
			for(var j = 0; j < item.parts.length; j++) {
				parts.push(addStyle(item.parts[j], options));
			}
			stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
		}
	}
}

function listToStyles(list) {
	var styles = [];
	var newStyles = {};
	for(var i = 0; i < list.length; i++) {
		var item = list[i];
		var id = item[0];
		var css = item[1];
		var media = item[2];
		var sourceMap = item[3];
		var part = {css: css, media: media, sourceMap: sourceMap};
		if(!newStyles[id])
			styles.push(newStyles[id] = {id: id, parts: [part]});
		else
			newStyles[id].parts.push(part);
	}
	return styles;
}

function insertStyleElement(options, styleElement) {
	var head = getHeadElement();
	var lastStyleElementInsertedAtTop = styleElementsInsertedAtTop[styleElementsInsertedAtTop.length - 1];
	if (options.insertAt === "top") {
		if(!lastStyleElementInsertedAtTop) {
			head.insertBefore(styleElement, head.firstChild);
		} else if(lastStyleElementInsertedAtTop.nextSibling) {
			head.insertBefore(styleElement, lastStyleElementInsertedAtTop.nextSibling);
		} else {
			head.appendChild(styleElement);
		}
		styleElementsInsertedAtTop.push(styleElement);
	} else if (options.insertAt === "bottom") {
		head.appendChild(styleElement);
	} else {
		throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
	}
}

function removeStyleElement(styleElement) {
	styleElement.parentNode.removeChild(styleElement);
	var idx = styleElementsInsertedAtTop.indexOf(styleElement);
	if(idx >= 0) {
		styleElementsInsertedAtTop.splice(idx, 1);
	}
}

function createStyleElement(options) {
	var styleElement = document.createElement("style");
	styleElement.type = "text/css";
	insertStyleElement(options, styleElement);
	return styleElement;
}

function createLinkElement(options) {
	var linkElement = document.createElement("link");
	linkElement.rel = "stylesheet";
	insertStyleElement(options, linkElement);
	return linkElement;
}

function addStyle(obj, options) {
	var styleElement, update, remove;

	if (options.singleton) {
		var styleIndex = singletonCounter++;
		styleElement = singletonElement || (singletonElement = createStyleElement(options));
		update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
		remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
	} else if(obj.sourceMap &&
		typeof URL === "function" &&
		typeof URL.createObjectURL === "function" &&
		typeof URL.revokeObjectURL === "function" &&
		typeof Blob === "function" &&
		typeof btoa === "function") {
		styleElement = createLinkElement(options);
		update = updateLink.bind(null, styleElement);
		remove = function() {
			removeStyleElement(styleElement);
			if(styleElement.href)
				URL.revokeObjectURL(styleElement.href);
		};
	} else {
		styleElement = createStyleElement(options);
		update = applyToTag.bind(null, styleElement);
		remove = function() {
			removeStyleElement(styleElement);
		};
	}

	update(obj);

	return function updateStyle(newObj) {
		if(newObj) {
			if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
				return;
			update(obj = newObj);
		} else {
			remove();
		}
	};
}

var replaceText = (function () {
	var textStore = [];

	return function (index, replacement) {
		textStore[index] = replacement;
		return textStore.filter(Boolean).join('\n');
	};
})();

function applyToSingletonTag(styleElement, index, remove, obj) {
	var css = remove ? "" : obj.css;

	if (styleElement.styleSheet) {
		styleElement.styleSheet.cssText = replaceText(index, css);
	} else {
		var cssNode = document.createTextNode(css);
		var childNodes = styleElement.childNodes;
		if (childNodes[index]) styleElement.removeChild(childNodes[index]);
		if (childNodes.length) {
			styleElement.insertBefore(cssNode, childNodes[index]);
		} else {
			styleElement.appendChild(cssNode);
		}
	}
}

function applyToTag(styleElement, obj) {
	var css = obj.css;
	var media = obj.media;

	if(media) {
		styleElement.setAttribute("media", media)
	}

	if(styleElement.styleSheet) {
		styleElement.styleSheet.cssText = css;
	} else {
		while(styleElement.firstChild) {
			styleElement.removeChild(styleElement.firstChild);
		}
		styleElement.appendChild(document.createTextNode(css));
	}
}

function updateLink(linkElement, obj) {
	var css = obj.css;
	var sourceMap = obj.sourceMap;

	if(sourceMap) {
		// http://stackoverflow.com/a/26603875
		css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
	}

	var blob = new Blob([css], { type: "text/css" });

	var oldSrc = linkElement.href;

	linkElement.href = URL.createObjectURL(blob);

	if(oldSrc)
		URL.revokeObjectURL(oldSrc);
}


/***/ }),

/***/ 2:
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__("../../../../../src/styles.css");
__webpack_require__("../../../../../src/assets/css/main.css");
module.exports = __webpack_require__("../../../../../src/assets/font/font.css");


/***/ })

},[2]);
//# sourceMappingURL=styles.bundle.js.map
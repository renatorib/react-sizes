"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var isMobile = exports.isMobile = function isMobile(_ref) {
  var width = _ref.width;
  return width < 480;
};
var isTablet = exports.isTablet = function isTablet(_ref2) {
  var width = _ref2.width;
  return width >= 480 && width < 1024;
};
var isDesktop = exports.isDesktop = function isDesktop(_ref3) {
  var width = _ref3.width;
  return width >= 1024;
};

var isGtMobile = exports.isGtMobile = function isGtMobile(sizes) {
  return !isMobile(sizes);
};
var isGtTablet = exports.isGtTablet = function isGtTablet(sizes) {
  return isDesktop(sizes);
};

var isStTablet = exports.isStTablet = function isStTablet(sizes) {
  return isMobile(sizes);
};
var isStDesktop = exports.isStDesktop = function isStDesktop(sizes) {
  return !isDesktop(sizes);
};

var isTabletAndGreater = exports.isTabletAndGreater = function isTabletAndGreater(sizes) {
  return !isMobile(sizes);
};
var isTabletAndSmaller = exports.isTabletAndSmaller = function isTabletAndSmaller(sizes) {
  return !isStDesktop(sizes);
};
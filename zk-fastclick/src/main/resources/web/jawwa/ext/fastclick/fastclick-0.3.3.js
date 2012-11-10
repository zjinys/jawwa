/*
 FastClick: polyfill to remove click delays on browsers with touch UIs.

 @version 0.3.3
 @copyright The Financial Times Limited [All Rights Reserved]
 @license MIT License (see LICENSE.txt)
*/
function FastClick(a){var c,b=this;this.trackingClick=!1;this.targetElement=null;this.layer=a;if(!a||!a.nodeType)throw new TypeError("Layer must be a document node");this.onClick=function(){FastClick.prototype.onClick.apply(b,arguments)};this.onTouchStart=function(){FastClick.prototype.onTouchStart.apply(b,arguments)};this.onTouchMove=function(){FastClick.prototype.onTouchMove.apply(b,arguments)};this.onTouchEnd=function(){FastClick.prototype.onTouchEnd.apply(b,arguments)};this.onTouchCancel=function(){FastClick.prototype.onTouchCancel.apply(b,
arguments)};"undefined"!==typeof window.ontouchstart&&(a.addEventListener("click",this.onClick,!0),a.addEventListener("touchstart",this.onTouchStart,!0),a.addEventListener("touchmove",this.onTouchMove,!0),a.addEventListener("touchend",this.onTouchEnd,!0),a.addEventListener("touchcancel",this.onTouchCancel,!0),"function"===typeof a.onclick&&(c=a.onclick,a.addEventListener("click",function(a){c(a)},!1),a.onclick=null))}FastClick.prototype.deviceIsAndroid=0<navigator.userAgent.indexOf("Android");
FastClick.prototype.needsClick=function(a){switch(a.nodeName.toLowerCase()){case "label":case "video":return!0;default:return/\bneedsclick\b/.test(a.className)}};FastClick.prototype.needsFocus=function(a){switch(a.nodeName.toLowerCase()){case "textarea":case "select":return!0;case "input":switch(a.type){case "button":case "checkbox":case "file":case "image":case "radio":case "submit":return!1;default:return!0}default:return/\bneedsfocus\b/.test(a.className)}};
FastClick.prototype.maybeSendClick=function(a,c){var b,d;if(this.needsClick(a))return!1;d=c.changedTouches[0];b=document.createEvent("MouseEvents");b.initMouseEvent("click",!0,!0,window,1,d.screenX,d.screenY,d.clientX,d.clientY,!1,!1,!1,!1,0,null);b.forwardedTouchEvent=!0;a.dispatchEvent(b);return!0};FastClick.prototype.onTouchStart=function(a){var c=a.targetTouches[0];this.trackingClick=!0;this.targetElement=a.target;this.touchStartX=c.pageX;this.touchStartY=c.pageY;return!0};
FastClick.prototype.touchHasMoved=function(a){a=a.targetTouches[0];return 10<Math.abs(a.pageX-this.touchStartX)||10<Math.abs(a.pageY-this.touchStartY)?!0:!1};FastClick.prototype.onTouchMove=function(a){if(!this.trackingClick)return!0;if(this.targetElement!==a.target||this.touchHasMoved(a))this.trackingClick=!1,this.targetElement=null;return!0};
FastClick.prototype.onTouchEnd=function(a){var c,b=this.targetElement;if(!this.trackingClick)return!0;this.trackingClick=!1;if("label"===b.nodeName.toLowerCase()&&b.htmlFor){if(c=document.getElementById(b.htmlFor)){b.focus();if(this.android)return!1;this.maybeSendClick(c,a)&&a.preventDefault();return!1}}else if(this.needsFocus(b))return b.focus(),"select"!==b.tagName.toLowerCase()&&a.preventDefault(),!1;if(!this.maybeSendClick(b,a))return!1;a.preventDefault();return!1};
FastClick.prototype.onTouchCancel=function(){this.trackingClick=!1;this.targetElement=null};FastClick.prototype.onClick=function(a){var c;if(a.forwardedTouchEvent||!this.targetElement)return!0;c=this.targetElement;this.targetElement=null;return!a.cancelable||"submit"===a.target.type&&0===a.detail?!0:!this.needsClick(c)?(a.stopImmediatePropagation&&a.stopImmediatePropagation(),a.stopPropagation(),a.preventDefault(),!1):!0};
FastClick.prototype.destroy=function(){var a=this.layer;a.removeEventListener("click",this.onClick,!0);a.removeEventListener("touchstart",this.onTouchStart,!0);a.removeEventListener("touchmove",this.onTouchMove,!0);a.removeEventListener("touchend",this.onTouchEnd,!0);a.removeEventListener("touchcancel",this.onTouchCancel,!0)};"function"===typeof define&&define.amd&&define(function(){return FastClick});

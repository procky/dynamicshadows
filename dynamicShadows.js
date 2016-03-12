/*
dynamicShadows.js
	Dynamic single light casting shadows using CSS3 text and box shadows
	AUTHOR: Adam Wicks
	LICENCE: MIT
	DEPENDENCIES: none!
	LINK: https://github.com/procky/dynamicShadows
*/

var dynamicShadows = {};
dynamicShadows = (function() {
	"use strict";

	var boxShadowElements = [],
		textShadowElements = [],
		maxShadowOffset = 9999;
			
	var boxPropertyCheck = function(e) {
		if(typeof e.style.webkitBoxShadow === 'string') {
			return 'webkitBoxShadow';
		}
		if(typeof e.style.MozBoxShadow === 'string') {
			return 'MozBoxShadow';
		}
		if(typeof e.style.boxShadow === 'string') {
			return 'boxShadow';
		}
	},
	getElementOffset = function(e) {
		var offset = {x:0, y:0};
		while(e) {
			offset.x += e.offsetLeft;
			offset.y += e.offsetTop;
			e = e.offsetParent;
		}
		return offset;
	},
	getElementCenter = function(e) {
		var offset = getElementOffset(e);
		return {x: offset.x + (e.clientWidth / 2), y: offset.y + (e.clientHeight / 2)};
	},
	distanceBetweenPoints = function(start, end) {
		var dx = start.x - end.x,
			dy = start.y - end.y;
		return Math.sqrt(dx * dx + dy * dy);
	},
	boxShadowGen = function(boxPosition, lightPosition, blurAmount) {
		blurAmount = distanceBetweenPoints(lightPosition, boxPosition) / blurAmount;
		
		var shadowX = (boxPosition.x - lightPosition.x) / 8,
			shadowY = (boxPosition.y - lightPosition.y) / 8;
			
		shadowX = (shadowX > maxShadowOffset) ? maxShadowOffset : shadowX;
		shadowX = (shadowX < -maxShadowOffset) ? -maxShadowOffset : shadowX;
        
		shadowY = (shadowY > maxShadowOffset) ? maxShadowOffset : shadowY;
		shadowY = (shadowY < -maxShadowOffset) ? -maxShadowOffset : shadowY;
		
        return shadowX + 'px ' + shadowY + 'px '+ blurAmount + 'px #d2d2d2';
	},
	textShadowGen = function(textPosition, lightPosition, blurAmount) {
		blurAmount = distanceBetweenPoints(lightPosition, textPosition) / blurAmount;
		
		var shadowX = (textPosition.x - lightPosition.x) / 8,
			shadowY = (textPosition.y - lightPosition.y) / 8;
			
		shadowX = (shadowX > maxShadowOffset) ? maxShadowOffset : shadowX;
		shadowX = (shadowX < -maxShadowOffset) ? -maxShadowOffset : shadowX;

		shadowY = (shadowY > maxShadowOffset) ? maxShadowOffset : shadowY;
		shadowY = (shadowY < -maxShadowOffset) ? -maxShadowOffset : shadowY;
		
        return shadowX + 'px ' + shadowY + 'px '+ blurAmount + 'px #d2d2d2';
	},
	updateShadows = function(lightPosition) {
		// loop each element
		var i;
		for(i = 0; i < boxShadowElements.length; i++) {
			boxShadowElements[i].element.style[boxShadowElements[i].boxProperty] = boxShadowGen(boxShadowElements[i].center, lightPosition, boxShadowElements[i].blurAmount);
		}
		for(i = 0; i < textShadowElements.length; i++) {
			textShadowElements[i].element.style.textShadow = textShadowGen(textShadowElements[i].center, lightPosition, textShadowElements[i].blurAmount);
		}
	};
	
	return { // public interface
		init: function(maxOffset) {
			if(maxOffset) {
				maxShadowOffset = maxOffset;
			}
			window.addEventListener('resize', function() {
				// get the updated center positions for all the elements
				var i;
				for(i = 0; i < boxShadowElements.length; i++) {
					if(boxShadowElements[i].centerElement) {
						boxShadowElements[i].center = getElementCenter(boxShadowElements[i].centerElement);
					} else {
						boxShadowElements[i].center = getElementCenter(boxShadowElements[i].element);
					}
				}
				for(i = 0; i < textShadowElements.length; i++) {
					if(textShadowElements[i].centerElement) {
						textShadowElements[i].center = getElementCenter(textShadowElements[i].centerElement);
					} else {
						textShadowElements[i].center = getElementCenter(textShadowElements[i].element);
					}
				}
			});
		},
		addBoxElement: function(e, blurAmount, centerElement) {
			var boxProp = boxPropertyCheck(e),
				el = {element:e, boxProperty:boxProp};
			if(centerElement) { // optional param, default center of element
				el.center = getElementCenter(centerElement);
				el.centerElement = centerElement;
			} else {
				el.center = getElementCenter(e);
			}
			el.blurAmount = typeof blurAmount !== 'undefined' ? blurAmount : 12; // optional param, default 12
			boxShadowElements.push(el);
		},
		addTextElement: function(e, blurAmount, centerElement) {
			var el = {element:e};
			if(centerElement) { // optional param, default center of element
				el.center = getElementCenter(centerElement);
				el.centerElement = centerElement;
			} else {
				el.center = getElementCenter(e);
			}
			el.blurAmount = typeof blurAmount !== 'undefined' ? blurAmount : 12; // optional param, default 12
			textShadowElements.push(el);
		},
		setLightPosition: function(lightPosition) {
			updateShadows(lightPosition);
		},
		boxPropertyCheck: function(e) {
			return boxPropertyCheck(e);
		}
	};
})();

/*
underscore throttle




*/
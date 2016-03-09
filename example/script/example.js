"use strict";

// Tracking mouse movement to act as the light source for our box and text

dynamicShadows.init(50);

// adding a box shadow
dynamicShadows.addBoxElement(document.getElementById('example1'));

//adding a text shadow
dynamicShadows.addTextElement(document.getElementById('example2'), 48);

// manually setting a default on page load before any mouse movement has occured
dynamicShadows.setLightPosition({x:300, y:300});

// add event listeners for mouse movement, they call every movement
window.addEventListener('mousemove', onMouseMove);
window.addEventListener('touchmove', function(e) {
	e.preventDefault();
	e.stopPropagation();
	onMouseMove({clientX: e.touches[0].clientX, clientY: e.touches[0].clientY});
});

function onMouseMove(e) {
	var mousePosition = {x:0, y:0};
	
	// relative to document mouse position
	mousePosition.x = e.pageX;
	mousePosition.y = e.pageY;

	// pass the mouse position to dynamicShadows.js to recalculate the shadows
	dynamicShadows.setLightPosition(mousePosition);
}
# dynamicShadows.js
> Dynamic single light casting shadows using CSS3 text and box shadows

**LICENCE:** MIT

**DEPENDENCIES:** none!

[DEMO](http://procky.github.io/dynamicshadows/)

## Example usage

Download and add dynamicShadows.js to your project like

```html
<script type="text/javascript" src="lib/dynamicShadows.js"></script>
```

and lets make a couple of html elements we want to animate

```html
<div id="example1">Example 1, box</div>
<p id="example2">Example 2, text</p>
```

HTML ready for the example we can now give them dynamic shadows in javascript:

```javascript
// We're going to set up the html elements to work with the dynamicShadows.js library and track the mouse to act as the light source

dynamicShadows.init(30);

// adding a box shadow
dynamicShadows.addBoxElement(document.getElementById('example1'));

//adding a text shadow
dynamicShadows.addTextElement(document.getElementById('example1'), 12, work);

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
```

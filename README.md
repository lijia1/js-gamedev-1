# Lesson Plan :: Javascript Game Dev 

## References
- W3School - HTML, CSS, Javascript searchable documentation: [link](https://www.w3schools.com/)
- MDN - Mozilla Developer Network searchable documentation on Web technology: [link](https://developer.mozilla.org/en-US/docs/Web)

## Lesson 1 - Draw objects
Objectives:
- [HTML]  Introduce `canvas` element in HTML5
- [JS]    Draw basic things on `canvas`
- [JS]    Create and use functions
- [Style] Introduce naming and comment styles

Slide 1:
- HTML element `canvas` syntax, basic properties such as height, width

Slide 2:
- Accessing `canvas` element and its 2D context in JS

Slide 3:
- Draw a line on the `canvas` via the 2D context
- Draw a rectangle 
- Draw a circle 
- Write text

---

## Lesson 2 - Move objects
Objectives:
- [JS]   Introduce `window.setInterval()` [ref](https://www.w3schools.com/jsref/met_win_setinterval.asp)
- [JS]   Use constants
- [Math] Boundry detection

Slide 4:
- Use constants to denote values that don't change
- Set the stage and draw the ball

Slide 5:
- Use `window.setInterval()` to create the illusion of moving

Slide 6:
- Detect boundary collison

---

## Lesson 3 - Process keyboard and mouse input

Objectives:
- [JS] Introduce `document.addEventListener()` [ref](https://www.w3schools.com/jsref/met_document_addeventlistener.asp)
- [JS] Respond to keyboard events [ref](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/key/Key_Values), [key values](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent)
- [JS] Respond to mouse events [ref](https://developer.mozilla.org/en-US/docs/Web/Events/mousemove)

Slide 7:
- Use `document.addEvenListener()` to register an event handler

Slide 8:
- Use `keyup` and `keydown` events

Slide 9:
- Use `mousemove` event

---

## Lesson 4 - Stop game

Objectives:
- [JS] Introduce `window.clearInterval()`

Slide 10:
- Detect game-over

Slide 11:
- Use `window.clearInterval()` to stop game
- Restart game

---

## Lesson 5 - Add more contents

Objectives:
- [JS] Build data structure to represent in-game entities
- [JS] Create objects using JSON

Slide 12:
- Build a matrix of bricks

Slide 13:
- Detect brick collision

---

## Lession 6 - Final touches

Slide 14:
- Detect game-won
- Add number of lives

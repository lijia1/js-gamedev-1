"use strict"

/**
 * Global constants
 */
// Colors, Styles
const COLOR_BALL_FILL_STYLE   = "#959500";
const COLOR_PADDLE_FILL_STYLE = "#808080"

// Sizes
const SIZE_BALL_RADIUS        = 10;
const SIZE_PADDLE_HEIGHT      = 5;
const SIZE_PADDLE_WIDTH       = 75;

/**
 * Global variables
 */
// Handle to the 2D context of the Canvas element
let canvas = document.getElementById("myCanvas");
let context = canvas.getContext("2d");

// Ball's current coordinate
let xBall = canvas.width / 2;
let yBall = canvas.height - 30;

// Ball's current velocity
let xBallVelocity =  2;
let yBallVelocity = -2;

// Paddle's current coordinate
let xPaddle = (canvas.width - SIZE_PADDLE_WIDTH)/2;
let yPaddle = canvas.height - SIZE_PADDLE_HEIGHT;

// Paddle's nudge displacement 
let xPaddleNudge = 7;

// Keyboard states
let isKeyRightPressed = false;
let isKeyLeftPressed  = false;

/**
 * Entry point 
 */
// register keyboard and mouse event handlers
document.addEventListener("keydown",   keyDownHandler,   false);
document.addEventListener("keyup",     keyUpHandler,     false);
document.addEventListener("mousemove", mouseMoveHandler, false);
// start game
window.setInterval(main, 10, context);

/**
 * Main function of the game
 * @param {object} ctx The 2D context of a Canvas 
 */
function main(ctx)
{
    // clear the stage
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    
    // draw the ball
    drawCircle(ctx, xBall, yBall, SIZE_BALL_RADIUS, COLOR_BALL_FILL_STYLE, "");

    // draw the paddle
    drawRect(ctx, xPaddle, yPaddle, SIZE_PADDLE_WIDTH, SIZE_PADDLE_HEIGHT, COLOR_PADDLE_FILL_STYLE);

    // update the ball's status
    updateBall(ctx);

    // update the paddle's status
    updatePaddle(ctx);
}

/**
 * Handles a MouseMove event
 * @param {object} evt MouseMove event
 */
function mouseMoveHandler(evt) {
    let relativeX = evt.clientX - canvas.offsetLeft;
    if(relativeX > 0 && relativeX < canvas.width) {
        xPaddle = relativeX - SIZE_PADDLE_WIDTH/2;
    }
}

/**
 * Handles a KeyDown event
 * @param {object} evt KeyDown event 
 */
function keyDownHandler(evt)
{
    switch(evt.key)
    {
        case "ArrowRight":
        case "Right":
            isKeyRightPressed = true;
            break;
        case "ArrowLeft":
        case "Left":
            isKeyLeftPressed = true;
            break;
    }
}

/**
 * Handles a KeyUp event
 * @param {object} evt KeyUp event 
 */
function keyUpHandler(evt)
{
    switch(evt.key)
    {
        case "ArrowRight":
        case "Right":
            isKeyRightPressed = false;
            break;
        case "ArrowLeft":
        case "Left":
            isKeyLeftPressed = false;
            break;
     }
}

/**
 * Update the paddle's current status
 * @param {object} ctx The 2D context of a Canvas
 */
function updatePaddle(ctx)
{
    if(isKeyRightPressed && xPaddle < ctx.canvas.width - SIZE_PADDLE_WIDTH) {
        xPaddle += Math.abs(xPaddleNudge);
    }
    else if(isKeyLeftPressed && xPaddle > 0) {
        xPaddle -= Math.abs(xPaddleNudge);
    }
}

/**
 * Update the ball's current status
 * @param {object} ctx  The 2D context of a Canvas
 */
function updateBall(ctx)
{
    // change direction of velocity when hitting the wall
    if(xBall + xBallVelocity > (ctx.canvas.width - SIZE_BALL_RADIUS) || 
       xBall + xBallVelocity < SIZE_BALL_RADIUS) 
    {
        xBallVelocity = -xBallVelocity;
    }
    if(yBall + yBallVelocity > (ctx.canvas.height - SIZE_BALL_RADIUS) || 
       yBall + yBallVelocity < SIZE_BALL_RADIUS) 
    {
        yBallVelocity = -yBallVelocity;
    }

    // update ball's location
    xBall += xBallVelocity;
    yBall += yBallVelocity;
}

/**
 * Draw a circle
 * @param {object} ctx         The 2D context of a Canvas 
 * @param {number} x           X-coordinate of the center of the circle
 * @param {number} y           Y-coordinate of the center of the circle
 * @param {number} radius      Radius of the circle
 * @param {string} fillStyle   Style used to fill the rectangle, e.g. #00FF00, or 
 *                             rgba(0, 255, 0, 0.5), or leave it blank
 * @param {string} strokeStyle Style for the border of the rectangle
 */
function drawCircle(ctx, x, y, radius, fillStyle, strokeStyle)
{
    ctx.beginPath();

    ctx.arc(x, y, radius, 0, Math.PI * 2);

    if (fillStyle != "")
    {
        ctx.fillStyle = fillStyle;
        ctx.fill();
    }

    if (strokeStyle != "")
    {
        ctx.strokeStyle = strokeStyle;
        ctx.stroke();
    }

    ctx.closePath();
}

/** 
 * Draw a rectangle
 * @param {object} ctx         The 2D context of a Canvas
 * @param {number} x           X-coordinate of the top-left corner of the rectangle
 * @param {number} y           Y-coordinate of the top-left corner of the rectangle
 * @param {number} width       Width of the rectangle
 * @param {number} height      Height of the rectangle
 * @param {string} fillStyle   Style used to fill the rectangle, e.g. #00FF00, or 
 *                             rgba(0, 255, 0, 0.5), or leave it blank
 * @param {string} strokeStyle Style for the border of the rectangle
 */
function drawRect(ctx, x, y, width, height, fillStyle, strokeStyle)
{
    ctx.beginPath();

    ctx.rect(x, y, width, height);

    if (fillStyle != "")
    {
        ctx.fillStyle = fillStyle;
        ctx.fill();
    }

    if (strokeStyle != "")
    {
        ctx.strokeStyle = strokeStyle;
        ctx.stroke();
    }

    ctx.closePath();
}
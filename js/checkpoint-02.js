"use strict"

// Handle to the 2D context of the Canvas element
let canvas = document.getElementById("myCanvas");
let context = canvas.getContext("2d");

// Ball's current coordinate
let xBall = canvas.width / 2;
let yBall = canvas.height - 30;

// Ball's current velocity
let xBallVelocity =  2;
let yBallVelocity = -2;

// Constants: Colors, Styles, Sizes, etc
const COLOR_BALL_FILL_STYLE = "#959500";
const SIZE_BALL_RADIUS      = 10;

// start game
window.setInterval(main, 10, context);

/**
 * Main entry point of the game
 * @param {object} ctx The 2D context of a Canvas 
 */
function main(ctx)
{
    // clear the stage
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    
    // draw the ball
    drawCircle(ctx, xBall, yBall, SIZE_BALL_RADIUS, COLOR_BALL_FILL_STYLE, "");

    // update the ball's status
    updateBall(ctx);
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
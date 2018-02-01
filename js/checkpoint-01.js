"use strict"

// Get a handle to the 2D context of the Canvas element
let canvas = document.getElementById("myCanvas");
let context = canvas.getContext("2d");

// Draw a line
context.moveTo(200, 200);
context.lineTo(300, 300);
context.strokeStyle = "rgba(0, 0, 255, 0.5)";
context.stroke();

// Draw a rectangle filled with color
context.beginPath();
context.rect(20, 40, 50, 50);
context.fillStyle = "#FF0000";
context.fill();
context.closePath();

// Draw a circle
context.beginPath();
context.arc(240, 160, 20, 0, Math.PI*2);
context.fillStyle = "green";
context.fill();
context.closePath();

// Draw a rectangle with border only
context.beginPath();
context.rect(160, 10, 100, 40);
context.strokeStyle = "rgba(0, 0, 255, 0.5)";
context.stroke();
context.closePath();

// Write text
context.font = "30px Arial";
context.textAlign = "left"
context.fillStyle = "black";
context.fillText("Hello World", 150, 200);

// We can do better by creating functions
drawLine  (context, 250, 90, 150, 90, "purple");
drawRect  (context, 80, 80, 50, 70, "#909090", "#00FF00");
// Draw a circle at the center of the Canvas
drawCircle(context, canvas.width/2, canvas.height/2, 30, "rgba(0, 0, 255, 0.5)", "rgba(0, 255, 0, 0.5)");
// Write another piece of text
writeText (context, "Javascript is Awesome!", 140, 140, "center", "20px Helvetica", "red");

/**
 * Draw a line
 * @param {object} ctx         The 2D context of a Canvas
 * @param {number} x_begin     X-coordinate of the start point
 * @param {number} y_begin     Y-coordinate of the start point
 * @param {number} x_end       X-coordinate of the end point
 * @param {number} y_end       Y-coordinate of the end point
 * @param {string} strokeStyle Style for the line
 */
function drawLine(ctx, x_begin, y_begin, x_end, y_end, strokeStyle)
{
    ctx.moveTo(x_begin, y_begin);
    ctx.lineTo(x_end  , y_end);
    ctx.strokeStyle = strokeStyle;
    ctx.stroke();
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
 * Write text
 * @param {object} ctx       The 2D context of a Canvas
 * @param {string} text      Text to be written
 * @param {number} x         X-coordinate of the text
 * @param {number} y         Y-coordinate of the text
 * @param {string} alignment The alignment of the text at the specified (x,y) location.
 *                           Valid values are 'left', 'center', 'right'
 * @param {string} font      Font used, e.g. '30px Arial'
 * @param {string} fillStyle Style used to fill the text
 */
function writeText(ctx, text, x, y, alignment, font, fillStyle)
{
    ctx.font = font;
    ctx.textAlign = alignment;
    ctx.fillStyle = fillStyle;
    ctx.fillText(text, x, y);
}
"use strict"

const COLOR_BALL_FILL_STYLE = "#959500";
const SIZE_BALL_RADIUS      = 10;
const COLOR_BRICK_FILL_STYLE  = "#AA2222";

// Paddle color and sizes
const COLOR_PADDLE_FILL_STYLE = "#808080"
const SIZE_PADDLE_HEIGHT      = 5;
const SIZE_PADDLE_WIDTH       = 75;
const SIZE_PADDLE_NUDGE       = 7;

const SIZE_BRICK_HEIGHT        = 20;
const SIZE_BRICK_WIDTH         = 75;
const SIZE_BRICK_WALL_GAP_TOP  = 30;
const SIZE_BRICK_WALL_GAP_LEFT = 30; 
const SIZE_BRICK_BRICK_GAP     = 10;

const SIZE_NUM_ROWS_BRICKS     =  5;
const SIZE_NUM_COLS_BRICKS     =  3;

// Get a handle to the 2D context of the Canvas element
let canvas = document.getElementById("myCanvas");
let context = canvas.getContext("2d");

let xBall, yBall;
let xBallVelocity, yBallVelocity;
let xPaddle, yPaddle;

let isKeyRightPressed = false;
let isKeyLeftPressed  = false;

let isGameOver;

let bricks = buildBricks();

// register keyboard and mouse event handlers
document.addEventListener("keydown",   keyDownHandler,   false);
document.addEventListener("keyup",     keyUpHandler,     false);
document.addEventListener("mousemove", mouseMoveHandler, false);

resetGame();
initBallPaddle(context);
let mainGame = window.setInterval(main, 10, context);

/**
 * Main draw loop of the game
 * @param {object} ctx The 2D context of a Canvas
 */
function main(ctx)
{
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    drawBricks(ctx);

    drawCircle(ctx, xBall, yBall, 
               SIZE_BALL_RADIUS, COLOR_BALL_FILL_STYLE, "");
    drawRect(ctx, xPaddle, yPaddle, SIZE_PADDLE_WIDTH, SIZE_PADDLE_HEIGHT, COLOR_PADDLE_FILL_STYLE, "");

    updateBall(ctx);

    if (isGameOver)
    {
        window.clearInterval(mainGame);
        writeText(ctx, "GAME OVER", 
                  ctx.canvas.width/2, ctx.canvas.height/2, 
                  "center", "40px Helvetica", "red");
        writeText(ctx, "Press the ENTER key to continue", 
                  ctx.canvas.width/2, ctx.canvas.height/2+40, 
                  "center", "12pt Helvetica", "red");
    }

    updatePaddle(ctx);

    updateBricks();
}

function resetGame()
{
    isGameOver = false;
}

/**
 * Initialize ball and paddle position
 * @param {object} ctx The 2D context of a Canvas
 */
function initBallPaddle(ctx)
{
    xBall = ctx.canvas.width / 2;
    yBall = ctx.canvas.height - 30;

    xPaddle = (ctx.canvas.width - SIZE_PADDLE_WIDTH)/2;
    yPaddle = ctx.canvas.height - SIZE_PADDLE_HEIGHT;

    xBallVelocity =  2;
    yBallVelocity = -2;
}

/**
 * Build a 2D matrix (array of arrays) of bricks
 * @returns {array} a 2D matrix of bricks
 */
function buildBricks()
{
    let returnValue = [];
    for(let c = 0; c < SIZE_NUM_COLS_BRICKS; c++) {
        returnValue[c] = [];
        for(let r = 0; r < SIZE_NUM_ROWS_BRICKS; r++) {
            let xBrick = (r*(SIZE_BRICK_WIDTH  + SIZE_BRICK_BRICK_GAP)) + 
                          SIZE_BRICK_WALL_GAP_LEFT;
            let yBrick = (c*(SIZE_BRICK_HEIGHT + SIZE_BRICK_BRICK_GAP)) + 
                          SIZE_BRICK_WALL_GAP_TOP;
            let brick = {x: xBrick, y: yBrick, isHit: false};
            returnValue[c][r] = brick;
        }
    }
    return returnValue;
}

/**
 * Draw bricks - only unhit bricks are drawn
 * @param {object} ctx 2D context of a Canvas
 */
function drawBricks(ctx)
{
    for(let c = 0; c < SIZE_NUM_COLS_BRICKS; c++)
    {
        for(let r = 0; r < SIZE_NUM_ROWS_BRICKS; r++)
        {
            let brick = bricks[c][r];
            if (!brick.isHit)
                drawRect(ctx, brick.x, brick.y, 
                         SIZE_BRICK_WIDTH, SIZE_BRICK_HEIGHT, 
                         COLOR_BRICK_FILL_STYLE, "");
        }
    }
}

/**
 * Handles a MouseMove event
 * @param {object} evt MouseMove event
 */
function mouseMoveHandler(evt) {
    let relativeX = evt.clientX - canvas.offsetLeft;
    let outLeft  = relativeX - SIZE_PADDLE_WIDTH/2 <= 0;
    let outRight = relativeX >= canvas.width - SIZE_PADDLE_WIDTH/2;
    if ( !outLeft && !outRight) 
    {
        xPaddle = relativeX - SIZE_PADDLE_WIDTH/2;
    }
    else if ( outLeft )
    {
        xPaddle = 0;
    }
    else if ( outRight )
    {
        xPaddle = canvas.width - SIZE_PADDLE_WIDTH;
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

        case "Enter":
            if (isGameOver)
            {
                resetGame();
                initBallPaddle(context);
                mainGame = window.setInterval(main, 10, context);
                return;
            }
            break;
    }
}

/**
 * Update the ball's current status
 */
function updateBall(ctx)
{
    let isHittingRightWall = (xBall + xBallVelocity > 
                              (ctx.canvas.width - SIZE_BALL_RADIUS));
    let isHittingLeftWall  = (xBall + xBallVelocity < SIZE_BALL_RADIUS);
    let isHittingUpperWall = (yBall + yBallVelocity < SIZE_BALL_RADIUS);
    let isHittingLowerWall = (yBall + yBallVelocity > 
                              (ctx.canvas.height - SIZE_BALL_RADIUS));

    if ( isHittingRightWall || isHittingLeftWall ) 
    {
        xBallVelocity = -xBallVelocity;
    }
    if ( isHittingUpperWall )
    {
        yBallVelocity = -yBallVelocity;
    }
    else if ( isHittingLowerWall )
    {
        // ball is at the lower boundary of the canvas
        // is it hitting the paddle?
        let isPaddleInRange = (xBall >= xPaddle && 
            xBall <= xPaddle + SIZE_PADDLE_WIDTH);
        if (isPaddleInRange)
        {
            // treat the paddle like a wall
            yBallVelocity = -yBallVelocity;
        }
        else
        {
            isGameOver = true;
        }
    }

    xBall += xBallVelocity;
    yBall += yBallVelocity;
}

/**
 * Update the paddle's current status
 */
function updatePaddle(ctx)
{
    if (isKeyRightPressed && 
        xPaddle < ctx.canvas.width - SIZE_PADDLE_WIDTH) 
    {
        xPaddle += SIZE_PADDLE_NUDGE;
    }
    else if (isKeyLeftPressed && 
             xPaddle > 0) 
    {
        xPaddle -= SIZE_PADDLE_NUDGE;
    }
}

function updateBricks()
{
    for(let c = 0; c < SIZE_NUM_COLS_BRICKS; c++) {
        for(let r = 0; r < SIZE_NUM_ROWS_BRICKS; r++) {
            let b = bricks[c][r];
            if(b.isHit == false) {
                /* Define isHitFromTopOrBottom and isHitFromLeftOrRight */ 
                let xInRange = (xBall >= b.x && 
                    xBall <= b.x + SIZE_BRICK_WIDTH);
    
                let yInRangeFromTop    
                    = ((yBall + SIZE_BALL_RADIUS) >= b.y && 
                    (yBall + SIZE_BALL_RADIUS) <  b.y + SIZE_BRICK_HEIGHT);
                
                let yInRangeFromBottom 
                    = ((yBall - SIZE_BALL_RADIUS) >  b.y && 
                    (yBall - SIZE_BALL_RADIUS) <= b.y + SIZE_BRICK_HEIGHT);
                
                let isHitFromTopOrBottom = (xInRange && 
                                            (yInRangeFromTop || yInRangeFromBottom));
                
                let yInRange = (yBall >= b.y && 
                    yBall <= b.y + SIZE_BRICK_HEIGHT);
                
                let xInRangeFromLeft  
                    = ((xBall + SIZE_BALL_RADIUS) >= b.x &&
                        (xBall + SIZE_BALL_RADIUS) <  b.x + SIZE_BRICK_WIDTH);
                
                let xInRangeFromRight 
                    = ((xBall - SIZE_BALL_RADIUS) >  b.x &&
                        (xBall - SIZE_BALL_RADIUS) <= b.x + SIZE_BRICK_WIDTH);
                
                let inHitFromLeftOrRight = (yInRange && 
                                            (xInRangeFromLeft || xInRangeFromRight));

                if (isHitFromTopOrBottom)
                {
                    yBallVelocity = -yBallVelocity; b.isHit = true;
                }
                else if (inHitFromLeftOrRight)
                {
                    xBallVelocity = -xBallVelocity; b.isHit = true;
                }                  
            }
        }
    }
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
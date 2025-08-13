// game.js (modul)
import Obstacle from "./classes/Obstacle.js";
import Ball from "./classes/Ball.js";

let ball;
let obstacle;

// OBS: canvasWidth är pixlar (följer ditt önskemål)
// canvasHeight är NU math-top (positivt värde), alltså math-y går -canvasHeight..+canvasHeight
const canvasWidth = 1320; // pixels
const canvasHeight = 350; // math-enheter (top), alltså math-range = -350 .. +350

// Skalning: pixlar per math-enhet. Sätt mathScale = 1 för 1 math-unit = 1 pixel.
const mathScale = 1;

// pixelhöjd som används för createCanvas
const pixelHeight = canvasHeight * 2 * mathScale; // = 700 om canvasHeight=350 och mathScale=1

// Hjälpvariabler (internt)
const halfW = canvasWidth / 2;
const halfH = pixelHeight / 2;

// Matematiska gränser (behåller variabelnamnen du gillar)
const leftMathX = -halfW / mathScale;
const rightMathX = halfW / mathScale;
const topMathY = canvasHeight; // positiv topp i math-enheter
const bottomMathY = -canvasHeight; // negativ botten i math-enheter

// Globala flaggor
let isCollision = false;
let initialSpeed = 2;
let angleRad;

// -------------------
// SETUP
// -------------------
window.setup = function () {
    createCanvas(canvasWidth, pixelHeight);

    let x1 = -300;
    let x2 = 300;
    let y1 = -200;
    let y2 = -200;

    frameRate(60);

    // obstacle from x=-200,y=-100 to x=200,y=100
    obstacle = new Obstacle(x1, x2, y1, y2);
    obstacle.colorOnObstacle("green");

    angleRad = (-50 * PI) / 180;

    let inital_vy = sin(angleRad) * initialSpeed;
    let inital_vx = cos(angleRad) * initialSpeed;

    // Skapa boll i matte-koordinater (origin i mitten)
    const { vx, vy } = velObjFromAngleDeg(initialSpeed, -50); // Negativ y = neråt
    ball = {
        pos: createVector(0, 0), // math coords
        vel: createVector(vx, vy), // math-units per frame
        radius: 20, // math-enheter
    };

    calcKollisionWithObject(x1, x2, y1, y2, ball.vel.x, ball.vel.y, angleRad);
};

// -------------------
// KONVERTERING MATH → SKÄRM
// -------------------
function toScreen(x, y) {
    return {
        x: halfW + x * mathScale,
        y: halfH - y * mathScale,
    };
}

function mathXToPixel(x) {
    return halfW + x * mathScale;
}
function mathYToPixel(y) {
    return halfH - y * mathScale;
}

// -------------------
// HJÄLP: VELOCITY FRÅN VINKEL
// -------------------
function degToRad(deg) {
    return (deg * Math.PI) / 180;
}

// Skapar en velocity från hastighet (speed) och vinkel i grader.
// vinkel från +x, positiv moturs, positiv y = uppåt
function velFromAngleDeg(speed, angleDeg) {
    const a = degToRad(angleDeg);
    return createVector(speed * Math.cos(a), speed * Math.sin(a));
}

// Om du vill att positiv y = nedåt
function velFromAngleDeg_downIsPositive(speed, angleDeg) {
    const a = degToRad(angleDeg);
    return createVector(speed * Math.cos(a), -speed * Math.sin(a));
}

// Enkel objekt-variant
function velObjFromAngleDeg(speed, angleDeg) {
    const angleRad = degToRad(angleDeg);
    return {
        vx: speed * Math.cos(angleRad),
        vy: speed * Math.sin(angleRad),
    };
}

function calcKollisionWithObject(x1, x2, y1, y2, hx, hy, angle) {
    console.log("x1: ", x1);
    console.log("x2: ", x2);
    console.log("y1: ", y1);
    console.log("y2: ", y2);
    // console.log("ball_vel_vx: ", ball_vel_vx);
    // console.log("ball_vel_vy: ", ball_vel_vy);

    // console.log("angle: ", angle);
    let k = (y2 - y1) / (x2 - x1);
    let t = 0;
    while (t < 1) {
        // Horizontell mark utan lutning
        if (k == 0 && y1 == y2 && x1 !== x2) {
            // console.log("k: ", k);
            // console.log("Sant");

            // y = -200

            let secondsToCollideInY = hy * Math.sin(angle);

            console.log("secondsToCollideInY: ", secondsToCollideInY);

            if (secondsToCollideInY > 0) {
                let ball_y_in_time = hy * secondsToCollideInY;
                let ball_x_in_time = hx * secondsToCollideInY;

                if (x1 <= ball_x_in_time <= x2 && y1 <= ball_y_in_time) {
                    console.log("Kommer bli träff!");
                }
            }

            let yT = hy * t;
            let xT = hx * t;

            let new_yt;
        }
        t = t + 1;
    }
}

// -------------------
// DRAW
// -------------------
window.draw = function () {
    background(20);
    stroke(200);

    // Rita axlar
    const yStart = toScreen(0, bottomMathY);
    const yEnd = toScreen(0, topMathY);
    line(yStart.x, yStart.y, yEnd.x, yEnd.y);

    const xStart = toScreen(leftMathX, 0);
    const xEnd = toScreen(rightMathX, 0);
    line(xStart.x, xStart.y, xEnd.x, xEnd.y);

    // Rita obstacle
    obstacle.drawToScreen(toScreen);

    // Rita bollen
    const screenPos = toScreen(ball.pos.x, ball.pos.y);
    fill(255, 100, 100);
    ellipse(screenPos.x, screenPos.y, ball.radius * 2 * mathScale);

    // Uppdatera bollens position i math-enheter
    ball.pos.x += ball.vel.x;
    ball.pos.y += ball.vel.y;

    //console.log(" ball.pos.y : ", ball.pos.y);

    // -------------------
    // Collision mot kanter (math-koordinater)
    // -------------------
    // BOTTEN
    if (ball.pos.y < bottomMathY + ball.radius) {
        let n = createVector(0, 1); // normal uppåt
        ball.vel.reflect(n);
    }
    // TOPP
    else if (ball.pos.y > topMathY - ball.radius) {
        let n = createVector(0, -1); // normal nedåt
        ball.vel.reflect(n);
    }
    // HÖGER
    else if (ball.pos.x > rightMathX - ball.radius) {
        let n = createVector(-1, 0); // normal vänster
        ball.vel.reflect(n);
    }
    // VÄNSTER
    else if (ball.pos.x < leftMathX + ball.radius) {
        let n = createVector(1, 0); // normal höger
        ball.vel.reflect(n);
    }
};

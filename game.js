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
let initialSpeed = 10;
let angleRad;

let ballAngle = 30;

let trajectoryPoistionsArray;

let isCollide = false;

// -------------------
// SETUP
// -------------------
window.setup = function () {
    createCanvas(canvasWidth, pixelHeight);

    let x1 = -200;
    let x2 = 200;
    let y1 = -100;
    let y2 = -100;

    frameRate(60);

    // obstacle from x=-200,y=-100 to x=200,y=100
    obstacle = new Obstacle(x1, x2, y1, y2);
    obstacle.colorOnObstacle("green");

    angleRad = (-50 * PI) / 180;

    // Skapa boll i matte-koordinater (origin i mitten)
    const { vx, vy } = velObjFromAngleDeg(initialSpeed, ballAngle); // Negativ y = neråt
    ball = {
        pos: createVector(-200, -200), // math coords
        vel: createVector(vx, vy), // math-units per frame
        radius: 20, // math-enheter
    };

    // calcKollisionWithObject(
    //     x1,
    //     x2,
    //     y1,
    //     y2,
    //     ball.vel.x,
    //     ball.vel.y,
    //     angleRad,
    //     ball.pos.x,
    //     ball.pos.y
    // );

    trajectoryPoistionsArray = trajectory(
        x1,
        x2,
        y1,
        y2,
        ball.vel.x,
        ball.vel.y,
        angleRad,
        ball.pos.x,
        ball.pos.y
    );
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

function trajectory(x1, x2, y1, y2, hx, hy, angle, ball_pos_x, ball_pos_y) {
    // console.log("x1: ", x1);
    // console.log("x2: ", x2);
    // console.log("y1: ", y1);
    // console.log("y2: ", y2);
    // console.log("ball_vel_vx: ", ball_vel_vx);
    // console.log("ball_vel_vy: ", ball_vel_vy);

    // console.log("angle: ", angle);
    let k = (y2 - y1) / (x2 - x1);
    let t = 0;

    let positions = [];

    while (t < 150) {
        // Horizontell mark utan lutning
        if (k == 0 && y1 == y2 && x1 !== x2) {
            // console.log("k: ", k);
            // console.log("Sant");

            /*
                postion = y(t) = ball.pos.y + hy * t
                
                y1 = ball.pos.y + hy * t
                y1 - ball.pos.y = hy * t

                t = (y1 - ball.pos.y) / hy
                
                tid     =  t = 

            
            */

            //
            let tForFirstY = (y1 - ball.pos.y) / hy;
            let tForSecondY = (y2 - ball.pos.y) / hy;

            let check_ball_pos_y;
            let check_ball_pos_x;

            if (tForFirstY > 0) {
                check_ball_pos_y = ball_pos_y + hy * tForFirstY;
                check_ball_pos_x = ball_pos_x + hx * tForFirstY;

                // Samma behöver inget intervall på y1 eller y2
                if (
                    x1 <= check_ball_pos_x &&
                    check_ball_pos_x <= x2 &&
                    y1 <= check_ball_pos_y
                ) {
                    //console.log("Kommer bli kollision!");
                    // console.log("Pos X: ", check_ball_pos_x);
                    // console.log("Pos Y: ", check_ball_pos_y);

                    let testBallX = ball.pos.x + hx * t;
                    let testBallY = ball.pos.y + hy * t;

                    positions.push({ x: testBallX, y: testBallY });

                    //console.log("positions: ", positions);

                    //console.log("testBallY: ", testBallY);
                    //console.log("testBallX: ", testBallX);
                }
            } else if (tForSecondY > 0) {
                check_ball_pos_y = ball_pos_y + hy * tForSecondY;
                check_ball_pos_x = ball_pos_x + hx * tForSecondY;

                if (
                    x1 <= check_ball_pos_x &&
                    check_ball_pos_x <= x2 &&
                    y1 <= check_ball_pos_y
                ) {
                    console.log("Kommer bli kollision!");

                    let testBallX = ball.pos.x + hx * t;
                    let testBallY = ball.pos.y + hy * t;

                    positions.push({ x: testBallX, y: testBallY });
                }
            }
            t = t + 0.1;
            // console.log("t: ", t);
        }
    }

    console.log("positions", positions);
    return positions;
}

function ballCollision(x1, x2, y1, y2, ball) {
    let ball_hastighet_vector = createVector(ball.vel.x, ball.vel.y);
    let ytaVec = { x: x2 - x1, y: y2 - y1 };
    let ytaRiktning = (y2 - y1) / (x2 - x1);

    if (ytaRiktning == 0) {
        let vinkelrättVec = createVector(-ytaVec.y, ytaVec.x);

        /*
            
            d = ((xb​−x1​),(yb​−y1​))⋅

            xb och yb är startpunkterna

            P är bollens punkt  (xb, yb)
            L x1, y1 Linjen startpunkt

            P - L
            d = ((ball.pos.x - x1) + (ball.pos.y - y1)) * vinkelrättVec

        */
        vinkelrättVec.normalize();
        let dotproduct = ball_hastighet_vector.dot(vinkelrättVec);

        /* När nog för kollision */
        let fromBallToYta = createVector(ball.pos.x - x1, ball.pos.y - y1);
        let diff = fromBallToYta.dot(vinkelrättVec);

        if (diff <= ball.radius && dotproduct < 0) {
            ball.vel.reflect(vinkelrättVec);
            ball.pos.y += ball.radius - diff;
        }
    }
}

// -------------------
// DRAW
// -------------------
window.draw = function () {
    background(20);
    stroke(200);

    //console.log("trajectoryPoistionsArray: ", trajectoryPoistionsArray);

    stroke(255, 100, 100);
    strokeWeight(3);

    for (let i = 1; i < trajectoryPoistionsArray.length; i++) {
        let prev = trajectoryPoistionsArray[i - 1];

        let curr = trajectoryPoistionsArray[i];

        const pointsPrev = toScreen(prev.x, prev.y);
        const pointsCurr = toScreen(curr.x, curr.y);

        line(pointsPrev.x, pointsPrev.y, pointsCurr.x, pointsCurr.y);
    }

    // console.log("mouseX: ", mouseX);
    // console.log("mouseY: ", mouseY);

    // Rita axlar i t.ex. vitt
    stroke(200); // ändra färg innan axlar
    strokeWeight(1);

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

    ballCollision(
        obstacle.xStart,
        obstacle.xEnd,
        obstacle.yStart,
        obstacle.yEnd,
        ball
    );

    //console.log(" ball.pos.y : ", ball.pos.y);

    // -------------------
    // Collision mot kanter (math-koordinater)
    // -------------------
    // BOTTEN
};

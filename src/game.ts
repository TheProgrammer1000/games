/// <reference types="p5/global" />

const screenHeight = 800;
const screenWidth = 1200;

let mainPlayer: MainPlayer;
let myPlane: MyPlane = new MyPlane(
    new Vector2(screenWidth / 2, screenHeight / 2),
    400,
    400
);

function setup(): void {
    createCanvas(screenWidth, screenHeight);

    console.log("myPlane: ", myPlane);
}

function draw(): void {
    background(200);
    rect(myPlane.pos.x, myPlane.pos.y, myPlane.width, myPlane.height);
}

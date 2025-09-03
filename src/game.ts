/// <reference types="p5/global" />

const screenHeight = 800;
const screenWidth = 1200;

let myPlane: MyPlane = new MyPlane(
    new Vector2(screenWidth / 2, screenHeight / 2),
    400,
    400
);

let arrayVec2: Vector2[] = [];

let mainPlayer: MainPlayer = new MainPlayer(
    new Vector2(screenWidth / 2, screenHeight / 2)
);

function setup(): void {
    createCanvas(screenWidth, screenHeight);
    rectMode(CENTER);
    console.log("myPlane: ", myPlane);

    arrayVec2.push(
        new Vector2(200, 50),
        new Vector2(100, 50),
        new Vector2(50, 20)
    );
}

function draw(): void {
    background(200);

    rect(myPlane.pos.x, myPlane.pos.y, myPlane.width, myPlane.height);
    // mainPlayer.draw();
    mainPlayer.update(myPlane);

    text(`bottomLeft: ${myPlane.bottomLeft}`, 100, 10);
    text(`bottomRight: ${myPlane.bottomRight}`, 100, 50);
    text(`topLeft: ${myPlane.topLeft}`, 100, 100);
    text(`topRight: ${myPlane.topRight}`, 100, 150);

    text(`Mouse X: ${mouseX}`, 200, 300);
    text(`Mouse Y: ${mouseY}`, 300, 300);
}

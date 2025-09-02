/// <reference types="p5/global" />

let mainPlayer: MainPlayer;

function setup(): void {
    createCanvas(800, 600);
    mainPlayer = new MainPlayer(new Vector2(width / 2, height / 2));
}

function draw(): void {
    background(200);
    mainPlayer.draw();
}

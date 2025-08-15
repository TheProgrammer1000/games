// classes/Obstacle.js
export default class Obstacle {
    // Vi tar emot koordinater i "matte"-koordinater (origo i mitten, y uppåt)
    constructor(xStart, xEnd, yStart, yEnd) {
        this.xStart = xStart;
        this.yStart = yStart;
        this.xEnd = xEnd;
        this.yEnd = yEnd;
        this.color = "white";
    }

    colorOnObstacle(colorText) {
        this.color = colorText;
    }

    // drawToScreen tar en toScreen-funktion som konverterar matte -> skärm
    drawToScreen(toScreen) {
        const p1 = toScreen(this.xStart, this.yStart);
        const p2 = toScreen(this.xEnd, this.yEnd);
        stroke(this.color);

        line(p1.x, p1.y, p2.x, p2.y);
    }
}

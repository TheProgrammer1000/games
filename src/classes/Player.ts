class MainPlayer {
    pos: Vector2;

    constructor(pos: Vector2) {
        this.pos = pos;
    }

    draw(): void {
        fill(255, 0, 0); // p5 globalt
        noStroke();
        circle(this.pos.x, this.pos.y, 20);
    }
}

class MainPlayer {
    pos: Vector2;
    circle_radius: number;

    constructor(pos: Vector2, circle_radius = 10) {
        this.pos = pos;
        this.circle_radius = circle_radius;
        this.pos = this.pos.add(new Vector2(100, 100));
    }

    draw(): void {
        fill(255, 0, 0); // p5 globalt
        noStroke();
        circle(this.pos.x, this.pos.y, this.circle_radius);
        this.update();
    }

    update(): void {}
}

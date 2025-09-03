class MainPlayer {
    pos: Vector2;
    circle_radius: number;

    constructor(pos: Vector2, circle_radius = 10) {
        this.pos = pos;
        this.circle_radius = circle_radius;

        // this.pos = this.pos.add(new Vector2(100, 100));
        // this.pos = this.pos.rotate(5);
    }

    draw(): void {
        // triangle(this.pos.x, this.pos.y, this.circle_radius);
    }

    update(): void {}
}

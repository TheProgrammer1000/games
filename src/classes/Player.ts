class MainPlayer {
    pos: Vector2;

    constructor(pos: Vector2) {
        this.pos = pos;

        // this.pos = this.pos.add(new Vector2(100, 100));
        // this.pos = this.pos.rotate(5);
    }

    draw(): void {
        triangle(30, 60, 60, 30, 30, 30);
    }

    update(obstacle: MyPlane): void {
        // console.log("hypotenuse: ", hypotenuse);
        // console.log("distanceVec: ", distanceVec);
    }
}

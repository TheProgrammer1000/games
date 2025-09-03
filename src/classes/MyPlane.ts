class MyPlane extends GameObject {
    width: number;
    height: number;

    topLeft: number;
    bottomLeft: number;

    topRight: number;
    bottomRight: number;

    constructor(pos: Vector2, width: number, height: number) {
        super(pos);
        this.width = width;
        this.height = height;

        this.bottomLeft = this.pos.x - width;
        this.bottomRight = this.pos.x - this.bottomLeft + width;

        this.topLeft = this.pos.y;
        this.topRight = this.pos.y + this.height;
    }
}

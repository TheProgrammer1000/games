class MyPlane extends GameObject {
    width: number;
    height: number;

    constructor(pos: Vector2, width: number, height: number) {
        super(pos);
        this.width = width;
        this.height = height;
    }
}

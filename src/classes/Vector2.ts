class Vector2 {
    x: number;
    y: number;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    add(v: Vector2): Vector2 {
        return new Vector2(this.x + v.x, this.y + v.y);
    }

    sub(v: Vector2): Vector2 {
        return new Vector2(this.x - v.x, this.y - v.y);
    }

    length(): number {
        return Math.sqrt(this.x ** 2 + this.y ** 2);
    }

    normalise(): Vector2 {
        const leng = this.length();

        if (leng === 0) {
            return new Vector2(0, 0);
        }

        return new Vector2(this.x / leng, this.y / leng);
    }

    rotate(angleDegrees: number): Vector2 {
        const angleRad = (angleDegrees * Math.PI) / 180; // omvandla till radier
        const cosA = Math.cos(angleRad);
        const sinA = Math.sin(angleRad);

        return new Vector2(
            this.x * cosA - this.y * sinA,
            this.x * sinA + this.y * cosA
        );
    }
}

// classes/Obstacle.js
export default class Ball {
    // Vi tar emot koordinater i "matte"-koordinater (origo i mitten, y uppåt)
    constructor(ball_pos_x, ball_pos_y, ball_vel_x, ball_vel_y) {
        this.ball_pos_x = ball_pos_x;
        this.ball_pos_y = ball_pos_y;
        this.ball_vel_x = ball_vel_x;
        this.ball_vel_y = ball_vel_y;
        this.color = "green";
    }
}

import Phaser, { Physics } from 'phaser';


export default class PlayerCharacter extends Physics.Arcade.Sprite {

  MOVE_SPEED_X = 300;
  isFalling: boolean = false;
  isJumping: boolean = false;

  JUMP_FORCE = 1000;
  MAX_JUMP_TIME = 200;
  jumpTime: number = 0;

  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y, 'playerSprite');
    this.scene.add.existing(this);
    this.scene.physics.add.existing(this);
  }

  checkFlip(): void {
    if (this.body.velocity.x < 0) {
      this.scaleX = -1;
      return;
    }
    this.scaleX = 1;
  }

  getBody(): Physics.Arcade.Body {
    return this.body as Physics.Arcade.Body;
  }

  moveX(velocity: number) {
    this.setVelocityX(velocity * this.MOVE_SPEED_X);
  }

  jump() {
    if (this.isFalling === false) this.isJumping = true;
  }

  stopJump() {
    this.isJumping = false;
    this.jumpTime = 0;
  }

  update(time: any, delta: any) {

    if (this.isJumping) {
      this.jumpTime += delta;
      if (this.jumpTime < this.MAX_JUMP_TIME) {
        this.setVelocityY(-1 * this.JUMP_FORCE);
      }
    }

    if (this.getBody().onFloor()) {
      this.isFalling = false;
    }
    else {
      this.isFalling = true;
    }
  }
}
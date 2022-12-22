import { throws } from 'assert';
import Phaser, { Physics } from 'phaser';
import PlayerAnimator from '../playerAnimator/playerAnimator';


export default class PlayerCharacter extends Physics.Arcade.Sprite {

  animator: PlayerAnimator;

  MOVE_SPEED_X = 150;
  isFalling: boolean = false;
  isJumping: boolean = false;
  canJump: boolean = true;

  JUMP_FORCE = 45;
  MAX_JUMP_TIME = 300;
  jumpTime: number = 0;

  offscreenCallback: Function | null = null;

  constructor(scene: Phaser.Scene, x: number, y: number, spriteId: string) {
    super(scene, x, y, spriteId);
    this.setScale(0.5);
    this.animator = new PlayerAnimator(this, spriteId);
    this.scene.add.existing(this);
    this.scene.physics.add.existing(this);
    this.animate('idle');
  }

  setOffscreenCallback(callback: Function) {
    this.offscreenCallback = callback;
  }

  animate(animation: string) {
    this.animator.changeState(animation);
  }

  checkFlip(): void {
    if (this.body.velocity.x < 0) {
      this.flipX = true;
      return;
    }
    if (this.body.velocity.x > 0) {
      this.flipX = false;
    }
  }

  getBody(): Physics.Arcade.Body {
    return this.body as Physics.Arcade.Body;
  }

  moveX(velocity: number) {
    this.setVelocityX(velocity * this.MOVE_SPEED_X);
  }

  jump() {
    if (this.isFalling === false && this.canJump === true) this.isJumping = true;
    this.canJump = false;
  }

  stopJump() {
    if (this.isJumping === true) {
      this.isJumping = false;
      this.jumpTime = 0;
      this.setVelocityY(0);
    }
    this.canJump = true;
  }

  handleJumping(delta: any) {
    if (this.isJumping) {
      if (this.getBody().onCeiling()) {
        this.isJumping = false;
        this.jumpTime = 0;
        this.setVelocityY(0);
      }
      this.jumpTime += delta;
      if (this.jumpTime < this.MAX_JUMP_TIME) {
        this.setVelocityY(-1 * (this.JUMP_FORCE / ((this.jumpTime + 100) / 1000)));
      }
      else {
        this.isJumping = false;
        this.jumpTime = 0;
        this.setVelocityY(0);
      }
    }
  }

  handleFalling() {
    if (this.getBody().onFloor()) {
      this.isFalling = false;
    }
    else {
      this.isFalling = true;
    }
  }

  handleAnimation() {
    if (this.isFalling === true) {
      this.animate('jump');
      return;
    }
    if (this.getBody().velocity.x !== 0) {
      this.animate('walk');
      return;
    }
    this.animate('idle');
  }

  checkOffscreen() {
    if (this.offscreenCallback == null) return;
    // console.log('offscreen callback exists, checking...');
    if (this.scene.cameras.main.worldView.contains(this.getBody().x, this.getBody().y) === false) {
      console.log('this player is offscreen!');
      this.offscreenCallback();
      this.offscreenCallback = null;
    }
    else {
      console.log('player is on screen');
    }
  }

  update(time: any, delta: any) {
    this.checkFlip();
    this.handleJumping(delta);
    this.handleFalling();
    this.handleAnimation();
    this.checkOffscreen();
  }
}
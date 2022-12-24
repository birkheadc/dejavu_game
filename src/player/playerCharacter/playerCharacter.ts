import { throws } from 'assert';
import Phaser, { Physics } from 'phaser';
import PlayerAnimator from '../playerAnimator/playerAnimator';


export default class PlayerCharacter extends Physics.Arcade.Sprite {

  animator: PlayerAnimator;

  SLOW_MOVE_SPEED_X = 90;
  MOVE_SPEED_X = 150;
  currentMoveSpeedX: number = this.MOVE_SPEED_X
  isFalling: boolean = false;
  isJumping: boolean = false;
  canJump: boolean = true;

  isMourning: boolean = false;

  JUMP_FORCE = 45;
  SLOW_JUMP_FORCE = 35;
  currentJumpForce: number = this.JUMP_FORCE;
  MAX_JUMP_TIME = 300;
  jumpTime: number = 0;

  offscreenCallback: Function | null = null;

  constructor(scene: Phaser.Scene, x: number, y: number, spriteId: string, isSlow: boolean) {
    super(scene, x, y, spriteId);
    this.setScale(0.5);
    this.setPlayerSlow(isSlow);
    this.animator = new PlayerAnimator(this, spriteId, isSlow);
    this.scene.add.existing(this);
    this.scene.physics.add.existing(this);
    this.animate('idle');
  }

  setPlayerSlow(isSlow: boolean) {
    this.currentJumpForce = isSlow ? this.SLOW_JUMP_FORCE : this.JUMP_FORCE;
    this.currentMoveSpeedX = isSlow ? this.SLOW_MOVE_SPEED_X : this.MOVE_SPEED_X;
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
    this.setVelocityX(velocity * this.currentMoveSpeedX);
  }

  jump() {
    if (this.isFalling === false && this.canJump === true) this.isJumping = true;
    this.canJump = false;
  }

  cancelJump() {
    this.stopJump();
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
        this.setVelocityY(-1 * (this.currentJumpForce / ((this.jumpTime + 100) / 1000)));
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
    if (this.isMourning === true) {
      this.animate('mourn');
      return;
    }
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
    if (this.scene.cameras.main.worldView.contains(this.getBody().x, this.getBody().y) === false) {
      this.offscreenCallback();
      this.offscreenCallback = null;
    }
  }

  mourn(callback: Function) {
    this.isMourning = true;
    this.on('animationcomplete', () => {
      this.isMourning = false;
      callback();
    });
    this.animate('mourn');
  }

  update(time: any, delta: any) {
    this.checkFlip();
    this.handleJumping(delta);
    this.handleFalling();
    this.handleAnimation();
    this.checkOffscreen();
  }
}
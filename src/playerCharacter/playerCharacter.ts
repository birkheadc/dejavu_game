import Phaser, { Physics } from 'phaser';


export default class PlayerCharacter extends Physics.Arcade.Sprite {
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
}
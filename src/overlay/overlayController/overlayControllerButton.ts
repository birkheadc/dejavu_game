import { Physics } from "phaser"

export default class OverlayControllerButton extends Physics.Arcade.Sprite {

  sprite: string;

  constructor(scene: Phaser.Scene, x: number, y: number, spriteId: string, private callback: Function) {
    super(scene, x, y, spriteId);
    this.sprite = spriteId;
    this.scene.add.existing(this);
    this.setInteractive();
    this.on('pointerdown', callback);
  }



}
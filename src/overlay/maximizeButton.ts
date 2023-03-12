import { Physics } from "phaser";

export default class MaximizeButton extends Physics.Arcade.Sprite {

  sprite: string;
  callback: Function;

  constructor(scene: Phaser.Scene, x: number, y: number, spriteId: string, callback: Function) {
    super(scene, x, y, spriteId);
    this.sprite = spriteId;
    this.callback = callback;
    this.scene.add.existing(this);
    this.on('pointerup', this.onPointerDown);
  }

  onPointerDown() {
    this.callback();
  }

}
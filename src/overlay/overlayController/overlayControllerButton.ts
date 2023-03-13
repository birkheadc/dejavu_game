import { Physics } from "phaser"

export default class OverlayControllerButton extends Physics.Arcade.Sprite {

  sprite: string;

  constructor(scene: Phaser.Scene, x: number, y: number, spriteId: string, private callback: (isPushed: boolean) => void) {
    super(scene, x, y, spriteId);
    this.sprite = spriteId;
    this.scene.add.existing(this);
    this.setInteractive();
    this.on('pointerdown', this.onDown);
    this.on('pointerup', this.onUp);
    this.on('pointerout', this.onUp);
    this.setDepth(10);
    this.setAlpha(0);
  }

  onDown = () => {
    this.callback(true);
  }

  onUp = () => {
    this.callback(false);
  }
}
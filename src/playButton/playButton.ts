import Phaser, { Physics } from 'phaser';

export default class PlayButton extends Physics.Arcade.Sprite {

  sprite: string;
  callback: Function;
  wasClicked: boolean = false;

  constructor(scene: Phaser.Scene, x: number, y: number, spriteId: string, callback: Function) {
    super(scene, x, y, spriteId);
    this.sprite = spriteId;
    this.callback = callback;
    this.scene.add.existing(this);
    this.declareAnims();
    this.play('up');
    this.on('pointerdown', this.down);
    this.on('pointerup', this.up);
  }

  declareAnims() {
    this.anims.create({
      key: 'up',
      frames: this.anims.generateFrameNumbers(this.sprite, { frames: [ 0 ]}),
      frameRate: 1,
      repeat: -1
    });
    this.anims.create({
      key: 'down',
      frames: this.anims.generateFrameNumbers(this.sprite, { frames: [ 1, 0 ]}),
      frameRate: 1,
      repeat: -1
    });
  }

  up() {
    this.wasClicked = true;
    this.play('up');
    this.callback();
  }

  down() {
    if (this.wasClicked === false) this.play('down');
  }

}
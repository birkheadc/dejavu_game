import { Physics } from "phaser";
import { IMobData } from "../assets/mobs";

export default class Mob extends Physics.Arcade.Sprite {

  mobData: IMobData;
  
  constructor(scene:Phaser.Scene, x: number, y: number, mobData: IMobData) {
    super(scene, x, y, mobData.sprite);
    this.mobData = mobData;
    this.addToScene();
    this.defineAnims();
  }

  addToScene() {
    this.scene.add.existing(this);
    this.scene.physics.add.existing(this);
    this.setGravity(0, -1200);
    this.setImmovable(true);
    this.body.setSize(16, 8);
    this.body.setOffset(0, 0);
  }

  defineAnims() {
    this.mobData.animations.forEach(animation => {
      this.anims.create({
        key: animation.name,
        frames: this.anims.generateFrameNumbers(this.mobData.sprite, { frames: animation.frames}),
        frameRate: animation.frameRate,
        repeat: animation.repeat
      })
    });
  }
}
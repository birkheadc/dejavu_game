import { Physics } from "phaser";
import { IMobData } from "../assets/mobs";

export default class Mob extends Physics.Arcade.Sprite {

  mobData: IMobData;
  isActive: boolean;
  
  constructor(scene:Phaser.Scene, x: number, y: number, mobData: IMobData, isActive: boolean) {
    super(scene, x, y, mobData.sprite);
    this.mobData = mobData;
    this.isActive = isActive;
    this.addToScene();
    this.defineAnims();
    this.play(isActive ? 'active' : 'inactive');
  }

  addToScene() {
    this.scene.add.existing(this);
    this.scene.physics.add.existing(this);
    this.setGravity(0, -1200);
    this.setImmovable(true);
    this.body.setSize(this.mobData.size.x, this.mobData.size.y);
    this.body.setOffset(this.mobData.offset.x, this.mobData.offset.y);
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
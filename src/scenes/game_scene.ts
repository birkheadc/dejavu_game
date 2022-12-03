import Phaser from "phaser";

export default class GameScene extends Phaser.Scene {
  
  constructor() {
    super('GameScene');
  }

  getScreenCenter() {
    return {
      x: this.cameras.main.worldView.x + this.cameras.main.width / 2,
      y: this.cameras.main.worldView.y + this.cameras.main.height / 2
    }
  }

  preload() {
    console.log('Preloading Game Scene');
  }

  create() {
    console.log('Creating Game Scene');
    const center = this.getScreenCenter();
    const text = this.add.text(center.x, center.y, 'If you can see this the game is working!');
    text.setAlign('center');
    text.setOrigin(0.5);
  }
}
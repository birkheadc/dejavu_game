import Phaser from "phaser";
import playButtonImg from '../assets/play_button.png';

export default class MainMenuScene extends Phaser.Scene {

  constructor() {
    super('MainMenuScene');
  }

  getScreenCenter() {
    return {
      x: this.cameras.main.worldView.x + this.cameras.main.width / 2,
      y: this.cameras.main.worldView.y + this.cameras.main.height / 2
    }
  }

  getPlayButton() {
    const button = this.add.image(240, 160, 'play_button');
    button.setInteractive();
    button.on('pointerdown', () => this.scene.start('GameScene'));
    return button;
  }

  preload() {
    console.log('Preloading Main Menu Scene');
    this.load.image('play_button', playButtonImg);
  }

  create() {
    console.log('Creating Main Menu Scene');
    const button = this.getPlayButton();
  }
}
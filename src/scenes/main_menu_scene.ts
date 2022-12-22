import Phaser from "phaser";
import characters from "../assets/character";
import playButtonImg from '../assets/play_button.png';
import stages from "../assets/stages";
import terrainSpriteSheet from '../assets/maps/mininicular.png';
import mobs from "../assets/mobs";

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
    button.on('pointerdown', () => this.scene.start('GameScene', {stage: stages.getStageData(2) }));
    return button;
  }

  preload() {
    this.load.image('play_button', playButtonImg);
    this.load.spritesheet('terrainSprite', terrainSpriteSheet, { frameWidth: 16, frameHeight: 16}); 
    mobs.preloadMobs(this);
    stages.preloadStages(this);
    characters.preloadCharacters(this);
  }

  create() {
    const button = this.getPlayButton();
  }
}
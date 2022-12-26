import Phaser from "phaser";
import bad_end from '../assets/ends/bad_end.png';
import good_end from '../assets/ends/good_end.png';
import characters from "../assets/character";
import title from '../assets/ui/title.png';
import playButtonImg from '../assets/ui/play_button.png';
import stages from "../assets/stages";
import terrainSpriteSheet from '../assets/maps/mininicular.png';
import mobs from "../assets/mobs";
import PlayButton from "../playButton/playButton";

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

  getTitlePosition() {
    const center = this.getScreenCenter();
    return {
      x: center.x,
      y: center.y / 2
    }
  }

  getPlayButton() {
    const center = this.getScreenCenter();
    const button = new PlayButton(this, center.x, center.y, 'play_button', () => this.startGame());
    button.setInteractive();
    return button;
  }

  getTitle() {
    const pos = this.getTitlePosition();
    const title = this.add.image(pos.x, pos.y, 'title');
    return title;
  }

  preload() {
    this.load.image('title', title);
    this.load.spritesheet('play_button', playButtonImg, { frameWidth: 128, frameHeight: 64 });
    this.load.spritesheet('terrainSprite', terrainSpriteSheet, { frameWidth: 16, frameHeight: 16});
    mobs.preloadMobs(this);
    stages.preloadStages(this);
    characters.preloadCharacters(this);
    this.load.image('bad_end', bad_end);
    this.load.image('good_end', good_end);
  }

  create() {
    const button = this.getPlayButton();
    const title = this.getTitle();
  }

  startGame() {
    this.cameras.main.fade(1000, 50, 50, 50, false, (camera: any, duration: number) => {
      if (duration >= 1) {
        this.scene.start('GameScene', {stage: stages.getStageData(0)});
      }
    });
  }
}
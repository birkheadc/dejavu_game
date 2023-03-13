import Phaser from "phaser";
import bad_end from '../assets/ends/bad_end.png';
import good_end from '../assets/ends/good_end.png';
import characters from "../assets/character";
import title from '../assets/ui/title.png';
import playButtonImg from '../assets/ui/play_button.png';
import jumpButton from '../assets/ui/jump_button.png';
import leftButton from '../assets/ui/left_button.png';
import rightButton from '../assets/ui/right_button.png';
import maxButton from '../assets/ui/maximize_button.png';
import showControllerButton from '../assets/ui/show_controller_button.png';
import stages from "../assets/stages";
import terrainSpriteSheet from '../assets/maps/mininicular.png';
import mobs from "../assets/mobs";
import PlayButton from "../playButton/playButton";
import Overlay from "../overlay/overlay";

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

  getOverlay() {
    const overlay = new Overlay(this, null);
    return overlay;
  }

  preload() {
    this.load.image('title', title);
    this.load.spritesheet('play_button', playButtonImg, { frameWidth: 128, frameHeight: 64 });
    this.load.spritesheet('terrainSprite', terrainSpriteSheet, { frameWidth: 16, frameHeight: 16});
    this.load.spritesheet('jump_button', jumpButton, { frameWidth: 64, frameHeight: 64});
    this.load.spritesheet('left_button', leftButton, { frameWidth: 64, frameHeight: 64});
    this.load.spritesheet('right_button', rightButton, { frameWidth: 64, frameHeight: 64});
    this.load.spritesheet('maximize_button', maxButton, { frameWidth: 64, frameHeight: 64});
    this.load.spritesheet('show_controller_button', showControllerButton, { frameWidth: 64, frameHeight: 64});
    mobs.preloadMobs(this);
    stages.preloadStages(this);
    characters.preloadCharacters(this);
    this.load.image('bad_end', bad_end);
    this.load.image('good_end', good_end);
  }

  create() {
    const button = this.getPlayButton();
    const title = this.getTitle();
    const overlay = this.getOverlay();
  }

  startGame() {
    this.cameras.main.fade(1000, 50, 50, 50, false, (camera: any, duration: number) => {
      if (duration >= 1) {
        this.scene.start('GameScene', {stage: stages.getStageData(0)});
      }
    });
  }
}
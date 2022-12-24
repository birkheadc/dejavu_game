import Phaser from 'phaser';

export default class EndScene extends Phaser.Scene {
  constructor() {
    super('EndScene');
  }

  init(data: { ending: string }) {
    console.log("You've reached ending: ", data.ending);
  }
}
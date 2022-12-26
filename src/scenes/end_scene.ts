import Phaser from 'phaser';

export default class EndScene extends Phaser.Scene {

  ending: string = '';

  constructor() {
    super('EndScene');
  }

  init(data: { ending: string }) {
    this.ending = data.ending;
  }

  create() {
    const center = this.getScreenCenter();
    if (this.ending === 'good') {
      this.add.image(center.x, center.y, 'good_end');
      this.cameras.main.fadeIn(2000, 55, 55, 55);
    }
    else {
      this.add.image(center.x, center.y, 'bad_end');
      this.cameras.main.flash(2000, 155, 0, 0, false);
    }
  }

  getScreenCenter() {
    return {
      x: this.cameras.main.worldView.x + this.cameras.main.width / 2,
      y: this.cameras.main.worldView.y + this.cameras.main.height / 2
    }
  }
}
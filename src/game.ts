import Phaser from "phaser";
import config from "./config";
import Scenes from "./scenes";

export default class Game {
  game: Phaser.Game;

  constructor() {
    this.game = new Phaser.Game(config);
  }

  start() {
  }
}
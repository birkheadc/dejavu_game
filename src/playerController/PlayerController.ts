import Phaser from 'phaser';
import PlayerCharacter from '../playerCharacter/playerCharacter';

export default class PlayerController extends Phaser.Input.InputPlugin {
  playerCharacter: PlayerCharacter
  WKey = Phaser.Input.Keyboard.Key
  AKey = Phaser.Input.Keyboard.Key
  SKey = Phaser.Input.Keyboard.Key
  DKey = Phaser.Input.Keyboard.Key
  SpaceKey = Phaser.Input.Keyboard.Key

  constructor(scene: Phaser.Scene, playerCharacter: PlayerCharacter) {
    super(scene);
    this.playerCharacter = playerCharacter;
  }
}
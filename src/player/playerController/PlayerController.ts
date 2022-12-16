import Phaser from 'phaser';
import PlayerCharacter from '../playerCharacter/playerCharacter';

export default class PlayerController extends Phaser.Input.InputPlugin {
  playerCharacter: PlayerCharacter;
  isUsable: boolean = true;
  WKey: Phaser.Input.Keyboard.Key;
  AKey: Phaser.Input.Keyboard.Key;
  SKey: Phaser.Input.Keyboard.Key;
  DKey: Phaser.Input.Keyboard.Key;
  SpaceKey: Phaser.Input.Keyboard.Key;

  constructor(scene: Phaser.Scene, playerCharacter: PlayerCharacter) {
    super(scene);
    this.playerCharacter = playerCharacter;
    this.WKey = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
    this.AKey = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
    this.SKey = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
    this.DKey = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
    this.SpaceKey = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
  }

  update(time: any, delta: any) {
    this.handleLeftRight();
    this.handleJump();
  }

  handleLeftRight() {
    if (this.isUsable === false) return;
    if (this.AKey.isDown) {
      this.playerCharacter.moveX(-1);
    }
    else if (this.DKey.isDown) {
      this.playerCharacter.moveX(1);
    }
    else {
      this.playerCharacter.moveX(0);
    }
  }

  handleJump() {
    if (this.isUsable === false) return;
    if (this.SpaceKey.isDown) {
      this.playerCharacter.jump();
    }
    else {
      this.playerCharacter.stopJump();
    }
  }

  setUsable(isUsable: boolean) {
    this.isUsable = isUsable;
    this.playerCharacter.moveX(0);
  }
}
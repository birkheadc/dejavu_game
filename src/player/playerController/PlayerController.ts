import Phaser from 'phaser';
import PlayerCharacter from '../playerCharacter/playerCharacter';

export default class PlayerController extends Phaser.Input.InputPlugin {
  playerCharacter: PlayerCharacter;
  isUsable: boolean = true;
  AKey: Phaser.Input.Keyboard.Key;
  DKey: Phaser.Input.Keyboard.Key;
  SpaceKey: Phaser.Input.Keyboard.Key;

  OverlayController: {
    left: boolean,
    right: boolean,
    jump: boolean
  } = {
    left: false,
    right: false,
    jump: false
  }

  constructor(scene: Phaser.Scene, playerCharacter: PlayerCharacter) {
    super(scene);
    this.playerCharacter = playerCharacter;
    this.AKey = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
    this.DKey = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
    this.SpaceKey = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
  }

  update(time: any, delta: any) {
    this.handleLeftRight();
    this.handleJump();
  }

  handleLeftRight() {
    if (this.isUsable === false) return;
    if (this.AKey.isDown || this.OverlayController.left) {
      this.playerCharacter.moveX(-1);
    }
    else if (this.DKey.isDown || this.OverlayController.right) {
      this.playerCharacter.moveX(1);
    }
    else {
      this.playerCharacter.moveX(0);
    }
  }

  handleJump() {
    if (this.isUsable === false) return;
    if (this.SpaceKey.isDown || this.OverlayController.jump) {
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

  setOverlayController(controller: { left: boolean, right: boolean, jump: boolean}) {
    this.OverlayController = controller;
  }
}
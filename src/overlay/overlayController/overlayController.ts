import PlayerController from "../../player/playerController/PlayerController";
import OverlayControllerButton from "./overlayControllerButton";

export default class OverlayController {

  buttons: {
    left: OverlayControllerButton,
    right: OverlayControllerButton,
    jump: OverlayControllerButton
  };

  constructor(private scene: Phaser.Scene, private controller: PlayerController | null) {
    this.createButtons();
    this.buttons = this.createButtons();
  }

  createButtons() {
    const left = new OverlayControllerButton(this.scene, 50, this.scene.cameras.main.height - 50, 'left_button', this.onLeft);
    const right = new OverlayControllerButton(this.scene, 100, this.scene.cameras.main.height - 50, 'right_button', this.onRight);
    const jump = new OverlayControllerButton(this.scene, this.scene.cameras.main.width - 50, this.scene.cameras.main.height - 50, 'jump_button', this.onJump);
    return {
      left: left,
      right: right,
      jump: jump
    }
  }

  onLeft = () => {
    console.log('go left');
  }

  onRight = () => {
    console.log('go right');
  }

  onJump = () => {
    console.log('jump');
  }
}
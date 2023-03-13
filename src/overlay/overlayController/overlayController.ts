import { DESTRUCTION } from "dns";
import PlayerController from "../../player/playerController/PlayerController";
import OverlayControllerButton from "./overlayControllerButton";

const MAX_ALPHA = 0.25;

export default class OverlayController {

  buttons: {
    left: OverlayControllerButton,
    right: OverlayControllerButton,
    jump: OverlayControllerButton
  };

  isActive: boolean;

  state: {
    left: boolean,
    right: boolean,
    jump: boolean
  }

  constructor(private scene: Phaser.Scene, private controller: PlayerController | null) {
    this.buttons = this.createButtons();
    this.state = {
      left: false,
      right: false,
      jump: false
    }
    this.isActive = false;
  }

  createButtons() {
    const left = new OverlayControllerButton(this.scene, 32, this.scene.cameras.main.height - 32, 'left_button', this.onLeft);
    const right = new OverlayControllerButton(this.scene, 96, this.scene.cameras.main.height - 32, 'right_button', this.onRight);
    const jump = new OverlayControllerButton(this.scene, this.scene.cameras.main.width - 32, this.scene.cameras.main.height - 32, 'jump_button', this.onJump);
    return {
      left: left,
      right: right,
      jump: jump
    }
  }

  toggle = () => {
    if (this.isActive === true) {
      this.isActive = false;
      this.buttons.left.setAlpha(0);
      this.buttons.right.setAlpha(0);
      this.buttons.jump.setAlpha(0);
    }
    else {
      this.isActive = true;
      this.buttons.left.setAlpha(MAX_ALPHA);
      this.buttons.right.setAlpha(MAX_ALPHA);
      this.buttons.jump.setAlpha(MAX_ALPHA);
    }
  }

  onLeft = (isPushed: boolean) => {
    if (this.state.left === isPushed) return;
    this.state.left = isPushed;
    this.updateController();
  }

  onRight = (isPushed: boolean) => {
    if (this.state.right === isPushed) return;
    this.state.right = isPushed;
    this.updateController();
  }

  onJump = (isPushed: boolean) => {
    if (this.state.jump === isPushed) return;
    this.state.jump = isPushed;
    this.updateController();
  }

  updateController() {
    this.controller?.setOverlayController(this.state);
  }
}
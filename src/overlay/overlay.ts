import PlayerController from "../player/playerController/PlayerController";
import MaximizeButton from "./maximizeButton";
import OverlayController from "./overlayController/overlayController";
import ShowControllerButton from "./showControllerButton";

export default class Overlay {

  scene: Phaser.Scene;
  controller: PlayerController | null;
  maximizeButton: MaximizeButton;
  showControllerButton: ShowControllerButton;

  isControllerShown: boolean = false;

  overlayController: OverlayController;

  constructor(scene: Phaser.Scene, controller: PlayerController | null) {
    this.scene = scene;
    this.controller = controller;
    this.maximizeButton = this.createMaximizeButton();
    this.maximizeButton.setInteractive();
    this.showControllerButton = this.createShowControllerButton();
    this.showControllerButton.setInteractive();
    this.overlayController = this.createOverlayController();
  }

  createMaximizeButton(): MaximizeButton {
    const x = this.scene.cameras.main.width - 25;
    return new MaximizeButton(this.scene, x, 25, 'maximize_button', this.toggleScreenMax);
  }

  createShowControllerButton(): ShowControllerButton {
    return new ShowControllerButton(this.scene, 25, 25, 'show_controller_button', this.toggleControllerShown);
  }

  createOverlayController(): OverlayController {
    return new OverlayController(this.scene, this.controller);
  }

  toggleScreenMax = () => {
    this.scene.scale.isFullscreen ? this.scene.scale.stopFullscreen() : this.scene.scale.startFullscreen();
  }

  toggleControllerShown = () => {
    this.isControllerShown = !this.isControllerShown;
    console.log('show: ', this.isControllerShown);
  }

}
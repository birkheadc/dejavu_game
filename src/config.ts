import Phaser from "phaser";
import scenes from "./scenes";

const config: Phaser.Types.Core.GameConfig = {
  title: 'Dejavu',
  type: Phaser.AUTO,
  parent: 'game',
  backgroundColor: '#666666',
  scale: {
    width: 480,
    height: 320,
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH
  },
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 1200},
      debug: false,
      fixedStep: true,
      fps: 120
    },
  },
  scene: [ scenes.MainMenuScene, scenes.GameScene ]
}

export default config;  
import Phaser from "phaser";
import scenes from "./scenes";

const config: Phaser.Types.Core.GameConfig = {
  title: 'Dejavu',
  type: Phaser.AUTO,
  parent: 'game',
  backgroundColor: '#666666',
  scale: {
    width: 800,
    height: 600,
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH
  },
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 3000 },
      debug: false
    },
  },
  scene: [ scenes.MainMenuScene, scenes.GameScene ]
}

export default config;
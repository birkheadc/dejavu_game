import crumblePlatformSprite from './crumble_platform/crumble_platform.png';
import mobData from './mobs.json';

export interface IMobData {
  id: string,
  sprite: string,
  animations: {
    name: string,
    frames: number[],
    frameRate: number,
    repeat: number
  }[]
}

function preloadMobs(scene: Phaser.Scene) {
  scene.load.spritesheet('crumblePlatformSprite', crumblePlatformSprite, {frameWidth: 16, frameHeight: 16});
}

function getMob(id: string): IMobData | undefined {
  return mobData.mobs.find(m => m.id === id);
}

const mobs = {
  preloadMobs,
  getMob
}

export default mobs;
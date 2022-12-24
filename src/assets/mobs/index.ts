import crumblePlatformSprite from './crumble_platform/crumble_platform.png';
import spikesSprite from './spikes/spikes.png';
import lavaSprite from './lava/lava.png';
import goalSprite from './goal/goal.png';
import corpseSprite from './corpse/corpse.png';
import mobData from './mobs.json';

export interface IMobData {
  id: string,
  sprite: string,
  size: {
    x: number,
    y: number
  },
  offset: {
    x: number,
    y: number
  },
  isDangerous: boolean,
  isCollide: boolean,
  isRemoveAfterTransition: boolean,
  animations: {
    name: string,
    frames: number[],
    frameRate: number,
    repeat: number
  }[]
}

function preloadMobs(scene: Phaser.Scene) {
  scene.load.spritesheet('crumblePlatformSprite', crumblePlatformSprite, {frameWidth: 16, frameHeight: 16});
  scene.load.spritesheet('spikesSprite', spikesSprite, {frameWidth: 16, frameHeight: 16});
  scene.load.spritesheet('lavaSprite', lavaSprite, {frameWidth: 16, frameHeight: 16 });
  scene.load.spritesheet('goalSprite', goalSprite, {frameWidth: 16, frameHeight: 48 });
  scene.load.spritesheet('corpseSprite', corpseSprite, {frameWidth: 16, frameHeight: 16});
}

function getMob(id: string): IMobData | undefined {
  return mobData.mobs.find(m => m.id === id);
}

const mobs = {
  preloadMobs,
  getMob
}

export default mobs;
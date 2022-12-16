import characterA from './player_a.png';
import characterB from './player_b.png';

const getCharacter = (id: string) => {
  if (id ==='b') return characterB;
  return characterA;
}

function preloadCharacters(scene: Phaser.Scene) {
  scene.load.spritesheet('playerSprite_a', characterA, { frameWidth: 24, frameHeight: 32});
  scene.load.spritesheet('playerSprite_b', characterB, { frameWidth: 24, frameHeight: 32});
}

const characters = {
  getCharacter,
  preloadCharacters
}

export default characters;
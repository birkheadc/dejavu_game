import Phaser from "phaser";
import PlayerCharacter from "../playerCharacter/playerCharacter";
import map from '../assets/map.json';
import playerSpriteSheet from '../assets/character.png';
import terrainSpriteSheet from '../assets/terrain.png';

export default class GameScene extends Phaser.Scene {

  player: PlayerCharacter | null = null;
  map: Phaser.Tilemaps.Tilemap | null = null;
  
  constructor() {
    super('GameScene');
  }

  preload() {
    console.log('Preloading Game Scene');
    this.load.tilemapTiledJSON('map', '../assets/map.json');
    this.load.spritesheet('playerSprite', playerSpriteSheet, { frameWidth: 64, frameHeight: 64});
    this.load.spritesheet('terrainSprite', terrainSpriteSheet, { frameWidth: 64, frameHeight: 64});
  }

  create() {
    console.log('Creating Game Scene');
    this.map = this.make.tilemap({key: 'map'});
    const groundTiles = this.map.addTilesetImage('tileset', 'terrainSprite');
    const groundLayer = this.map.createLayer('Tile Layer 1', groundTiles, 0, -300);
    groundLayer.setCollisionByExclusion([-1]);
    this.player = new PlayerCharacter(this, 100, 100);
    this.physics.add.collider(this.player, groundLayer);
  }

  update() {
    console.log('update');
  }
}
import Phaser from "phaser";
import PlayerCharacter from "../playerCharacter/playerCharacter";
import map from '../assets/maps/map_1A.json';
import playerSpriteSheet from '../assets/character/Fumiko.png';
import terrainSpriteSheet from '../assets/maps/mininicular.png';
import PlayerController from "../playerController/PlayerController";

export default class GameScene extends Phaser.Scene {

  controller: PlayerController | null = null;
  player: PlayerCharacter | null = null;
  map: Phaser.Tilemaps.Tilemap | null = null;
  
  constructor() {
    super('GameScene');
  }

  preload() {
    console.log('Preloading Game Scene');
    this.load.tilemapTiledJSON('map', map);
    this.load.spritesheet('playerSprite', playerSpriteSheet, { frameWidth: 24, frameHeight: 32});
    this.load.spritesheet('terrainSprite', terrainSpriteSheet, { frameWidth: 16, frameHeight: 16});
  }

  create() {
    console.log('Creating Game Scene');
    this.map = this.makeTilemap('map');
    this.player = this.spawnPlayer();
    this.physics.add.collider(this.player, this.map.getLayer('Ground').tilemapLayer);
  }

  spawnPlayer(): PlayerCharacter {
    const player = new PlayerCharacter(this, 100, 100);
    this.controller = new PlayerController(this, player);
    return player;
  }

  makeTilemap(key: string): Phaser.Tilemaps.Tilemap {
    const map = this.make.tilemap({key: key});
    const groundTiles = map.addTilesetImage('mininicular', 'terrainSprite');
    map.createLayer('Background', groundTiles, 0, 0);
    map.createLayer('MidGround', groundTiles, 0, 0);
    const groundLayer = map.createLayer('Ground', groundTiles, 0, 0);
    groundLayer.setCollisionByExclusion([-1]);
    
    return map;
  }

  update(time: any, delta: any) {
    this.player?.update(time, delta);
    this.controller?.update(time, delta);
  }
}
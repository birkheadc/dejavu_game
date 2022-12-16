import Phaser from "phaser";
import PlayerCharacter from "../playerCharacter/playerCharacter";
import maps from "../assets/maps";
import characters from '../assets/character';
import terrainSpriteSheet from '../assets/maps/mininicular.png';
import PlayerController from "../playerController/PlayerController";

export default class GameScene extends Phaser.Scene {

  controller: PlayerController | null = null;
  player: PlayerCharacter | null = null;
  map: Phaser.Tilemaps.Tilemap | null = null;
  endZone: Phaser.GameObjects.Zone | null = null;
  character: string = 'error';
  stage: string = 'error';
  
  constructor() {
    super('GameScene');
  }

  init(data: { character: string, stage: string }) {
    this.character = data.character;
    this.stage = data.stage;
  }

  preload() {
    this.load.tilemapTiledJSON('map_' + this.stage, maps.getMap(this.stage));
    this.load.spritesheet('playerSprite_' + this.character, characters(this.character), { frameWidth: 24, frameHeight: 32 });
    this.load.spritesheet('terrainSprite', terrainSpriteSheet, { frameWidth: 16, frameHeight: 16}); 
  }

  create() {
    this.map = this.makeTilemap('map_' + this.stage);
    this.player = this.spawnPlayer();
    this.physics.add.collider(this.player, this.map.getLayer('ground').tilemapLayer);
    this.endZone = this.spawnEndZone();
  }

  spawnPlayer(): PlayerCharacter {
    const position = maps.getStartingLocation(this.stage);
    const player = new PlayerCharacter(this, position.x, position.y, 'playerSprite_' + this.character);
    this.controller = new PlayerController(this, player);
    return player;
  }

  spawnEndZone(): Phaser.GameObjects.Zone {
    const position = maps.getEndLocation(this.stage);
    const endZone = new Phaser.GameObjects.Zone(
      this,
      position.x,
      position.y,
      8,
      8
    );
    return endZone;
  }

  makeTilemap(key: string): Phaser.Tilemaps.Tilemap {
    const map = this.make.tilemap({key: 'map_' + this.stage});
    const groundTiles = map.addTilesetImage('mininicular', 'terrainSprite');
    map.createLayer('back', groundTiles, 0, 0);
    map.createLayer('mid', groundTiles, 0, 0);
    const groundLayer = map.createLayer('ground', groundTiles, 0, 0);
    const decorationLayerA = map.createLayer('ground_decoration_a', groundTiles, 0, 0);
    decorationLayerA.setDepth(1);
    const decorationLayerB = map.createLayer('ground_decoration_b', groundTiles, 0, 0);
    decorationLayerB.setDepth(1);
    
    groundLayer.setCollisionByExclusion([-1]);
    
    return map;
  }

  handleGoalCheck() {
    if (this.player == null || this.endZone == null) return;
    if (Phaser.Geom.Rectangle.Overlaps(this.player?.getBounds(), this.endZone?.getBounds())) {
      this.endStage();
    }
  }

  endStage() {
    this.scene.stop();
    // this.events.off();
    const next = maps.getNextMapId(this.stage);
    this.scene.start('GameScene', {character: maps.getCharId(next), stage: next});
  }

  update(time: any, delta: any) {
    this.player?.update(time, delta);
    this.controller?.update(time, delta);
    this.handleGoalCheck();
  }
}
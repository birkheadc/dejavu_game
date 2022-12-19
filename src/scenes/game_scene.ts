import Phaser from "phaser";
import PlayerCharacter from "../player/playerCharacter/playerCharacter";
import PlayerController from "../player/playerController/PlayerController";
import stages, { IStageData } from "../assets/stages";
import mobs, { IMobData } from "../assets/mobs";
import Mob from "../Mob/mob";

export default class GameScene extends Phaser.Scene {

  controller: PlayerController | null = null;
  player: PlayerCharacter | null = null;
  map: Phaser.Tilemaps.Tilemap | null = null;
  goal: Phaser.GameObjects.Zone | null = null;
  stage: IStageData = stages.getDefaultStageData();
  mobs: Mob[] = [];
  
  constructor() {
    super('GameScene');
  }

  init(data: {stage: IStageData }) {
    this.stage = data.stage;
    console.log('init stage: ', this.stage);
  }

  preload() {
    
  }

  create() {
    this.map = this.makeTilemap();
    this.player = this.spawnPlayer();
    this.physics.add.collider(this.player, this.map.getLayer('ground').tilemapLayer);
    this.goal = this.spawnGoal();
    this.mobs = this.spawnMobs();
    this.controller?.setUsable(true);
    this.player?.setAlpha(1);
  }

  spawnPlayer(): PlayerCharacter {
    const player = new PlayerCharacter(
      this,
      (this.stage.startLocation.x * 16) + 8,
      (this.stage.startLocation.y * 16) + 8,
      this.stage.character
    );
    this.controller = new PlayerController(this, player);
    return player;
  }

  spawnGoal(): Phaser.GameObjects.Zone {
    const goal = new Phaser.GameObjects.Zone(
      this,
      (this.stage.goalLocation.x * 16) + 8,
      (this.stage.goalLocation.y * 16) + 8,
      8,
      8
    );
    return goal;
  }

  makeTilemap(): Phaser.Tilemaps.Tilemap {
    const map = this.make.tilemap({key: this.stage.id});
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

  spawnMobs() {
    // Look how good at naming variables I am!
    const _mobs: Mob[] = [];
    this.stage.mobs.forEach(mob => {
      const mobData = mobs.getMob(mob.id);
      if (mobData != null) {
        const _mob = new Mob(this, (mob.position.x * 16) + 8, (mob.position.y * 16) + 8, mobData, mob.active);
        if (this.player != null) {
          if (_mob.isActive)
          this.physics.add.collider(this.player, _mob, () => {
            if (_mob.isActive && _mob.mobData.isDangerous === true) {
              this.die()
            }
          });
        }
        _mobs.push(_mob);
      }
    });
    return _mobs;
  }

  // handleDiedCheck() {
  //   this.mobs.forEach(mob => {
  //     if (mob.mobData.isDangerous === true) {
  //       if (this.player == null || this.goal == null) return;
  //       if (mob.isActive && Phaser.Geom.Rectangle.Overlaps(this.player?.getBounds(), mob.body)) {
  //         this.die();
  //       }
  //     }
  //   });
  // }

  die() {
    console.log('you died!');
  }

  handleGoalCheck() {
    if (this.player == null || this.goal == null) return;
    if (Phaser.Geom.Rectangle.Overlaps(this.player?.getBounds(), this.goal?.getBounds())) {
      this.endStage();
    }
  }

  endStage() {
    this.controller?.setUsable(false);
    this.player?.setAlpha(0);
    for (let i = 0; i < this.mobs.length; i++) {
      const mob = this.mobs[i];
      if (i === 0) {
        mob.on('animationcomplete', () => {this.goToNextStage()});
      }
      mob.play('transition');
    }
    this.mobs = [];    
  }

  goToNextStage() {
    const next = stages.getNextStage(this.stage);
    this.scene.restart({stage: stages.getNextStage(this.stage)});
  }

  update(time: any, delta: any) {
    this.player?.update(time, delta);
    this.controller?.update(time, delta);
    // this.handleDiedCheck();
    this.handleGoalCheck();
  }
}
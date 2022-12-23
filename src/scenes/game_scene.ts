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

  isComplete: boolean = false;
  
  constructor() {
    super('GameScene');
  }

  init(data: {stage: IStageData }) {
    this.stage = data.stage;
    this.isComplete = false;
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
    const decorationLayerC = map.createLayer('ground_decoration_c', groundTiles, 0, 0);
    decorationLayerC.setDepth(1);
    
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
          if (_mob.isActive && _mob.mobData.isCollide)
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

  die() {
    this.cameras.main.flash(500, 255, 0, 0, true);
    this.respawnPlayer();
  }

  respawnPlayer() {
    this.player?.setRandomPosition((this.stage.startLocation.x * 16) + 8, (this.stage.startLocation.y * 16) + 8, 0, 0);
  }

  handleGoalCheck() {
    if (this.player == null || this.goal == null || this.isComplete === true) return;
    if (Phaser.Geom.Rectangle.Overlaps(this.player?.getBounds(), this.goal?.getBounds())) {
      this.endStage();
    }
  }

  endStage() {
    this.isComplete = true;
    this.controller?.setUsable(false);

    if (this.stage.playerTransitionTime === 'before') {
      this.playerExit(() => {
        this.transitionMobs(() => {
          this.goToNextStage();
        });
      });
    }
    else {
      this.transitionMobs(() => {
        this.playerExit(() => {
          this.goToNextStage();
        });
      })
    }
  }

  playerExit(callback: Function) {
    // Todo: Refactor this.
    if (this.stage.playerTransitionMethod === 'disappear') {
      this.player?.setAlpha(0);
      callback();
    }
    else if (this.stage.playerTransitionMethod === 'right') {
      this.player?.moveX(1);
      this.player?.setOffscreenCallback(callback);
    }
    else if (this.stage.playerTransitionMethod === 'fall') {
      console.log('test');
      this.player?.setOffscreenCallback(callback);
    }
    else {
      callback();
    }
  }

  transitionMobs(callback: Function) {
    if (this.stage.hasTransition === true) {
      let finished: number = 0;
      let total: number = 0;
      for (let i = 0; i < this.mobs.length; i++) {
        const mob = this.mobs[i];
        if (mob.anims.exists('transition')) {
          total++;
          mob.on('animationcomplete', () => {
            if (mob.mobData.isRemoveAfterTransition) {
              mob.destroy();
            }
            finished++;
            console.log('Finished: ', finished, " Total: ", total);
            if (finished >= total) {
              callback();
            }
          });
          mob.play('transition');
        }
      }
    }
    else {
      callback();
    }
  }

  goToNextStage() {
    this.scene.restart({stage: stages.getNextStage(this.stage)});
  }

  update(time: any, delta: any) {
    this.player?.update(time, delta);
    this.controller?.update(time, delta);
    this.handleGoalCheck();
  }
}
import Phaser from "phaser";
import PlayerCharacter from "../player/playerCharacter/playerCharacter";
import PlayerController from "../player/playerController/PlayerController";
import stages, { IStageData } from "../assets/stages";
import mobs, { IMobData } from "../assets/mobs";
import Mob from "../mob/mob";

export default class GameScene extends Phaser.Scene {

  controller: PlayerController | null = null;
  player: PlayerCharacter | null = null;
  map: Phaser.Tilemaps.Tilemap | null = null;
  goal: Phaser.GameObjects.Zone | null = null;
  stage: IStageData = stages.getDefaultStageData();
  mobs: Mob[] = [];

  isComplete: boolean = false;

  lingerTimer: number = 0;
  isLingering: boolean = false;
  
  constructor() {
    super('GameScene');
  }

  init(data: {stage: IStageData }) {
    this.stage = data.stage;
    this.isComplete = false;
    this.isLingering = false;
    this.lingerTimer = 0;
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
      this.stage.character,
      this.stage.isPlayerSlow
    );
    this.controller = new PlayerController(this, player);
    return player;
  }

  spawnGoal(): Phaser.GameObjects.Zone {
    const goal = new Phaser.GameObjects.Zone(
      this,
      (this.stage.goalLocation.x * 16) + ((this.stage.goalSize.width * 16) / 2),
      (this.stage.goalLocation.y * 16) + ((this.stage.goalSize.height * 16) / 2),
      this.stage.goalSize.width * 16,
      this.stage.goalSize.height * 16
    );
    // this.add.rectangle(
    //   (this.stage.goalLocation.x * 16) + ((this.stage.goalSize.width * 16) / 2),
    //   (this.stage.goalLocation.y * 16) + ((this.stage.goalSize.height * 16) / 2),
    //   this.stage.goalSize.width * 16,
    //   this.stage.goalSize.height * 16,
    //   0xff0000
    // );
    return goal;
  }

  makeTilemap(): Phaser.Tilemaps.Tilemap {
    console.log('making tile map for: ', this.stage);
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
    if (this.stage.onDeath === 'respawn') {
      this.cameras.main.flash(500, 155, 0, 0, false);
      this.respawnPlayer();
    }
    else {
      this.scene.start('EndScene', { ending: 'bad' });
    }
  }

  respawnPlayer() {
    this.player?.cancelJump();
    this.player?.setRandomPosition((this.stage.startLocation.x * 16) + 8, (this.stage.startLocation.y * 16) + 8, 0, 0);
  }

  handleGoalCheck() {
    if (this.player == null || this.goal == null || this.isComplete === true) return;
    if (Phaser.Geom.Rectangle.Overlaps(this.player?.getBounds(), this.goal?.getBounds())) {
      this.endStage();
    }
  }

  endStage() {
    if (this.isComplete === true) return; 
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
      this.player?.setOffscreenCallback(callback);
    }
    else if (this.stage.playerTransitionMethod === 'mourn') {
      this.player?.mourn(() => this.controller?.setUsable(true));
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
    if (this.stage.next === 'end') {
      this.scene.start('EndScene', { ending: 'good' });
    }
    else if (this.stage.lingerTime === 0) {
      this.scene.restart({stage: stages.getNextStage(this.stage)});
    }
    else {
      this.player?.setAlpha(0);
      this.lingerTimer = 0;
      this.isLingering = true;
    }
  }

  handleLinger(delta: any) {
    if (this.isLingering === false) return;
    this.lingerTimer += delta;
    if (this.lingerTimer >= this.stage.lingerTime) {
      this.scene.restart({stage: stages.getNextStage(this.stage)});
    }
  }

  update(time: any, delta: any) {
    this.player?.update(time, delta);
    this.controller?.update(time, delta);
    this.handleGoalCheck();
    this.handleLinger(delta);
  }
}
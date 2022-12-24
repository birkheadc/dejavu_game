import PlayerCharacter from "../playerCharacter/playerCharacter";

export default class PlayerAnimator {

  player: PlayerCharacter;
  state: string;
  sprite: string;
  isSlow: boolean;

  constructor(player: PlayerCharacter, sprite: string, isSlow: boolean) {
    this.player = player;
    this.sprite = sprite;
    this.isSlow = isSlow;
    this.defineAnimations();
    this.state = 'null';
  }

  animateIdle() {
    if (this.state !== 'idle') {
      this.state = 'idle';
      this.player.play('idle');
    }
  }

  animateWalk() {
    if (this.state !== 'walk') {
      this.state = 'walk';
      this.player.play('walk');
    }
  }

  animateJump() {
    if (this.state !== 'jump') {
      this.state = 'jump';
      this.player.play('jump');
    }
  }

  defineAnimations() {
    this.player.anims.create({
      key: 'walk',
      frames:this.player.anims.generateFrameNumbers(this.sprite, { frames: [39, 40 ]}),
      frameRate: this.isSlow ? 5 : 8,
      repeat: -1
    });
    this.player.anims.create({
      key: 'idle',
      frames:this.player.anims.generateFrameNumbers(this.sprite, { frames: [36, 38 ]}),
      frameRate: this.isSlow ? 1 : 2,
      repeat: -1
    });
    this.player.anims.create({
      key: 'jump',  
      frames:this.player.anims.generateFrameNumbers(this.sprite, { frames: [45 ]}),
      frameRate: 8,
      repeat: 1
    });
    this.player.anims.create({
      key: 'fall',  
      frames:this.player.anims.generateFrameNumbers(this.sprite, { frames: [47 ]}),
      frameRate: 8,
      repeat: -1
    });
    this.player.anims.create({
      key: 'mourn',
      frames: this.player.anims.generateFrameNumbers(this.sprite, { frames: [ 36, 36, 16, 16, 16, 51, 51, 51, 16, 16, 16, 36, 36, 108, 108 ]}),
      frameRate:1,
      repeat: 0
    })
  }

  changeState(newState: string) {
    if (this.state !== newState) {
      this.state = newState;
      this.changeAnimation();
    }
  }

  changeAnimation() {
    this.player.play(this.state);
  }
}
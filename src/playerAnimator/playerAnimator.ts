import PlayerCharacter from "../playerCharacter/playerCharacter";

export default class PlayerAnimator {

  player: PlayerCharacter;
  state: string;
  sprite: string;

  constructor(player: PlayerCharacter, sprite: string) {
    this.player = player;
    this.sprite = sprite;
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
      frameRate: 8,
      repeat: -1
    });
    this.player.anims.create({
      key: 'idle',
      frames:this.player.anims.generateFrameNumbers(this.sprite, { frames: [36, 38 ]}),
      frameRate: 1,
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
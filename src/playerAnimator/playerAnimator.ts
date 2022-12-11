import PlayerCharacter from "../playerCharacter/playerCharacter";

export default class PlayerAnimator {

  player: PlayerCharacter;
  state: string;

  constructor(player: PlayerCharacter) {
    this.player = player;
    this.defineAnimations();
    this.state = 'null';
  }

  defineAnimations() {
    this.player.anims.create({
      key: 'walk',
      frames:this.player.anims.generateFrameNumbers('playerSprite', { frames: [0, 1, 2, 3, 4 ]}),
      frameRate: 8,
      repeat: -1
    });
    this.player.anims.create({
      key: 'idle',
      frames:this.player.anims.generateFrameNumbers('playerSprite', { frames: [36, 38 ]}),
      frameRate: 1,
      repeat: -1
    });
    this.player.anims.create({
      key: 'jump',  
      frames:this.player.anims.generateFrameNumbers('playerSprite', { frames: [20, 21, 22, 23, 24 ]}),
      frameRate: 8
    });
    this.player.anims.create({
      key: 'jump',  
      frames:this.player.anims.generateFrameNumbers('playerSprite', { frames: [20, 21, 22, 23, 24 ]}),
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
    console.log('State: ', this.state);
    this.player.play(this.state);
  }
}
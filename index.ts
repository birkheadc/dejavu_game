import Game from './src/game'
import './index.css';

function loadGame() {
  const game = new Game();
  game.start();
}

loadGame();
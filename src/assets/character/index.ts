import characterA from './player_a.png';
import characterB from './player_b.png';

const character = (id: string) => {
  if (id ==='b') return characterB;
  return characterA;
}

export default character;
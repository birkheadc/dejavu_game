import map1A from './map_1A.json';
import map1B from './map_1B.json';

const mapOfMaps = new Map<string, object>(
  [
    ["map_1A", map1A],
    ["map_1B", map1B]
  ]
);

const getMap = (id: string) => {
  return mapOfMaps.get(id);
}

const maps = {
  getMap
}

export default maps;
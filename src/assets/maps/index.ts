import map1A from './map_1A.json';
import map2A from './map_2A.json';
import map3A from './map_3A.json';

const mapOfMaps = new Map<string, object>(
  [
    ["map_1A", map1A],
    ["map_2A", map2A],
    ["map_3A", map3A]
  ]
);

const getMap = (mapName: string) => {
  return mapOfMaps.get(mapName);
}

const maps = {
  getMap
}

export default maps;
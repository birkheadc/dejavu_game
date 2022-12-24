import map1A from './map_1A.json';
import map2A from './map_2A.json';
import map3A from './map_3A.json';
import map4A from './map_4A.json';
import map5A from './map_5A.json';
import map_cutscene from './map_cutscene.json';

const mapOfMaps = new Map<string, object>(
  [
    ["map_1A", map1A],
    ["map_2A", map2A],
    ["map_3A", map3A],
    ["map_4A", map4A],
    ["map_5A", map5A],
    ["map_cutscene", map_cutscene]
  ]
);

const getMap = (mapName: string) => {
  return mapOfMaps.get(mapName);
}

const maps = {
  getMap
}

export default maps;
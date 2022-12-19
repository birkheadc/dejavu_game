import map1A from './map_1A.json';

const mapOfMaps = new Map<string, object>(
  [
    ["map_1A", map1A]
  ]
);

const getMap = (mapName: string) => {
  return mapOfMaps.get(mapName);
}

const maps = {
  getMap
}

export default maps;
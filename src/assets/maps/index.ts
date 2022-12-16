import map1A from './map_1A.json';
import map1B from './map_1B.json';
import startAndEndPositions from './startAndEndPositions.json';

const mapOfMaps = new Map<string, object>(
  [
    ["1A", map1A],
    ["1B", map1B]
  ]
);

const mapList = [
  "1A", "1B"
];

const getMap = (id: string) => {
  return mapOfMaps.get(id);
}

const getStartingLocation = (id: string): { x: number, y: number} => {
  const position = startAndEndPositions.maps.find(map => map.id === id)?.start;
  if (position == null) {
    return { x: 0, y: 0 };
  }
  return { x: position.x, y: position.y };
}

const getEndLocation = (id: string) => {
  const position = startAndEndPositions.maps.find(map => map.id === id)?.end;
  if (position == null) {
    return { x: 0, y: 0 };
  }
  return { x: position.x, y: position.y };
}

const getNextMapId = (id: string): string => {
  return mapList[mapList.findIndex(id => id === id) + 1];
}

const maps = {
  getMap,
  getStartingLocation,
  getEndLocation,
  getNextMapId
}

export default maps;
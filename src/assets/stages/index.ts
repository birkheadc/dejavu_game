import stageData from './stages.json';
import maps from '../maps';
import { IMobData } from '../mobs';

export interface IStageData {
  id: string,
  mapName: string,
  next: string,
  character: string,
  hasTransition: boolean,
  playerTransitionTime: string,
  playerTransitionMethod: string,
  startLocation: {
    x: number,
    y: number
  },
  goalLocation: {
    x: number,
    y: number
  },
  mobs: {
    "id": string,
    "position": {
      "x": number,
      "y": number
    },
    "active": boolean
  }[]
}

function preloadStages(scene: Phaser.Scene) {
  stageData.stages.forEach(stage => {
    scene.load.tilemapTiledJSON(stage.id, maps.getMap(stage.mapName));
  });
}

function getStageData(index: number): IStageData {
  return stageData.stages[index];
}

function getNextStage(stage: IStageData) {
  return stageData.stages.find(s => s.id === stage.next);
}

function getDefaultStageData(): IStageData {
  return {
    id: "",
    mapName: "",
    next: "",
    character: "",
    hasTransition: false,
    playerTransitionMethod: "disappear",
    playerTransitionTime: "before",
    startLocation: {
      x: 0,
      y: 0
    },
    goalLocation: {
      x: 0,
      y: 0
    },
    mobs: []
  }
}

const stages = {
  preloadStages,
  getStageData,
  getNextStage,
  getDefaultStageData
};

export default stages;
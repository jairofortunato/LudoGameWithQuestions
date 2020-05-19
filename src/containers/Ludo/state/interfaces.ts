import { BaseColors, WalkwayPosition } from 'state/interfaces';

export interface ICoin<T> {
  readonly color: T;
}

export interface IBase<T> {
  coins: ICoin<T>[];
  color: T;
  ID: string;
}

export interface IWalkway {
  position: WalkwayPosition;
  ID: string;
  baseID: IBase<BaseColors>['ID'];
}

export enum BoardEntities {
  BASE = 'BASE',
  WALKWAY = 'WALKWAY',
  HOME = 'HOME',
}

export enum CellType {
  SPAWN = 'SPAWN',
  STAR = 'STAR',
  HOMEPATH = 'HOMEPATH',
  NORMAL = 'NORMAL',
}

export interface ICell {
  cellID: string;
  column: number;
  position: WalkwayPosition;
  row: number;
  type: CellType;
  baseID: IBase<BaseColors>['ID'];
}

export interface IRelationship {
  ID: string;
  type: BoardEntities;
  baseIDs?: IBase<BaseColors>['ID'][];
}

export interface IState {
  bases: Map<IBase<BaseColors>['ID'], IBase<BaseColors>>;
  walkways: Map<IWalkway['ID'], IWalkway>;
  relationships: IServerGameData['relationships'];
  cells: IServerGameData['cells'];
}

export interface IServerGameData {
  bases: IBase<BaseColors>[];
  walkways: IWalkway[];
  relationships: IRelationship[];
  cells: {
    [walkwayPosition: string]: {
      [cellID: string]: ICell;
    };
  }
}

import { WINNING_MOVES } from 'globalConstants';

import { Actions, ActionTypes } from './actions';
import { BaseID, IState } from './interfaces';

const initialState: IState = {
  bases: {},
  cells: {},
  coins: {},
  currentTurn: BaseID.BASE_3,
  links: {},
  relationships: [],
  walkways: {},
  playerOrder: [BaseID.BASE_1, BaseID.BASE_2, BaseID.BASE_4, BaseID.BASE_3], // Example order
};

export const reducer = (state: IState = initialState, action: Actions): IState => {
  switch (action.type) {
    case ActionTypes.GET_INITIAL_GAME_DATA_SUCCESS: {
      const {
        bases,
        cells,
        coins,
        relationships,
        walkways,
        links,
      } = action.data!.gameData;
      return {
        ...state,
        bases,
        cells,
        coins,
        links,
        relationships,
        walkways,
      };
    }
    case ActionTypes.PLAYER_DECIDED_TO_PLAY: {
      // TODO: Implement any logic that should occur when a player decides to play
      // For now, we will just return the current state
      return state;
    }

    case ActionTypes.PLAYER_DECIDED_TO_PASS: {
      // Find the index of the current player
      const currentIndex = state.playerOrder.indexOf(state.currentTurn);
      // Calculate the index of the next player
      const nextIndex = (currentIndex + 1) % state.playerOrder.length;
      // Get the BaseID of the next player
      const nextTurn = state.playerOrder[nextIndex];
    
      return {
        ...state,
        currentTurn: nextTurn,
      };
    }

    case ActionTypes.SPAWN_COIN_SUCCESS: {
      const { cellID, coinID, position } = action.data!;
      return {
        ...state,
        cells: {
          ...state.cells,
          [position]: {
            ...state.cells[position],
            [cellID]: {
              ...state.cells[position][cellID],
              coinIDs: [
                ...state.cells[position][cellID].coinIDs,
                coinID,
              ],
            },
          },
        },
        coins: {
          ...state.coins,
          [coinID]: {
            ...state.coins[coinID],
            cellID,
            isSpawned: true,
            position,
          },
        },
      };
    }
    case ActionTypes.LIFT_COIN: {
      const { cellID, coinID, walkwayPosition } = action.data!;
      const coinIDsInCell = [...state.cells[walkwayPosition][cellID].coinIDs];
      const index = coinIDsInCell.findIndex((coinIDInCell) => coinIDInCell === coinID);
      coinIDsInCell.splice(index, 1);
      return {
        ...state,
        cells: {
          ...state.cells,
          [walkwayPosition]: {
            ...state.cells[walkwayPosition],
            [cellID]: {
              ...state.cells[walkwayPosition][cellID],
              coinIDs: coinIDsInCell,
            },
          },
        },
      };
    }
    case ActionTypes.PLACE_COIN: {
      const { cellID, coinID, walkwayPosition } = action.data!;
      return {
        ...state,
        cells: {
          ...state.cells,
          [walkwayPosition]: {
            ...state.cells[walkwayPosition],
            [cellID]: {
              ...state.cells[walkwayPosition][cellID],
              coinIDs: [
                ...state.cells[walkwayPosition][cellID].coinIDs,
                coinID,
              ],
            },
          },
        },
        coins: {
          ...state.coins,
          [coinID]: {
            ...state.coins[coinID],
            cellID,
            position: walkwayPosition,
          },
        },
      };
    }
    case ActionTypes.PASS_TURN_TO: {
      const { baseID } = action.data!;
      return {
        ...state,
        currentTurn: baseID,
      };
    }
    case ActionTypes.MARK_CURRENT_BASE: {
      return {
        ...state,
        bases: {
          ...state.bases,
          [state.currentTurn]: {
            ...state.bases[state.currentTurn],
            spawnable: action.data!.spawnable,
          },
        },
      };
    }
    case ActionTypes.DISQUALIFY_COIN: {
      const { coinID, walkwayPosition, cellID } = action.data!;

      const coinIDsInCell = [...state.cells[walkwayPosition][cellID].coinIDs];
      const coinIndexToDelete = coinIDsInCell.findIndex((coinIDInCell) => coinIDInCell === coinID);
      coinIDsInCell.splice(coinIndexToDelete, 1);
      return {
        ...state,
        cells: {
          ...state.cells,
          [walkwayPosition]: {
            ...state.cells[walkwayPosition],
            [cellID]: {
              ...state.cells[walkwayPosition][cellID],
              coinIDs: coinIDsInCell,
            },
          },
        },
        coins: {
          ...state.coins,
          [coinID]: {
            ...state.coins[coinID],
            isSpawned: false,
            steps: 0,
          },
        },
      };
    }
    case ActionTypes.HOME_COIN: {
      const { coinID } = action.data!;
      return {
        ...state,
        coins: {
          ...state.coins,
          [coinID]: {
            ...state.coins[coinID],
            isRetired: true,
            steps: WINNING_MOVES,
          },
        },
      };
    }
    case ActionTypes.MOVE_COIN_SUCCESS: {
      const { currentDieRoll, coinID } = action.data!;
      return {
        ...state,
        coins: {
          ...state.coins,
          [coinID]: {
            ...state.coins[coinID],
            steps: state.coins[coinID].steps + currentDieRoll,
          },
        },
      };
    }
    case ActionTypes.ENABLE_BASE: {
      const { baseID } = action.data!;
      return {
        ...state,
        bases: {
          ...state.bases,
          [baseID]: {
            ...state.bases[baseID],
            enabled: true,
          },
        },
      };
    }
    case ActionTypes.MARK_WINNER: {
      const { baseID } = action.data!;
      return {
        ...state,
        bases: {
          ...state.bases,
          [baseID]: {
            ...state.bases[baseID],
            hasWon: true,
          },
        },
      };
    }
    default:
      return state;
  }
};

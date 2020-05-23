import { integer, MersenneTwister19937 } from 'random-js';
import {
  put,
  select,
  take,
  takeLatest,
} from 'redux-saga/effects';

import {
  markCurrentBase,
  moveCoinFailure,
  moveCoinSuccess,
  nextTurn,
  spawnCoin,
  ActionTypes as LudoActionTypes,
} from 'containers/Ludo/state/actions';
import { basesSelector, coinsSelector, currentTurnSelector } from 'containers/Ludo/state/selectors';

import { enableDie, invalidateDieRoll, rollDieComplete, ActionTypes } from './actions';
import { Rolls } from './interfaces';

const mt = MersenneTwister19937.autoSeed();

function * watchForRollDie() {
  yield takeLatest(ActionTypes.ROLL_DIE, rollDieSaga);
}

function * rollDieSaga() {
  const dieRoll: Rolls = integer(Rolls.ONE, Rolls.SIX)(mt);
  yield put(rollDieComplete(dieRoll));
}

function * watchForRollDieComplete() {
  yield takeLatest(ActionTypes.ROLL_DIE_COMPLETE, rollDieCompleteSaga);
}

function * rollDieCompleteSaga(action: ReturnType<typeof rollDieComplete>) {
  const { value } = action.data!;
  const currentTurn: ReturnType<typeof currentTurnSelector> = yield select(currentTurnSelector);
  const bases: ReturnType<typeof basesSelector> = yield select(basesSelector);
  const coins: ReturnType<typeof coinsSelector> = yield select(coinsSelector);
  const currentTurnBase = bases[currentTurn];
  const spawnedCoinIDs = currentTurnBase.coinIDs.filter((coinID) => coins[coinID].isSpawned);
  if (value === Rolls.SIX) {
    if (spawnedCoinIDs.length === 0) {
      yield put(spawnCoin(currentTurnBase.ID, bases[currentTurnBase.ID].coinIDs[0]));
      yield take([LudoActionTypes.SPAWN_COIN_SUCCESS, LudoActionTypes.MOVE_COIN_SUCCESS]);
    } else {
      yield put(markCurrentBase(true));
      yield take([LudoActionTypes.SPAWN_COIN_SUCCESS, LudoActionTypes.MOVE_COIN_SUCCESS]);
      yield put(markCurrentBase(false));
    }
    yield put(enableDie());
  } else if (spawnedCoinIDs.length > 0) {
    const result: ReturnType<typeof moveCoinSuccess | typeof moveCoinFailure> = yield take([
      LudoActionTypes.MOVE_COIN_SUCCESS,
      LudoActionTypes.MOVE_COIN_FAILURE,
    ]);
    if (result && result.data) {
      if (!result.data.bonusChance) {
        yield put(nextTurn());
      }
      yield put(enableDie());
    }
  } else {
    yield put(invalidateDieRoll());
    yield put(nextTurn());
    yield put(enableDie());
  }
}

export const sagas = [
  watchForRollDie,
  watchForRollDieComplete,
];

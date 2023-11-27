// containers/Ludo/state/actions.ts

// Action Types
export const PLAYER_DECIDED_TO_PLAY = 'PLAYER_DECIDED_TO_PLAY';
export const PLAYER_DECIDED_TO_PASS = 'PLAYER_DECIDED_TO_PASS';

// Action Creators
export const playerDecidedToPlay = () => ({
  type: PLAYER_DECIDED_TO_PLAY,
});

export const playerDecidedToPass = () => ({
  type: PLAYER_DECIDED_TO_PASS,
});

// Add any additional payload if needed
// For example, if you need to know which player decided to play or pass, you can pass the player's ID as payload

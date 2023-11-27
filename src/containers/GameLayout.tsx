// src/containers/GameLayout.tsx
import React from 'react';
import { Ludo } from './Ludo/Container'; // Change this line to use named import
import QuestionsContainer from './Questions/QuestionsContainer';

const GameLayout = () => {
  return (
    <div className="game-layout">
      <Ludo />
      <QuestionsContainer />
    </div>
  );
};

export default GameLayout;

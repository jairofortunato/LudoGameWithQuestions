// src/containers/Questions/QuestionsContainer.tsx
import React, { useState, ChangeEvent, MouseEvent } from 'react';
import { connect } from 'react-redux';
import { playerDecidedToPlay, playerDecidedToPass } from 'containers/Ludo/state/actions';
import styles from './Container.module.css'; // Import the CSS module

// Define the props interface
interface QuestionsContainerProps {
  playerDecidedToPlay: () => void;
  playerDecidedToPass: () => void;
}


const questions = [
  {
    question: "Lorem Ipsum dolor sit amet?",
    options: ["Option 1 (Correct)", "Option 2", "Option 3", "Option 4"],
    correctAnswer: "Option 1 (Correct)"
  }
  // ... (additional questions)
];

const QuestionsContainer: React.FC<QuestionsContainerProps> = ({ playerDecidedToPlay, playerDecidedToPass }) => {
  const [selectedOption, setSelectedOption] = useState<string>("");
  const [playerDecision, setPlayerDecision] = useState<'play' | 'pass' | null>(null);
  const currentQuestion = questions[0]; // Fetch the first question

  const handleOptionChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSelectedOption(event.target.value);
  };

  const handlePlay = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setPlayerDecision('play');
    playerDecidedToPlay(); // Directly use the destructured function
  };

  const handlePass = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setPlayerDecision('pass');
    playerDecidedToPass(); // Directly use the destructured function
  };

  const handleSubmit = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (selectedOption === currentQuestion.correctAnswer) {
      alert("Correct answer!");
      // ... (handle correct answer)
    } else {
      alert("Wrong answer. Next player's turn!");
      // ... (handle wrong answer)
    }
  };

  
  

  return (
    <div className={styles.questionsContainer}>
      <div className={styles.question}>{currentQuestion.question}</div>
      <div className={styles.optionsContainer}>
        {currentQuestion.options.map((option, index) => (
          <label key={index} className={styles.option}>
            <input
              type="radio"
              name="question"
              value={option}
              onChange={handleOptionChange}
              checked={selectedOption === option}
            />
            {option}
          </label>
        ))}
      </div>
      <div className={styles.buttonContainer}>
        <button onClick={handleSubmit}>Submit Answer</button>
        <button onClick={handlePlay}>Play</button>
        <button onClick={handlePass}>Pass</button>
      </div>
      {playerDecision && <p>Player decision: {playerDecision.toUpperCase()}</p>}
    </div>
  );
};

const mapDispatchToProps = {
  playerDecidedToPlay,
  playerDecidedToPass,
};

export default connect(null, mapDispatchToProps)(QuestionsContainer);
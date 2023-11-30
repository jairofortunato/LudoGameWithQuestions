// src/containers/Questions/QuestionsContainer.tsx
import React, { useState, ChangeEvent } from 'react';
import { connect } from 'react-redux';
import { playerDecidedToPlay, playerDecidedToPass } from 'containers/Ludo/state/actions';
import styles from './Container.module.css'; // Import the CSS module

// Define the props interface
interface QuestionsContainerProps {
  playerDecidedToPlay: () => void;
  playerDecidedToPass: () => void;
}

// Questions array
const questions = [
  {
    question: "O que estuda a antropologia política?",
    options: [
      "Relações econômicas entre países",
      "Culturas e costumes de povos antigos",
      "O comportamento dos animais em grupos",
      "Poder, liderança e autoridade em diferentes sociedades",
    ],
    correctAnswer: "Poder, liderança e autoridade em diferentes sociedades"
  },
  {
    question: "Qual é um exemplo clássico de estudo em antropologia política?",
    options: [
      "Análise do mercado de ações",
      "Estudo sobre as eleições presidenciais",
      "Pesquisa sobre tribos indígenas e seus sistemas de liderança",
      "História da arte medieval",
    ],
    correctAnswer: "Pesquisa sobre tribos indígenas e seus sistemas de liderança"
  },
  {
    question: "Qual destes conceitos é central na antropologia política?",
    options: [
      "Termodinâmica",
      "Ecologia",
      "Hierarquia social",
      "Geometria",
    ],
    correctAnswer: "Hierarquia social"
  },
  {
    question: "A antropologia política frequentemente examina:",
    options: [
      "Estruturas químicas de materiais",
      "Relações de poder dentro de uma comunidade ou sociedade",
      "Composições de obras musicais",
      "Técnicas de pintura renascentista",
    ],
    correctAnswer: "Relações de poder dentro de uma comunidade ou sociedade"
  },
// ... add more questions here
];

const QuestionsContainer: React.FC<QuestionsContainerProps> = ({ playerDecidedToPlay, playerDecidedToPass }) => {
  const [selectedOption, setSelectedOption] = useState<string>("");
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0); // State to track the current question index
  
  const currentQuestion = questions[currentQuestionIndex]; // Fetch the current question based on index

  const handleOptionChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSelectedOption(event.target.value);
  };

  const handleSubmit = () => {
    if (selectedOption === currentQuestion.correctAnswer) {
      
      playerDecidedToPlay(); // Player decided to play
      // Move to the next question
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setSelectedOption(""); // Reset the selected option for the new question
      } else {
        // Handle the end of the quiz, maybe restart or show a summary
      }
    } else {
      
      playerDecidedToPass(); // Player decided to pass
      // Optionally move to the next question or handle it as per your game rules
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
      <button onClick={handleSubmit} className={styles.submitButton}>Check</button>
    </div>
  );
};

const mapDispatchToProps = {
  playerDecidedToPlay,
  playerDecidedToPass,
};

export default connect(null, mapDispatchToProps)(QuestionsContainer);

import React from 'react';
import PropTypes from 'prop-types';
import './Quiz.style.css';

const QuizComponent = (props) => {
  const {quiz = {name: '', questions: []}, removeQuestion} = props;
  return (
    <div className={'quiz-card'}>
      <h2>Name: {quiz.name}</h2>
      <h3>Questions: </h3>
      {quiz.questions.length === 0 && <p>No question has been added</p>}
      <ul>
        {quiz.questions.map((question, index) => (
          <li key={index}>
            <div className={'question-in-quiz'}>
            <p>{question.question}</p>
              <button
                onClick={() => removeQuestion(quiz.name, question)}
                className={'remove-question'}>
                X
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

QuizComponent.propTypes = {
  quiz: PropTypes.object,
  removeQuestion: PropTypes.func
};

export default QuizComponent;

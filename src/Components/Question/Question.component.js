import React from 'react';
import PropTypes from 'prop-types';
import './Question.style.css'

const QuestionComponent = (props) =>  {
  const {question = {question: '', correctAnswer: '', incorrectAnswers: []}, addToQuiz} = props;
  return (
    <div className={'question-card'}>
      <div>
        <h3>{question.question}</h3>
        <ul>
          <li>{question.correctAnswer}</li>
            {question.incorrectAnswers.map((value,index) => (
              <li key={index}>{value}</li>
            ))}
        </ul>
      </div>
      <button
        className={'add-question-to-quiz'}
        onClick={() => addToQuiz(question)}>
        Add to quiz
      </button>
    </div>
  );
}

QuestionComponent.propTypes = {
  question: PropTypes.object,
  addToQuiz: PropTypes.func
};

export default QuestionComponent;

import React, {useCallback, useEffect, useMemo, useState} from 'react';
import Header from '../../Components/Header/Header';
import {QuizService} from '../../Services/Quiz/QuizService';
import QuestionComponent from '../../Components/Question/Question.component';
import ReactModal from 'react-modal';
import './QuestionsPage.style.css';
import {QUIZ_LOCAL_STORAGE_KEY} from '../../_shared/constants';


const QuestionsPage = () => {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [questionForAdd, setQuestionForAdd] = useState(null);
  const [existingQuizzes, setExistingQuizzes] = useState([]);
  const [newQuizName, setNewQuizName] = useState('');

  const quizService = useMemo(() => new QuizService(), []);

  const getExistingQuizzes = useCallback(() => {
    return JSON.parse(localStorage.getItem(QUIZ_LOCAL_STORAGE_KEY)) || [];
  }, []);

  const fetchQuestions = useCallback(async () => {
    const {data} = await quizService.getQuestions();
    setQuestions(data);
    setLoading(false);
  }, [setLoading, setQuestions, quizService]);

  useEffect(() => {
    fetchQuestions().then();
  }, [fetchQuestions]);

  const chooseQuizToAdd = (question) => {
    const savedQuizzes = getExistingQuizzes();
    setExistingQuizzes(savedQuizzes);
    setQuestionForAdd(question);
  }

  const addQuestionToQuiz = useCallback((question, selectedQuiz, isQuizNew = false) => {
    const savedQuizzes = existingQuizzes;
    let editedQuizzes;
    if(isQuizNew) {
      editedQuizzes = [...savedQuizzes, {...selectedQuiz, questions: [question]}]
      setNewQuizName('');
    } else {
      editedQuizzes = savedQuizzes.map(quiz => {
        if (quiz.name === selectedQuiz.name) {
          quiz.questions.push(question);
        }
        return quiz;
      });
    }
    setExistingQuizzes(editedQuizzes);
    localStorage.setItem(QUIZ_LOCAL_STORAGE_KEY, JSON.stringify(editedQuizzes));
  }, [existingQuizzes]);

  const addQuestionModal = useMemo(() => (
    <ReactModal isOpen={!!questionForAdd} style={{content: {width: '650px', margin: 'auto', height: '400px'}}}>
      <div className={'modal-content'}>
        <div>
        <h3>Choose a quiz</h3>
        <ul>
          {existingQuizzes.map(quiz => (
            <li className={'quiz-list-item'}>
              <p>{quiz.name}</p>

              {quiz.questions.some(question => question === questionForAdd) ?
                <button
                className={'modal-button'}
                disabled={true}>
                Added
              </button>
                :
                <button
                  className={'modal-button add-button'}
                  onClick={() => addQuestionToQuiz(questionForAdd, quiz)}>
                  Add to quiz
                </button>
              }
            </li>
          ))}
          <li>
            <p>Add to new Quiz</p>
          </li>
          <li className={'quiz-list-item'}>
            <label htmlFor="new-quiz-name">Name: </label>
            <input type="text" className={'new-quiz-input'} name='new-quiz-name' value={newQuizName} onChange={e => setNewQuizName(e.target.value)}/>
              <button
                className={'modal-button add-button'}
                disabled={newQuizName.length === 0}
                onClick={() => addQuestionToQuiz(questionForAdd, {name: newQuizName}, true)}>
                Add to quiz
              </button>
          </li>
        </ul>
        </div>
        <button
          className={'modal-button'}
          onClick={() => setQuestionForAdd(false)}>
          Close<
          /button>
      </div>
    </ReactModal>
  ), [addQuestionToQuiz, existingQuizzes, newQuizName, questionForAdd])

  return (
    <div>
      <Header />
      {loading && <h1>Loading...</h1>}

      {!loading && questions.length &&
        <div className={'question-cards-container'}>
          {questions.map((question, index) => (
              <QuestionComponent addToQuiz={chooseQuizToAdd} question={question} key={index}/>
            ))}
        </div>
      }

      {addQuestionModal}
    </div>
  );
}

export default QuestionsPage;

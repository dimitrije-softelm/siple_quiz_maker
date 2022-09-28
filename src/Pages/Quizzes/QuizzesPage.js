import React, {useCallback, useState} from 'react';
import Header from '../../Components/Header/Header';
import './QuizzesPage.style.css';
import QuizComponent from '../../Components/Quiz/Quiz.component';

const QuizzesPage = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [addingQuiz, setAddingQuiz] = useState(false);
  const [newQuizName, setNewQuizName] = useState('');

  const onNeqQuizNameChange = (name) => {
    setNewQuizName(name);
  }

  const cancelQuizCreate = () => {
    setAddingQuiz(false);
    setNewQuizName('');
  }

  const createQuiz = useCallback(() => {
    const quiz = {
      name: newQuizName,
      questions: []
    }

    const newQuizzesList = [...quizzes, quiz];
    setQuizzes(newQuizzesList);

    localStorage.setItem('quizzes', JSON.stringify(newQuizzesList));

    setAddingQuiz(false);
    setNewQuizName('');
  }, [newQuizName]);

  const removeQuestionFromQuiz = useCallback((quizName, questionToRemove) => {
    const editedQuizzes = quizzes.map(quiz => {
      if(quiz.name === quizName) {
        quiz.questions = quiz.questions.filter(question => question !== questionToRemove)
      }
      return quiz
    });

    setQuizzes(editedQuizzes);
    localStorage.setItem('quizzes', JSON.stringify(editedQuizzes));
  }, [quizzes])

  return (
    <div>
      <Header />
      <div className={'quiz-page-container'}>
      {!addingQuiz &&
        <button
          className={'add-quiz'}
          onClick={() => setAddingQuiz(true)}>
          Add new quiz
        </button>
      }

      {addingQuiz &&
        <div className={'add-quiz-form'}>
          <h2>Add new quiz</h2>

          <label htmlFor="quizName">Quiz name</label>
          <input type="text" name={'quizName'} value={newQuizName} onChange={e => onNeqQuizNameChange(e.target.value)}/>

          <button
            className={'cancel-create-quiz'}
            onClick={cancelQuizCreate}>
            Cancel
          </button>
          <button
            className={'create-quiz'}
            disabled={newQuizName.length === 0}
            onClick={createQuiz}>
            Create Quiz
          </button>
        </div>
      }

      <div>
        <h1>Existing quizzes</h1>
        {!!quizzes.length &&
          <div className={'quizzes-list'}>
            {quizzes.map((quiz, index) => (
              <QuizComponent quiz={quiz} removeQuestion={removeQuestionFromQuiz} key={index}/>
            ))}
          </div>
        }
      </div>
    </div>
    </div>
  );
}

export default QuizzesPage;

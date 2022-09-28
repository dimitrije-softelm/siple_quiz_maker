import React, {useEffect, useState} from 'react';
import Header from '../../Components/Header/Header';
import {QuizService} from '../../Services/Quiz/QuizService';
import QuestionComponent from '../../Components/Question/Question.component';
import './QuestionPage.style.css';


const QuestionsPage = () => {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const quizService = new QuizService();

  const fetchQuestions = async () => {
    const {data} = await quizService.getQuestions();
    setQuestions(data);
    setLoading(false);
  }

  useEffect(() => {
    fetchQuestions()
  }, []);

  const addQuestionToQuiz = (question) => {
    console.log(question);
  }

  return (
    <div>
      <Header />
      {loading && <h1>Loading...</h1>}
      {!loading && questions.length &&
        <div className={'question-cards-container'}>
          {questions.map((question, index) => (
              <QuestionComponent addToQuiz={addQuestionToQuiz} question={question} key={index}/>
            ))}
        </div>
      }
    </div>
  );
}

export default QuestionsPage;

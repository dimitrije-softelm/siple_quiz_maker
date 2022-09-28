import './App.css';
import {Route, Routes} from 'react-router-dom';
import QuizzesPage from './Pages/Quizzes/QuizzesPage';
import QuestionsPage from './Pages/Questions/QuestionsPage';

function App() {
  return (
    <div className="App">
    <Routes>
      <Route path="questions" element={<QuestionsPage />} />
      <Route path="quizzes" element={<QuizzesPage />} />
    </Routes>
    </div>
  );
}

export default App;

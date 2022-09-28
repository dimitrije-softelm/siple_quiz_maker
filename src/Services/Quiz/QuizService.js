import axios from 'axios';

export class QuizService {
  getQuestions() {
    return axios.get('https://the-trivia-api.com/api/questions?limit=20')
  }
}

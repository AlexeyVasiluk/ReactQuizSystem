import axios from 'axios'

export default axios.create({
  baseURL: 'https://react-quiz-3bd42-default-rtdb.firebaseio.com/'
})
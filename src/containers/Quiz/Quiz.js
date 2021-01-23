import React, {Component} from 'react';
import classes from './Quiz.css';
import ActiveQuiz from "../../components/ActiveQuiz/ActiveQuiz";

class Quiz extends Component {
    state = {
        activeQuestion: 0,
        answerState: null, // { [id]: 'success' 'error'}
        quiz: [
            {
                question: 'Какого цвета небо?',
                rightAnswerId: 2,
                id: 1,
                answers: [
                    {text: 'Черный', id: 1},
                    {text: 'Синий', id: 2},
                    {text: 'Красный', id: 3},
                    {text: 'Зеленый', id: 4}
                ]
            },
            {
                question: 'В каком году Колумб Америку открыл?',
                rightAnswerId: 3,
                id: 2,
                answers: [
                    {text: '1499', id: 1},
                    {text: '1457', id: 2},
                    {text: '1492', id: 3},
                    {text: '1485', id: 4}
                ]
            }
        ] // questions and right answers
    };

    // user choose answer
    onAnswerClickHandler = (answerId) => {
        const question = this.state.quiz[this.state.activeQuestion]; // current question object
        if (question.rightAnswerId === answerId) { // system check answer
            this.setState({
                answerState: {[answerId]: 'success'}
            });
            const timeout = window.setTimeout(() => {
                if (this.isQuizFinished()) {
                    console.log('FINISHED');
                } else {
                    this.setState({ // switches to next question
                        activeQuestion: this.state.activeQuestion + 1,
                        answerState: null
                    })
                }
                window.clearTimeout(timeout);
            }, 1000);


        } else {
            this.setState({
                answerState: {[answerId]: 'error'}
            });
        }
    };

    // checks if there are else one question
    isQuizFinished() {
        return this.state.activeQuestion + 1 === this.state.quiz.length;
    }

    render() {
        return (
            <div className={classes.Quiz}>
                <div className={classes.QuizWrapper}>
                    <h1>Ответить на все вопросы</h1>
                    <ActiveQuiz
                        answers={this.state.quiz[this.state.activeQuestion].answers}
                        question={this.state.quiz[this.state.activeQuestion].question}
                        onAnswerClick={this.onAnswerClickHandler}
                        quizLength={this.state.quiz.length}
                        answerNumber={this.state.activeQuestion + 1}
                        state={this.state.answerState}
                    />
                </div>
            </div>
        )
    }
}

export default Quiz;
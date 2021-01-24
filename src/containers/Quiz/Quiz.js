import React, {Component} from 'react';
import classes from './Quiz.css';
import ActiveQuiz from "../../components/ActiveQuiz/ActiveQuiz";
import FinishedQuiz from "../../components/FinishedQuiz/FinishedQuiz";

class Quiz extends Component {
    state = {
        results: {}, // { [id]: 'success' || 'error'}
        isFinished: false,
        activeQuestion: 0,
        answerState: null, // { [id]: 'success' || 'error'}
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
        if (this.state.answerState) {
            const key = Object.keys(this.state.answerState)[0];
            if (this.state.answerState[key] === 'success') {
                return;
            }
        }

        const question = this.state.quiz[this.state.activeQuestion]; // current question object
        const results = this.state.results;

        if (question.rightAnswerId === answerId) { // system check answer
            if (!results[question.id]) {
                results[question.id] = 'success'
            }

            this.setState({
                answerState: {[answerId]: 'success'},
                results: results
            });

            const timeout = window.setTimeout(() => {
                if (this.isQuizFinished()) {
                    this.setState({
                        isFinished: true
                    })
                } else {
                    this.setState({ // switches to next question
                        activeQuestion: this.state.activeQuestion + 1,
                        answerState: null
                    })
                }
                window.clearTimeout(timeout);
            }, 500);
        } else {
            results[question.id] = 'error';
            this.setState({
                answerState: {[answerId]: 'error'},
                results: results
            });
        }
    };

    // checks if there are else one question
    isQuizFinished() {
        return this.state.activeQuestion + 1 === this.state.quiz.length;
    }

    retryHandler = () => {
        this.setState({
            activeQuestion: 0,
            answerState: null,
            isFinished: false,
            results: {}
        })
    }

    render() {
        return (
            <div className={classes.Quiz}>
                <div className={classes.QuizWrapper}>
                    <h1>Ответить на все вопросы</h1>
                    {
                        this.state.isFinished
                            ? <FinishedQuiz
                                results={this.state.results}
                                quiz={this.state.quiz}
                                onRetry={this.retryHandler}
                            />
                            : <ActiveQuiz
                                answers={this.state.quiz[this.state.activeQuestion].answers}
                                question={this.state.quiz[this.state.activeQuestion].question}
                                onAnswerClick={this.onAnswerClickHandler}
                                quizLength={this.state.quiz.length}
                                answerNumber={this.state.activeQuestion + 1}
                                state={this.state.answerState}
                            />
                    }
                </div>
            </div>
        )
    }
}

export default Quiz;
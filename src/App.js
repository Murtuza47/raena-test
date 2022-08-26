import axios from "axios";
import { useEffect, useState } from "react";
import { Choice, Header, Question, Score, Loader } from "./components";
import { shuffle } from './utils/helper'
import './App.css';

const App = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true)
  const [currentQuestion, setCurrentQuestion] = useState()
  const [currentQuestionCount, setCurrentQuestionCount] = useState(0);
  const [correctAnswerCount, setCorrectAnswerCount] = useState(0);
  const [answeredQuestion, setAnsweredQuestion] = useState(0)
  const [questionAnswered, setQuestionAnswered] = useState(false)
  const [selectedAnswer, setSelectedAnswer] = useState(false)

  useEffect(() => {
    setLoading(true)
    axios.get('https://bitbucket.org/yash-raena/quiz/raw/40e43cf47b66c6ddb445618d699be8d63947b3b3/questions.json').then((res) => {
      if (res) {
        setData(res.data)
        setLoading(false)
      }
    }).catch((error) => {
      console.error(error)
      setLoading(false)
    })
  }, [])

  useEffect(() => {
    if (data.length > 0) {
      const question = data[currentQuestionCount]
      const choices = shuffle([...question?.incorrect_answers, question?.correct_answer])
      setCurrentQuestion({ ...question, choices })
    }
  }, [currentQuestionCount, data])

  const choiceHandler = (selectedAnswer) => {
    if (selectedAnswer === currentQuestion?.correct_answer) {
      setCorrectAnswerCount(prev => prev + 1)
    }
    setSelectedAnswer(selectedAnswer)
    setAnsweredQuestion(prev => prev + 1)
    setQuestionAnswered(true)
  }

  const nextQuestionHandler = () => {
    setSelectedAnswer('')
    setQuestionAnswered(false)
    setCurrentQuestionCount(prev => prev + 1)
  }

  return (
    <>
      {
        loading ?
          <Loader />
          :
          <>
            <Header completedQuestion={answeredQuestion} totalQuestion={data.length} />
            <div style={{ margin: '0 100px', minHeight: '95vh', display: 'flex', flexDirection: "column" }}>
              {currentQuestion && (
                <>
                  <Question
                    question={currentQuestion?.question}
                    difficulty={currentQuestion?.difficulty}
                    category={currentQuestion?.category}
                    currentQuestion={currentQuestionCount + 1}
                    totalQuestion={data.length}
                  />
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
                    {currentQuestion.choices.map((choice, index) => (
                      <Choice
                        key={`choices-${index}}`}
                        choice={choice}
                        choiceHandler={choiceHandler}
                        answerSelected={questionAnswered}
                        indexOfSelectedAnswer={currentQuestion.choices.indexOf(selectedAnswer)}
                        indexOfCorrectAnswer={currentQuestion.choices.indexOf(currentQuestion?.correct_answer)}
                        index={index}
                      />
                    ))}
                  </div>
                </>
              )}
              {questionAnswered && answeredQuestion !== data.length && (
                <div style={{ margin: '0 auto' }}>
                  <h1 style={{ textAlign: 'center' }}>{selectedAnswer === currentQuestion?.correct_answer ? 'Correct!' : 'Sorry!'}</h1>
                  <button onClick={nextQuestionHandler} disabled={answeredQuestion === data.length} className='next-question-btn'>Next Question</button>
                </div>
              )}
              {
                answeredQuestion === data.length && (
                  <h1 style={{ textAlign: 'center' }}>Exam is completed!</h1>
                )
              }
              <Score correctAnswer={correctAnswerCount} answeredQuestion={answeredQuestion} totalQuestion={data.length} />
            </div>
          </>
      }
    </>

  );
}

export default App;

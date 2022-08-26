import { Rating } from "./rating"

export const Question = ({ question, category, difficulty, currentQuestion, totalQuestion }) => (
  <div>
    <h1 style={{ marginBottom: '2px' }}>Question {currentQuestion} of {totalQuestion}</h1>
    <h4 style={{ margin: '2px 0' }}>{decodeURI(category).replace('%3', ':')}</h4>
    <Rating difficulty={difficulty} />
    <h2>{decodeURI(question).replace('%3F', '?')}</h2>
  </div>
)
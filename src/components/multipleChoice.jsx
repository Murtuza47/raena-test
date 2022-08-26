export const Choice = ({ choice, choiceHandler, indexOfSelectedAnswer, indexOfCorrectAnswer, answerSelected, index }) => {
  return (
    <div style={{ height: '80px', textAlign: 'center' }}>
      <button
        className={!answerSelected ? 'choice-button' : 'choice-button-disabled'}
        style={{
          background: indexOfSelectedAnswer === index && 'black',
          color: indexOfSelectedAnswer === index ? 'white' : indexOfCorrectAnswer === index && answerSelected && 'black',
        }}
        onClick={() => choiceHandler(choice)}
        disabled={answerSelected}
      >
        {decodeURI(choice)}
      </button>
    </div >
  )
}
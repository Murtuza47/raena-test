export const Score = ({ correctAnswer, answeredQuestion, totalQuestion }) => {
  const score = ((correctAnswer / answeredQuestion) * 100).toFixed()
  const remainingAnswerWrong = ((correctAnswer / totalQuestion) * 100).toFixed()
  const maxScore = (((correctAnswer + totalQuestion - answeredQuestion) / totalQuestion) * 100).toFixed()
  return (
    <div style={{ width: '100%', marginTop: 'auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <p>Score: {isNaN(score) ? 0 : score}%</p>
        <p>Max Score: {isNaN(maxScore) ? 100 : maxScore}%</p>
      </div>
      <div style={{ border: '1px solid black', borderRadius: '5px', height: '30px', display: 'flex' }}>
        <div
          style={{
            height: '100%', width: `${remainingAnswerWrong}%`,
            background: 'black'
          }} />
        <div
          style={{
            height: '100%', width: `${score - remainingAnswerWrong}%`,
            background: 'grey'
          }}
        />
        <div
          style={{
            height: '100%', width: `${maxScore - score}%`,
            background: '#D3D3D3'
          }}
        />
      </div>
    </div>
  )
}



export const Header = ({ completedQuestion, totalQuestion }) => (
  <header style={{ height: '20px', background: '#A0A0A0', width: `${(completedQuestion / totalQuestion) * 100}%` }} />
)
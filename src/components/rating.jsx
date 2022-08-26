export const Rating = ({ difficulty }) => {
  let rating = ''
  switch (difficulty) {
    case 'easy':
      rating = (<div>&#9733;&#9734;&#9734;</div>)
      break;
    case 'medium':
      rating = (<div>&#9733;&#9733;&#9734;</div>)
      break;
    case 'hard':
      rating = (<div>&#9733;&#9733;&#9733;</div>)
      break;
    default:
      break;
  }
  return (
    <>
      {rating}
    </>
  )
}
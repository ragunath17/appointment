// Write your code here
import './index.css'

const AppointmentItem = props => {
  const {appointment, toggleStar} = props
  const {id, title, date, isStarred} = appointment

  const onClickStar = () => {
    toggleStar(id)
  }

  const starImg = isStarred
    ? 'https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png'

  return (
    <li className="list-container">
      <div className="title-date-container">
        <p className="list-title">{title}</p>
        <p className="list-date">Date: {date}</p>
      </div>
      <div>
        <button
          type="button"
          data-testid="star"
          className="star-btn"
          onClick={onClickStar}
        >
          <img src={starImg} alt="star" />
        </button>
      </div>
    </li>
  )
}

export default AppointmentItem

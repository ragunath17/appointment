// Write your code here
import {Component} from 'react'
import {format} from 'date-fns'
import {v4} from 'uuid'
import AppointmentItem from '../AppointmentItem'

import './index.css'

class Appointments extends Component {
  state = {
    titleInput: '',
    dateInput: '',
    appointmentsList: [],
    showStarred: false,
  }

  onChangeTitleInput = event => {
    this.setState({titleInput: event.target.value})
  }

  onChangeDateInput = event => {
    this.setState({dateInput: event.target.value})
  }

  onClickAddAppointment = event => {
    event.preventDefault()
    const {titleInput, dateInput} = this.state
    const newAppointment = {
      id: v4(),
      title: titleInput,
      date: format(new Date(dateInput), 'dd MMMM yyyy, EEEE'),
      isStarred: false,
    }
    this.setState(prevState => ({
      appointmentsList: [...prevState.appointmentsList, newAppointment],
      titleInput: '',
      dateInput: '',
    }))
  }

  toggleStarFilter = () => {
    this.setState(prevState => ({showStarred: !prevState.showStarred}))
  }

  toggleStar = id => {
    this.setState(prevState => ({
      appointmentsList: prevState.appointmentsList.map(appointment =>
        appointment.id === id
          ? {...appointment, isStarred: !appointment.isStarred}
          : appointment,
      ),
    }))
  }

  render() {
    const {titleInput, dateInput, appointmentsList, showStarred} = this.state
    const filteredAppointments = showStarred
      ? appointmentsList.filter(eachAppoinment => eachAppoinment.isStarred)
      : appointmentsList

    return (
      <div className="app-container">
        <div className="appointment-card">
          <h1 className="heading">Add Appointment</h1>
          <div className="input-container">
            <div className="input-card">
              <div>
                <p className="sub-heading">TITLE</p>
                <input
                  className="input"
                  placeholder="Title"
                  label="Title"
                  htmlFor="Title"
                  value={titleInput}
                  onChange={this.onChangeTitleInput}
                />
              </div>
              <div>
                <p className="sub-heading">DATE</p>
                <input
                  type="date"
                  className="input"
                  placeholder="dd/mm/yyyy"
                  label="Date"
                  htmlFor="Date"
                  value={dateInput}
                  onChange={this.onChangeDateInput}
                />
              </div>
              <div>
                <button
                  type="button"
                  className="add-btn"
                  onClick={this.onClickAddAppointment}
                >
                  Add
                </button>
              </div>
            </div>
            <img
              src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
              alt="appointments"
              className="appointment-img"
            />
          </div>
          <hr />
          <div className="appointments-card-container">
            <h1>Appointments</h1>
            <button
              type="button"
              className="star-button"
              onClick={this.toggleStarFilter}
            >
              Starred
            </button>
          </div>
          <ul className="unordered-list">
            {filteredAppointments.map(eachAppointment => (
              <AppointmentItem
                key={eachAppointment.id}
                appointment={eachAppointment}
                toggleStar={this.toggleStar}
              />
            ))}
          </ul>
        </div>
      </div>
    )
  }
}

export default Appointments

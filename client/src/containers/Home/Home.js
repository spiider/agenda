import React, { useState, useContext, useEffect } from 'react';
import Calendar from 'react-big-calendar';
import moment from 'moment';
import './Home.css';
import { UserContext } from '../../services/context';
import { createEvent, fetchEvents } from '../../services/api';

const localizer = Calendar.momentLocalizer(moment)


const Home = () => {
  const user = useContext(UserContext);
  const [eventsList, setEventsList] = useState([])
  const [title, setTitle] = useState();
  const [desc, setDesc] = useState();
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const handleSubmit = (evt) => {
    evt.preventDefault()
    createEvent({ title, desc, start: startDate, end: endDate }, user.token.accessToken)
    .then(data => {
      if (data.ok) {
        setEventsList([...eventsList, { title, desc, start: startDate, end: endDate }])
      }
    }).catch(e => console.log(e))
  }

  useEffect(() => {
    fetchEvents(user.token.accessToken)
    .then(data => {
      if (data.ok) {
        return data.json()
      }
    })
    .then(list => { console.log(list); setEventsList(list)});
  }, [])

  return (
    <div>
      <div className="container">
      <form className="form-signin" onSubmit={handleSubmit}>
        <input
          type="text"
          id="inputUsername"
          className="form-control"
          placeholder="Title"
          required
          autoFocus
          value={title}
          onChange={evt => setTitle(evt.target.value)}
          />
        <input
          type="text"
          id="inputUsername"
          className="form-control"
          placeholder="Description"
          required
          autoFocus
          value={desc}
          onChange={evt => setDesc(evt.target.value)}
        />
        <input
          type="date"
          id="inputUsername"
          className="form-control"
          placeholder="Start Date"
          required
          autoFocus
          value={startDate}
          onChange={evt => setStartDate(evt.target.value)}
        />
        <input
          type="date"
          id="inputUsername"
          className="form-control"
          placeholder="End Date"
          required
          autoFocus
          value={endDate}
          onChange={evt => setEndDate(evt.target.value)}
          />
        <button className="btn btn-lg btn-primary btn-block" type="submit">Add</button>
      </form>
    </div>
      
       <Calendar
        selectable
        // onSelectSlot={(e) => this.openModal(e)}
        // onSelectEvent={(e) => this.openModal(e)}
        localizer={localizer}
        events={eventsList}
        startAccessor="start"
        endAccessor="end"
        />
    </div>
 )
}

export default Home;

import React from 'react';
import Calendar from 'react-big-calendar';
import moment from 'moment';
import './Home.css';

const localizer = Calendar.momentLocalizer(moment)


const Home = () => {
  return (<Calendar 
    selectable
    defaultDate={new Date()}
    localizer={localizer}
    events={[]}
    startAccessor="start"
    endAccessor="end"
    />)
}

export default Home;

import React, { useState, useEffect } from 'react';
import DashNavBar from './DashNavBar'
import axios from 'axios';
import Event from './Event';
import { useLocation } from 'react-router-dom';

const DashBoard = () => {
    const [events, setEvents] = useState([]);
    const location = useLocation();

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/events/list/');
        setEvents(response.data);
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };

    fetchEvents();
  }, []);

  const username = location.state && location.state.username
  console.log(username);

  return (
    <div className="container">
      <DashNavBar username={username} />
      <h1>Upcoming Events</h1>
      <div className="row">
        {events.map((event) => (
          <div className="col-md-4" key={event.id}>
            <Event event={event} />
          </div>
        ))}
      </div>
    </div>
  )
}

export default DashBoard

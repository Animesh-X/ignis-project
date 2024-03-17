import React, { useState, useEffect } from 'react';
import Event from './Event';
import axios from 'axios';
import "bootstrap/dist/css/bootstrap.min.css";
import NavBar from './Navbar';

const EventsList = () => {
  const [events, setEvents] = useState([]);

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

  return (
    <div className="container">
      <NavBar />
      <h1>Upcoming Events</h1>
      <div className="row">
        {events.map((event) => (
          <div className="col-md-4" key={event.id}>
            <Event event={event} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default EventsList;

import React, { useState, useEffect } from 'react';
import Event from './Event';
import axios from 'axios';
import NavBar from './DashNavBar'
import "bootstrap/dist/css/bootstrap.min.css";

const LikedEventsPage = () => {
  const [likedEvents, setLikedEvents] = useState([]);

  useEffect(() => {
    const fetchLikedEvents = async () => {
      try {
        // Fetch all events
        const response = await axios.get('http://127.0.0.1:8000/events/list/');
        const allEvents = response.data;

        // Filter liked events
        const likedEvents = allEvents.filter(event => event.is_liked);

        // Set liked events
        setLikedEvents(likedEvents);
      } catch (error) {
        console.error('Error fetching liked events:', error);
      }
    };

    fetchLikedEvents();
  }, []);

  return (
    <div className="container">
        <NavBar />
      <h1>Saved Events</h1>
      <div className="row">
        {likedEvents.map((event) => (
          <div className="col-md-4" key={event.id}>
            <Event event={event} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default LikedEventsPage;

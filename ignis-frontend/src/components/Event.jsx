import React, { useContext } from 'react';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


const Event = ({ event }) => {
  const { id, event_name, data, date, time, location, image, is_liked } = event;
  const navigate = useNavigate(); // Import useNavigate hook

  // Function to get the absolute URL of the image
  const getImageUrl = (imageUrl) => {
    // Check if the image URL is already absolute
    if (imageUrl.startsWith('http')) {
      return imageUrl;
    } else {
      // Prepend the base URL of your Django backend
      return `http://127.0.0.1:8000${imageUrl}`;
    }
  };

  // Function to handle liking the event
  const handleLike = async () => {
    const authorization = localStorage.getItem('token');
    const headers = authorization ? { Authorization: `Token ${authorization}` } : {};

    if (!authorization) {
      // Redirect to login page if not logged in
     
      navigate('/login');
      return;
    }

    try {
      // Send the PATCH request to toggle the like status of the event
      await axios.patch(`http://127.0.0.1:8000/events/${id}/like/`, {
        is_liked: !is_liked,
      }, { headers });
      console.log("succeess");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Card key={id} className="mb-3">
      <Card.Img variant="top" src={`http://127.0.0.1:8000/${image}`} alt={event_name} />
      <Card.Body>
        <Card.Title>{event_name}</Card.Title>
        <Card.Text>
          <p>
            {data} - {date} {time}
          </p>
          <p>{location}</p>
        </Card.Text>
      </Card.Body>
      <Card.Footer>
        <div className="text-center">
          <button
            className={`heart-button ${is_liked ? 'liked' : ''}`}
            onClick={handleLike}
          >
            <FontAwesomeIcon icon="fa-regular fa-heart" />
          </button>
        </div>
      </Card.Footer>
    </Card>
  );
};

export default Event;

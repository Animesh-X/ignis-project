import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import NavBar from './DashNavBar';
import { useNavigate } from 'react-router-dom';

const AddEvent = () => {
  const [eventName, setEventName] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [location, setLocation] = useState('');
  const [image, setImage] = useState(null);
  const [fare, setFare] = useState(0);
  const [error, setError] = useState(null);
  const  navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    const formData = new FormData();
    formData.append('event_name', eventName);
    formData.append('data', fare);
    formData.append('date', date);
    formData.append('time', time);
    formData.append('location', location);
    formData.append('image', image);
  
    const authorization = localStorage.getItem('token');
    const headers = authorization ? { Authorization: `Token ${authorization}` } : {};
  
    try {
      const response = await axios.post('http://127.0.0.1:8000/events/add/', formData, { headers });
      console.log('Event created successfully:', response.data);
      navigate('/dashboard')

      
    } catch (error) {
      console.error('Event creation failed:', error);
      setError(error.response?.data?.message || 'Event creation failed');
    }
  };
  const handleImageChange = (event) => {
    setImage(event.target.files[0]);
  };

  return (
    <div className="container mt-5">
        <NavBar />
      <h1>Add Event</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Event Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter event name"
            value={eventName}
            onChange={(e) => setEventName(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Date</Form.Label>
          <Form.Control type="date" value={date} onChange={(e) => setDate(e.target.value)} />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Time</Form.Label>
          <Form.Control type="time" value={time} onChange={(e) => setTime(e.target.value)} />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Location</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Event Image</Form.Label>
          <Form.Control type="file" accept="image/*" onChange={handleImageChange} />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Fare (optional)</Form.Label>
          <Form.Control type="number" value={fare} onChange={(e) => setFare(e.target.value)} />
        </Form.Group>
        <Button variant="primary" type="submit">
          Create Event
        </Button>
        {error && <p className="text-danger">{error}</p>}
      </Form>
    </div>
  );
};

export default AddEvent;

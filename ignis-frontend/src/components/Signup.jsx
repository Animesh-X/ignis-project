import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import "bootstrap/dist/css/bootstrap.min.css";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      if (password !== password2) {
        setError('Passwords do not match.');
        return;
      }

      const response = await axios.post('http://127.0.0.1:8000/account/register/', {
        username,
        email,
        password,
        password2,
      });

      // Handle successful signup 
      console.log(response.data.token)
      localStorage.setItem('token', response.data.token);
      console.log('SignUp successful:', response.data);
      navigate('/dashboard', { state: { username: username } });
      // Reset form and error
      setUsername('');
      setEmail('');
      setPassword('');
      setPassword2('');
      setError(null);

    } catch (error) {
      console.error('Signup error:', error);
      setError('Registration failed. Please try again.'); 
    }
  };

  return (
    <div className="container mt-5">
      <h1>Signup</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Confirm Password"
            value={password2}
            onChange={(e) => setPassword2(e.target.value)}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Signup
        </Button>
        {error && <p className="text-danger">{error}</p>}
      </Form>
    </div>
  );
};

export default Signup;

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClientProvider, QueryClient } from 'react-query';
import EventsList from './components/EventList';
import Login from './components/Login';
import Signup from './components/Signup';
import EventLikedPage from './components/EventLikedPage';
import DashBoard from './components/DashBoard';
import AddEvent from './components/AddEvent';
import AuthRoute from './components/AuthRoute';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          <Route path="/" element={<EventsList />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard" element={<DashBoard />} />
          <Route path="/likedevents" element={<EventLikedPage />} />
          <Route path="/addevent" element={<AddEvent />} />
        </Routes>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
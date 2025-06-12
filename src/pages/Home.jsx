import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="home">
      <h1>Welcome to Todo App</h1>
      <nav>
        <Link to="/todos" className="nav-link">View All Todos</Link>
      </nav>
    </div>
  );
};

export default Home;

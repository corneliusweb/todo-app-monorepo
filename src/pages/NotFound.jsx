import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div style={{ textAlign: 'center', padding: '60px 20px' }}>
      <h1 style={{ fontSize: '4rem', color: '#1677ff', marginBottom: 0 }}>404</h1>
      <h2 style={{ color: '#333', marginTop: 0 }}>Page Not Found</h2>
      <p style={{ color: '#666', marginBottom: 30 }}>
        Sorry, the page you are looking for does not exist.
      </p>
      <Link
        to="/"
        style={{
          display: 'inline-block',
          padding: '10px 24px',
          background: '#1677ff',
          color: 'white',
          borderRadius: 4,
          textDecoration: 'none',
          fontWeight: 500,
        }}
      >
        Go Home
      </Link>
    </div>
  );
};

export default NotFound;

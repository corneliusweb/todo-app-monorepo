import React from 'react';

const modalStyle = {
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100vw',
  height: '100vh',
  background: 'rgba(0,0,0,0.3)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  zIndex: 1100,
};

const contentStyle = {
  background: 'white',
  borderRadius: 8,
  padding: 32,
  minWidth: 260,
  maxWidth: '90vw',
  boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
  textAlign: 'center',
};

const SuccessModal = ({ open, message }) => {
  if (!open) return null;
  return (
    <div style={modalStyle}>
      <div style={contentStyle}>
        <h2 style={{ color: '#52c41a', margin: 0 }}>{message || 'Todo added successfully!'}</h2>
      </div>
    </div>
  );
};

export default SuccessModal; 
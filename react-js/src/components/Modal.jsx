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
  zIndex: 1000,
};

const contentStyle = {
  background: 'white',
  borderRadius: 8,
  padding: 24,
  minWidth: 300,
  width: 350,
  maxWidth: '60vw',
  boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
  position: 'relative',
};

const closeBtnStyle = {
  position: 'absolute',
  top: 10,
  right: 16,
  background: 'none',
  border: 'none',
  fontSize: 22,
  cursor: 'pointer',
  color: '#888',
};

const Modal = ({ open, onClose, children }) => {
  if (!open) return null;
  return (
    <div style={modalStyle} onClick={onClose}>
      <div style={contentStyle} onClick={(e) => e.stopPropagation()}>
        <button style={closeBtnStyle} onClick={onClose} aria-label="Close">
          &times;
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;

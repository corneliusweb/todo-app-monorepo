import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { RiMenu2Fill } from 'react-icons/ri';
import Modal from '../components/Modal';
import AddTodoForm from '../components/AddTodoForm';
import SuccessModal from '../components/SuccessModal';

const Home = () => {
  const [showModal, setShowModal] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleAddSuccess = () => {
    setShowModal(false);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 2000);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="home">
      <nav className="nav-container">
        <div className="desktop-nav">
          <Link to="/todos">View All Todos</Link>
          <Link to="/test-error">Test Error Boundary</Link>
        </div>
        <div className="mobile-nav">
          <button className="menu-button" onClick={toggleMenu}>
            <RiMenu2Fill />
          </button>
          {isMenuOpen && (
            <div className="mobile-menu">
              <Link to="/todos" onClick={() => setIsMenuOpen(false)}>
                View All Todos
              </Link>
              <Link to="/test-error" onClick={() => setIsMenuOpen(false)}>
                Test Error Boundary
              </Link>
            </div>
          )}
        </div>
        <button
          className="nav-link"
          style={{
            background: '#10B981',
            border: 'none',
            cursor: 'pointer',
            fontSize: '1.05rem',
          }}
          onClick={() => setShowModal(true)}
        >
          Add Todo
        </button>
      </nav>
      <h1>Welcome to Todo App</h1>
      <Modal open={showModal} onClose={() => setShowModal(false)}>
        <AddTodoForm onSuccess={handleAddSuccess} />
      </Modal>
      <SuccessModal open={showSuccess} message="Todo added successfully!" />
    </div>
  );
};

export default Home;

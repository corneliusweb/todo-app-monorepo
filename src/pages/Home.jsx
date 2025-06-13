import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Modal from '../components/Modal';
import AddTodoForm from '../components/AddTodoForm';
import SuccessModal from '../components/SuccessModal';

const Home = () => {
  const [showModal, setShowModal] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleAddSuccess = () => {
    setShowModal(false);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 2000);
  };

  return (
    <div className="home">
      <nav>
        <Link to="/todos" className="nav-link">
          View All Todos
        </Link>
        <br />
        <br />
        <Link to="/test-error" className="nav-link">
          Test Error Boundary
        </Link>
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

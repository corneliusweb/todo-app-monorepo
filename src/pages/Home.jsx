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
      <h1>Welcome to Todo App</h1>
      <nav>
        <Link to="/todos" className="nav-link">
          View All Todos
        </Link>
        <br />
        <button
          className="nav-link"
          style={{ marginTop: 10, background: '#52c41a', border: 'none', cursor: 'pointer' }}
          onClick={() => setShowModal(true)}
        >
          Add Todo
        </button>
        <br />
        <Link
          to="/test-error"
          className="nav-link"
          style={{ marginTop: 10, background: '#ff4d4f' }}
        >
          Test Error Boundary
        </Link>
      </nav>
      <Modal open={showModal} onClose={() => setShowModal(false)}>
        <AddTodoForm onSuccess={handleAddSuccess} />
      </Modal>
      <SuccessModal open={showSuccess} message="Todo added successfully!" />
    </div>
  );
};

export default Home;

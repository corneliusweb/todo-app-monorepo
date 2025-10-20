import React from 'react';
import { Link } from 'react-router-dom';
import { IoChevronBack } from 'react-icons/io5';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  resetError = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: '50px 40px', textAlign: 'center' }}>
          <Link to="/" className="back-link" onClick={this.resetError}>
            <IoChevronBack /> Back to Home
          </Link>
          <h2 style={{ marginTop: 200 }}>Something went wrong.</h2>
          <pre style={{ color: 'red' }}>{this.state.error?.toString()}</pre>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;

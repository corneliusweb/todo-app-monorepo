import React from 'react';

const TestError = () => {
  throw new Error('This is a test error!');
  // The code below will never run
  // return <div>Should not see this</div>;
};

export default TestError;

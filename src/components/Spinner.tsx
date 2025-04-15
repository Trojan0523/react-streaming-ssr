import React from 'react';
import '../styles/Spinner.css';

const Spinner: React.FC = () => {
  return (
    <div className="spinner-container">
      <div className="spinner-circle"></div>
      <div className="spinner-text">Loading comments... (5 second simulation)</div>
      <div className="spinner-subtext">Watch how Suspense keeps the UI responsive!</div>
    </div>
  );
};

export default Spinner;

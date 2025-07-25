import React from 'react';

function MinimalApp() {
  return (
    <div style={{ padding: '20px', background: 'lightblue' }}>
      <h1>Minimal App Test</h1>
      <p>If you see this, React is working!</p>
      <button onClick={() => alert('Button clicked!')}>
        Test Button
      </button>
    </div>
  );
}

export default MinimalApp;

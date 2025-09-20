import React from 'react';

function SimpleApp() {
  return (
    <div style={{ 
      padding: '20px', 
      fontFamily: 'Arial, sans-serif',
      backgroundColor: '#f0f0f0',
      minHeight: '100vh',
      textAlign: 'center'
    }}>
      <div style={{
        maxWidth: '800px',
        margin: '0 auto',
        backgroundColor: 'white',
        padding: '40px',
        borderRadius: '10px',
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
      }}>
        <h1 style={{ color: '#333', marginBottom: '20px' }}>
          🎉 React App is Working! 🎉
        </h1>
        
        <div style={{ margin: '20px 0', textAlign: 'left' }}>
          <h2>Test Information:</h2>
          <p><strong>Current URL:</strong> {window.location.href}</p>
          <p><strong>Current Time:</strong> {new Date().toLocaleString()}</p>
          <p><strong>User Agent:</strong> {navigator.userAgent}</p>
        </div>
        
        <div style={{ margin: '20px 0' }}>
          <h2>If you can see this message, React is working correctly!</h2>
          <p>This means:</p>
          <ul style={{ textAlign: 'left', maxWidth: '400px', margin: '0 auto' }}>
            <li>✅ HTML is loading</li>
            <li>✅ JavaScript is working</li>
            <li>✅ React is rendering</li>
            <li>✅ CSS is applied</li>
          </ul>
        </div>
        
        <div style={{ margin: '20px 0', padding: '15px', backgroundColor: '#e9ecef', borderRadius: '5px' }}>
          <h3>Next Steps:</h3>
          <p>If this simple version works, we can gradually add back the complex features.</p>
        </div>
      </div>
    </div>
  );
}

export default SimpleApp;

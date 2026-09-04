import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/palette.css'
import './styles.css'
import App from './App.jsx'

// Debug logging
console.log('🚀 Main.jsx loaded');
console.log('📍 Root element:', document.getElementById('root'));
console.log('🌐 Current URL:', window.location.href);
console.log('🏠 Base URL:', window.location.origin);

// Check if root element exists
const rootElement = document.getElementById('root');
if (!rootElement) {
  console.error('❌ Root element not found!');
  document.body.innerHTML = `
    <div style="
      padding: 20px; 
      color: red; 
      font-family: Arial, sans-serif;
      text-align: center;
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      background: #f8f9fa;
    ">
      <h1>❌ Root Element Not Found</h1>
      <p>Cannot find the root element to render the React app.</p>
      <button onclick="window.location.reload()" style="
        padding: 10px 20px;
        background: #dc3545;
        color: white;
        border: none;
        border-radius: 5px;
        cursor: pointer;
        margin-top: 10px;
      ">Reload Page</button>
    </div>
  `;
} else {
  console.log('✅ Root element found, creating React root...');
  try {
    const root = createRoot(rootElement);
    console.log('✅ React root created, rendering App...');
    root.render(
      <StrictMode>
        <App />
      </StrictMode>,
    );
    console.log('🎉 App rendered successfully!');
  } catch (error) {
    console.error('💥 Error rendering app:', error);
    console.error('Error stack:', error.stack);
    rootElement.innerHTML = `
      <div style="
        padding: 20px; 
        color: red; 
        font-family: Arial, sans-serif;
        text-align: center;
        min-height: 100vh;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        background: #f8f9fa;
      ">
        <h1>❌ React App Error</h1>
        <p>Error rendering app: ${error.message}</p>
        <pre style="background: #f8f9fa; padding: 10px; border-radius: 5px; text-align: left; max-width: 80%; overflow: auto;">${error.stack}</pre>
        <button onclick="window.location.reload()" style="
          padding: 10px 20px;
          background: #dc3545;
          color: white;
          border: none;
          border-radius: 5px;
          cursor: pointer;
          margin-top: 10px;
        ">Reload Page</button>
      </div>
    `;
  }
}

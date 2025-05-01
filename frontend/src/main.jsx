import React from 'react';
import ReactDOM from 'react-dom/client'; // For React 18 and above
import App from './App'; // Import your App component
import './index.css';

const rootElement = document.getElementById('root'); // This should match the id in your HTML

// Check if the element exists before rendering
if (rootElement) {
    const root = ReactDOM.createRoot(rootElement);
    root.render(<App />);
} else {
    console.error('Root element not found!');
}

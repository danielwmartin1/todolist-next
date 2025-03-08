import { FooterProvider } from './context/FooterContext';
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Layout from './components/Layout'; // Import the new Layout component

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <FooterProvider>
      <Layout>
        <App />
      </Layout>
    </FooterProvider>
  </React.StrictMode>
);

export default App;
import React from 'react';
import Footer from '../Footer'; // Import the Footer component

export default function Layout({ children }) {
  return (
    <div className="layout">
      {/* Render the children prop */}
      {children}
      {/* Render the Footer component */}
      <Footer />
    </div>
  );
}

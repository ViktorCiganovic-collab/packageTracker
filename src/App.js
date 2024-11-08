import React from 'react';
import Navbar from './Navbar';
import PackageTracker from './PackageTracker';
import TypingEffect from './TypingEffect'; // Import the TypingEffect component
import './App.css';

function App() {
  return (
    <div className="App m-0 p-0 w-100">
      <Navbar />
      <TypingEffect /> {/* Keep the TypingEffect component here */}
      <PackageTracker />
    </div>
  );
}

export default App;

import React from 'react';
import Home from './components/pages/Home'
import Navbar from './components/layouts/Navbar'

import './App.scss';

function App() {
  return (
    <div className="App" >
      <Navbar />
      <Home />
    </div>
  );
}

export default App;

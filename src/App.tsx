import React from 'react';
import './App.css';
import Footer from './components/Footer';
import Process from './components/Process';

const App: React.FC = () => {
  return (
    <div className="App">
      <Process />
      <Footer />
    </div>
  );
}

export default App;

import React from 'react';
import './App.css';
import Chessboard from './chessboard'
// import {HashRouter, Route, Switch} from 'react-router-dom';
const App: React.FC = () => {
  return (
    <div className="App">
      <header className="App-header">
        <Chessboard/>
      </header>
    </div>
  );
}

export default App;

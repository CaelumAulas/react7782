import React, { Component } from 'react';
import Cabecalho from './components/Cabecalho'
import './App.css';
import NavMenu from './components/NavMenu';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Cabecalho>
          <NavMenu login="omariosouto" />
        </Cabecalho>

      </div>
    );
  }
}
export default App;

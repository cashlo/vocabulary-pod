import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import ReactDOM from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import VocabularyList from './VocabularyList';
import AppBar from 'material-ui/AppBar';




class App extends Component {
  render() {
    return (
      <MuiThemeProvider>
      <div className="App">
        <AppBar
          title="Vocabulary Pod"
        />
        <VocabularyList/>
      </div>
      </MuiThemeProvider>
    );
  }
}

export default App;

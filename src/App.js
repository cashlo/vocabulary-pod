import React, { Component } from 'react';

import ReactDOM from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import VocabularyList from './VocabularyList';
import AppBar from 'material-ui/AppBar';
import VocabularyActionButton from './VocabularyActionButton';
import DrawerMenu from './DrawerMenu';
import ContentAdd from 'material-ui/svg-icons/content/add';




class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      vocabularies: [],
      menuOpen: false
    }
  }

  toggleMenu = e => {
    this.setState(function(pState, props){
      return { 
        vocabularies: pState.vocabularies,
        menuOpen: !pState.menuOpen
      };
    });    
  }

  addVocabulary = word => {
    this.setState(function(pState, props){
      var nv = pState.vocabularies;
      nv.push({text: word});
      return { vocabularies: nv };
    });
  }

  updateVocabulary = words => {
    this.setState(function(pState, props){
      var nv = pState.vocabularies;
      words.forEach(word => {
        nv.push({text: word});
      });
      nv.sort( (a,b) => a.text > b.text ? 1 : -1 );
      return { vocabularies: nv };
    });
  }

  render() {
    return (
      <MuiThemeProvider>
      <div className="App">
        <AppBar
          title="Vocabulary Pod"
          onLeftIconButtonTouchTap={this.toggleMenu}
        />
        <DrawerMenu open={this.state.menuOpen} onRequestChange={this.toggleMenu}/>
        <VocabularyList vocabularies={this.state.vocabularies} onEnterNewWord={this.addVocabulary}/>
        <VocabularyActionButton onVocabularyUpdate={this.updateVocabulary}/>
      </div>
      </MuiThemeProvider>
    );
  }
}

export default App;

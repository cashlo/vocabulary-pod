import React, { Component } from 'react';

import ReactDOM from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import VocabularyList from './VocabularyList';
import AppBar from 'material-ui/AppBar';
import LinearProgress from 'material-ui/LinearProgress';
import VocabularyActionButton from './VocabularyActionButton';
import DrawerMenu from './DrawerMenu';
import ContentAdd from 'material-ui/svg-icons/content/add';

import * as firebase from 'firebase';
import 'firebase/firestore';

  // Initialize Firebase
  let config = {
    apiKey: "AIzaSyDzUCsxYGg0sip6oZnI4IotXgJpn1KnkSk",
    authDomain: "vocabulary-pod.firebaseapp.com",
    databaseURL: "https://vocabulary-pod.firebaseio.com",
    projectId: "vocabulary-pod",
    storageBucket: "vocabulary-pod.appspot.com",
    messagingSenderId: "279619622076"
  };
  firebase.initializeApp(config);
  let db = firebase.firestore();


class App extends Component {

  constructor(props) {
    super(props);
    let match = /([^\/]*)$/.exec(window.location.pathname);
    let docId = match != null ? match[1] : '';
    this.state = {
      vocabularies: [],
      menuOpen: false,
      docId: docId,
      isLoading: false,
    }
  }


  loadVocabulary = () => {
    this.setState({isLoading: true});
    db.collection("vocabularies").doc(this.state.docId).get()
      .then(doc => {
        if(doc.exists) {
          this.setState({
            vocabularies: doc.data().vocabularies,
            isLoading: false           
          });
        }
      })
  }

  saveVocabulary = () => {
    this.setState({
      isLoading: true,
      menuOpen: false,
    });
      if (this.state.docId) {
        db.collection("vocabularies").doc(this.state.docId).set({
            vocabularies: this.state.vocabularies
        })
        .then(() => {
            console.log("Document successfully written!");
            this.setState({isLoading: false});
        })
        .catch(error => {
            console.error("Error writing document: ", error);
            this.setState({isLoading: false});
        });
      } else {
        db.collection("vocabularies").add({
            vocabularies: this.state.vocabularies
        })
        .then(docRef => {
            console.log("Document written with ID: ", docRef.id);
            window.history.replaceState( {} , 'Saved List',  window.location.pathname != '/' ? window.location.pathname + '/' + docRef.id : '/' + docRef.id );
            this.setState({isLoading: false});
        })
        .catch(error => {
            console.error("Error adding document: ", error);
            this.setState({isLoading: false});
        });
      }
      

  }

  componentDidMount = () => {
    if (this.state.docId) {
      this.loadVocabulary(this.state.docId);
    }    
  }

  toggleMenu = e => {
    this.setState(function(pState, props){
      return { 
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
        { this.state.isLoading && <LinearProgress />}
        <DrawerMenu open={this.state.menuOpen} onRequestChange={this.toggleMenu} onSave={this.saveVocabulary}/>
        <VocabularyList vocabularies={this.state.vocabularies} onEnterNewWord={this.addVocabulary}/>
        <VocabularyActionButton onVocabularyUpdate={this.updateVocabulary}/>
      </div>
      </MuiThemeProvider>
    );
  }
}

export default App;

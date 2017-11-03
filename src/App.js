import React, { Component } from 'react';

//import ReactDOM from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import VocabularyList from './VocabularyList';
import AppBar from 'material-ui/AppBar';
import LinearProgress from 'material-ui/LinearProgress';
import DrawerMenu from './DrawerMenu';
import DeleteIcon from 'material-ui/svg-icons/action/delete';
import IconButton from 'material-ui/IconButton';
import VocabularyDownloadDialog from './VocabularyDownloadDialog';
import Snackbar from 'material-ui/Snackbar';

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
    let match = /([^/]*)$/.exec(window.location.pathname);
    let docId = match != null ? match[1] : '';
    this.selectedWords = [];
    this.state = {
      vocabularies: {},
      menuOpen: false,
      dialogOpen: false,
      docId: docId,
      isLoading: false,
      snackbarOpen: false,
      snackbarMessage: '',
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
            window.history.replaceState( {} , 'Saved List',  window.location.pathname !== '/' ? window.location.pathname + docRef.id : '/' + docRef.id );
            this.setState({
              docId: docRef.id,
              isLoading: false,
              snackbarOpen: true,
              snackbarMessage: 'List saved, use the URL to access this list anywhere!',
            });
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

  handleDialogClose = buttonClicked => {
    this.setState({dialogOpen: false});
  }

  addVocabulary = word => {
    this.setState(function(pState, props){
      var nv = pState.vocabularies;
      nv[word] = {};
      return { vocabularies: nv };
    });
  }

  updateVocabulary = words => {
    this.setState(function(pState, props){
      var nv = pState.vocabularies;
      words.forEach(word => {
         nv[word] = {};
      });
      return { vocabularies: nv };
    });
  }


  updateSeletedWord = selectedWords => {
    this.selectedWords = selectedWords;
  }

  deleteSelected = () => {
    let nv = this.state.vocabularies;
    this.selectedWords.forEach(word => {
      delete nv[word];
    });
    this.setState({
      vocabularies: nv
    })
  }

  downloadWords = (username) => {
    this.setState({
      dialogOpen: false,
      menuOpen: false,
      isLoading: true,
    });

    if (username === null || username === "") {
      this.setState({
        isLoading: false,
      });
      return;
    }

    fetch('https://cors-anywhere.herokuapp.com/https://www.duolingo.com/users/' + username)
        .then(response => response.json())
        .then(json => {
          let learnedWords = [];
          if (json.language_data.dn) {
            let dutchSkills = json.language_data.dn.skills;
            dutchSkills.forEach(skill => {
              if(skill.learned) {
                learnedWords = learnedWords.concat(skill.words);
              }
            });
            this.updateVocabulary(learnedWords);
          }
          this.setState({
            isLoading: false,
            snackbarOpen: true,
            snackbarMessage: 'Downloaded ' + learnedWords.length + ' items',
          });
        });
  }

  handleRequestSnackbarClose = () => {
          this.setState({
            snackbarOpen: false,
            snackbarMessage: '',
          });    
  }

  handleTranslation = (word, translation) => {
    let nv = this.state.vocabularies;
    nv[word] = {translation: translation};
    this.setState({
      vocabularies: nv
    })
  }

  render() {
    return (
      <MuiThemeProvider>
      <div className="App">
        <AppBar
          title="Vocabulary Pod"
          onLeftIconButtonTouchTap={this.toggleMenu}
          iconElementRight={<IconButton onClick={this.deleteSelected}><DeleteIcon /></IconButton>}
        />
        { this.state.isLoading && <LinearProgress />}
        <DrawerMenu 
          open={this.state.menuOpen}
          onRequestChange={this.toggleMenu}
          onSave={this.saveVocabulary}
          onDownload={() => this.setState({dialogOpen: true})}/>
        <VocabularyList 
          vocabularies={this.state.vocabularies}
          onEnterNewWord={this.addVocabulary}
          onWordSelect={this.updateSeletedWord}
          onTranslation={this.handleTranslation}
          />
        <VocabularyDownloadDialog
          dialogOpen={this.state.dialogOpen}
          onRequestDialogClose={this.handleDialogClose}
          onDownloadWords={this.downloadWords}/>
        <Snackbar
          open={this.state.snackbarOpen}
          message={this.state.snackbarMessage}
          autoHideDuration={4000}
          onRequestClose={this.handleRequestSnackbarClose}
        />  
      </div>
      </MuiThemeProvider>
    );
  }
}

export default App;

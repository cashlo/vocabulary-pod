import React from 'react';
import {List, ListItem} from 'material-ui/List';
import TextField from 'material-ui/TextField';
import AudioIcon from 'material-ui/svg-icons/av/volume-up';
import IconButton from 'material-ui/IconButton';

class VocabularyItem extends React.Component {


  constructor(props) {
    super(props);
    this.state = {
      translation: null,
    }
  }

	handleClick = e => {
		const wordSpeech = new SpeechSynthesisUtterance(this.props.word);
		const letterSpeech = new SpeechSynthesisUtterance(this.props.word.split('').join('-'));
		wordSpeech.lang = 'nl';
		letterSpeech.lang = 'nl';
		letterSpeech.rate = 0.5;
		speechSynthesis.speak(wordSpeech);
		speechSynthesis.speak(letterSpeech);
		wordSpeech.rate = 0.7;
		speechSynthesis.speak(wordSpeech);

		this.translateWord(this.props.word);
	}

	translateWord = word => {
		fetch("https://cors-anywhere.herokuapp.com/https://glosbe.com/gapi/translate?from=nld&dest=eng&format=json&phrase=" + word)
		    .then(response => response.json())
		    .then(json => {
		    	this.setState({
		    		translation: json.tuc[0].phrase ? json.tuc[0].phrase.text : ''
		    	});
		    });
	}

	render() {
		return (
			<ListItem 
			onClick={this.handleClick}
			primaryText={this.props.word}
			secondaryText={this.state.translation}
			rightIcon={<AudioIcon />}
			/>
			);
		}
	}

	export default VocabularyItem;

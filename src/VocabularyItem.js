import React from 'react';
import {ListItem} from 'material-ui/List';
import AudioIcon from 'material-ui/svg-icons/av/volume-up';
import IconButton from 'material-ui/IconButton';
import Checkbox from 'material-ui/Checkbox';

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

	handleSelect = (e, IsChecked) => {
		this.props.onSelect(this.props.word, IsChecked);
	}

	translateWord = word => {
		fetch("https://cors-anywhere.herokuapp.com/https://glosbe.com/gapi/translate?from=nld&dest=eng&format=json&phrase=" + word)
		    .then(response => response.json())
		    .then(json => {
		    	this.setState({
		    		translation: json.tuc[0] && json.tuc[0].phrase ? json.tuc[0].phrase.text : ''
		    	});
		    });
	}

	render() {
		return (
			<ListItem
			leftCheckbox={<Checkbox onCheck={this.handleSelect}/>}
			primaryText={this.props.word}
			secondaryText={this.state.translation}
			rightIconButton={
				<IconButton onClick={this.handleClick}>
				<AudioIcon />
				</IconButton>}
			/>
			);
		}
	}

	export default VocabularyItem;

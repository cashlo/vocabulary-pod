import React from 'react';
import {List, ListItem} from 'material-ui/List';
import TextField from 'material-ui/TextField';
import AudioIcon from 'material-ui/svg-icons/av/volume-up';
import IconButton from 'material-ui/IconButton';

class VocabularyItem extends React.Component {

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
	}

	render() {
		return (
			<ListItem 
			onClick={this.handleClick}
			primaryText={this.props.word}
			rightIcon={<AudioIcon />}
			/>
			);
		}
	}

	export default VocabularyItem;

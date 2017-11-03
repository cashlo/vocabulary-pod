import React from 'react';
import {ListItem} from 'material-ui/List';
import AudioIcon from 'material-ui/svg-icons/av/volume-up';
import IconButton from 'material-ui/IconButton';
import Checkbox from 'material-ui/Checkbox';

class VocabularyItem extends React.Component {

	handleClick = e => {
		const wordSpeech = new SpeechSynthesisUtterance(this.props.word);
		wordSpeech.lang = 'nl';
		speechSynthesis.speak(wordSpeech);

		if (this.props.translation) {
			const translationSpeech = new SpeechSynthesisUtterance(this.props.translation);
			translationSpeech.lang = 'en';
			speechSynthesis.speak(translationSpeech);
		}

		const letterSpeech = new SpeechSynthesisUtterance(this.props.word.split('').join('-'));
		letterSpeech.lang = 'nl';
		letterSpeech.rate = 0.5;
		speechSynthesis.speak(letterSpeech);

		wordSpeech.rate = 0.7;
		speechSynthesis.speak(wordSpeech);
	}

	handleSelect = (e, IsChecked) => {
		this.props.onSelect(this.props.word, IsChecked);
		if (!this.props.translation) {
			this.translateWord(this.props.word);
		}
	}

	translateWord = word => {
		fetch("https://cors-anywhere.herokuapp.com/https://glosbe.com/gapi/translate?from=nld&dest=eng&format=json&phrase=" + word)
		    .then(response => response.json())
		    .then(json => {
		    	if (json.tuc[0] && json.tuc[0].phrase) {
		    		this.props.onTranslation(this.props.word, json.tuc[0].phrase.text);
		    	}
		    });
	}

	render() {
		return (
			<ListItem
			leftCheckbox={<Checkbox onCheck={this.handleSelect}/>}
			primaryText={this.props.word}
			secondaryText={this.props.translation}
			rightIconButton={
				<IconButton onClick={this.handleClick}>
				<AudioIcon />
				</IconButton>}
			/>
			);
		}
	}

	export default VocabularyItem;

import React from 'react';
import {List} from 'material-ui/List';
import VocabularyItem from './VocabularyItem';
import TextField from 'material-ui/TextField';

const newWordStyle = {
	'marginLeft': '72px'
};

class VocabularyList extends React.Component {

	selectedWords = [];

	handleKeyPress = e => {
		if (e.key === 'Enter') {
			this.props.onEnterNewWord(e.target.value);
			e.target.value = "";
    	}
    }

    handleSelectedWords = (word, isChecked) => {
    	if (isChecked) {
    		this.selectedWords.push(word);
    	} else {
    		this.selectedWords = this.selectedWords.filter(w => w !== word);
    	}
    	this.props.onWordSelect(this.selectedWords);
    }

	render() {
		const rows = [];
		let sortedWords = Object.keys(this.props.vocabularies).sort();
		sortedWords.forEach(word => {
			rows.push(
				<VocabularyItem
					key={word}
					word={word}
					translation={this.props.vocabularies[word].translation}
					onSelect={this.handleSelectedWords}
					onTranslation={this.props.onTranslation}
				/>
			);
		});
		return (
		<div>
			<List>
				{rows}
			</List>
			<TextField
				style={newWordStyle}
				hintText="Enter vocabulary"
				onKeyPress={this.handleKeyPress}
			/>
		</div>
		);
	}
}

export default VocabularyList;

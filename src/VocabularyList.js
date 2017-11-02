import React from 'react';
import {List, ListItem} from 'material-ui/List';
import VocabularyItem from './VocabularyItem';
import TextField from 'material-ui/TextField';
import AudioIcon from 'material-ui/svg-icons/av/volume-up';
import IconButton from 'material-ui/IconButton';

class VocabularyList extends React.Component {

	handleKeyPress = (e => {
		if (e.key === 'Enter') {
			this.props.onEnterNewWord(e.target.value);
			e.target.value = "";
    	}
    })

	render() {
		const rows = [];
		this.props.vocabularies.forEach(function(word) {
			rows.push(
				<VocabularyItem
					word={word.text}
				/>
			);
		});
		return (
		<div>
			<List>
				{rows}
			</List>
			<TextField
				hintText="Enter vocabulary"
				onKeyPress={this.handleKeyPress}
			/>
		</div>
		);
	}
}

export default VocabularyList;

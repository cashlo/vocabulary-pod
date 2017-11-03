import React from 'react';
import {List} from 'material-ui/List';
import VocabularyItem from './VocabularyItem';
import TextField from 'material-ui/TextField';

const newWordStyle = {
	'marginLeft': '72px'
};

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
					key={word.text}
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
				style={newWordStyle}
				hintText="Enter vocabulary"
				onKeyPress={this.handleKeyPress}
			/>
		</div>
		);
	}
}

export default VocabularyList;

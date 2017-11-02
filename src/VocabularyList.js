import React from 'react';
import {List, ListItem} from 'material-ui/List';
import TextField from 'material-ui/TextField';

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
				<ListItem primaryText={word.text}/>
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

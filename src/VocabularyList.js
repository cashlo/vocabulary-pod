import React from 'react';
import {List, ListItem} from 'material-ui/List';
import TextField from 'material-ui/TextField';

class VocabularyList extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			vocabularies: []
		}
	}

	handleKeyPress = (e => {
		if (e.key === 'Enter') {
			var newWord = e.target.value;
			this.setState(function(pState, props){
				var nv = pState.vocabularies;
				nv.push({text: newWord});
				return { vocabularies: nv };
			});
			e.target.value = "";
    	}
    })

	render() {
		const rows = [];
		this.state.vocabularies.forEach(function(word) {
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

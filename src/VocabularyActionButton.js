import React from 'react';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';

const actionButtonStyle = {
	position: 'fixed',
    bottom: '24px',
    right: '24px',
};

class VocabularyActionButton extends React.Component {

	handleActionClick = (e => {

		fetch('https://cors-anywhere.herokuapp.com/https://www.duolingo.com/users/CashLo')
		    .then(response => response.json())
		    .then(json => {
		    	let learnedWords = [];
		    	let dutchSkills = json.language_data.dn.skills;
		    	dutchSkills.forEach(skill => {
		    		if(skill.learned) {
		    			learnedWords = learnedWords.concat(skill.words);
		    		}
		    	});
		    	this.props.onVocabularyUpdate(learnedWords);
		    });
    })

	render() {
		return (
	        <FloatingActionButton
	        	onClick={this.handleActionClick}
	        	style={actionButtonStyle}
	        >
	          <ContentAdd />
	        </FloatingActionButton>
		);
	}
}

export default VocabularyActionButton;
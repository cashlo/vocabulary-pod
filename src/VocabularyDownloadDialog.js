import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';

const actionButtonStyle = {
	position: 'fixed',
    bottom: '24px',
    right: '24px',
};

class VocabularyDownloadDialog extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
      		username: '',
    	};
	}

  handleUsernameChange = (e) => {
  	this.setState({
  		username: e.target.value
  	});
  }

  onSumbit = () => {
  	this.props.onDownloadWords(this.state.username);
  }

	render() {
		return (
	        <Dialog
	          title="Please enter your Duolingo username"
	          actions={[<FlatButton label="Submit" primary={true} keyboardFocused={true} onClick={this.onSumbit} />]}
	          open={this.props.dialogOpen}
	          onRequestClose={this.props.onRequestDialogClose}
	        >
	          <TextField
	            hintText="Enter username"
	            value={this.state.username}
	            onChange={this.handleUsernameChange}
	          />
	        </Dialog>
		);
	}
}

export default VocabularyDownloadDialog;

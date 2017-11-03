import React from 'react';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';

export default class DrawerMenu extends React.Component {

  render() {
    return (
        <Drawer open={this.props.open} docked={false} onRequestChange={this.props.onRequestChange}>
          <MenuItem onClick={this.props.onSave}>Save vocabularies</MenuItem>
          <MenuItem>Load learned words</MenuItem>
        </Drawer>
    );
  }
}
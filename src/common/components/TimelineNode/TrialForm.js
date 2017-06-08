import React from 'react';
import MenuItem from 'material-ui/MenuItem';
import Toggle from 'material-ui/Toggle';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import isTimeline from '../../constants/utils'

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

class TrialForm extends React.Component {
	render(){
		const pluginItems = Object.keys(jsPsych.plugins).map((plugin) =>
			<MenuItem
			primaryText={plugin}
			key={plugin}
			value={plugin} />
			);
		if(this.props.open){
			var form = <div><SelectField
			value={this.props.pluginType}
			autoWidth={true}
			floatingLabelText="Trial Type"
			maxHeight={300}
			onChange={this.props.onChange} >
			{pluginItems}
			</SelectField>
			</div>
		 }
		return(
			<MuiThemeProvider>
			<div>
			{form}
			</div>
			</MuiThemeProvider>
			)
	}
}

export default TrialForm;
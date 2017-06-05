import React from 'react';
import Subheader from 'material-ui/Subheader';
import IconButton from 'material-ui/IconButton';
import Divider from 'material-ui/Divider';
import MenuItem from 'material-ui/MenuItem';
import Drawer from 'material-ui/Drawer';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Toggle from 'material-ui/Toggle';

import CloseDrawer from 'material-ui/svg-icons/navigation/close';
import OpenDrawer from 'material-ui/svg-icons/navigation/chevron-left';
import {
	grey200,
	grey400 as DrawerHandleColor,
	grey300 as CloseBackHighlightColor,
	grey50 as CloseDrawerHoverColor
} from 'material-ui/styles/colors';

const visibilityString = (flag) => ((flag) ? 'visible' : 'hidden');

const inline = {
	display: 'flex',
	position: 'absolute',
	marginRight: 150
}

class TimelineNodeEditorDrawer extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			isTimelineToggleValue: true
		};

		this.handleIsTimelineToggle = () => {
			this.setState({
				isTimelineToggleValue: !this.state.isTimelineToggleValue
			});
		}
	}

	render() {
		return (
			<MuiThemeProvider>		
			<div className="TimelineNode-Editor"
					style={{width: (this.props.open) ? '20%': '0%', 
						right: '0px',
						height: '86.5vh', 
						display: 'flex',
						'WebkitTransition': 'all 0.3s ease',
						'MozTransition': 'all 0.3s ease',
						transition: 'all 0.3s ease',
						}}>
				<div className="TimelineNode-Editor-Divider"
					style={{backgroundColor: 'black',
					   height:'100%',
					   float: 'left',
					   width: '3px',
						}}
					draggable={false}
				/>
				<div className="TimelineNode-Editor-Container"
					style={{height: '100%', width: '100%', visibility: visibilityString(this.props.open)}}>
					{(this.props.open) ? 
					<div className="TimelineNode-Editor-Content">
						<div style={{display: 'flex'}}>
							<IconButton 
							disableTouchRipple={true}
	  						hoveredStyle={{backgroundColor: CloseBackHighlightColor}}
							onTouchTap={this.props.closeTimelineEditorCallback}
							>{(this.props.open) ? <CloseDrawer hoverColor={CloseDrawerHoverColor}/> : null}</IconButton>
							<Subheader>Timeline/Trial Editor</Subheader>
						</div>
						<Divider />
						<Toggle
						label="isTimeline"
						defaultToggled={true}
						onToggle={this.handleIsTimelineToggle} />
					</div> : null}
				</div>
  				{(this.props.open) ? null :
  					<IconButton 
  						className="TimelineNode-Editor-Handle"
  						tooltip="Open Timeline/Trial Editor"
  						hoveredStyle={{
  							backgroundColor: DrawerHandleColor,
  							right: 0,
  						}}
  						onTouchTap={this.props.openTimelineEditorCallback}
  						tooltipPosition="bottom-left"
  						style={{
	  					position: 'fixed',
	  					right: -8,
	  					top: '50%',
	  					width: 25,
	  					backgroundColor: grey200,
	  					padding: '12px 0',
	  					zIndex: 1,
  				}}><OpenDrawer /></IconButton>}
  			</div>
  			</MuiThemeProvider>
  			)
	}
}
// 
export default TimelineNodeEditorDrawer;
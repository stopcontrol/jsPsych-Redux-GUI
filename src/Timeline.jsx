import React from 'react';
import { render, Component, PropTypes } from 'react-dom';
import Avatar from 'material-ui/Avatar';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import ExpandMore from 'material-ui/svg-icons/navigation/expand-more';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import IconButton from 'material-ui/IconButton';
import PluginDrawer from 'PluginDrawer';
import ButtonMenu from 'ButtonMenu';
import SelectableTrialList from 'SelectableList';



// Style Variables
const paperStyle = { height: window.innerHeight * 0.9 };


// Check if the given drawer should be open
const checkDrawerStatus = (store, name) => {
    var state = store.getState();
    return
}

const timelineTitleFAB = {
    marginLeft: 60,
    marginTop: 5,
    position: 'auto'
}

// The "dump" Component for the Timeline of experimental trials
const Timeline = ({
    timelineOpen,
    toggleTimeline,
    store,              // The store
    state              // The current state of the store
}) => (
    <div>
        <Drawer
            width={50}
            openSecondary={false}
            open={!timelineOpen}
        > 
            <IconButton 
                onTouchTap={toggleTimeline}
            > 
                <ExpandMore /> 
            </IconButton>
        </Drawer>
        <Drawer
            docked={true}
            draggable={false}
            width={400}
            openSecondary={false}
            open={timelineOpen}
        >
            <AppBar 
                title={<div style={timelineTitleFAB}>
                    Experimental Timeline
                </div> }
                iconElementLeft={
                    <ButtonMenu
                        draggable={false}
                        store={store}
                        state={state}
                    />}
                    iconElementRight={<IconButton>
                        <NavigationClose />
                    </IconButton>}
                    onRightIconButtonTouchTap={toggleTimeline}
                />
                <SelectableTrialList
                    draggable={false}
                    store={store}
                    state={state}
                />
            </Drawer>
            <PluginDrawer
                draggable={false}
                store={store}
                state={state}
                openTrial={state.openTrial}
            />
        </div>
);

export default Timeline;

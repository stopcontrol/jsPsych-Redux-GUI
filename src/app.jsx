// src/app.jsx

import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, combineReducers } from 'redux';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import Timeline from 'Timeline';
import TitleBar from 'TitleBar';
import PluginDrawer from 'PluginDrawer';
import HotKeys from 'HotKeys';
import rootReducer from 'reducers';
import { actionOpenDrawer, actionArchiveState, actionRestoreStater} from 'actions';

const setMuiTheme = getMuiTheme(lightBaseTheme);

// ----- Actions ----- //
const actionAddTrial = () => {// Dispatch the action calling for a new trial to be added
    actionArchiveState(store);
    store.dispatch({
        type: 'ADD_TRIAL'
    });
};

const actionRemoveTrial = () => {
    actionArchiveState(store);
    var state = store.getState();
    store.dispatch({
        type: 'REMOVE_TRIAL',
        index: state.selected
    });
};

// Here to keep the props of dummy components pure
const actionToggleTimeline = () => {
    var state = store.getState(store);
    // If the timeline is open
    state.timelineOpen ?
        // Close it
        store.dispatch({
            type: 'CLOSE_TIMELINE'
        })
    // Otherwise open it
        : store.dispatch({
            type: 'OPEN_TIMELINE'
        });
};


// A "dump" component. It contains no logic
// It defines how the current state of the application is to be rendered
const App = ({
    timelineOpen,
    store,
    state
}) => (
    <div>
        <HotKeys
            store={store}
            state={state}
        />
        <TitleBar
            store={store}
            state={state}
            toggleTimeline={actionToggleTimeline}
            timelineOpeni={timelineOpen}
        />
        <Timeline
            toggleTimeline={actionToggleTimeline}
            timelineOpen={timelineOpen}
            store={store}
            state={state}
        />
        <PluginDrawer
            store={store}
            state={state}
            openTrial={state.openTrial}
        />
    </div>);

// Create the Redux store with timeline as the reducer that
// manages the state updates
const store = createStore(rootReducer);

// The application to be rendered
// A Timeline object, the state of which is determined by the state of the store
const renderApp = () => {
    // Get the current state of the store
    var state = store.getState();

    // Print the current state of the store to the console
    console.log("Render App: ", state);
    render(
        <div draggable={false}>
            <MuiThemeProvider muiTheme={setMuiTheme}>
                <Provider store={store}>
                    <App
                        store={store}
                        state={state}
                        timelineOpen={state.timelineOpen}
                        draggable={false}/>
                </Provider>
            </MuiThemeProvider>
        </div>,
        document.getElementById('app')
    );
    console.log() // Add some whitespace 
};

// Callback that Redux store will call every time an action is dispatched
// i.e. Every time the state is changed
store.subscribe(renderApp);

// Set the initial state of the application
store.dispatch({
    type: 'INITIAL_STATE'
});

// Render the application
renderApp();

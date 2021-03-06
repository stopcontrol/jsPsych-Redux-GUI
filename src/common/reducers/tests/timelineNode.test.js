import reducer, { DEFAULT_TIMELINE_NAME, DEFAULT_TRIAL_NAME, getLevel } from '../timelineNode';
import * as Actions from '../../actions/timelineNodeActions';
import { standardizeTimelineId, standardizeTrialId, TIMELINE_TYPE, TRIAL_TYPE } from '../../constants/utils'; 

const initState = {
	// id of which is being previewed/editted
	previewId: null,

	// the main timeline. array of ids
	mainTimeline: [], 
}

/*********** Add Actions **************/
let expected_add_timeline_to_main = {
	previewId: null,
	mainTimeline: [standardizeTimelineId(0)]
}
expected_add_timeline_to_main[standardizeTimelineId(0)] = {
	id: standardizeTimelineId(0),
	type: TIMELINE_TYPE,
	name: DEFAULT_TIMELINE_NAME,
	parent: null,
	childrenById: [],
	collapsed: true,
	
	enabled: true,
	parameters: {}
}

let expected_add_timeline_to_another = {
	previewId: null,
	mainTimeline: [standardizeTimelineId(0)]
}
expected_add_timeline_to_another[standardizeTimelineId(0)] = {
	id: standardizeTimelineId(0),
	type: TIMELINE_TYPE,
	name: DEFAULT_TIMELINE_NAME,
	parent: null,
	childrenById: [standardizeTimelineId(1)],
	collapsed: false,
	
	enabled: true,
	parameters: {}
}
expected_add_timeline_to_another[standardizeTimelineId(1)] = {
	id: standardizeTimelineId(1),
	type: TIMELINE_TYPE,
	name: DEFAULT_TIMELINE_NAME,
	parent: standardizeTimelineId(0),
	childrenById: [],
	collapsed: true,
	
	enabled: true,
	parameters: {}
}


let expected_add_trial_to_main = {
	previewId: null,
	mainTimeline: [standardizeTrialId(0)]
}
expected_add_trial_to_main[standardizeTrialId(0)] = {
	id: standardizeTrialId(0),
	type: TRIAL_TYPE,
	name: DEFAULT_TRIAL_NAME,
	parent: null,
	
	enabled: true,
	parameters: {}
}

let expected_add_trial_to_timeline = {
	previewId: null,
	mainTimeline: [standardizeTimelineId(2)]
}
expected_add_trial_to_timeline[standardizeTimelineId(2)] = {
	id: standardizeTimelineId(2),
	name: DEFAULT_TIMELINE_NAME,
	type: TIMELINE_TYPE,
	parent: null,
	childrenById: [standardizeTrialId(1)],
	collapsed: false,
	
	enabled: true,
	parameters: {}
}
expected_add_trial_to_timeline[standardizeTrialId(1)] = {
	id: standardizeTrialId(1),
	type: TRIAL_TYPE,
	name: DEFAULT_TRIAL_NAME,
	parent: standardizeTimelineId(2),
	
	enabled: true,
	parameters: {}
}

describe('Timeline Node Reducers for Adding actions', () => {
	it('should handle add actions of timeline', () => {
		// add to main timeline
		let s1 = reducer(initState, Actions.addTimelineAction(standardizeTimelineId(0), null));
		expect(s1).toEqual(expected_add_timeline_to_main)

		// add to another timeline
		let s2 = reducer(s1, Actions.addTimelineAction(standardizeTimelineId(1), standardizeTimelineId(0)));
		expect(s2).toEqual(expected_add_timeline_to_another);
	})

	it('should handle add actions of trial', () => {
		// add to main timeline
		let s1 = reducer(initState, Actions.addTrialAction(standardizeTrialId(0), null));
		expect(s1).toEqual(expected_add_trial_to_main);
		// add to another timeline
		let s2 = reducer(initState, Actions.addTimelineAction(standardizeTimelineId(2), null));
		s2 = reducer(s2, Actions.addTrialAction(standardizeTrialId(1), standardizeTimelineId(2)));
		expect(s2).toEqual(expected_add_trial_to_timeline)
	})
})


/*********** Add actions **************/

/*********** Delete actions **************/

describe('Timeline Node Reducers for Deleting actions', () => {
	it('should handle delete actions', () => {
		// delete from main timeline
		let s1 = reducer(initState, Actions.addTimelineAction(standardizeTimelineId(0), null));
		s1 = reducer(s1, Actions.addTimelineAction(standardizeTimelineId(1), standardizeTimelineId(0)));
		s1 = reducer(s1, Actions.addTimelineAction(standardizeTimelineId(2), standardizeTimelineId(1)));
		s1 = reducer(s1, Actions.addTrialAction(standardizeTrialId(0), null));
		s1 = reducer(s1, Actions.addTrialAction(standardizeTrialId(1), standardizeTimelineId(1)));
		s1 = reducer(s1, Actions.deleteTimelineAction(standardizeTimelineId(0)));
		s1 = reducer(s1, Actions.deleteTrialAction(standardizeTrialId(0)));
		expect(s1).toEqual(initState)
	})
})

/*********** Delete actions **************/

/*********** Move actions **************/

let expected_move_timeline_to_another = {
	previewId: null,
	mainTimeline: [standardizeTimelineId(0)]
}
expected_move_timeline_to_another[standardizeTimelineId(0)] = {
	id: standardizeTimelineId(0),
	name: DEFAULT_TIMELINE_NAME,
	type: TIMELINE_TYPE,
	parent: null,
	childrenById: [standardizeTrialId(0), standardizeTimelineId(1)],
	collapsed: true,
	
	enabled: true,
	parameters: {}
}
expected_move_timeline_to_another[standardizeTimelineId(1)] = {
	id: standardizeTimelineId(1),
	name: DEFAULT_TIMELINE_NAME,
	type: TIMELINE_TYPE,
	parent: standardizeTimelineId(0),
	childrenById: [],
	collapsed: true,
	
	enabled: true,
	parameters: {}
}
expected_move_timeline_to_another[standardizeTrialId(0)] = {
	id: standardizeTrialId(0),
	name: DEFAULT_TRIAL_NAME,
	type: TRIAL_TYPE,
	parent: standardizeTimelineId(0),
	
	enabled: true,
	parameters: {}
}

describe('Timeline Node Reducers for Moving actions', () => {
	it('should handle move actions', () => {
		// delete from main timeline
		let s1 = reducer(initState, Actions.addTimelineAction(standardizeTimelineId(0), null));
		s1 = reducer(s1, Actions.addTimelineAction(standardizeTimelineId(1), null));
		s1 = reducer(s1, Actions.addTrialAction(standardizeTrialId(0), null));
		s1 = reducer(s1, Actions.moveNodeAction(standardizeTimelineId(1), standardizeTimelineId(0), 0))
		s1 = reducer(s1, Actions.moveNodeAction(standardizeTrialId(0), standardizeTimelineId(0), 0))
		expect(s1).toEqual(expected_move_timeline_to_another)
	})
})

/*********** Move actions **************/
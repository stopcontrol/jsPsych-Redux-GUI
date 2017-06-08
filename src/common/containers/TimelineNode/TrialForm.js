import { connect } from 'react-redux';
import { isTimeline } from '../../constants/utils';
import TrialForm from '../../components/TimelineNode/TrialForm';

const onChangePluginType = (dispatch, ownProps) => {
	dispatch(trialFormActions.onPluginTypeChange(ownProps));
}

const mapStateToProps = (state, ownProps) => {
	console.log("In maps");
	let timelineNodeState = state.timelineNodeState;

	let trial = timelineNodeState[ownProps.id];
	console.log(timelineNodeState);
	return {
		id: ownProps.id === timelineNodeState.previewId,
		pluginType: trial.pluginType,
	}
};

const mapDispatchToProps = (dispatch, ownProps) => ({
	onChange: () => { onChangePluginType(dispatch, ownProps) },
})

export default connect(mapStateToProps, mapDispatchToProps)(TrialForm);

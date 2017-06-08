import * as actionTypes from '../constants/ActionTypes';

export function onPluginTypeChange(id, pluginType) {
	return {
		type: actionTypes.CHANGE_PLUGIN_TYPE,
		id: id,
		pluginType: pluginType,
	};
}
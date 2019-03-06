
import * as types from '../constants/actionTypes';

let INITIAL_STATE_FILE = {
	file: []
};

export default function(state = INITIAL_STATE_FILE, action){
	switch (action.type) {
		case types.UPLOAD_FILE_SUCCESS:
			return {
				...state,
				file: action.file
			}
		case types.DELETE_FILE:
			return {
				...state,
				file: state.file - 1
			}
		default:
			return state
	}
}

import * as types from '../constants/actionTypes';

let INITIAL_STATE_FILE = {
	file: ' from initial state'
};

export default function(state = INITIAL_STATE_FILE, action){
	switch (action.type) {
		case types.UPLOAD_FILE_SUCCESS:
			return {
				...state,
				file: action.value
			}
		case types.DELETE_FILE:
			return {
				...state,
				file: []
			}
		default:
			return state
	}
}
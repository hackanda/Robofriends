import {
	CHANGE_SEARCHFIELD,
	REQUEST_ROBOTS_PENDING,
	REQUEST_ROBOTS_FAILED,
	REQUEST_ROBOTS_SUCCESS
} from './ActionConstants';

const initialStateSearch = {
	searchField : ''
};

export const searchRobots = 
	(state=initialStateSearch, action={}) => {
		switch(action.type) {
		case CHANGE_SEARCHFIELD:
			// Needed to use Object.assign() but it is not supporting
			return ({...state, searchField: action.payload});
		default:
			return state;
		}
	}

const initialStateRobots = {
	isPending: false,
	robots: [],
	error: ''
}

export const requestRobots = 
	(state=initialStateRobots, action={}) => {
		switch(action.type) {
		case REQUEST_ROBOTS_PENDING:
			return ({...state, ispending: true});
		case REQUEST_ROBOTS_SUCCESS:
			return ({...state, robots: action.payload, isPending: false});
		case REQUEST_ROBOTS_FAILED:
			return ({...state, error: action.payload, isPending: false});
		default:
			return state; 
		}
	}
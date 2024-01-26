import {React, Component} from 'react';

import {connect} from 'react-redux';

const mapStateToProps = (state) => {
	return {
		Error: state.requestRobots.error
	};
}

class ErrorBoundary extends Component {
	// This Local state is being used for tracking
	// Any Internal Error
	constructor(props) {
		super(props);
		this.state = {
			hasError : false
		}
	}

	// This is being used if any Internal Error Happens
	componentDidCatch(error, info) {
		this.setState({hasError : true});
	}

	render() {
		// If any Internal Error
		if(this.state.hasError) {
			return <h1> Arree Yaarr... </h1>;
		}
		// If error while fetching Robots 
		else if(this.props.Error) {
			return (
				<div>
					<h2> Error Fetching Robots</h2>
					<p> {this.props.Error.toString()} </p>
				</div>
			);
		}
		else
			return this.props.children;
	}
}

export default connect(mapStateToProps)(ErrorBoundary);
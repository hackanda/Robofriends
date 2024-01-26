import {React, Component} from 'react';
import Header from '../Components/Header';
import CardList from '../Components/CardList';
import SearchBox from '../Components/SearchBox';
import Scroll from '../Components/Scroll';
import ErrorBoundary from '../Components/ErrorBoundary';

// Redux State Connection realted import
import {connect} from 'react-redux';
// Importing Action that we need to Dispatch to
import {change_SearchField, requestRobots} from '../Actions';

// Redux Methodology
// 1. Action
// 2. Reducer
// 3. Store
// 4. Make Changes

const mapStateToProps = (state) => {
	console.log(state);
	return {
		// Syntax
		// *searchField: state.ReducerName.Property*
		// E.g. searchField: state.searchRobots.searchField
		// We did not give here Reducer Name
		// When there is only one reducer, state does not
		// store Reducer name and directly stores its value.
		// E.g. searchField: state.searchField
		searchField: state.searchRobots.searchField,
		robots: state.requestRobots.robots,
		isPending: state.requestRobots.isPending,
		error: state.requestRobots.error
	};
}

const mapDispatchToProps = (dispatch) => {
	return {
		onSearchChange : (event) => {
			dispatch(change_SearchField(event.target.value))
		},
		onRequestRobots : () => {
			requestRobots(dispatch);
		}
	};
}

class App extends Component {
	componentDidMount() {	
		// We have use Jsonplaceholder Fake Api to get
		// Fake Results
		// fetch('https://jsonplaceholder.typicode.com/users')
		// 	.then(response => response.json())
		// 	.then(users => this.setState({'robots' : users}));
		this.props.onRequestRobots();
	}

	render() {
		// const {robots} = this.state;
		const {
			searchField, 
			onSearchChange, 
			robots,
			isPending
		} = this.props;
		const filteredRobots = robots.filter(robot => {
			return robot.name.toLowerCase()
					.includes(
						searchField.toLowerCase()
					);
		});
		return isPending ?
		(
			<h1 className="tc"> 
			Loading... 
			</h1>
		)
		:
		(
			<div className="tc">
				<Header />
				<SearchBox  
					onSearchChange={onSearchChange}
				/>
				<Scroll>
					<ErrorBoundary>
						<CardList robots = {filteredRobots}/>
					</ErrorBoundary>
				</Scroll>
			</div>
		);
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
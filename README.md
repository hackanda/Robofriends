# Robofriends
Initial React Project 



React/Redux Notes:

    1. Redux has 3 Principles:
        a. Single Source of Truth - One Giant State object handling all the state related data
        b. State is read only - State Object is never modified. If we want to change state,
            new State object is created from the old one. State object is IMMUTABLE.
        c. Changes using pure functions : State should be changed using pure functions. A pure function
            always returns the same output upon giving the same input.

    2. Redux Way:
        Action -> Reducer -> Store -> Make Changes

        a. Action - User performs an action ( Click etc )
        b. Reducer - A pure function that takes an input and creates a state.
        c. Store/State - State Obejct get updated.
        d. Make Changes : As soon as react see's state is changed, React Make changes

        Reducer is just one pure function which can take any type of Action and give a state.
        We do not have multiple reducers for multiple different actions.

        Redux uses an architectural pattern called *Flux Pattern*
            Action -> Dispatcher -> Store -> View
        On the Contrary, we had *MVC Architecture*, where a single controller used to take in
        all the actions but had multiple models and views according to the action. In Redux,
        we have just one large state object and one view which get constantly updated whenever the state is changed.

    3. Install Redux:
        npm install redux -> Actual Redux Library
        npm install react-redux -> Library which can connect react to redux

    4. Where to Use redux in React App? :
        Redux is used only in the *CONTAINERS (Root Node)*, eg: App.js

    5. Redux library provides:
        a. crateStore: Its a method provided by the Library which is used to create the main giant state object which is called Store in Redux terms.
            Generally, we have lot of reducers, hence first we have to create a root Reducer and then pass it as an argument to createStore(rootReducer) method.
            e.g. -> let store = createStore(rootReducer)

    6. react-redux Library:
        a. Provider: They are used to wrap up the main root Component (App.js). Initially, we used to pass down the redux store
            to each and every component manually as a prop. Using the Provider I can just pass the store as prop to Provider and
            it will take care of passing down the state to all the child Containers/Components.
            e.g. ->
                ReactDom.render(
                    <Provider store={store}>
                        <App />
                    <Provider>, document.getElementById('root'));

        b. Connect: To Understand this, we would need to understand the complete picture of how the state gets updated and passed down. Below is the Explanation
            1. There are 2 Files first that we create.
                a. Actions.js -> Defines all the actions that a user can perform
                b. Reducers.js  -> Defines an initial State and then a reducer function which will take that action and return the updated state.
            2. 2nd Step was to pass down the State/Store to each and every component. To do that we used *Provider*
            3. Now we need to tell which Containers need to connect/subscribe to the store as
                a. We should only connect containers to the redux store
                b. By connecting we mean, user would be able to read the state from props inside the container JS File.
            4. Now to use connect we need to first create two methods:
                a. mapStateToProps -> This method takes reducers as the parameter object and then returns either the complete original state object
                    or just the property that we require.
                    Suppose we had multiple reducers which returns the original state object
                        1. searchRobots
                        2. deleteRobots etc.
                    The way we would write the mapStateToProps function is
                    e.g. ->
                            const mapStateToProps = (reducers) => {
                                return {
                                    searchField : reducers.searchRobots.searchField
                                    *// This is just one property, we can either have multiple or the whole state object*
                                }
                            }
                b. mapDispatchToProps -> This method's use is to call an Action method based on the action performed by the user
                    e.g. ->
                            const mapDispatchToProps = (dispatch) => {
                                return {
                                    onSearchChange : (event) => dispatch(setSearchField(event.target.value))
                                }
                            }
                -> Both the methods return an object.
                -> The keys in the returned object of these methods are used to access them through props
                    e.g. -> this.props.searchField
                            this.props.onSearchChange

                -> Basically, when an action is performed, it calls respective action method using dispatch() method.
                    Now the Action is a method that returns the object with two values.
                    {
                        'type' : Action_Type,
                        'payload' : Data
                    }
                    Upon call of this action method, the returned object is passed to the reducer which returns/updates the state/store.
            5. At last, while exporting the Container ( e.g. App.js ), we call the connect method with the above two methods.
                e.g. ->
                        export default connect(mapStateToProps, mapDispatchToProps)(App)
                -> The method Connect is a Higher Order Function which means it returns a method instead of a normal Value/Object.

    7. ACTION ( USER ) => Actions.js method => Reducers.js reducer => Provider ( Pass down the Updated State ) => Connect ( Subscribe to the Latest state changes )

    8. Redux Middleware :
        a. Redux gives us another method called applyMiddleware() in which we can pass a function. This function then gets called as soon as an action is performed.
        b. The syntax to use Middleware is:
            e.g. ->
                    import {applyMiddleware} from 'redux';

                    const store = createStore(reducer, applyMiddleware(anotherMethod));
        c. One good example of a Middleware is redux logger which is used to log each and every action that is performed. This logger then can be passed as an argument
            to the Middleware function and hence it will be called upon each action.
            e.g. ->
                    import {createLogger} from 'redux-logger';

                    const logger = createLogger();
                    const store = createStore(reducerFunction, applyMiddleware(logger));
        d. Middleware changes the redux diagram as below:
            e.g. ->
                    Action ( User ) -> Middleware -> Reducer -> Store -> View

    9. Combine Reducers : There will be scenarios where we will be creating multiple reducers based on the different actions.
        Redux provides us with another method which takes all the reducers in an object as the argument and then the function returns the root reducer.
        e.g. ->
                import {combineReducers} from 'redux';

                const rootReducer = combineReducers(
                    {
                        reducer1,
                        reducer2....
                    }
                );

                const store = createStore(rootReducer, applyMiddleware(...));

    10. Redux Thunk: ( Async Actions ) -> Not all the actions are performed by the user. Some actions are Asynchronous in nature like fetch();
        These actions can not be used directly just like any other actions as at the time when action is performed, the reducer will be called instantaneously
        and by that time the result of that action would not have come back. Hence the reducer will not have the actual payload data.
        In these cases, we pass the dispatch function to the action itself and within the action we call the dispatch instead of dispatching it from
        mapDispatchToProps function.

        Redux Thunk is one the the libraries to handle async actions.
        e.g. ->
                index.js
                import thunkMiddleware from 'redux-thunk';

                const store = createStore( rootReducer, applyMiddleware( thunkMiddleware, logger );

                -> We can have multiple Middlewares. We just need to pass them as the arguments to the function.

                Actions.js
                    const fetchRobots = (dispatch) => {
                        dispatch({type: 'REQUEST_PENDING'});
                        fetch('Some/Url')
                            .then( response => response.json()) // In Case the request is successful
                            .then ( data => dispatch( {type: REQUEST_SUCCESS, payload : data}) )
                            .catch( error => dispatch( {type: REQUEST_FAILED, payload  : error}) );
                    }

                App.js
                    const mapDispatchToProps = (dispatch) {
                        return {
                            onSaerchRobots : dispatch(setSearchField()); // Normal Action performed by the User
                            onRequestRobots : fetchRobots(dispatch); // Async Action Performed by the application
                        };
                    }

        -> Dispatch method dispatches the action to the store, Basically meaning upon an action, it calls the rootReducer which checks all ther reducers and then
            based on matching by action.type it updates the state accordingly.

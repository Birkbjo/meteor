import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { createContainer } from 'meteor/react-meteor-data';

import { Tasks,TaskList } from '../api/tasks.js';

import Task from './Task.jsx';
//import TaskList from '../../server/main.js';
// App component - represents the whole app
class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            hideCompleted: false,
            inputText: '',
        };

        this.toggleHideCompleted = this.toggleHideCompleted.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    toggleHideCompleted() {
        this.setState({
            hideCompleted: !this.state.hideCompleted,
        });
    }

    handleSubmit(event) {
        event.preventDefault();

        const text = this.inputText.value;

        Meteor.call('tasks.insert', text);
        this.inputText.value = '';
        //ReactDOM.findDOMNode(this.refs.textInput).value = '';
    }
    renderTasks() {
        let fTasks = this.props.tasks;
        if(this.state.hideCompleted) {
            fTasks = fTasks.filter(task => !task.checked);
        }
        return fTasks.map((task) => (
            <Task key={task._id} task={task} />
        ));
    }

    render() {
        return (
            <div className="container">
                <header>
                    <h1>Todo List ({this.props.incompleteCount})</h1>
                </header>

                <label className="hide-completed">
                    <input
                        type="checkbox"
                        readOnly
                        checked={this.state.hideCompleted}
                        onClick={this.toggleHideCompleted}
                    />
                    Hide Completed Tasks
                </label>
                <form className="new-task" onSubmit={this.handleSubmit} >
                    <input
                        type="text"
                        ref={(ref) => this.inputText = ref}
                        placeholder="Type to add new tasks"
                    />
                </form>
                <ul>
                    {this.renderTasks()}
                </ul>
            </div>
        );
    }
}

App.propTypes = {
    tasks: PropTypes.array.isRequired,
   // incompleteCount: PropTypes.number.isRequired,
};

export default createContainer(() => {
    return {
        tasks: Tasks.find({}, { sort: { createdAt: -1 } }).fetch(),
        incompleteCount: Tasks.find({ checked: { $ne: true}}).count(),
    };
}, App);
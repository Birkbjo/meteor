import React, { Component, PropTypes } from 'react';
import { Tasks } from '../api/tasks.js';

// Task component - represents a single todo item
export default class Task extends Component {
    constructor(props) {
        super(props);

        this.state = {};

        this.deleteThisTask = this.deleteThisTask.bind(this);
        this.toggleChecked = this.toggleChecked.bind(this);
    }
    toggleChecked() {
        Meteor.call('tasks.setChecked',this.props.task._id,!this.props.task.checked);
    }

    deleteThisTask() {
        Meteor.call('tasks.remove',this.props.task._id);
    }
    render() {
        const taskClassName = this.props.task.checked ? 'checked' : '';
        return (


        <li className={taskClassName}>
            <button className="delete" onClick={this.deleteThisTask}>
                del
            </button>

            <input
                type="checkbox"
                readOnly
                checked ={this.props.task.checked}
                onClick={this.toggleChecked}
            />
            {/*   {JSON.stringify(this.props.task,null, 2)} */}
            <span className="text"> {this.props.task._id} {this.props.task.text}</span>
        </li>
        );
    }
}

Task.propTypes = {
    // This component gets the task to display through a React prop.
    // We can use propTypes to indicate it is required
    task: PropTypes.object.isRequired,
};
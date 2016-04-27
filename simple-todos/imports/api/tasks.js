import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';
export const Tasks = new Mongo.Collection('tasks');


Meteor.methods({
    'tasks.insert'(text) {
        check(text, String);
     
        Tasks.insert({
            text: text,
            checked: false,
            createdAt: new Date()
        });
    },
    'tasks.remove'(taskId) {
        check(taskId, String);

        Tasks.remove(taskId);
    },
    'tasks.setChecked'(taskId, setChecked) {
        check(taskId, String);
        check(setChecked, Boolean);

        Tasks.update(taskId, { $set: { checked: setChecked } });
    }
})


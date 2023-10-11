const mongoose = require('mongoose');

const reminderSchema = new mongoose.Schema({
    date: {
        type: Date,
        required: true,
    },
    subject: {
        type: String,
        required: true,
        enum: ['Meeting', 'Deadline', 'Appointment', 'Other'], // Add more options as needed
    },
    description: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        validate: {
            validator: function (v) {
                // Add custom email validation logic here
                return /\S+@\S+\.\S+/.test(v);
            },
            message: (props) => `${props.value} is not a valid email address!`,
        },
    },
    contactNo: {
        type: String,
        required: true,
    },
    smsNo: {
        type: String,
        required: true,
    },
    recurrenceOptions: [
        {
            type: String,
            enum: ['7Days', '5Days', '3Days', '2Days'],
        },
    ],
    status: {
        type: String,
        enum: ['active', 'disabled'],
        default: 'active',
    },
});

const Reminder = mongoose.model('Reminder', reminderSchema);

module.exports = Reminder;

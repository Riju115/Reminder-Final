const express = require('express');
const router = express.Router();

// Import your Mongoose model
const Reminder = require('./models/Reminder'); // Adjust the path as needed

// GET route to render the modification form
router.get('/modify', async (req, res) => {
    try {
        // Fetch the reminder data based on criteria (e.g., subject)
        const reminders = await Reminder.find({ subject: 'YourSubject' }); // Adjust the criteria

        // Render the modification form with a list of reminders
        res.render('modifyReminder', { reminders });
    } catch (err) {
        console.error(err);
        res.render('error', { message: 'An error occurred while fetching reminders.' });
    }
});

// POST route to handle the form submission and update the reminder
router.post('/modify', async (req, res) => {
    const { reminderId, date, subject, description, email, contactNo, smsNo, recurrenceOptions } = req.body;

    try {
        // Update the reminder in the database based on the reminderId
        const updatedReminder = await Reminder.findByIdAndUpdate(
            reminderId,
            {
                date,
                subject,
                description,
                email,
                contactNo,
                smsNo,
                recurrenceOptions: Array.isArray(recurrenceOptions) ? recurrenceOptions : [recurrenceOptions],
            },
            { new: true } // Returns the updated reminder
        );

        if (updatedReminder) {
            // Redirect to a success page or homepage
            res.redirect('/');
        } else {
            res.render('error', { message: 'Reminder not found or failed to update.' });
        }
    } catch (err) {
        console.error(err);
        res.render('error', { message: 'An error occurred while updating the reminder.' });
    }
});

module.exports = router;

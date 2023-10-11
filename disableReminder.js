const express = require('express');
const router = express.Router();

// Import your Mongoose model
const Reminder = require('./models/Reminder'); // Adjust the path as needed

// GET route to render the disable form
router.get('/disable', async (req, res) => {
    try {
        // Fetch the reminder data based on criteria (e.g., subject)
        const reminders = await Reminder.find({ subject: 'YourSubject' }); // Adjust the criteria

        // Render the disable form with a list of reminders
        res.render('disableReminder', { reminders });
    } catch (err) {
        console.error(err);
        res.render('error', { message: 'An error occurred while fetching reminders.' });
    }
});

// POST route to handle the form submission and disable the reminder
router.post('/disable', async (req, res) => {
    const { reminderId } = req.body;

    try {
        // Update the reminder's status to "disabled" in the database based on the reminderId
        const updatedReminder = await Reminder.findByIdAndUpdate(
            reminderId,
            { status: 'disabled' },
            { new: true } // Returns the updated reminder
        );

        if (updatedReminder) {
            // Redirect to a success page or homepage
            res.redirect('/');
        } else {
            res.render('error', { message: 'Reminder not found or failed to disable.' });
        }
    } catch (err) {
        console.error(err);
        res.render('error', { message: 'An error occurred while disabling the reminder.' });
    }
});

module.exports = router;

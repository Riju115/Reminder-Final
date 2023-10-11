const express = require('express');
const router = express.Router();

// Import your Mongoose model
const Reminder = require('./models/Reminder'); // Adjust the path as needed

// GET route to render the enable form
router.get('/enable', async (req, res) => {
    try {
        // Fetch the reminder data based on criteria (e.g., subject)
        const reminders = await Reminder.find({ subject: 'YourSubject' }); // Adjust the criteria

        // Render the enable form with a list of reminders
        res.render('enableReminder', { reminders });
    } catch (err) {
        console.error(err);
        res.render('error', { message: 'An error occurred while fetching reminders.' });
    }
});

// POST route to handle the form submission and enable the reminder
router.post('/enable', async (req, res) => {
    const { reminderId } = req.body;

    try {
        // Update the reminder's status to "enabled" in the database based on the reminderId
        const updatedReminder = await Reminder.findByIdAndUpdate(
            reminderId,
            { status: 'enabled' },
            { new: true } // Returns the updated reminder
        );

        if (updatedReminder) {
            // Redirect to a success page or homepage
            res.redirect('/');
        } else {
            res.render('error', { message: 'Reminder not found or failed to enable.' });
        }
    } catch (err) {
        console.error(err);
        res.render('error', { message: 'An error occurred while enabling the reminder.' });
    }
});

module.exports = router;

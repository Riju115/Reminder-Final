const express = require('express');
const router = express.Router();

// Import your Mongoose model
const Reminder = require('./models/Reminder'); // Adjust the path as needed

// GET route to render the delete form
router.get('/delete', async (req, res) => {
    try {
        // Fetch the reminder data based on criteria (e.g., subject)
        const reminders = await Reminder.find({ subject: 'YourSubject' }); // Adjust the criteria

        // Render the delete form with a list of reminders
        res.render('deleteReminder', { reminders });
    } catch (err) {
        console.error(err);
        res.render('error', { message: 'An error occurred while fetching reminders.' });
    }
});

// POST route to handle the form submission and delete the reminder
router.post('/delete', async (req, res) => {
    const { reminderId } = req.body;

    try {
        // Delete the reminder from the database based on the reminderId
        const deletedReminder = await Reminder.findByIdAndRemove(reminderId);

        if (deletedReminder) {
            // Redirect to a success page or homepage
            res.redirect('/');
        } else {
            res.render('error', { message: 'Reminder not found or failed to delete.' });
        }
    } catch (err) {
        console.error(err);
        res.render('error', { message: 'An error occurred while deleting the reminder.' });
    }
});

module.exports = router;

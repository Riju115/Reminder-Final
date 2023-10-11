const express = require('express');
const router = express.Router();

// Import your Mongoose model
const Reminder = require('./models/Reminder'); // Adjust the path as needed

// GET route to render the view form
router.get('/view', async (req, res) => {
    try {
        const fromDate = req.query.fromDate || null; // Get the "From Date" from the query string
        const toDate = req.query.toDate || null; // Get the "To Date" from the query string
        const subject = req.query.subject || null; // Get the "Subject" from the query string

        // Build the query based on selected filters
        const query = {};

        if (fromDate) {
            query.date = { $gte: new Date(fromDate) };
        }

        if (toDate) {
            if (query.date) {
                query.date.$lte = new Date(toDate);
            } else {
                query.date = { $lte: new Date(toDate) };
            }
        }

        if (subject) {
            query.subject = subject;
        }

        // Fetch reminders based on the selected filters
        const reminders = await Reminder.find(query);

        // Render the view form with the filtered reminders
        res.render('viewReminders', { reminders });
    } catch (err) {
        console.error(err);
        res.render('error', { message: 'An error occurred while fetching reminders.' });
    }
});

module.exports = router;

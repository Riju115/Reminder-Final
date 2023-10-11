const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 3000;

// Connect to your MongoDB database
mongoose.connect('mongodb://localhost/reminderApp', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// Set up your view engine and middleware
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));




// Register the operation files
const modifyReminderRouter = require('./modifyReminder');
const disableReminderRouter = require('./disableReminder');
const enableReminderRouter = require('./enableReminder');
const deleteReminderRouter = require('./deleteReminder');
const viewRemindersRouter = require('./viewReminders');

// Use the routers for each operation
app.use('/modify', modifyReminderRouter);
app.use('/disable', disableReminderRouter);
app.use('/enable', enableReminderRouter);
app.use('/delete', deleteReminderRouter);
app.use('/view', viewRemindersRouter);


app.get('/', (req, res) => {
    const username = "YourUsername"; // Replace with the actual username
    const currentDate = new Date();
    const options = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    };
    const formattedDate = currentDate.toLocaleDateString('en-US', options);

    res.render('index', {
        username: username,
        dayOfWeek: formattedDate.split(',')[0],
        formattedDate: formattedDate
    });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

// Create web server application

// Load modules
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');

// Create server
const app = express();

// Configure server
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Create routes
app.get('/comments', function (req, res) {
    // Read comments.json file
    fs.readFile('./comments.json', 'utf8', function (err, data) {
        // If error, return error
        if (err) {
            console.error(err);
            res.status(500).send(err);
        }

        // If no error, return data
        res.send(data);
    });
});

app.post('/comments', function (req, res) {
    // Read comments.json file
    fs.readFile('./comments.json', 'utf8', function (err, data) {
        // If error, return error
        if (err) {
            console.error(err);
            res.status(500).send(err);
        }

        // If no error, parse data
        const comments = JSON.parse(data);

        // Add new comment
        comments.push(req.body);

        // Save comments.json file
        fs.writeFile('./comments.json', JSON.stringify(comments), function (err) {
            // If error, return error
            if (err) {
                console.error(err);
                res.status(500).send(err);
            }

            // If no error, return success
            res.send('Success');
        });
    });
});

// Start server
app.listen(3000, function () {
    console.log('Server is listening on port 3000');
});

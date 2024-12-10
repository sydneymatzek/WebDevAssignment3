const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const port = 3000;

// (CSS, JS)
app.use(express.static('public'));

// Route to main HTML page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));  // Ensure the path is correct for your HTML file
});

// Get current high score
app.get('/highscore', (req, res) => {
    fs.readFile('highscore.txt', 'utf8', (err, data) => {
        if (err) {
            return res.status(500).send('Error reading highscore file');
        }
        res.json({ highscore: data.trim() });
    });
});

// Update high score if new high score is achieved
app.post('/highscore', express.json(), (req, res) => {
    const newHighScore = req.body.highscore;

    fs.readFile('highscore.txt', 'utf8', (err, data) => {
        if (err) {
            return res.status(500).send('Error reading highscore file');
        }

        const currentHighScore = parseInt(data.trim(), 10);

        // If new high score is lower (better) than the current high score, update the file
        if (newHighScore < currentHighScore || currentHighScore === NaN) {
            fs.writeFile('highscore.txt', newHighScore.toString(), (err) => {
                if (err) {
                    return res.status(500).send('Error updating highscore file');
                }
                res.send('High score updated!');
            });
        } else {
            res.send('No new high score');
        }
    });
});

// Start server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});


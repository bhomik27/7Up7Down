const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

app.post('/api/roll-dice', (req, res) => {
    const { betAmount, betOption } = req.body;
    const dice1 = Math.floor(Math.random() * 6) + 1;
    const dice2 = Math.floor(Math.random() * 6) + 1;
    const total = dice1 + dice2;

    let result, newPoints;

    if (total < 7 && betOption === '7 down' || total > 7 && betOption === '7 up') {
        result = 'win';
        newPoints = 5000 + (betAmount * 2);
    } else if (total === 7 && betOption === 'Lucky 7') {
        result = 'win';
        newPoints = 5000 + (betAmount * 5);
    } else {
        result = 'lose';
        newPoints = 5000 - betAmount;
    }

    res.json({ dice: [dice1, dice2], result, newPoints });
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});

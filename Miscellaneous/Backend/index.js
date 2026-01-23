const express = require('express');
const app = express();
const port = 3000;

app.get('/register', (req, res) => {
    let { user, password } = req.query;
    res.send("Standard get request. Welcome " + user);
});
app.post('/register', (req, res) => {
    res.send("Standard post request");
});

app.listen(port, () => {
    console.log(`listnening on port ${port}`);
});
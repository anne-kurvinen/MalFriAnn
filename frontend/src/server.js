/* eslint-disable no-undef */
const express = require('express');
const path = require('path');

const app = express();
const port = process.env.PORT || 5000;

// För att servera frontend-filer från Vite
app.use(express.static(path.join(__dirname, 'dist')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});

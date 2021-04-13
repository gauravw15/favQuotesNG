const express = require('express');

const app = express();

app.use(express.static('./dist/quotes/'));

app.get('/*', (req, res) =>
    res.sendFile('index.html', {root: 'dist/quotes/'}),
);

app.listen((process.env.PORT || 8080), () => {
    console.log(`started at ${process.env.PORT || 8080}`)
});
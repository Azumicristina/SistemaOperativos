const express = require('express');
const path = require('path');

const app = express();
const port = 3000;

app.get('/', (req, res) => {
    res.send('conociendo NodeJS');
});

app.use('/public', express.static(path.join(__dirname, 'public')))

app.listen(port, () => {
    console.log(`Se esta ejecutando sobre el puerto ${port}`)
});
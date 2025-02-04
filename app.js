const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.get('/api/getUrl', (req, res) => {
    const regex = /https:\/\/knowunity\.(?:pl|com|ai)\/app\/knows\/([a-f0-9\-]+)/;
    const url = req.query.url;
    let knowId = url.match(regex);
    if(knowId) {
        knowId = knowId[1];
    } else return res.send('Invalid URL!');

    fetch(`https://apiedge-eu-central-1.knowunity.com/knows/${knowId}`).then(res => res.json()).then(data => {
        return res.send(`<a href="${data.documents[0].contentUrl}" class="text-blue-300 underline" download>Download</a>`)
    });
});

app.listen(5055, () => {
    console.log('Server is running on http://localhost:5055');
});
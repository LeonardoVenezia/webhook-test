const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());

app.post('/webhook', (req, res) => {
    console.log('Webhook recibido!');
    console.log(req.body);
    if(req.body.pusher) {
        console.log(`Cambios pusheados por: ${req.body.pusher.name}`);
    }
    if(req.body.commits) {
        req.body.commits.forEach(commit => {
            console.log(`Commit hecho por: ${commit.author.name}`);
            console.log(`Mensaje del commit: ${commit.message}`);
        });
    }
    res.status(200).end();
});

app.get('/webhook', (req, res) => {
    res.send('Hello World!');
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Aplicación escuchando en el puerto ${PORT}`));

const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const axios = require('axios');

app.use(bodyParser.json());

app.post('/webhook', async (req, res) => {
    const { action, pull_request } = req.body;
    console.log('Webhook recibido!');
    console.log(req.body);
    console.log(JSON.stringify(req.body));
    console.log('fin');
    if(req.body.pusher) {
        console.log(`Cambios pusheados por: ${req.body.pusher.name}`);
    }
    if(req.body.commits) {
        req.body.commits.forEach(commit => {
            console.log(`Commit hecho por: ${commit.author.name}`);
            console.log(`Mensaje del commit: ${commit.message}`);
        });
    }
    if (action === 'opened') {
        const comment = {
            body: 'Hola Mundo',
        };

        await axios.post(pull_request.comments_url, comment, {
            headers: {
                Authorization: `token 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`,
                Accept: 'application/vnd.github.v3+json',
            },
        });
    }
    res.status(200).end();
});

app.get('/webhook', (req, res) => {
    res.send('Hello World!');
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Aplicación escuchando en el puerto ${PORT}`));

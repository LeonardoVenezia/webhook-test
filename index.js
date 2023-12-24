const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const axios = require('axios');

app.use(bodyParser.json());

app.post('/webhook', async (req, res) => {
    const { action, pull_request, repository } = req.body;
    if (action === 'opened' || action === 'synchronize') {
        const { data: files } = await axios.get(pull_request.url + '/files', {
            headers: {
                Authorization: `token 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`,
                Accept: 'application/vnd.github.v3+json',
            },
        });
        console.log('-.-.-.-.-.-.-.-.-');
        console.log(files);
        console.log('-.-.-.-.-.-.-.-.-');
        if (files.length > 0) {
            const firstFile = files[0];
            const firstChangeLine = firstFile.patch.split('\n').find(line => line.startsWith('+') || line.startsWith('-'));
            const lineNumber = Number(firstChangeLine.substr(1).split(' ')[0]);

            const comment = {
                body: 'Hola Mundo',
                path: firstFile.filename,
                position: lineNumber,
            };

            await axios.post(`${repository.url}/pulls/${pull_request.number}/reviews`, {
                commit_id: pull_request.head.sha,
                event: 'COMMENT',
                comments: [comment],
            }, {
                headers: {
                    Authorization: `token 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`,
                    Accept: 'application/vnd.github.v3+json',
                },
            });
        }
    }
    res.status(200).end();
});

app.get('/webhook', (req, res) => {
    res.send('Hello World!');
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Aplicación escuchando en el puerto ${PORT}`));

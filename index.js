const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type']
}));

const endpoint = 'https://us-central1-chat-for-chatgpt.cloudfunctions.net/basicUserRequestBeta';

function sendResponse(res, status, code, message) {
    res.setHeader('Content-Type', 'application/json');
    res.status(status).send(JSON.stringify({ status, code, message }, null, 2));
}

app.get('/', async (req, res) => {
    const text = req.query.text;

    if (!text) {
        sendResponse(res, 400, 400, 'Please enter text parameter');
        return;
    }

    try {
        const response = await axios.post(endpoint, {
            data: {
                message: text
            }
        }, {
            headers: {
                'Host': 'us-central1-chat-for-chatgpt.cloudfunctions.net',
                'Connection': 'keep-alive',
                'Accept': '*/*',
                'User-Agent': 'com.tappz.aichat/1.2.2 iPhone/16.3.1 hw/iPhone12_5',
                'Accept-Language': 'ar',
                'Content-Type': 'application/json; charset=UTF-8'
            }
        });

        const result = response.data.result.choices[0].text;
        sendResponse(res, 200, 200, result);
    } catch (error) {
        sendResponse(res, 403, 403, 'Error connecting to openai');
    }
});

app.post('/', async (req, res) => {
    const text = req.body.text;

    if (!text) {
        sendResponse(res, 400, 400, 'Please enter text parameter');
        return;
    }

    try {
        const response = await axios.post(endpoint, {
            data: {
                message: text
            }
        }, {
            headers: {
                'Host': 'us-central1-chat-for-chatgpt.cloudfunctions.net',
                'Connection': 'keep-alive',
                'Accept': '*/*',
                'User-Agent': 'com.tappz.aichat/1.2.2 iPhone/16.3.1 hw/iPhone12_5',
                'Accept-Language': 'ar',
                'Content-Type': 'application/json; charset=UTF-8'
            }
        });

        const result = response.data.result.choices[0].text;
        sendResponse(res, 200, 200, result);
    } catch (error) {
        sendResponse(res, 403, 403, 'Error connecting to openai');
    }
});

app.listen(3000, () => {
    console.log('ChatGPT API is running on port 3000');
});
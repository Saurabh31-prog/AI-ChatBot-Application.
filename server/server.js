// server.js

import express from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';
import { OpenAI } from 'openai'; // Correct import for OpenAI SDK

dotenv.config(); // Load .env variables

// Initialize OpenAI instance with API key from environment variable
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY, // Ensure this matches your .env setup
});

const app = express();

// CORS configuration - allow only specific origin (e.g., http://localhost:5173) during development
app.use(cors({
    origin: 'http://localhost:5173', // Allow only this frontend domain
    methods: 'GET,POST',             // Allow only specific HTTP methods
}));


app.use(express.json());

// Test route
app.get('/', async (req, res) => {
    res.status(200).send({
        message: 'Hello from Aldeate!',
    });
});

// POST request to interact with OpenAI API
app.post('/', async (req, res) => {
    try {
        const prompt = req.body.prompt;

        // OpenAI completions method should be used correctly based on the SDK version
        const response = await openai.chat.completions.create({
            model: 'gpt-3.5-turbo', // Update to latest available model like 'gpt-3.5-turbo' or 'gpt-4'
            messages: [{ role: 'user', content: prompt }],
        });
        

        res.status(200).send({
            bot: response.choices[0].message.content, // Adjust according to the response structure
        });

    } catch (error) {
        console.error(error);
        res.status(500).send(error?.message || 'Something went wrong');
    }
});
// Start the server
app.listen(5000, () => console.log('AI server started on http://localhost:5000'));

import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
const { json } = bodyParser;

const app = express();
const PORT = process.env.PORT || 5000;

app.use(json());
app.use(cors({
    origin: ['https://22bcs15436-front.vercel.app'], 
    methods: ['GET', 'POST'],
}));

app.post('/bfhl', (req, res) => {
    const inputArray = req.body.data;

    if (!inputArray || !Array.isArray(inputArray)) {
        return res.status(400).json({ status: 'failure', message: 'Invalid input. Expected an array.' });
    }

    console.log("Received data:", inputArray);

    const numbers = [];
    const alphabets = [];

    inputArray.forEach(item => {
        if (!isNaN(item)) {
            numbers.push(item);
        } else if (typeof item === 'string' && /^[a-zA-Z]+$/.test(item)) {
            alphabets.push(item);
        }
    });

    console.log("Filtered alphabets:", alphabets);

    const highestAlphabet = alphabets.length > 0
        ? alphabets.sort((a, b) => a.localeCompare(b, 'en', { sensitivity: 'base' })).slice(-1)[0]
        : 'null';

    console.log("Highest alphabet:", highestAlphabet);

    const response = {
        status: 'success',
        user_id: 'Mukul_Dagar_07082005',
        college_email: '22BCS15436@cuchd.in',
        roll_number: '22BCS15436',
        numbers,
        alphabets,
        highest_alphabet: highestAlphabet
    };

    res.json(response);
});

app.get('/bfhl', (req, res) => {
    res.json({ operation_code: 1 });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
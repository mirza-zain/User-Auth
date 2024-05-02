import express from 'express';
import cookieParser from 'cookie-parser';
import path from 'path';
import { fileURLToPath } from 'url';
import User from './models/usermodel.js';

const app = express();
const port = 3000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.render("index");
});

app.post('/create', async (req, res) => {
    let {username, email, password, age} = req.body;
    let createUser = await User.create({username, email, password, age});
    
    res.send(createUser);
})

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})